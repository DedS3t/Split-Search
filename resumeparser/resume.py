from pyresparser import ResumeParser
from bs4 import BeautifulSoup
import requests
import re
from threading import Thread

class resume:
    def __init__(self,path):
        self.path=path
        self.api="http://rss.careerjet.com/rss"
        self.data=None
    def getResumeData(self):
        data=ResumeParser(self.path).get_extracted_data()
        self.data=data
        return data
    
    def parse(self,s,tag):
        return re.findall(f"<{tag}>([\s\S]*?)</{tag}>",s)

    def buildUrls(self):
        urls=[]
        for skill in self.data['skills'][:len(self.data['skills'])//2]:
            urls.append(f"http://rss.careerjet.com/rss?s={skill}&l=USA&lid=55&psz=5&snl=3000")
        return urls

    def handleUrl(self,url,jobs):
        page=requests.get(url)
        soup=BeautifulSoup(page.content,'html.parser')
        obj=list(list(soup.children)[4].children)[1]
        body=str(obj)
        lst=self.parse(body,"item")
        for job in lst:
            if len(jobs)>100: return
            jobs.append(self.handleJob(job))

    def getResults(self):
        urls=self.buildUrls()
        jobs=[]
        threads=[]
        for url in urls:
            thr=Thread(target=self.handleUrl,args=(url,jobs))
            thr.start()
            threads.append(thr)
        for thread in threads:
            thread.join()
        return jobs
    def handleJob(self,body):
        title=self.parse(body,"title")[0]
        desciption=self.parse(body,"description")[0]
        link=re.findall("<link/>.+",body)[0][7:]
        return {'title':title,"description":desciption,"link":link}

    def scrape(self):
        return self.getResults()
        


if __name__=="__main__":
    res=resume('gordon.pdf')
    res.getResumeData()
    for job in res.scrape():
        print(f"Title: {job['title']}, Desc: {job['description'][:100]}, Link: {job['link']}")

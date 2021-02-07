from flask import Flask,request,jsonify
from resume import resume
import string
import random
import requests
from flask_cors import CORS, cross_origin 
app=Flask(__name__)
CORS(app)

@app.route('/resume',methods=['POST','OPTIONS'])
@cross_origin(origin="*")
def upload():
    '''
    print(request.headers)
    print(len(request.form))
    for c in request.form:
        print(c)
        print("===")
    '''
    url=request.values.get('url')
    r=requests.get(url)
    code=res = ''.join(random.choices(string.ascii_uppercase +string.digits, k = 15)) 
    open(f'temp/{code}.pdf','wb').write(r.content)
    res=resume(f'temp/{code}.pdf')
    data=res.getResumeData()
    
    return jsonify(res.scrape())
    



if __name__=='__main__':
    app.run(port=4000)
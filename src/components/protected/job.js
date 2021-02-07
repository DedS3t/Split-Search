import React,{useState} from 'react'


export default ({job}) => {

    return (
        <div className="job">
            <a href={job.link}><h1>{job.title}</h1></a>
            <p>{job.description.length > 500 ? job.description.substring(0,500):job.description}</p>
        </div>
    )

}
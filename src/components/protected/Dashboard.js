import React, { Component,useState } from 'react'
import {storage,firebaseRef} from '../../config/constants'
import axios from 'axios';
import FileUploader from "react-firebase-file-uploader";
const request = require('request');

class ProfilePage extends Component {
  state = {
    username: "",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: "",
    uid:firebaseRef.auth().currentUser.uid,
    jobs:[]
  };
 
  handleChangeUsername = event =>
    this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
      storage.ref(`/resumes/${this.state.uid}`)
      .child(filename)
      .getDownloadURL()
      .then(async url => {
        this.setState({ avatarURL: url });
        
        request.post({url:'http://127.0.0.1:4000/resume', form: {url:url}}, (err,httpResponse,body)=>{
            this.setState({jobs:JSON.parse(body)})
            console.log(this.state.jobs)
        })

      
      });
  };
 
  render() {
    return (
      <div>
        <form>
          
          <FileUploader
            accept="*"
            name="avatar"
            randomizeFilename
            storageRef={storage.ref(`/resumes/${this.state.uid}`)}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />

          {this.state.jobs==[] ? null:this.state.jobs.map(job=><h1 key={Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}>{job.title}</h1>)}

        </form>


      </div>
    );
  }
}
 
export default ProfilePage;


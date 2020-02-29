import React from 'react';
import { Component } from 'react'
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './Components/layout/Navbar';
import Dashboard from './Components/dashboard/Dasboard';
import ProjectDetails from './Components/projects/ProjectDetails';
import SignIn from './Components/auth/SignIn';
import SignUp from './Components/auth/SignUp'
import CreateProject from './Components/projects/CreateProject';

class App extends Component {

  state = {
    selectedFile: null
  }
  fileSelectedHandler = event => {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0]
    });
  }
  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
    axios.post('https://us-central1-imageupload-9a880.cloudfunctions.net/uploadFile', fd, {
      onUploadProgress: progressEvent => {
        console.log('UploadProgress: ' + Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%')
      }
    })
      .then(res => {
        console.log(res);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={ Dashboard } />
            <Route path='/project/:id' component = {ProjectDetails}/>
            <Route path='/signin' component = {SignIn}/>
            <Route path='/signup' component = {SignUp} />
            <Route path='/createproject' component = {CreateProject} />
          </Switch>
          <input style={{ display: 'none' }} type="file" onChange={this.fileSelectedHandler}
            ref={fileInput => this.fileInput = fileInput} />
          <button onClick={() => this.fileInput.click()}>Pick File</button>
          <button onClick={this.fileUploadHandler}>Upload Image</button>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;

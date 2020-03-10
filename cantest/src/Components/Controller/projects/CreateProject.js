import React, { Component } from 'react'
import { createProject } from '../../../store/actions/projectActions';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import axios from 'axios';

class CreateProject extends Component {
    state = {
        title: '',
        content: '',
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


    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value

        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.createProject(this.state);
        this.props.history.push('/');
    }
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />

        return (


            <div className="conatiner">


                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Create New Project</h5>
                    <input  type="file" onChange={this.fileSelectedHandler}
                        ref={fileInput => this.fileInput = fileInput} />
                    <button style={{ display: 'none' }} onClick={() => this.fileInput.click()}>Pick File</button>
                    <button style={{ display: 'none' }} onClick={this.fileUploadHandler}>Upload Image</button>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">Project Content</label>
                        <textarea id="content" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0" onClick={this.fileUploadHandler}>Create</button>
                    </div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);

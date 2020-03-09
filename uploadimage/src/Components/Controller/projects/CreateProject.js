import React, { Component } from 'react'
import { createProject } from '../../../store/actions/projectActions';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import firebase from 'firebase';

class CreateProject extends Component {
    state = {
        title: '',
        content: '',
        selectedFile: null

    }


    fileSelectedHandler = event => {
        //console.log(event.target.files[0]);
        event.preventDefault();
        this.setState({
            selectedFile: event.target.files[0]
        });
    }
    fileUpload(e) {
        const fd = new FormData();
        fd.append('image', e.target.files[0], e.target.files[0].name);
        axios.post('https://us-central1-imageupload-9a880.cloudfunctions.net/uploadFile', fd, {
            onUploadProgress: progressEvent => {
                console.log('UploadProgress: ' + Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%')
            }
        })
            .then(res => {
                console.log("AXIOS:" + res);
                var storage = firebase.storage();
                var httpsReference = storage.refFromURL('gs://imageupload-9a880.appspot.com/' + e.target.files[0].name);
                this.setState({
                    selectedFile: httpsReference
                });
            });
    }


    handleChange = (e) => {
        
            this.setState({
                [e.target.id]: e.target.value

            });

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.fileUpload(e);
       // if(e.target.files[0]) {
       //     this.fileUpload(e);
       // }
       
        console.log(this.state);
        this.props.createProject(this.state);
        this.props.history.push('/');

    }
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />

        return (


            <div className="container">


                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Create New Project</h5>



                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">Project Content</label>
                        <textarea id="content" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <input type="file" />                   

                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Create</button>
                    </div>
                </form>
            </div>
        )
    }
}
//<button onClick={this.fileUploadHandler}>Upload Image</button>     <button style={{ display: 'none' }} onClick={this.fileUploadHandler}>Pick File</button>
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

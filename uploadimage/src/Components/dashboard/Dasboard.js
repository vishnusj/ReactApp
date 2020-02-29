import React, { Component } from "react";
import Notifications from './Notifications';
import ProjectList from '../projects/ProjectList';
import {connect} from 'react-redux';
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class Dashboard extends Component {
    render() {
        const {projects} = this.props;

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6"></div>
                    <ProjectList projects={projects}/>
                    <div className="col s12 m5 offset-m1"></div>
                    <Notifications />
                </div>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    console.log(state);
    return {
        projects: state.firestore.ordered.projects
    }
}

export default compose(
    connect(mapStatetoProps), 
    firestoreConnect([
        {collection: 'projects'}
    ])
    )
    (Dashboard);
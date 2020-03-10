import React from 'react';
import { Component } from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from '../src/Components/View/layout/Navbar';
import Dashboard from '../src/Components/View/dashboard/Dasboard';
import ProjectDetails from '../src/Components/Controller/projects/ProjectDetails';
import SignIn from '../src/Components/View/auth/SignIn';
import SignUp from '../src/Components/View/auth/SignUp'
import CreateProject from '../src/Components/Controller/projects/CreateProject';

class App extends Component {

  

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
          
        </div>
      </BrowserRouter>
    );
  }

}

export default App;

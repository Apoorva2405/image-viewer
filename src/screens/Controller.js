import React, { Component } from 'react';
import Login from '../screens/login/Login';
import Home from '../screens/home/Home';
import Profile from '../screens/profile/Profile';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Controller extends Component {

constructor() {
  super();
  this.baseUrl = "http://localhost:3000";
}

  render() {
    return (
      <Router >
        <div className="main-container">
          <Route exact path='/' render={(props) => <Login baseUrl={this.baseUrl} />} />
          <Route path='/home' render={(props) => <Home {...props} />} baseUrl={this.baseUrl} />
          <Route path='/profile' render={(props) => <Profile baseUrl={this.baseUrl} />} />
        </div>
      </Router>
    )
  }
}

export default Controller;
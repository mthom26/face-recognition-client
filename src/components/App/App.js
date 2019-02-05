import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from '../NavBar/NavBar';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <h1>App</h1>
          <NavBar />

          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/signup" render={() => <SignUp />} />
        </div>
      </Router>
    );
  }
}

export default App;

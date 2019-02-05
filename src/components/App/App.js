import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from '../NavBar/NavBar';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';

import styles from './App.module.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <NavBar />
          <div className={styles.app}>
            <Route exact path="/login" render={() => <Login />} />
            <Route exact path="/signup" render={() => <SignUp />} />
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;

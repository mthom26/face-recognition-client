import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from '../NavBar/NavBar';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';

import styles from './App.module.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      token: null
    };
  }

  setUser = user => {
    this.setState({ user: user });
  };

  setToken = token => {
    this.setState({ token: token });
  };

  render() {
    return (
      <Router>
        <Fragment>
          <NavBar />
          <div className={styles.app}>
            <Route
              exact
              path="/login"
              render={() => (
                <Login setUser={this.setUser} setToken={this.setToken} />
              )}
            />
            <Route
              exact
              path="/signup"
              render={() => (
                <SignUp setUser={this.setUser} setToken={this.setToken} />
              )}
            />
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;

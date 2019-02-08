import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from '../NavBar/NavBar';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Profile from '../Profile/Profile';

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
    localStorage.setItem('userEmail', user.email);
  };

  setToken = token => {
    this.setState({ token: token });
    localStorage.setItem('token', token);
  };

  getUserData = (token, email) => {
    // Call server and get User data for provided email
    console.log('Get User Data');
  };

  componentDidMount() {
    // Check localStorage for existing token and user
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    if (token && userEmail) {
      this.getUserData(token, userEmail);
      this.setState({ token: token });
    }
  }

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
            <Route exact path="/profile" render={() => <Profile />} />
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;

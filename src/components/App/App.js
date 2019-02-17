import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from '../NavBar/NavBar';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Profile from '../Profile/Profile';
import Upload from '../Upload/Upload';

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

  getUserData = async (token, email) => {
    // Call server and get User data for provided email
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/profile`;

      const result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      const data = await result.json();
      this.setState({ user: data.user });
    } catch (err) {
      console.log(err);
    }
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
    const loggedIn = this.state.token ? true : false;

    return (
      <Router>
        <Fragment>
          <NavBar loggedIn={loggedIn} />
          <div className={styles.app}>
            <Route
              exact
              path="/upload"
              render={() => <Upload token={this.state.token} />}
            />
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

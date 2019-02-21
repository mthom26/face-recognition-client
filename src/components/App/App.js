import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import NavBar from '../NavBar/NavBar';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Profile from '../Profile/Profile';
import Upload from '../Upload/Upload';

import styles from './App.module.css';

const defaultState = {
  user: {},
  token: null,
  isLoggedIn: false
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = defaultState;
  }

  setUser = user => {
    this.setState({ user: user });
    localStorage.setItem('userEmail', user.email);
  };

  setToken = token => {
    this.setState({ token: token });
    localStorage.setItem('token', token);
  };

  setIsLoggedIn = value => {
    this.setState({ isLoggedIn: value });
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
      this.setState({ token, user: data.user, isLoggedIn: true });
    } catch (err) {
      console.log(err);
    }
  };

  logOut = () => {
    this.setState(defaultState);
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
  };

  componentDidMount() {
    // Check localStorage for existing token and user
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    if (token && userEmail) {
      this.getUserData(token, userEmail);
    }
  }

  render() {
    const { user } = this.state;
    const { isLoggedIn } = this.state;

    return (
      <Router>
        <Fragment>
          <NavBar loggedIn={isLoggedIn} logOut={this.logOut} />
          <div className={styles.app}>
            <Route
              exact
              path="/upload"
              render={() =>
                isLoggedIn ? (
                  <Upload token={this.state.token} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/login"
              render={() =>
                isLoggedIn ? (
                  <Upload token={this.state.token} />
                ) : (
                  <Login
                    setUser={this.setUser}
                    setToken={this.setToken}
                    setIsLoggedIn={this.setIsLoggedIn}
                  />
                )
              }
            />
            <Route
              exact
              path="/signup"
              render={() =>
                isLoggedIn ? (
                  <Upload token={this.state.token} />
                ) : (
                  <SignUp
                    setUser={this.setUser}
                    setToken={this.setToken}
                    setIsLoggedIn={this.setIsLoggedIn}
                  />
                )
              }
            />
            <Route
              exact
              path="/profile"
              render={() =>
                isLoggedIn ? <Profile user={user} /> : <Redirect to="/login" />
              }
            />
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;

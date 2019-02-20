import React, { Component } from 'react';

import CustomForm from '../CustomForm/CustomForm';
import styles from './Login.module.css';

class Login extends Component {
  onSubmit = async formData => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/login`;

      const result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await result.json();
      this.props.setUser(data.user);
      this.props.setToken(data.token);
      this.props.setIsLoggedIn(true);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <h2>Login</h2>
        <CustomForm showEmail showPassword onSubmitAction={this.onSubmit} />
      </div>
    );
  }
}

export default Login;

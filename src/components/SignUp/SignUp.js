import React, { Component } from 'react';

import CustomForm from '../CustomForm/CustomForm';
import styles from './SignUp.module.css';

class SignUp extends Component {
  onSubmit = async formData => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/signup`;

      const result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await result.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <h2>Sign Up</h2>
        <CustomForm
          showName
          showEmail
          showPassword
          showPwConfirm
          onSubmitAction={this.onSubmit}
        />
      </div>
    );
  }
}

export default SignUp;

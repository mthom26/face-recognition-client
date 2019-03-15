import React, { Component } from 'react';

import CustomForm from '../CustomForm/CustomForm';
import styles from './GetPasswordReset.module.css';

class GetPasswordReset extends Component {
  onSubmit = async formData => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/password-reset`;

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
        <h2>Get Password Reset</h2>
        <CustomForm showEmail onSubmitAction={this.onSubmit} />
      </div>
    );
  }
}

export default GetPasswordReset;

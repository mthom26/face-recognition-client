import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import CustomForm from '../CustomForm/CustomForm';
import styles from './PasswordReset.module.css';

class PasswordReset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resetToken: null
    };
  }

  onSubmit = async formData => {
    try {
      const { resetToken } = this.state;
      const url = `${
        process.env.REACT_APP_SERVER_URL
      }/password-reset/${resetToken}`;

      const result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await result.json();
      // this.props.setUser(data.user);
      // this.props.setToken(data.token);
      // this.props.setIsLoggedIn(true);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    const resetToken = this.props.location.pathname.split('/')[2];
    this.setState({ resetToken });
  }

  render() {
    return (
      <div className={styles.container}>
        <h2>Password Reset</h2>
        <CustomForm showPassword showPwConfirm onSubmitAction={this.onSubmit} />
      </div>
    );
  }
}

export default withRouter(PasswordReset);

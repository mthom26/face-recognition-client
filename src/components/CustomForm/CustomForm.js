import React, { Component } from 'react';

import styles from './CustomForm.module.css';

const initialFormData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};

class CustomForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: initialFormData,
      formSuccess: false,
      formFailure: false,
      loading: false
    };
  }

  onUpdateState = event => {
    const { target } = event;
    this.setState({
      formData: {
        ...this.state.formData,
        [target.name]: target.value
      }
    });
  };

  onSubmit = (event, formData) => {
    event.preventDefault();
    if (this.validateInputs()) {
      this.props.onSubmitAction(formData);
    } else {
      console.log('Inputs not valid');
    }
  };

  validateInputs = () => {
    const { name, email, password, confirmPassword } = this.state.formData;
    const { showName, showEmail, showPassword, showPwConfirm } = this.props;

    // Check for empty inputs
    if (showName && name === '') return false;
    if (showEmail && email === '') return false;
    if (showPassword && password === '') return false;
    if (showPwConfirm && confirmPassword === '') return false;

    // Check passwords match
    if (showPassword && showPwConfirm && password !== confirmPassword) {
      return false;
    }

    // TODO - add email validation
    // TODO - show error on frontend
    // Checks passed!
    return true;
  };

  render() {
    const { name, email, password, confirmPassword } = this.state.formData;
    const { showName, showEmail, showPassword, showPwConfirm } = this.props;

    return (
      <form className={styles.form}>
        {showName && (
          <input
            onChange={this.onUpdateState}
            value={name}
            placeholder="Name"
            type="text"
            name="name"
            id="name"
          />
        )}

        {showEmail && (
          <input
            onChange={this.onUpdateState}
            value={email}
            placeholder="Email"
            type="text"
            name="email"
            id="email"
          />
        )}

        {showPassword && (
          <input
            onChange={this.onUpdateState}
            value={password}
            placeholder="Password"
            type="password"
            name="password"
            id="password"
          />
        )}

        {showPwConfirm && (
          <input
            onChange={this.onUpdateState}
            value={confirmPassword}
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
          />
        )}

        <button
          className={styles.button}
          onClick={event => this.onSubmit(event, this.state.formData)}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default CustomForm;

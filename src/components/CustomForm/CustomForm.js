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

  onSubmit = async (event, formData) => {
    event.preventDefault();
    this.props.onSubmitAction(formData);
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

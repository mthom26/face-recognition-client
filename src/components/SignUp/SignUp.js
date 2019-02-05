import React, { Component } from 'react';

const initialFormData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};

class SignUp extends Component {
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

  onSubmit = async event => {
    event.preventDefault();
    console.log(this.state.formData);
  };

  render() {
    const { name, email, password, confirmPassword } = this.state.formData;

    return (
      <div>
        <h2>Sign Up</h2>
        <form>
          <input
            onChange={this.onUpdateState}
            value={name}
            placeholder="Name"
            type="text"
            name="name"
            id="name"
          />

          <input
            onChange={this.onUpdateState}
            value={email}
            placeholder="Email"
            type="text"
            name="email"
            id="email"
          />

          <input
            onChange={this.onUpdateState}
            value={password}
            placeholder="Password"
            type="password"
            name="password"
            id="password"
          />

          <input
            onChange={this.onUpdateState}
            value={confirmPassword}
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
          />

          <button onClick={this.onSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default SignUp;

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
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/signup`;

      const result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(this.state.formData),
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
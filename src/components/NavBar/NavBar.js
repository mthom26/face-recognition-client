import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <div>
        <h2>Nav Bar</h2>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    );
  }
}

export default NavBar;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './NavBar.module.css';

class NavBar extends Component {
  render() {
    return (
      <div className={styles.navContainer}>
        <div>Logo</div>
        <nav className={styles.nav}>
          <Link className={styles.navLink} to="/login">
            Login
          </Link>
          <Link className={styles.navLink} to="/signup">
            Sign Up
          </Link>
        </nav>
        <div className={styles.bottom} />
      </div>
    );
  }
}

export default NavBar;

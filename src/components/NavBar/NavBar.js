import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavBar.module.css';

class NavBar extends Component {
  render() {
    return (
      <div className={styles.navContainer}>
        <div>Logo</div>
        <nav className={styles.nav}>
          <NavLink
            activeClassName={styles.activeNavLink}
            className={styles.navLink}
            to="/upload"
          >
            Upload
          </NavLink>
          <NavLink
            activeClassName={styles.activeNavLink}
            className={styles.navLink}
            to="/login"
          >
            Login
          </NavLink>
          <NavLink
            activeClassName={styles.activeNavLink}
            className={styles.navLink}
            to="/signup"
          >
            Sign Up
          </NavLink>
          <NavLink
            activeClassName={styles.activeNavLink}
            className={styles.navLink}
            to="/profile"
          >
            Profile
          </NavLink>
        </nav>
        <div className={styles.bottom} />
      </div>
    );
  }
}

export default NavBar;

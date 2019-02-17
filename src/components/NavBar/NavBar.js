import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavBar.module.css';

const NavBar = ({ loggedIn }) => {
  return (
    <div className={styles.navContainer}>
      <div>Logo</div>
      <nav className={styles.nav}>
        {!loggedIn && (
          <Fragment>
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
          </Fragment>
        )}
        {loggedIn && (
          <Fragment>
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
              to="/profile"
            >
              Profile
            </NavLink>
          </Fragment>
        )}
      </nav>
      <div className={styles.bottom} />
    </div>
  );
};

export default NavBar;

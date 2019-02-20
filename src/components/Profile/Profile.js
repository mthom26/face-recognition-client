import React from 'react';

import styles from './Profile.module.css';

const Profile = ({ user }) => {
  return (
    <div className={styles.container}>
      <h2>Profile</h2>
      <span>{user.name}</span>
      <span>{user.email}</span>
      <span>{user.dateLastLogin}</span>
      <span>{user.dateJoined}</span>
      <span>{user.imageSubmissions}</span>
    </div>
  );
};

export default Profile;

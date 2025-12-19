import React from 'react';
import styles from './Topbar.module.css';

const Topbar = () => (
  <div className={styles.topbar}>
    <div className={styles.left}>
      <span>+971 58 201 2073</span>
      <span className={styles.separator}>|</span>
      <span>sales@saamcabins.com</span>
    </div>
    <div className={styles.right}>
      <span>Saturday - Thursday: 9:00 - 19:00 / Closed on Weekends</span>
    </div>
  </div>
);

export default Topbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserProfileComponent from '../../home/UserProfileComponent';
import Logo from './Logo';
import Navbar from '../navbar/index';
import styles from './Header.module.css';

function Header() {
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.bg}>
      <div className={styles.header} id="home">
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>
        <Navbar toggleModal={toggleModal} />
      </div>
      {open && <UserProfileComponent toggleModal={toggleModal} />}
    </div>
  );
}

export default Header;

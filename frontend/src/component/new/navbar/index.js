import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import { faBars, faMoon, faSun, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserDetail, handleTheme } from '../../../redux/auth/slice';
import { getAllProfileDetail } from '../../../redux/profile/slice';
import { getUserProfileAsync } from '../../../redux/profile';
import styles from './Navbar.module.css';

const Navbar = ({ toggleModal }) => {
  const dispatch = useDispatch();
  const { theme, token, user } = useSelector(getAllUserDetail);
  const { profile } = useSelector(getAllProfileDetail);
  const [mobile, setMobile] = useState(false);

  const isDarkMode = theme === 'dark';

  useEffect(() => {
    if (user && token !== null) {
      dispatch(getUserProfileAsync({ id: user?.id }));
    }
  }, [dispatch, user, token]);

  const toggleScroll = (enableScroll) => {
    const body = document.body;
    const html = document.documentElement;
    body.style.overflow = html.style.overflow = enableScroll ? 'auto' : 'hidden';
  };

  toggleScroll(!mobile);

  const toggleTheme = () => {
    dispatch(handleTheme());
  };

  return (
    <>
      <div className={styles.navbar}>
        <nav className={mobile ? styles.navListMobile : styles.navList}>
          <ScrollLink
            to="home"
            href="#"
            rel="nofollow"
            spy={true}
            smooth={true}
            offset={-100}
            duration={250}
            className={styles.navItem}
            onClick={() => mobile && setMobile(!mobile)}>
            Home
          </ScrollLink>
          <ScrollLink
            to="featured"
            href="#"
            rel="nofollow"
            spy={true}
            smooth={true}
            offset={-50}
            duration={250}
            className={styles.navItem}
            onClick={() => mobile && setMobile(!mobile)}>
            Featured
          </ScrollLink>
          <ScrollLink
            to="tags"
            href="#"
            rel="nofollow"
            spy={true}
            smooth={true}
            offset={-50}
            duration={250}
            className={styles.navItem}
            onClick={() => mobile && setMobile(!mobile)}>
            Category
          </ScrollLink>
          <ScrollLink
            to="articles"
            href="#"
            rel="nofollow"
            spy={true}
            smooth={true}
            offset={-50}
            duration={250}
            className={styles.navItem}
            onClick={() => mobile && setMobile(!mobile)}>
            Blogs
          </ScrollLink>
          <ScrollLink
            to="contact"
            href="#"
            rel="nofollow"
            spy={true}
            smooth={true}
            offset={-100}
            duration={250}
            className={styles.navItem}
            onClick={() => mobile && setMobile(!mobile)}>
            Contact
          </ScrollLink>
          {mobile && (
            <Link
              to="signin"
              href="#"
              rel="nofollow"
              onClick={() => mobile && setMobile(!mobile)}
              className={styles.signInMobile}>
              Sign In
            </Link>
          )}
        </nav>
        <div className={styles.navbarActions}>
          <button
            className={styles.toggleButton}
            aria-label="Toggle between dark and light mode"
            onClick={toggleTheme}>
            {isDarkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
          </button>
          <Link to="/login" rel="nofollow" className={styles.signInLink}>
            Sign In
          </Link>
          {token && (
            <div onClick={toggleModal} className="flex cursor-pointer items-center -space-x-4">
              <img
                alt="user 1"
                src={profile?.img}
                className="relative inline-block h-12 w-12 rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10"
              />
            </div>
          )}
        </div>
        <button
          className={styles.mobileIcon}
          onClick={() => setMobile(!mobile)}
          aria-label={mobile ? 'Close mobile menu' : 'Open mobile menu'}>
          {mobile ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faXmark} />}
        </button>
      </div>
    </>
  );
};

export default Navbar;

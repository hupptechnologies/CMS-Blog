import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './FooterBottom.module.css';

const FooterBottom = () => {
  const year = new Date().getFullYear();

  return (
    <div className={styles.bg}>
      <span className={styles.hr} />
      <Container className={styles.container}>
        <span className={styles.logoAndCpr}>BloggErly &copy; {year}. All rights reserved.</span>
        <SocialIcons />
      </Container>
    </div>
  );
};

export default FooterBottom;

export const SocialIcons = () => {
  return (
    <div className={styles.socialIcons}>
      <a
        href="https://www.facebook.com"
        className={styles.socialLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="facebook">
        <i className="fa-brands fa-facebook"></i>
      </a>
      <a
        href="https://www.twitter.com"
        className={styles.socialLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X aka twitter">
        <i className="fa-brands fa-twitter"></i>
      </a>
      <a
        href="https://www.instagram.com"
        className={styles.socialLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram">
        <i className="fa-brands fa-instagram"></i>
      </a>
      <a
        href="https://www.linkedin.com/in/abdelrahmmaan/"
        className={styles.socialLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="linkedin of the author">
        <i className="fa-brands fa-linkedin"></i>
      </a>
      <a
        href="https://www.github.com"
        className={styles.socialLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="github">
        <i className="fa-brands fa-github"></i>
      </a>
    </div>
  );
};

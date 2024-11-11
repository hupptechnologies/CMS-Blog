import React, { useState, useEffect } from 'react';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ArrowToTop.module.css';

function ArrowToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const outerCircleStyles = {
    position: 'fixed',
    right: '7%',
    bottom: '7%',
    width: '46px',
    height: '50px',
    padding: '14px',
    background: `conic-gradient(var(--red-color) ${progress}%, white ${progress}%)`,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: '0.6s',
    zIndex: '2'
  };

  const handleScroll = () => {
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop;
    const newProgress = (scrollTop / height) * 100;
    setProgress(newProgress);

    if (scrollTop > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div
        onClick={scrollToTop}
        className={visible ? styles.outerCircle : styles.notVisible}
        style={visible ? outerCircleStyles : null}
      >
        <button className={styles.arrowToTopStyles} aria-label="Arrow To Top">
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </div>
    </>
  );
}

export default ArrowToTop;

import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import Logo from '../header/Logo';
import styles from './FooterTop.module.css';

const FooterTop = () => {
    return (
        <div className={styles.bg} id='contact'>
            <Container className={styles.container}>
                <div className={styles.logoFooter}>
                    <Link to="/" className={styles.logo}>
                        <Logo />
                    </Link>
                </div>
                <Link to='/contactus' className={styles.contactUsbtn}>
                    Contact Us <FontAwesomeIcon icon={faArrowRightLong} />
                </Link>
            </Container>
        </div>
    );
};

export default FooterTop;
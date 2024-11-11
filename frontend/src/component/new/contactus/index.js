import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Logo from '../header/Logo';
import { SocialIcons } from '../footer/FooterBottom';
import styles from './contact.module.css';

const ContactUs = () => {

    const handleLogin = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <div className={styles.bg}>
                <Container className={styles.container}>
                    <div className={styles.left}>
                        <Link to="/" className={styles.logo}>
                            <Logo />
                        </Link>
                        <div className={styles.formContent}>
                            <h1 className={styles.heading}>
                                Contact Us now!
                            </h1>
                            <form onSubmit={handleLogin} autoComplete="off" className={styles.form}>
                                <input type="text" name="name" placeholder="Your name" required />
                                <input type="email" name="email" placeholder="Your email" />
                                <input type="email" name="email" placeholder="Subject" />
                                <textarea name="message" placeholder="Your message" />
                                <button type="submit" disabled>Send Message</button>
                            </form>
                        </div>
                        <SocialIcons />
                    </div>
                    <div className={styles.right}>
                        <img src={'https://quirvibe.vercel.app/assets/signIn-7W_2_-ff.webp'} className={styles.sinInImage} loading="lazy" />
                    </div>
                </Container>
            </div>
        </>
    );
};

export default ContactUs;

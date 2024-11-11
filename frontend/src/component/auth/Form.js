import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Logo from '../new/header/Logo';
import { SocialIcons } from '../new/footer/FooterBottom';
import { useDispatch } from 'react-redux';
import { createNewUserAsync, loginExistingUserAsync } from '../../redux/auth';
import styles from '../new/contactus/contact.module.css';

const FormComponent = ({ title, pathObj, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 0) {
      dispatch(createNewUserAsync({ data: formData, callback: handleCallback }));
    } else if (type === 1) {
      dispatch(loginExistingUserAsync({ data: formData, callback: handleCallback }));
    }
  };

  const handleCallback = (success, role) => {
    if (success) {
      setFormData({
        email: '',
        username: '',
        password: ''
      });
      navigate(
        type === 0 ? '/login' : role === 'admin' || role === 'moderator' ? '/dashboard' : '/'
      );
    }
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
              <h1 className={styles.heading}>{title}</h1>
              <form className={styles.form} onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {pathObj?.path === '/login' && (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                )}
                <input
                  type="password"
                  placeholder="*****"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button type="submit">{pathObj?.path === '/login' ? 'Sign up' : 'Log in'}</button>
              </form>
            </div>
            <p style={{ color: 'var(--color)', cursor: 'pointer' }}>
              {pathObj?.path !== '/login' ? 'Dont have an account yet? ' : 'Already have an account? '}
              <Link className={styles.signupBtn} to={pathObj?.path}>
                {pathObj?.path !== '/login' ? 'Sign up' : 'Log in'}
              </Link>
            </p>
            <SocialIcons />
          </div>
          <div className={styles.right}>
            <img
              src={'https://quirvibe.vercel.app/assets/signIn-7W_2_-ff.webp'}
              className={styles.sinInImage}
              loading="lazy"
            />
          </div>
        </Container>
      </div>
    </>
  );
};

export default FormComponent;

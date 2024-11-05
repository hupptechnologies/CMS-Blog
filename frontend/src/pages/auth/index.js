import React from 'react';
import FormComponent from '../../component/auth/Form';
import NavbarComponent from '../../component/home/Navbar';
import { styles } from '../../styles';

const AuthPage = ({ type }) => {
  const pathObj = {
    name: type === 0 ? 'Log in' : 'Sign in',
    path: type === 0 ? '/login' : '/signin'
  };

  return (
    <>
      <NavbarComponent />
      <div
        className={`flex flex-wrap min-h-screen w-full content-center justify-center bg-${styles.main}-200 py-10`}
      >
        <div className="flex shadow-md">
          <div
            className={`flex flex-wrap content-center justify-center rounded-l-md bg-${styles.primary}`}
            style={{ width: '24rem', height: '32rem' }}
          >
            <FormComponent
              title={type === 0 ? 'Signup page' : 'Login page'}
              pathObj={pathObj}
              type={type}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;

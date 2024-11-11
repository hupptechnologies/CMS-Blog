import React from 'react';
import FormComponent from '../../component/auth/Form';

const AuthPage = ({ type }) => {
  const pathObj = {
    name: type === 0 ? 'Log in' : 'Sign in',
    path: type === 0 ? '/login' : '/signin'
  };

  return (
    <>
      <FormComponent
        title={type === 0 ? 'Create Account!' : 'Welcome back!'}
        pathObj={pathObj}
        type={type}
      />
    </>
  );
};

export default AuthPage;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createNewUserAsync, loginExistingUserAsync } from '../../redux/auth';

const FormComponent = ({ title, content, pathObj, type }) => {
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
      <div className="w-72">
        <h1 className="text-xl font-semibold">{title}</h1>
        <small className="text-gray-400">{content}</small>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="mb-2 block text-xs font-semibold">User name</label>
            <input
              type="text"
              placeholder="Enter your name"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500"
            />
          </div>
          {pathObj?.path === '/login' && (
            <div className="mb-3">
              <label className="mb-2 block text-xs font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500"
              />
            </div>
          )}
          <div className="mb-3">
            <label className="mb-2 block text-xs font-semibold">Password</label>
            <input
              type="password"
              placeholder="*****"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500"
            />
          </div>
          <div className="mb-3 flex flex-wrap content-center">
            <input id="remember" type="checkbox" className="mr-1 checked:bg-gray-700" />
            <label htmlFor="remember" className="mr-auto text-xs font-semibold">
              Remember for 30 days
            </label>
            <Link to="" className="text-xs font-semibold text-gray-700">
              Forgot password?
            </Link>
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="mb-1.5 block w-full text-center text-white bg-gray-700 hover:bg-gray-900 px-2 py-1.5 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
        <div className="text-center">
          <span className="text-xs text-gray-400 font-semibold">Don&apos;t have account?</span>
          <Link to={pathObj?.path} className="text-xs font-semibold text-gray-700">
            {pathObj?.name}
          </Link>
        </div>
      </div>
    </>
  );
};

export default FormComponent;

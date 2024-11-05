import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { likeCurrentBlogAsync } from '../redux/blog';
import '../button.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

const LikeButtonComponent = ({ className = '', iconClassName = 'fa fa-heart', data }) => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    if (isLoading) return;
    if (isActive) {
      setIsActive(false);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsActive(true);
      }, 500);
      dispatch(likeCurrentBlogAsync(data));
    }
  };

  return (
    <button
      className={`button ${className} ${isActive ? 'is-active' : ''} ${
        isLoading ? 'is-loading' : ''
      }`}
      onClick={handleClick}
    >
      <i className={iconClassName}></i>
    </button>
  );
};

export default LikeButtonComponent;

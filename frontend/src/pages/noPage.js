import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/noPage.css';

const NoPage = () => {
  return (
    <>
      <div className="no-page">
        <div className="container">
          <div className="gif">
            <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
          </div>
          <div className="content">
            <h1 className="main-heading">This page is gone.</h1>
            <p>...maybe the page you&apos;re looking for is not found or never existed.</p>
            <Link to="/login">
              <button>
                Back to home <i className="far fa-hand-point-right"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoPage;

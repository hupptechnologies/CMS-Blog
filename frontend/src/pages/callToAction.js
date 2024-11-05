import React from 'react';
import { Link } from 'react-router-dom';
import { showInfoNotification } from './notification';
import { APPLE_SVG, PLAYSTORE_SVG } from '../assets/icon/svg';

const CallToActionComponent = () => {
  const handleClick = (platform) => {
    let message = '';
    switch (platform) {
      case 'apple':
        message = 'The Mac App Store option is currently not available. Stay tuned for updates!';
        break;
      case 'playstore':
        message = 'The Google Play option is currently not available. Stay tuned for updates!';
        break;
      default:
        message = 'This option is currently not available. Stay tuned for updates!';
        break;
    }
    showInfoNotification(message);
  };
  return (
    <div
      style={{ right: '15px', bottom: '1.5rem' }}
      className="fixed items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse"
    >
      <Link
        onClick={() => handleClick('apple')}
        className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
      >
        {APPLE_SVG}
        <div className="text-left rtl:text-right">
          <div className="mb-1 text-xs">Download on the</div>
          <div className="-mt-1 font-sans text-sm font-semibold">Mac App Store</div>
        </div>
      </Link>
      <Link
        onClick={() => handleClick('playstore')}
        className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
      >
        {PLAYSTORE_SVG}
        <div className="text-left rtl:text-right">
          <div className="mb-1 text-xs">Get in on</div>
          <div className="-mt-1 font-sans text-sm font-semibold">Google Play</div>
        </div>
      </Link>
    </div>
  );
};

export default CallToActionComponent;

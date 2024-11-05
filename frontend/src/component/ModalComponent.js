import React from 'react';

const ModalComponent = ({ open, handleClose, data }) => {
  return (
    <div className="relative flex justify-center items-center">
      {open && (
        <div id="menu" className="w-full h-full bg-gray-900 bg-opacity-80 top-0 fixed sticky-0">
          <div className="2xl:container 2xl:mx-auto py-48 px-4 md:px-28 flex justify-center items-center">
            <div className="w-96 md:w-auto dark:bg-gray-800 relative flex flex-col justify-center items-center bg-white py-16 px-4 md:px-24 xl:py-24 xl:px-36">
              <div role="banner">
                <img src={data?.img} className="h-[83px] rounded-lg" alt="" />
              </div>
              {data?.name && (
                <div className="mt-12">
                  <h1
                    role="main"
                    className="text-3xl dark:text-white lg:text-2xl font-semibold leading-7 lg:leading-9 text-center text-gray-800"
                  >
                    {data.name}
                  </h1>
                </div>
              )}
              {data?.title && (
                <div className="mt">
                  <p className="mt-6 sm:w-80 text-base dark:text-white leading-7 text-center text-gray-800">
                    {data.title}
                  </p>
                </div>
              )}
              <button
                onClick={handleClose}
                type="button"
                className="w-full dark:text-gray-800 dark:hover:bg-gray-100 dark:bg-white sm:w-auto mt-14 text-base leading-4 text-center text-white py-6 px-16 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-gray-800 hover:bg-black"
              >
                Close
              </button>
              <button
                onClick={handleClose}
                className="text-gray-800 dark:text-gray-400 absolute top-8 right-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                type="button"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalComponent;

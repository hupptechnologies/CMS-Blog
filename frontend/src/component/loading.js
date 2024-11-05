import React from 'react';

export const LoadingComponent = () => {
  const numberOfLines = 11;

  return (
    <div
      role="status"
      className="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
    >
      {Array.from({ length: numberOfLines }).map((_, index) => (
        <div key={index} className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const ChartLoading = () => {
  return (
    <div
      style={{ maxWidth: '70rem', textAlign: '-webkit-center' }}
      role="status"
      className="p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700 mt-10"
    >
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
      <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      <div className="flex items-baseline mt-4">
        <div className="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-72 ms-6 dark:bg-gray-700"></div>
        <div className="w-full bg-gray-200 rounded-t-lg h-80 ms-6 dark:bg-gray-700"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const StatisticsCardLoading = () => {
  const numberOfLines = 3;
  return (
    <>
      <div className="flex" style={{ gap: '5rem' }}>
        {Array.from({ length: numberOfLines }).map((_, index) => (
          <div
            key={index}
            role="status"
            className="max-w-md p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
          >
            <div className="flex items-center mt-4">
              <svg
                className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
              <div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            </div>
          </div>
        ))}
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

export const BlogPostLoading = () => {
  const numberOfLines = 4;
  return (
    <div className="flex flex-wrap gap-4 m-10">
      {Array.from({ length: numberOfLines }).map((_, index) => (
        <div key={index} className="w-full" style={{ width: '24%' }}>
          <div className="max-w-sm rounded overflow-hidden shadow-lg animate-pulse">
            <div className="h-48 bg-gray-300"></div>
            <div className="px-6 py-4">
              <div className="h-6 bg-gray-300 mb-2"></div>
              <div className="h-4 bg-gray-300 w-2/3"></div>
            </div>
            <div className="px-6 pt-4 pb-2">
              <div className="h-4 bg-gray-300 w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-300 w-1/2"></div>
            </div>
            <div className="px-6 pt-4 pb-2">
              <div className="h-4 bg-gray-300 w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-300 w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ActivityLoading = () => {
  const numberOfLines = 5;
  return (
    <>
      {Array.from({ length: numberOfLines }).map((_, index) => (
        <div key={index} role="status" className="flex max-w-sm animate-pulse m-4">
          <div className="flex-shrink-0">
            <span
              style={{ width: '100px', height: '83px' }}
              className="flex justify-center items-center bg-gray-300 rounded-full"
            ></span>
          </div>
          <div className="ml-4 mt-2 w-full">
            <h3 className="h-3 bg-gray-300 rounded-full  w-[60rem] mb-4"></h3>
            <p className="h-2 bg-gray-300 rounded-full w-[62rem] mb-2.5"></p>
            <p className="h-2 bg-gray-300 rounded-full w-[62rem] mb-2.5"></p>
          </div>
        </div>
      ))}
    </>
  );
};

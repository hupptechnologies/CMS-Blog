import React from 'react';

const PaginationComponent = ({
  translations,
  handlePageChange,
  currentPage,
  total,
  totalPages,
  limit = 10
}) => {
  return (
    <div className="inline-flex mt-2 xs:mt-0">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className={`inline-flex items-center m-4 px-4 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white ${currentPage === 1 ? 'cursor-not-allowed bg-gray-400' : 'bg-gray-900 hover:bg-gray-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
      >
        <svg
          className="w-3.5 h-3.5 me-2 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 5H1m0 0 4 4M1 5l4-4"
          />
        </svg>
        {translations?.pagination?.prev}
      </button>
      <span className="m-4 text-sm text-gray-700 dark:text-gray-400">
        {translations?.pagination?.showing}
        <span className="font-semibold text-gray-900 dark:text-white ml-2 mr-2">{currentPage}</span>
        {translations?.pagination?.to}
        <span className="font-semibold text-gray-900 dark:text-white ml-2 mr-2">{limit}</span>
        {translations?.pagination?.of}
        <span className="font-semibold text-gray-900 dark:text-white ml-2 mr-2">{total}</span>
        {translations?.pagination?.entries}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className={`inline-flex items-center m-4 px-4 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white ${currentPage === totalPages ? 'cursor-not-allowed bg-gray-400' : 'bg-gray-900 hover:bg-gray-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
      >
        {translations?.pagination?.next}
        <svg
          className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </div>
  );
};

export default PaginationComponent;

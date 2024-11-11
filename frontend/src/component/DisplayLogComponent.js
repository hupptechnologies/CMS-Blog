import React from 'react';
import JsonView from 'react18-json-view';
import { errorStatus } from '../utils/common';
import 'react18-json-view/src/style.css';

const DisplayLogComponent = ({
  translations,
  obj,
  setDisplayObj,
  accessControl = false,
  handleEdit
}) => {
  const handleBack = () => {
    setDisplayObj({});
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full px-10 py-8 bg-white rounded-lg shadow-xl">
        <button
          onClick={handleBack}
          className='inline-flex items-center m-4 px-4 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
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
          {accessControl ? 'Back to' : translations?.common?.back}
        </button>
        <div className="flex items-center justify-between p-5">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {accessControl ? 'Access details' : translations?.common?.log}{' '}
            {translations?.common?.details}
          </h3>
          <p
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${errorStatus(obj?.status)?.bg} ${errorStatus(obj?.status)?.text}`}
          >
            {obj?.status}
          </p>
        </div>
        <div className="p-10">
          <JsonView
            src={obj}
            theme="default"
            editable={accessControl}
            onChange={accessControl ? handleEdit : ''}
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayLogComponent;

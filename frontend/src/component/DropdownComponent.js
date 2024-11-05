import React from 'react';

const DropdownComponent = ({
  handleSelectChange,
  selectedOption,
  data = [],
  total = 0,
  updateDrop = false
}) => {
  return (
    <form className="max-w-sm">
      <select
        style={{ width: '12rem' }}
        value={selectedOption}
        onChange={(e) => handleSelectChange(e.target.value)}
        id="small"
        className="block w-full p-2 cursor-pointer text-sm text-white bg-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {updateDrop
          ? data.map((activity, index) => (
              <option key={index} value={activity?.type}>
                {activity?.type}
              </option>
            ))
          : ['All', ...data.map((activity) => activity.type)].map((ctype, index) => (
              <option key={index} value={ctype}>
                {ctype} ({data.find((activity) => activity.type === ctype)?.count || total})
              </option>
            ))}
      </select>
    </form>
  );
};

export default DropdownComponent;

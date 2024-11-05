import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DateRangePicker } from 'react-date-range';
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DatePickerComponent = ({ handleChangeDate }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (ranges) => {
    handleChangeDate(ranges.selection);
    setState([ranges.selection]);
  };

  const handleReset = () => {
    handleChangeDate({});
    setIsOpen(!isOpen);
  };

  return (
    <div className="date-picker-custom relative cursor-pointer" data-tooltip-id="date-tooltip">
      <div className="cntr" onClick={handleToggle}>
        <FontAwesomeIcon icon={faCalendarWeek} />
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <DateRangePicker
              onChange={handleSelect}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={state}
              direction="horizontal"
            />
            <button className="m-4 bg-gray-500 text-white px-4 py-2" onClick={handleToggle}>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
            <Link
              onClick={handleReset}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
            >
              Reset
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePickerComponent;

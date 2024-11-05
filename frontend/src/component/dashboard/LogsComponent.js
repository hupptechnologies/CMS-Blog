import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DropdownComponent from '../DropdownComponent';
import PaginationComponent from '../PaginationComponent';
import DisplayLogComponent from '../DisplayLogComponent';
import DatePickerComponent from '../DatePickerComponent';
import { LoadingComponent } from '../loading';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAPIsLogsAsync } from '../../redux/logs';
import { getAllAPILogsDetail } from '../../redux/logs/slice';
import { getAllTranslateDetail } from '../../redux/translation/slice';
import { getAllUserDetail } from '../../redux/auth/slice';
import { formattedDateForActivity, errorStatus } from '../../utils/common';
import { hasAccess } from '../../utils/common';

const LogsComponent = () => {
  const dispatch = useDispatch();
  const {
    APIlogs,
    pagination: { totalPages, totalLogs },
    logStatus,
    totalCount,
    loading
  } = useSelector(getAllAPILogsDetail);
  const { translations } = useSelector(getAllTranslateDetail);
  const {
    user: { access }
  } = useSelector(getAllUserDetail);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState('All');
  const [displayObj, setDisplayObj] = useState({});
  const [date, setDate] = useState({});

  useEffect(() => {
    dispatch(
      fetchAPIsLogsAsync({
        page: currentPage,
        limit: 10,
        data: {
          type: selectedOption === 'All' ? '' : selectedOption,
          startDate: date?.startDate?.toISOString() || '',
          endDate: date?.endDate?.toISOString() || ''
        }
      })
    );
  }, [dispatch, currentPage, selectedOption, date]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleSelectChange = (ctype) => {
    setSelectedOption(ctype);
    setCurrentPage(1);
  };

  const handleChangeDate = (cdate) => {
    setDate(cdate);
  };

  const handleAccess = (actionName) => {
    return hasAccess({ pageNumber: 5, access, actionName });
  };

  return (
    <>
      {handleAccess('date') && (
        <div className={`${Object.entries(displayObj).length === 0 ? '' : 'hidden'} mb-5 flex`}>
          <DatePickerComponent handleChangeDate={handleChangeDate} />
        </div>
      )}
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          {Object.entries(displayObj).length === 0 && (
            <div className="bg-gray-900 px-4 py-5 border-b rounded-t sm:px-6 flex justify-between">
              <h3 className="text-lg leading-6 font-medium text-white">
                {translations?.common?.APIlog}
              </h3>
              {handleAccess('select') && (
                <DropdownComponent
                  data={logStatus}
                  selectedOption={selectedOption}
                  handleSelectChange={handleSelectChange}
                  total={totalCount}
                />
              )}
            </div>
          )}
          {Object.entries(displayObj).length === 0 && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {APIlogs.length > 0 &&
                  APIlogs.map((log, index) => (
                    <li key={index}>
                      <Link
                        onClick={
                          handleAccess('view') ? () => setDisplayObj(log?.additional_info) : ''
                        }
                        className="block hover:bg-gray-50"
                      >
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-500 text-gray-700 truncate">{log.message}</p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${errorStatus(log?.additional_info?.status)?.bg} ${errorStatus(log?.additional_info?.status)?.text}`}
                              >
                                <strong>{log?.additional_info?.status}</strong>
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm font-light text-gray-500">
                                <time dateTime="2020-01-07">
                                  {formattedDateForActivity(log?.created_at)}
                                </time>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
              {handleAccess('pagination') && (
                <PaginationComponent
                  translations={translations}
                  handlePageChange={handlePageChange}
                  total={totalLogs}
                  totalPages={totalPages}
                  currentPage={currentPage}
                />
              )}
            </div>
          )}
          {handleAccess('view') && Object.entries(displayObj).length > 0 && (
            <DisplayLogComponent
              translations={translations}
              obj={displayObj}
              setDisplayObj={setDisplayObj}
            />
          )}
        </>
      )}
    </>
  );
};

export default LogsComponent;

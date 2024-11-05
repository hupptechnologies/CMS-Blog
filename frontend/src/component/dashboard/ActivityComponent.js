import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DropdownComponent from '../DropdownComponent';
import PaginationComponent from '../PaginationComponent';
import DatePickerComponent from '../DatePickerComponent';
import UpdateModalComponent from '../UpdateModalComponent';
import { ActivityLoading } from '../loading';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDashboardDetail, handleViewDetail } from '../../redux/dashboard/slice';
import {
  deleteUsersActivityAsync,
  getUsersActivitiesAsync,
  getUsersActivityTypesAsync
} from '../../redux/dashboard';
import { getAllTranslateDetail } from '../../redux/translation/slice';
import { getAllUserDetail } from '../../redux/auth/slice';
import { formattedDateForActivity, getActivityBackgroundColor } from '../../utils/common';
import { hasAccess } from '../../utils/common';
import { DELETE_SVG } from '../../assets/icon/svg';

const ActivityComponent = () => {
  const dispatch = useDispatch();
  const { activities, activityTypes, totalTypeCount, totalPages, totalItems, activitiesLoading } =
    useSelector(getAllDashboardDetail);
  const {
    user: { access }
  } = useSelector(getAllUserDetail);
  const { translations } = useSelector(getAllTranslateDetail);
  const [selectedOption, setSelectedOption] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [callAPI, setCallAPI] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [info, setInfo] = useState({
    color: '',
    type: '',
    id: ''
  });
  const [date, setDate] = useState({});

  useEffect(() => {
    dispatch(
      getUsersActivityTypesAsync({
        startDate: date?.startDate?.toISOString() || '',
        endDate: date?.endDate?.toISOString() || ''
      })
    );
  }, [dispatch, date, callAPI]);

  useEffect(() => {
    dispatch(
      getUsersActivitiesAsync({
        data: {
          type: selectedOption === 'All' ? '' : selectedOption,
          startDate: date?.startDate?.toISOString() || '',
          endDate: date?.endDate?.toISOString() || ''
        },
        page: currentPage,
        limit: 5
      })
    );
  }, [dispatch, currentPage, selectedOption, date, callAPI]);

  const handleSelectChange = (ctype) => {
    setSelectedOption(ctype);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleChangeDate = (cdate) => {
    setDate(cdate);
  };

  const handleConfirm = () => {
    dispatch(
      deleteUsersActivityAsync({
        activityId: info?.id,
        callback: handleCallback
      })
    );
  };

  const handleCallback = (success) => {
    if (success) {
      setInfo({
        color: '',
        id: '',
        type: ''
      });
      setCallAPI(!callAPI);
      setShowModal(!showModal);
    }
  };

  const handleDelete = (row) => {
    setInfo({
      color: 'red-700',
      id: row?.id,
      type: 'deleted'
    });
    setShowModal(!showModal);
  };

  const handleAccess = (actionName) => {
    return hasAccess({ pageNumber: 4, access, actionName });
  };

  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="relative flex max-w-[1200px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
          <div className="!z-5 relative flex h-full w-full flex-col rounded-[20px] bg-white bg-clip-border p-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none">
            <div className="mb-8 w-full">
              <div className="flex justify-between">
                <div className="flex" style={{ gap: '1rem' }}>
                  <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                    {translations?.common?.all} {translations?.common?.activities}
                  </h4>
                  {handleAccess('date') && (
                    <DatePickerComponent handleChangeDate={handleChangeDate} />
                  )}
                </div>
                {handleAccess('select') && (
                  <div className="text-gray-900 dark:text-gray-100">
                    <DropdownComponent
                      data={activityTypes}
                      total={totalTypeCount}
                      handleSelectChange={handleSelectChange}
                      selectedOption={selectedOption}
                    />
                  </div>
                )}
              </div>
              <p className="mt-2 text-base text-gray-600">
                {translations?.breadcrumb?.activities?.para}
              </p>
            </div>
            {activities.length > 0 &&
              !activitiesLoading &&
              activities.map((act, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: getActivityBackgroundColor(act?.activity_type),
                    margin: '10px'
                  }}
                  className="flex w-full items-center justify-between rounded-2xl p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700"
                >
                  <div className="flex items-center">
                    <div className="">
                      <img
                        className="h-[83px] rounded-lg"
                        src={act?.Blog ? act.Blog.img : act?.User ? act.User.img : ''}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-navy-700 dark:text-white">
                        {act?.description}
                      </p>
                      {act?.blog_id && (
                        <p className="mt-2 text-sm text-gray-600">
                          Blog #{act?.blog_id}.
                          <Link
                            onClick={() =>
                              dispatch(
                                handleViewDetail({
                                  data: {
                                    name: act?.Blog?.title,
                                    img: act?.Blog?.img
                                  }
                                })
                              )
                            }
                            className="ml-1 hover:bg-white/10 hover:text-gray-500 hover:underline font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                          >
                            {translations?.common?.see} blog {translations?.common?.details}
                          </Link>
                        </p>
                      )}
                      {act?.user_id && (
                        <p className="mt-2 text-sm text-gray-600">
                          User #{act?.user_id}.
                          <Link
                            onClick={() =>
                              dispatch(
                                handleViewDetail({
                                  data: {
                                    title: act?.User?.email,
                                    name: act?.User?.username,
                                    img: act?.User?.img
                                  }
                                })
                              )
                            }
                            className="ml-1 hover:bg-white/10 hover:text-gray-500 hover:underline font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                          >
                            {translations?.common?.see} {translations?.common?.users}{' '}
                            {translations?.common?.details}
                          </Link>
                        </p>
                      )}
                      <p className="mt-2 text-sm text-gray-600">
                        {formattedDateForActivity(act.created_at)}
                      </p>
                    </div>
                  </div>
                  {handleAccess('delete') && (
                    <div
                      data-tooltip-id="delete-tooltip"
                      onClick={() => handleDelete(act)}
                      className="mr-4 flex items-center justify-center text-gray-600 dark:text-white cursor-pointer"
                    >
                      {DELETE_SVG}
                    </div>
                  )}
                </div>
              ))}
            {activitiesLoading && <ActivityLoading />}
          </div>
          {handleAccess('pagination') && (
            <PaginationComponent
              translations={translations}
              total={totalItems}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
      <UpdateModalComponent
        showModal={showModal}
        handleClose={() => setShowModal(!showModal)}
        title={`${translations?.modal?.modalTitle} ${info.type}`}
        content={translations?.modal?.modalContent}
        hightlightText={info.id}
        info={info}
        handleSubmit={handleConfirm}
      />
    </>
  );
};

export default ActivityComponent;

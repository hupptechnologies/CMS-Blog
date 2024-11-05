import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { StatisticsCardLoading } from '../loading';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersStatisticsAsync } from '../../redux/dashboard';
import { getAllDashboardDetail } from '../../redux/dashboard/slice';
import { getAllTranslateDetail } from '../../redux/translation/slice';
import { NEW_CLIENT_SVG, USER_SVG } from '../../assets/icon/svg';

const CardComponent = () => {
  const dispatch = useDispatch();
  const { statistics, statisticsLoading } = useSelector(getAllDashboardDetail);
  const { translations } = useSelector(getAllTranslateDetail);
  useEffect(() => {
    dispatch(getUsersStatisticsAsync());
  }, [dispatch]);

  return (
    <>
      {statisticsLoading ? (
        <StatisticsCardLoading />
      ) : (
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="active-user-check relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              {USER_SVG}
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                {translations?.breadcrumb?.home?.activeUsers}
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {statistics?.activeUsers}
              </h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className="text-green-500">+3%</strong>&nbsp;than last month
              </p>
            </div>
          </div>
          <div className="new-user-check relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              {NEW_CLIENT_SVG}
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                {translations?.breadcrumb?.home?.newUsers}
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {statistics?.newUsersCount}
              </h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className="text-red-500">-2%</strong>&nbsp;than yesterday
              </p>
            </div>
          </div>
          <div className="total-user-check relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                {translations?.breadcrumb?.home?.totalUsers}
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {statistics?.totalUsers}
              </h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className="text-red-500">-2%</strong>&nbsp;than yesterday
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardComponent;

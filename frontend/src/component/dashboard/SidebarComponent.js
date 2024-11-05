import React from 'react';
import { Link } from 'react-router-dom';
import {
  faTags,
  faEye,
  faClockRotateLeft,
  faUniversalAccess
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTranslateDetail } from '../../redux/translation/slice';
import { getAllUserDetail, handleLogoutUser } from '../../redux/auth/slice';
import { logoutLoggedInUserAsync } from '../../redux/auth';
import { hasAccess } from '../../utils/common';
import { HOME_SVG, POST_SVG, PROFILE_SVG, SINGOUT_SVG, USER_SVG } from '../../assets/icon/svg';

const SidebarComponent = ({ setCurrentPage, currentPage, setSearchTerm }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(getAllUserDetail);
  const { translations } = useSelector(getAllTranslateDetail);

  const handleLogout = () => {
    dispatch(handleLogoutUser());
  };

  const handleClick = (page) => {
    setSearchTerm('');
    setCurrentPage(page);
  };

  return (
    <>
      <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
        <div className="relative border-b border-white/20">
          <Link className="flex items-center gap-4 py-6 px-8">
            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
              {translations?.title}
            </h6>
          </Link>

          <button
            className="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
            type="button"
          >
            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-5 w-5 text-white"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </span>
          </button>
        </div>
        <div className="m-4">
          <ul className="mb-4 flex flex-col gap-1">
            {hasAccess({ pageNumber: 0, access: user?.access }) && (
              <li className="dashboard-page">
                <Link aria-current="page" className={currentPage === 0 ? 'active' : ''}>
                  <button
                    onClick={() => handleClick(0)}
                    className={`${currentPage === 0 ? 'bg-blue-400' : 'hover:bg-white/10'} middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white shadow-md hover:shadow-lg active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize`}
                  >
                    {HOME_SVG}
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                      {translations?.common?.dashboard}
                    </p>
                  </button>
                </Link>
              </li>
            )}
            {hasAccess({ pageNumber: 1, access: user?.access }) && (
              <li className="profile-page">
                <Link className={currentPage === 1 ? 'active' : ''}>
                  <button
                    onClick={() => handleClick(1)}
                    className={`${currentPage === 1 ? 'bg-blue-400' : 'hover:bg-white/10'} middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white shadow-md hover:shadow-lg active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize`}
                    type="button"
                  >
                    {PROFILE_SVG}
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                      {translations?.common?.profile}
                    </p>
                  </button>
                </Link>
              </li>
            )}
            {hasAccess({ pageNumber: 2, access: user?.access }) && (
              <li className="users-page">
                <Link className={currentPage === 2 ? 'active' : ''}>
                  <button
                    onClick={() => handleClick(2)}
                    className={`${currentPage === 2 ? 'bg-blue-400' : 'hover:bg-white/10'} middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white shadow-md hover:shadow-lg active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize`}
                    type="button"
                  >
                    {USER_SVG}
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                      {translations?.common?.users}
                    </p>
                  </button>
                </Link>
              </li>
            )}
            {hasAccess({ pageNumber: 3, access: user?.access }) && (
              <li className="post-page">
                <Link className={currentPage === 3 ? 'active' : ''}>
                  <button
                    onClick={() => handleClick(3)}
                    className={`${currentPage === 3 ? 'bg-blue-400' : 'hover:bg-white/10'} middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white shadow-md hover:shadow-lg active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize`}
                    type="button"
                  >
                    {POST_SVG}
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                      {translations?.common?.posts}
                    </p>
                  </button>
                </Link>
              </li>
            )}
            {hasAccess({ pageNumber: 4, access: user?.access }) && (
              <li className="activities-page">
                <Link className={currentPage === 4 ? 'active' : ''}>
                  <button
                    onClick={() => handleClick(4)}
                    className={`${currentPage === 4 ? 'bg-blue-400' : 'hover:bg-white/10'} middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white shadow-md hover:shadow-lg active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize`}
                    type="button"
                  >
                    <FontAwesomeIcon icon={faEye} className="ml-1" />
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                      {translations?.common?.activities}
                    </p>
                  </button>
                </Link>
              </li>
            )}
            {hasAccess({ pageNumber: 5, access: user?.access }) && (
              <li className="log-page">
                <Link className={currentPage === 5 ? 'active' : ''}>
                  <button
                    onClick={() => handleClick(5)}
                    className={`${currentPage === 5 ? 'bg-blue-400' : 'hover:bg-white/10'} middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white shadow-md hover:shadow-lg active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize`}
                    type="button"
                  >
                    <FontAwesomeIcon icon={faClockRotateLeft} className="ml-1" />
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                      {translations?.common?.APIlog}
                    </p>
                  </button>
                </Link>
              </li>
            )}
            {hasAccess({ pageNumber: 6, access: user?.access }) && (
              <li className="category-page">
                <Link className={currentPage === 6 ? 'active' : ''}>
                  <button
                    onClick={() => handleClick(6)}
                    className={`${currentPage === 6 ? 'bg-blue-400' : 'hover:bg-white/10'} middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white shadow-md hover:shadow-lg active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize`}
                    type="button"
                  >
                    <FontAwesomeIcon icon={faTags} className="ml-1" />
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                      {translations?.common?.categories}
                    </p>
                  </button>
                </Link>
              </li>
            )}
            {user?.role === 'moderator' && (
              <li className="category-page">
                <Link className={currentPage === 8 ? 'active' : ''}>
                  <button
                    onClick={() => handleClick(8)}
                    className={`${currentPage === 8 ? 'bg-blue-400' : 'hover:bg-white/10'} middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white shadow-md hover:shadow-lg active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize`}
                    type="button"
                  >
                    <FontAwesomeIcon icon={faUniversalAccess} className="ml-1" />
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                      Access Control
                    </p>
                  </button>
                </Link>
              </li>
            )}
          </ul>
          <ul className="mb-4 flex flex-col gap-1">
            <li className="mx-3.5 mt-4 mb-2">
              <p className="block antialiased font-sans text-sm leading-normal text-white font-black uppercase opacity-75">
                {translations?.common?.auth}
              </p>
            </li>
            <li className="signout-button">
              <Link className="">
                <button
                  onClick={() =>
                    dispatch(
                      logoutLoggedInUserAsync({
                        data: user,
                        callback: handleLogout
                      })
                    )
                  }
                  className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                  type="button"
                >
                  {SINGOUT_SVG}
                  <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                    {translations?.common?.signout}
                  </p>
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SidebarComponent;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserDetail } from '../../redux/auth/slice';
import { getUserProfileAsync } from '../../redux/profile';
import { getAllProfileDetail } from '../../redux/profile/slice';
import { styles } from '../../styles';

const NavbarComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector(getAllUserDetail);
  const { profile } = useSelector(getAllProfileDetail);

  useEffect(() => {
    if (user && token !== null) {
      dispatch(getUserProfileAsync({ id: user?.id }));
    }
  }, [dispatch, user, token]);

  return (
    <>
      <header>
        <nav className={`shadow bg-${styles.main}`}>
          <div className="flex justify-between items-center py-6 px-10 container mx-auto">
            <div>
              <h1
                onClick={() => navigate('/')}
                className={`text-2xl font-bold text-${styles.secondary} hover:cursor-pointer`}
              >
                CMS
              </h1>
            </div>
            <div className="bg-white hidden rounded-lg flex justify-around items-center">
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-300 rounded-md outline-none pl-2 ring-gray w-full mr-2 p-2"
              />
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
            </div>
            <div>
              <div className="hover:cursor-pointer sm:hidden">
                <span className="h-1 rounded-full block w-8 mb-1 bg-gray-400"></span>
                <span className="h-1 rounded-full block w-8 mb-1 bg-gray-400"></span>
                <span className="h-1 rounded-full block w-8 mb-1 bg-gray-400"></span>
              </div>
              <div className="flex items-center">
                <div className="md:flex items-center hidden space-x-4 ml-8 lg:ml-12">
                  {!token && (
                    <h1
                      onClick={() => navigate('/login')}
                      className={`text-${styles.secondary} py-2 hover:cursor-pointer hover:text-${styles.primary}`}
                    >
                      Login
                    </h1>
                  )}
                  {!token && (
                    <h1
                      onClick={() => navigate('/signin')}
                      className={`text-${styles.secondary} py-2 px-4 rounded text-${styles.secondary} bg-${styles.main}-400 hover:cursor-pointer hover:shadow-lg`}
                    >
                      Signup
                    </h1>
                  )}
                  {token && (
                    <div
                      onClick={() => navigate('/user/profile')}
                      className="flex cursor-pointer items-center -space-x-4"
                    >
                      <img
                        alt="user 1"
                        src={profile?.img}
                        className="relative inline-block h-12 w-12 rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavbarComponent;

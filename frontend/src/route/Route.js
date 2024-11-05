import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/home';
import AuthPage from '../pages/auth';
import DashboardPage from '../pages/dashboard';
import NotificationComponent from '../pages/notification';
import NoPage from '../pages/noPage';
import NavbarComponent from '../component/home/Navbar';
import BlogPostComponent from '../component/blog/BlogPost';
import UserProfileComponent from '../component/home/UserProfileComponent';
import AnyUserLogoutNotification from '../AnyUserLogoutNotification';
import WelcomeComponent from '../welcome.js';
import useAnalytics from '../useAnalytic.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserDetail } from '../redux/auth/slice';
import { getAllTranslateDetail } from '../redux/translation/slice';
import { fetchTranslationAsync, fetchTranslationTypesAsync } from '../redux/translation';

const IsAuthenticated = () => {
  const {
    token,
    user: { role }
  } = useSelector(getAllUserDetail);
  return { isAuthenticated: token !== null, role };
};

const PrivateRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, role } = IsAuthenticated();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={allowedRoles.includes('user') ? '/dashboard' : '/'} replace />;
  }
  return children;
};

const App = () => {
  useAnalytics();
  const dispatch = useDispatch();
  const { translations } = useSelector(getAllTranslateDetail);
  const { user } = useSelector(getAllUserDetail);
  useEffect(() => {
    dispatch(fetchTranslationTypesAsync({ data: { type: 'all' } }));
    dispatch(fetchTranslationAsync({ data: { language: 'en-GB' } }));
    localStorage.setItem('lan', 'en-GB');
  }, [dispatch]);
  return (
    <>
      {Object.entries(user).length > 0 &&
      !user?.has_seen_welcome_message &&
      (user?.role === 'admin' || user?.role === 'moderator') ? (
        <WelcomeComponent />
      ) : (
        <>
          <AnyUserLogoutNotification />
          <NotificationComponent />
          {translations && (
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <NavbarComponent />
                    <PrivateRoute allowedRoles={['user']}>
                      <HomePage />
                    </PrivateRoute>
                  </>
                }
              />
              <Route path="/login" element={<AuthPage type={1} />} />
              <Route path="/signin" element={<AuthPage type={0} />} />
              <Route
                path="/blog/:id"
                element={
                  <>
                    <NavbarComponent />
                    <PrivateRoute allowedRoles={['user']}>
                      <BlogPostComponent />
                    </PrivateRoute>
                  </>
                }
              />
              <Route
                path="/user/profile"
                element={
                  <>
                    <NavbarComponent />
                    <PrivateRoute allowedRoles={['user']}>
                      <UserProfileComponent />
                    </PrivateRoute>
                  </>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute allowedRoles={['admin', 'moderator']}>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NoPage />} />
            </Routes>
          )}
        </>
      )}
    </>
  );
};

const RouterContainer = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default RouterContainer;

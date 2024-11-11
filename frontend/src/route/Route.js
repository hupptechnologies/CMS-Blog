import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/home';
import AuthPage from '../pages/auth';
import DashboardPage from '../pages/dashboard';
import NotificationComponent from '../pages/notification';
import NoPage from '../pages/noPage';
import ScrollToTop from '../pages/scrollToTop.js';
import Header from '../component/new/header';
import BlogPostComponent from '../component/blog/BlogPost';
import ArrowToTop from '../component/new/arrow/index.js';
import AnyUserLogoutNotification from '../AnyUserLogoutNotification';
import WelcomeComponent from '../welcome.js';
import useAnalytics from '../useAnalytic.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserDetail } from '../redux/auth/slice';
import { getAllTranslateDetail } from '../redux/translation/slice';
import { fetchTranslationAsync, fetchTranslationTypesAsync } from '../redux/translation';
import MainFooter from '../component/new/footer/index.js';
import ContactUs from '../component/new/contactus/index.js';

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
  const { user, theme } = useSelector(getAllUserDetail);
  useEffect(() => {
    dispatch(fetchTranslationTypesAsync({ data: { type: 'all' }}));
    dispatch(fetchTranslationAsync({ data: { language: 'en-GB' }}));
    localStorage.setItem('lan', 'en-GB');
  }, [dispatch]);
  return (
    <div data-theme={theme}>
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
                    <PrivateRoute allowedRoles={['user']}>
                      <Header />
                      <HomePage />
                      <MainFooter />
                      <ArrowToTop />
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
                    <Header />
                    <PrivateRoute allowedRoles={['user']}>
                      <BlogPostComponent />
                    </PrivateRoute>
                    <MainFooter />
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
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

const RouterContainer = () => (
  <BrowserRouter>
    <App />
    <ScrollToTop />
  </BrowserRouter>
);

export default RouterContainer;

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { googleAnalyticConfigs } from './utils/configs';

const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', googleAnalyticConfigs.MEASUREMENT_ID, {
        page_path: location.pathname
      });
    }
  }, [location]);
};

export default useAnalytics;

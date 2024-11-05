import React, { useEffect } from 'react';
import Joyride from 'react-joyride';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTourStepsAsync } from '../redux/tourStep';
import { getAllTourStepDetail } from '../redux/tourStep/slice';

const OnboardingTour = ({ runTour, setRunTour }) => {
  const dispatch = useDispatch();
  const { tourStepsList } = useSelector(getAllTourStepDetail);

  useEffect(() => {
    dispatch(fetchTourStepsAsync());
  }, [dispatch]);

  return (
    <Joyride
      steps={tourStepsList}
      run={runTour}
      continuous
      showSkipButton
      callback={(data) => {
        if (data.status === 'finished' || data.status === 'skipped') {
          localStorage.removeItem('hasSeenTour');
          setRunTour(false);
        }
        if (tourStepsList[data.index]) {
          if (tourStepsList[data.index].target === '.signout-button') {
            return;
          }
          const element = document.querySelector(tourStepsList[data.index].target);
          if (element) {
            const link = element.querySelector('a button');
            if (link) {
              link.click();
            }
          }
        }
      }}
    />
  );
};

export default OnboardingTour;

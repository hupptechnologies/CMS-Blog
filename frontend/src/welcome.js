import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { handleStopWelcome } from './redux/auth/slice';
import { updateUserWelcomeMessageAsync } from './redux/auth';
import './styles/welcome.css';

const WelcomeComponent = () => {
  const dispatch = useDispatch();

  const numberOfText = 8;
  const numberOfParticles = 72;

  const textArray = ['W', 'E', 'L', 'C', 'O', 'M', 'E', '🎉'];

  const backgrounds = Array.from({ length: numberOfText }, (_, i) => (
    <div key={`background-${i}`} className={`background background${i}`}></div>
  ));

  const texts = textArray.map((text, i) => (
    <div key={`text-${i}`} className={`text text${i}`}>
      {text}
    </div>
  ));

  const frames = Array.from({ length: numberOfText }, (_, i) => (
    <div key={`frame-${i}`} className={`frame frame${i}`}></div>
  ));

  const particles = Array.from(
    { length: numberOfText * (numberOfParticles / numberOfText) },
    (_, index) => {
      const i = Math.floor(index / (numberOfParticles / numberOfText));
      const j = index % (numberOfParticles / numberOfText);
      return <div key={`particle-${i}${j}`} className={`particle particle${i}${j}`}></div>;
    }
  );

  useEffect(() => {
    setTimeout(() => {
      dispatch(updateUserWelcomeMessageAsync({ callback: handleCallback }));
    }, 8000);
  }, [dispatch]);

  const handleCallback = (success) => {
    if (success) {
      dispatch(handleStopWelcome());
    }
  };

  return (
    <div className="welcome-creation">
      {backgrounds}
      <div className="criterion">
        {texts}
        {frames}
        {particles}
      </div>
    </div>
  );
};

export default WelcomeComponent;

import React from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const NotificationComponent = () => (
  <>
    <NotificationContainer />
  </>
);

export const showSuccessNotification = (message) => {
  NotificationManager.success(message, 'Success', 3000);
};

export const showErrorNotification = (message) => {
  NotificationManager.error(message, 'Error', 3000);
};

export const showWarningNotification = (message) => {
  NotificationManager.warning(message, 'Warning', 3000);
};

export const showInfoNotification = (message) => {
  NotificationManager.info(message, 'Info', 3000);
};

export default NotificationComponent;

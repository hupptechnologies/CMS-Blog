import React from 'react';
import { Tooltip } from 'react-tooltip';

const TooltipComponent = () => {
  return (
    <div>
      <Tooltip id="setting-tooltip" content="Settings" />
      <Tooltip id="tour-tooltip" content="Start Tour" place="bottom-start" />
      <Tooltip id="date-tooltip" content="Custom Date" place="right" />
      <Tooltip id="delete-tooltip" content="Delete" />
      <Tooltip id="achive-tooltip" content="Archived" />
      <Tooltip id="publish-tooltip" content="Published" />
      <Tooltip id="schedule-tooltip" content="Scheduled" />
      <Tooltip id="edit-tooltip" content="Edit" />
      <Tooltip id="restore-tooltip" content="Restore User" />
      <Tooltip id="signout-tooltip" content="Sign Out" />
      <Tooltip id="createPost-tooltip" content="Create Post" place="top-start" />
    </div>
  );
};

export default TooltipComponent;

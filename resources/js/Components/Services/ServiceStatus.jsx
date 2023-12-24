import React from 'react';
import { Chip } from '@material-tailwind/react';

const statusColor = status => {
  if (status === 'Requires Follow Up') {
    return 'red';
  }
  if (status === 'Completed') {
    return 'teal';
  }
  if (status === 'Scheduled') {
    return 'light-blue';
  }
  if (status === 'On Hold') {
    return 'indigo';
  }
  if (status === 'Follow Up Completed') {
    return 'lime';
  }
  return 'gray';
};

function ServiceStatus({ status }) {
  return (
    <Chip
      size="md"
      color={statusColor(status)}
      value={status}
      className="rounded-full p-2 justify-center"
      variant="ghost"
    />
  );
}

export default ServiceStatus;

import React from 'react';
import { Chip } from '@material-tailwind/react';

function ServiceStatus({ status }) {
  const statusColor = status => {
    if (status === 'Requires Follow Up') {
      return 'red';
    }
    if (status === 'Completed') {
      return 'teal';
    }
    return 'gray';
  };

  return <Chip size="md" color={statusColor(status)} value={status} />;
}

export default ServiceStatus;

import React from 'react';
import TeamDetail from './TeamDetail';
import ServiceDetail from './ServiceDetail';

function ServiceDetailBody() {
  return (
    <div className="flex flex-row gap-6">
      <TeamDetail />
      <ServiceDetail />
    </div>
  );
}
export default ServiceDetailBody;

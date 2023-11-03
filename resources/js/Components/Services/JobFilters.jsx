import React, { useState } from 'react';
import { SERVICE_STAFF_FILTERS, SERVICE_STATUS_FILTERS } from '../../Helpers/constants';
import FilterDropdown from './FilterDropdown';
import ExportData from './ExportData';

const JobFilters = () => {
  const [checkedStatusFilters, setCheckedStatusFilters] = useState([]);
  const [checkedStaffFilters, setCheckedStaffFilters] = useState([]);

  const handleChecked = (name, value, checked) => {
    if (checked) {
      name === 'status'
        ? setCheckedStatusFilters([...checkedStatusFilters, value])
        : setCheckedStaffFilters([...checkedStaffFilters, value]);
    } else {
      name === 'status'
        ? setCheckedStatusFilters(checkedStatusFilters.filter(f => f !== value))
        : setCheckedStatusFilters(checkedStaffFilters.filter(f => f !== value));
    }
  };

  return (
    <div className="flex gap-4 items-end max-w-max">
      <FilterDropdown
        name={'status'}
        label={'Status'}
        data={SERVICE_STATUS_FILTERS}
        checkedData={checkedStatusFilters}
        handleChecked={handleChecked}
      />

      {/* Staff Dropdown */}
      <FilterDropdown
        name={'staff'}
        label={'Staff'}
        data={SERVICE_STAFF_FILTERS}
        checkedData={checkedStaffFilters}
        handleChecked={handleChecked}
      />
      {/* Staff Dropdown */}

      <ExportData />
    </div>
  );
};

export default JobFilters;

import React, { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import Dropdown from '../Dropdown';
import { staffFilters, statusFilters } from '../../Helpers/constants';
import './styles.css';
import ExportFilter from './ExportFilter';
import FilterDropdown from './FilterDropdown';

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
        data={statusFilters}
        checkedData={checkedStatusFilters}
        handleChecked={handleChecked}
      />

      {/* Staff Dropdown */}
      <FilterDropdown
        name={'staff'}
        label={'Staff'}
        data={staffFilters}
        checkedData={checkedStaffFilters}
        handleChecked={handleChecked}
      />
      {/* Staff Dropdown */}

      {/* Export Dropdown */}
      <Dropdown>
        <Dropdown.Trigger>
          <span className="inline-flex rounded-md">
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary focus:outline-none transition ease-in-out duration-150"
            >
              <FiDownload size={20} fontWeight={800} />
              <span className="px-2 font-bold">Export Data</span>
            </button>
          </span>
        </Dropdown.Trigger>
        <Dropdown.Content width="50">
          <ExportFilter />
        </Dropdown.Content>
      </Dropdown>
      {/* Export Dropdown */}
    </div>
  );
};

export default JobFilters;

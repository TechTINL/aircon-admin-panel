import React from 'react';
import { FiDownload } from 'react-icons/fi';
import ExportFilter from './ExportFilter';
import Dropdown from '../Dropdown';

const ExportData = () => {
  return (
    <Dropdown>
        <Dropdown.Trigger>
          <span className="inline-flex">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-xl text-white bg-primary focus:outline-none transition ease-in-out duration-150"
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
    
  );
};

export default ExportData;

import React from 'react';
import Dropdown from '../Dropdown';
import { FiDownload } from 'react-icons/fi';
import ExportFilter from '../Services/ExportFilter';
import './CalendarStyles.css';

const ExportByDateRangeDropdown = () => {
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <span className="inline-flex rounded-md">
                    <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary focus:outline-none transition ease-in-out duration-150"
                    >
                        <FiDownload
                            size={20}
                            fontWeight={800}
                        />
                        <span className='px-2 font-bold'>Export Data</span>
                    </button>
                </span>
            </Dropdown.Trigger>
            <Dropdown.Content width='50'>
                <ExportFilter />
            </Dropdown.Content>
        </Dropdown>
    )
}

export default ExportByDateRangeDropdown
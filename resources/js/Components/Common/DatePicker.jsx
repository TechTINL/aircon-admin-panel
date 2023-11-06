import React from 'react';
import Dropdown from '../Dropdown';
import './CalendarStyles.css';
import { BiChevronDown } from 'react-icons/bi';
import Calendar from 'react-calendar';

const DatePicker = ({
    label,
    value,
    onChange,
    prefixIcon,
    classes
}) => {
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <button
                    type="button"
                    className={`inline-flex items-center px-3 py-2 border border-border-gray w-full justify-between text-sm leading-4 font-medium rounded-md text-black bfocus:outline-none transition ease-in-out duration-150 ${classes}`}
                >
                    <div className='flex'>
                        {prefixIcon}
                        <span className='px-2 font-bold'>{value || label || 'Select Date'}</span>
                    </div>
                    <BiChevronDown size={20} fontWeight={800} />
                </button>
            </Dropdown.Trigger>
            <Dropdown.Content width='full' contentClasses='bg-white min-w-[300px]'>
                <div className="p-4 min-w-[300px]">
                    <Calendar onChange={onChange} />
                </div>
            </Dropdown.Content>
        </Dropdown>
    )
}

export default DatePicker
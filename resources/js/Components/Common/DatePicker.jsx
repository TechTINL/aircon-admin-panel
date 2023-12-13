import Calendar from 'react-calendar';
import { MdOutlineDateRange } from 'react-icons/md';
import Dropdown from '../Dropdown';
import './CalendarStyles.css';

function DatePicker({ label, value, onChange, prefixIcon, classes, isRange }) {
  const formatDateRange = dateArr => {
    const [start, end] = dateArr;
    return `${new Date(start).toLocaleDateString()} - ${new Date(
      end
    ).toLocaleDateString()}`;
  };
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <button
          type="button"
          className={`inline-flex items-center px-3 py-2 border border-border-gray w-full justify-between text-sm leading-4 font-medium rounded-md text-black bfocus:outline-none transition ease-in-out duration-150 ${classes}`}
        >
          <div className="flex">
            {prefixIcon}
            <span className="px-2 font-bold">
              {value
                ? isRange
                  ? formatDateRange(value)
                  : new Date(value).toLocaleDateString()
                : label || 'Select Date'}
            </span>
          </div>
          <MdOutlineDateRange size={20} fontWeight={800} />
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content width="full" contentClasses="bg-white min-w-[300px]">
        <div className="p-4 min-w-[300px]">
          <Calendar
            onChange={onChange}
            selectRange={isRange || false}
            value={value}
          />
        </div>
      </Dropdown.Content>
    </Dropdown>
  );
}

export default DatePicker;

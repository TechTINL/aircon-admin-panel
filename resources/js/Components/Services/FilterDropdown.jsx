import React from 'react';
import { BiChevronDown, BiFilter } from 'react-icons/bi';
import Checkbox from '@/Components/Shared/Checkbox';
import Dropdown from '../Dropdown';

const FilterDropdown = ({ name, label, data, checkedData, handleChecked }) => {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <span className="inline-flex rounded-md">
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-border-gray text-sm leading-4 font-medium rounded-full text-border-gray bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
          >
            <BiFilter size={20} fontWeight={800} />
            <span className="px-2 font-bold text-[14px]">{label}</span>
            <BiChevronDown size={20} fontWeight={800} />
          </button>
        </span>
      </Dropdown.Trigger>
      <Dropdown.Content>
        {data.map((sf, i) => (
          <div key={i}>
            {sf.map((filter, j) => (
              <div className="px-4 py-2" key={`${i}-${j}`}>
                <Checkbox
                  id={filter.value}
                  label={filter.label}
                  value={filter.value}
                  checked={checkedData.includes(filter.value)}
                  onChange={e =>
                    handleChecked(name, filter.value, e.target.checked)
                  }
                />
              </div>
            ))}
            {i < data.length - 1 && <hr />}
          </div>
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
};

export default FilterDropdown;

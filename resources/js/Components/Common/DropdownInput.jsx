import React from 'react';
import { BiChevronDown } from 'react-icons/bi';
import Dropdown from '../Dropdown';

function DropdownInput({
  label,
  items,
  selectedItem,
  onItemSelect,
  startIcon,
  endIcon,
  inputClass,
  align = 'left',
}) {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <button
          type="button"
          className={`inline-flex items-center justify-between w-full px-3 py-2 border border-border-gray text-sm leading-4 font-medium rounded-xl text-border-gray bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150 ${inputClass}`}
        >
          {startIcon}
          <span className="px-2 font-bold text-[14px]">
            {selectedItem?.label || label || 'Select Item'}
          </span>
          {endIcon || <BiChevronDown size={20} fontWeight={800} />}
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content align={align}>
        <div className="flex flex-col w-full max-h-[200px] overflow-y-scroll z-[500]">
          <div>
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => onItemSelect(item)}
                className={`flex text-black items-start p-2 ${
                  selectedItem?.value === item.value && 'text-secondary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </Dropdown.Content>
    </Dropdown>
  );
}

export default DropdownInput;

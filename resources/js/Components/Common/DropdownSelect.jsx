import React from 'react';
import Dropdown from '../Dropdown';
import { BiChevronDown } from 'react-icons/bi';
import Checkbox from '../Shared/Checkbox';

export const DropdownSelect = ({
    label,
    items,
    selectedItem,
    handleItemSelect,
    prefixIcon,
    withCheckbox = false,
}) => {
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <span className="inline-flex rounded-md">
                    <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-border-gray text-sm leading-4 font-medium rounded-full text-border-gray bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                    >
                        {prefixIcon || null}
                        <span className="px-2 font-bold text-[14px]">{selectedItem?.label || label || 'Filter'}</span>
                        <BiChevronDown size={20} fontWeight={800} />
                    </button>
                </span>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <div className='flex flex-col'>
                    {
                        items.map((item, i) => (
                            <div key={i}>
                                {
                                    item.map((filter, j) => (
                                        <div className="px-4 py-1" key={`${i}-${j}`}>
                                            {
                                                withCheckbox ?
                                                    <Checkbox
                                                        id={filter.value}
                                                        label={filter.label}
                                                        value={filter.value}
                                                        checked={selectedItem.includes(filter.value)}
                                                        onChange={e => handleItemSelect(filter, e.target.checked)}
                                                    /> :
                                                    <button key={i} onClick={() => handleItemSelect(filter)} className={`flex text-black items-start p-2 ${selectedItem.value === filter.value && 'text-secondary'}`}>
                                                        {filter.label}
                                                    </button>
                                            }
                                        </div>
                                    ))
                                }
                                {i < items.length - 1 && <hr />}
                            </div>
                        ))
                    }
                </div>
            </Dropdown.Content>
        </Dropdown>
    )
}

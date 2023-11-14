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
    inputClass,
    withCheckbox = false,
}) => {
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <button
                    type="button"
                    className={`inline-flex items-center justify-between w-full px-3 py-2 border border-border-gray text-sm leading-4 font-medium rounded-xl text-border-gray bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150 ${inputClass}`}
                >
                    {prefixIcon || null}
                    <span className="px-2 font-bold text-[14px]">{selectedItem?.label || label || 'Filter'}</span>
                    <BiChevronDown size={20} fontWeight={800} />
                </button>
            </Dropdown.Trigger>
            <Dropdown.Content width='full'>
                <div className='flex flex-col max-h-[200px] overflow-y-scroll z-[500]'>
                    <div>
                        {
                            items.map((item, i) => (
                                <div key={i}>
                                    {
                                        item.map((filter, j) => (
                                            <div className="px-2 py-1" key={`${i}-${j}`}>
                                                {
                                                    withCheckbox ?
                                                        <Checkbox
                                                            id={filter.value}
                                                            label={filter.label}
                                                            value={filter.value}
                                                            checked={selectedItem?.includes(filter.value)}
                                                            onChange={e => handleItemSelect(filter, e.target.checked)}
                                                        /> :
                                                        <button key={i} onClick={() => handleItemSelect(filter)} className={`flex text-black items-start p-2 ${selectedItem?.value === filter.value && 'text-secondary'}`}>
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
                </div>
            </Dropdown.Content>
        </Dropdown>
    )
}

import React from 'react'
import Dropdown from '../Dropdown'
import { AiFillCaretDown } from 'react-icons/ai';

const MDropDown = ({
    items,
    placeholder,
    selectedItem,
    handleOnSelect
}) => {
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <span className="inline-flex rounded-md w-full h-full">
                    <button
                        type="button"
                        className="inline-flex justify-between items-center w-full h-[40px] px-3 py-2 bg-bg-input-gray text-sm leading-4 font-medium text-border-gray rounded-xl hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                    >
                        <span className='px-2 font-bold text-[14px]'>{selectedItem?.label || placeholder || 'Select'}</span>
                        <AiFillCaretDown
                            size={20}
                            fontWeight={800}
                        />
                    </button>
                </span>
            </Dropdown.Trigger>
            <Dropdown.Content width='100%'>
                <div className='w-full max-h-[200px] overflow-y-auto'>
                    {
                        items?.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => handleOnSelect(item)}
                                className={`text-left w-full ${selectedItem?.value === item.value && 'bg-slate-300'}`}
                            >
                                <div className='px-4 py-2'>
                                    {item?.label}
                                </div>
                                {i < items.length - 1 && < hr />}
                            </button>
                        ))
                    }
                </div>
            </Dropdown.Content>
        </Dropdown>
    );
};

export default MDropDown;

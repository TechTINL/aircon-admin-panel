import React, { useState } from 'react'
import { CONTRACT_CLIENT_FILTERS, SERVICE_STATUS_FILTERS } from '../../../Helpers/constants'
import Dropdown from '../../Dropdown';
import { BiChevronDown, BiFilter, BiSearch } from 'react-icons/bi';
import FilterDropdown from '../../Services/FilterDropdown';
import TextInput from '../../TextInput';
import { HiChevronUpDown } from 'react-icons/hi2';

const Contract = () => {
    const [checkedStatusFilters, setCheckedStatusFilters] = useState([]);
    const [checkedClientFilter, setCheckedClientFilter] = useState(CONTRACT_CLIENT_FILTERS[0]);
    const [showNewContractModal, setshowNewContractModal] = useState(false);

    const handleChecked = (name, value, checked) => {
        if (checked) {
            setCheckedStatusFilters([...checkedStatusFilters, value])
        } else {
            setCheckedStatusFilters(checkedStatusFilters.filter(f => f !== value))
        }
    };

    const DATA = [
        {
            id: '20230316-01',
            name: 'One Year Quarterly Maintenance Contract',
            clientName: 'Client A',
            subClient: 'Sub-Client B',
            address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
            startDate: '20-09-2023',
            dueDate: '20-09-2023',
            unassignedSR: 2,
            assignedSR: 2,
            totalSR: 4
        },
        {
            id: '20230316-01',
            name: 'One Year Quarterly Maintenance Contract',
            clientName: 'Client A',
            address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
            startDate: '20-09-2023',
            dueDate: '20-09-2023',
            unassignedSR: 2,
            assignedSR: 2,
            totalSR: 4
        },

        {
            id: '20230316-01',
            name: 'One Year Quarterly Maintenance Contract',
            clientName: 'Client A',
            subClient: 'Sub-Client B',
            address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
            startDate: '20-09-2023',
            dueDate: '20-09-2023',
            unassignedSR: 2,
            assignedSR: 2,
            totalSR: 4
        },

        {
            id: '20230316-01',
            name: 'One Year Quarterly Maintenance Contract',
            clientName: 'Client A',
            subClient: 'Sub-Client B',
            address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
            startDate: '20-09-2023',
            dueDate: '20-09-2023',
            unassignedSR: 2,
            assignedSR: 2,
            totalSR: 4
        },
    ]

    return (
        <div className='p-4 gap-4'>
            <div className='flex justify-between'>
                <div className='flex items-center relative'>
                    <TextInput
                        className='w-full h-full pl-8 rounded-xl'
                        placeholder='Search'
                    />
                    <BiSearch className='text-gray-500 absolute text-[20px] left-2' />
                </div>
                <div className='flex items-center gap-4'>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 border border-border-gray text-sm leading-4 font-medium rounded-full text-border-gray bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                >
                                    <BiFilter size={20} fontWeight={800} />
                                    <span className="px-2 font-bold text-[14px]">{checkedClientFilter.label}</span>
                                    <BiChevronDown size={20} fontWeight={800} />
                                </button>
                            </span>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <div className='flex flex-col'>
                                {
                                    CONTRACT_CLIENT_FILTERS.map((filter, i) => (
                                        <button key={i} onClick={() => setCheckedClientFilter(filter)} className='flex items-start p-2'>
                                            {filter.label}
                                        </button>
                                    ))
                                }
                            </div>
                        </Dropdown.Content>
                    </Dropdown>

                    <FilterDropdown
                        name={'status'}
                        label={'Status'}
                        data={SERVICE_STATUS_FILTERS}
                        checkedData={checkedStatusFilters}
                        handleChecked={handleChecked}
                    />

                    <button
                        type="button"
                        className="bg-primary hover:bg-green-300 text-white font-bold py-2 px-4 rounded-xl"
                        onClick={() => setOpenCreateSubClientModal(true)}
                    >
                        Add New Contract
                    </button>
                </div>
            </div>
            <div className='flex flex-1 mt-6 max-w-[80vw] relative'>
                <div className="w-full h-[68vh] overflow-x-auto overflow-y-auto">
                    <table className="w-full text-black relative">
                        <thead className="relative bg-[#F0F0F0] rounded-full">
                            <tr>
                                <th className="px-4 py-2 min-w-[100px] text-[#455361]">
                                    <div className='flex items-center'>
                                        <span>
                                            Contract Name
                                        </span>
                                        <button>
                                            <HiChevronUpDown />
                                        </button>
                                    </div>
                                </th>
                                <th className="px-4 py-2 min-w-[150px] text-[#455361] text-left">
                                    Address
                                </th>
                                <th className="px-4 py-2 min-w-[150px] text-[#455361]">
                                    <div className='flex items-center'>
                                        <span>
                                            Start Date
                                        </span>
                                        <button>
                                            <HiChevronUpDown />
                                        </button>
                                    </div>
                                </th>
                                <th className=" px-4 py-2 min-w-[150px] text-[#455361]">
                                    <div className='flex items-center'>
                                        <span>
                                            Due Date
                                        </span>
                                        <button>
                                            <HiChevronUpDown />
                                        </button>

                                    </div>
                                </th>
                                <th className="px-4 py-2 min-w-[150px] text-[#455361]">
                                    Unassigned SR
                                </th>
                                <th className="px-4 py-2 min-w-[150px] text-[#455361]">
                                    Assigned SR
                                </th>
                                <th className="px-4 py-2 min-w-[150px] text-[#455361]">
                                    Total SR
                                </th>
                                {/* Add table header columns for other days */}
                            </tr>
                        </thead>
                        <tbody className="relative">
                            {
                                DATA.map((item, i) => (
                                    <tr className={`text-[#455361] ${i % 2 === 1 && 'bg-white rounded-full'}`} style={{
                                        borderRadius: '100px'
                                    }} key={i}>
                                        <td className='px-4 py-2 my-1'>
                                            <div className='flex flex-col justify-center'>
                                                {
                                                    item.subClient ?
                                                        <span>{item.clientName} / <span className='text-secondary'>{item.subClient}</span></span> :
                                                        <span className='text-secondary'>{item.clientName}</span>
                                                }
                                                <span className='font-bold'>{item.name}</span>
                                                <span>Contract ID: <b>{item.id}</b></span>
                                            </div>
                                        </td>

                                        <td className='px-4 py-2 max-w-[200px]'>{item.address}</td>
                                        <td className='px-4 py-2 max-w-[200px]'>{item.startDate}</td>
                                        <td className='px-4 py-2 max-w-[200px]'>{item.dueDate}</td>
                                        <td className='px-4 py-2 max-w-[200px] text-center'>{item.unassignedSR}</td>
                                        <td className='px-4 py-2 max-w-[200px] text-center'>{item.assignedSR}</td>
                                        <td className='px-4 py-2 max-w-[200px] text-center'>{item.totalSR}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Contract
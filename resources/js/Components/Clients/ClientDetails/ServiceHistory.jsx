import React, { useState } from 'react';
import TextInput from '../../TextInput';
import { BiSearch } from 'react-icons/bi';
import FilterDropdown from '../../Services/FilterDropdown';
import { SERVICE_STATUS_FILTERS, SERVICE_STATUS_LABELS } from '../../../Helpers/constants';
import { getServiceStatusStyles } from '../../../Helpers/utils';
import { AiOutlineLeft, AiOutlineRight, AiOutlineRightCircle } from 'react-icons/ai';
import { HiChevronUpDown } from 'react-icons/hi2';
import { Link } from '@inertiajs/react';

const ServiceHistory = () => {
    const [checkedStatusFilters, setCheckedStatusFilters] = useState([]);
    const paginationItems = [1, 2, 3, 4, 5, '...', 10];

    const handleChecked = (name, value, checked) => {
        if (checked) {
            setCheckedStatusFilters([...checkedStatusFilters, value])
        } else {
            setCheckedStatusFilters(checkedStatusFilters.filter(f => f !== value))
        }
    };

    const DATA = [
        {
            clientName: 'Client A',
            subClientName: 'Sub-Client B',
            contractId: '20230316-01',
            serviceReportId: '20230316-01',
            address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
            date: '20-09-2023',
            type: 'Contract',
            amount: '1,000.00',
            status: 'UNASSIGNED',
        },
        {
            clientName: 'Client A',
            subClientName: 'Sub-Client B',
            contractId: '20230316-01',
            serviceReportId: '20230316-01',
            address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
            date: '20-09-2023',
            type: 'Contract',
            amount: '1,000.00',
            status: 'SCHEDULED',
        },
        {
            clientName: 'Client A',
            subClientName: 'Sub-Client B',
            contractId: '20230316-01',
            serviceReportId: '20230316-01',
            address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
            date: '20-09-2023',
            type: 'Contract',
            amount: '1,000.00',
            status: 'ON_HOLD',
        },
        {
            clientName: 'Client A',
            subClientName: 'Sub-Client B',
            contractId: '20230316-01',
            serviceReportId: '20230316-01',
            address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
            date: '20-09-2023',
            type: 'Contract',
            amount: '1,000.00',
            status: 'COMPLETED',
        },
        {
            clientName: 'Client A',
            subClientName: 'Sub-Client B',
            contractId: '20230316-01',
            serviceReportId: '20230316-01',
            address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
            date: '20-09-2023',
            type: 'Contract',
            amount: '1,000.00',
            status: 'REQUIRE_FOLLOW_UP',
        },
        {
            clientName: 'Client A',
            subClientName: 'Sub-Client B',
            contractId: '20230316-01',
            serviceReportId: '20230316-01',
            address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
            date: '20-09-2023',
            type: 'Contract',
            amount: '1,000.00',
            status: 'FOLLOW_UP_COMPLETED',
        },
        {
            clientName: 'Client A',
            subClientName: 'Sub-Client B',
            contractId: '20230316-01',
            serviceReportId: '20230316-01',
            address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
            date: '20-09-2023',
            type: 'Contract',
            amount: '1,000.00',
            status: 'FOLLOW_UP_COMPLETED',
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
                        Add New Service
                    </button>
                </div>
            </div>

            <div className='flex flex-1 mt-6 max-w-[80vw] relative'>
                <div className="w-full h-[68vh] overflow-x-auto overflow-y-auto">
                    <table className="w-full text-black relative">
                        <thead className="relative bg-[#F0F0F0] rounded-full">
                            <tr>
                                <th className="px-4 py-2 sticky left-0 min-w-[150px] text-[#455361] text-left">Client / Sub-Client </th>

                                <th className="px-4 py-2 min-w-[150px] text-[#455361] text-left">
                                    Address
                                </th>

                                <th className="px-4 py-2 min-w-[100px] text-[#455361]">
                                    <div className='flex items-center'>
                                        <span>
                                            Date
                                        </span>
                                        <button>
                                            <HiChevronUpDown />
                                        </button>
                                    </div>
                                </th>

                                <th className="px-4 py-2 min-w-[150px] text-[#455361] text-left">
                                    Amount
                                </th>
                                <th className="px-4 py-2 min-w-[150px] text-[#455361]">
                                    <div className='flex items-center'>
                                        <span>
                                            Type
                                        </span>
                                        <button>
                                            <HiChevronUpDown />
                                        </button>
                                    </div>
                                </th>
                                <th className="px-4 py-2 min-w-[150px] text-[#455361]">
                                    Status
                                </th>
                                <th className="px-4 py-2 sticky left-0 min-w-max text-[#455361] text-left"></th>
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
                                                    item?.subClientName && <span className='text-secondary text-[14px] font-bold'>{item.clientName}</span>
                                                }
                                                <span className='text-[16px] text-black'>{item.subClientName || item.clientName}</span>
                                                <span className='text-[14px]'>Contract ID: <b>{item.contractId}</b></span>
                                                <span className='text-[14px]'>Service Report ID:<b>{item.serviceReportId}</b></span>
                                            </div>
                                        </td>

                                        <td className='px-4 py-2 max-w-[200px]'>{item.address}</td>

                                        <td className='px-4 py-2'>{item.date}</td>
                                        <td className='px-4 py-2'>$ {item.amount}</td>

                                        <td className='px-4 py-2 max-w-[200px]'>{item.type}</td>
                                        <td className='px-4 py-2 max-w-[200px] text-center'>
                                            <div className='rounded-full max-h-max py-2 text-center text-[14px]' style={getServiceStatusStyles(item.status)}>
                                                {SERVICE_STATUS_LABELS[item.status]}
                                            </div>
                                        </td>

                                        <td className='px-4 py-2'>
                                            <Link href={'/services-report-detail'} method="get" as="button" type="button">
                                                <AiOutlineRightCircle size={24} className='text-secondary' />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>
            </div>

            <div className='bg-bg-input-gray min-h-[2px] w-full'></div>

            <div className='flex flex-initial justify-between items-center mt-4'>
                <div>7 of 200 Result</div>
                <div className='flex gap-4'>
                    <button>
                        <AiOutlineLeft />
                    </button>
                    {
                        paginationItems.map(item => (
                            item === '...' ? <span key={item}>{item}</span> :
                                <button key={item}>{item}</button>
                        ))
                    }
                    <button>
                        <AiOutlineRight />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ServiceHistory;

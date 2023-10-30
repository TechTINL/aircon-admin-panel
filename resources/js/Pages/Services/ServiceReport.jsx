import { Head, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { AiOutlineLeft, AiOutlineRight, AiOutlineRightCircle } from 'react-icons/ai';
import TextInput from '@/Components/TextInput';
import { BiSearch } from 'react-icons/bi';
import { HiChevronUpDown } from 'react-icons/hi2';
import Dropdown from '@/Components/Dropdown';
import { FiDownload } from 'react-icons/fi';
import ExportFilter from '@/Components/Services/ExportFilter';
import FilterDropdown from '@/Components/Services/FilterDropdown';
import { SERVICE_STATUS_FILTERS } from '@/Helpers/constants';
import { VscFilePdf } from 'react-icons/vsc';
import { BsSend } from 'react-icons/bs';

const ServiceReport = ({ auth }) => {
    const [checkedStatusFilters, setCheckedStatusFilters] = useState([]);

    const handleStatusChecked = (name, value, checked) => {
        if (checked) {
            setCheckedStatusFilters([...checkedStatusFilters, value]);
        } else {
            setCheckedStatusFilters(checkedStatusFilters.filter(f => f !== value));
        }
    };

    const paginationItems = [1, 2, 3, 4, 5, '...', 10];

    const data = [
        {
            serviceReportId: {
                contractId: '230920-CO-00001',
                serviceReportId: '230920-SR-00001',
            },
            dateTime: '12/09/2023 10:00 AM',
            client: {
                name: 'Client A',
                subClients: ['Sub-Client A']
            },
            address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
            assignedTo: null,
            status: 'UNASSIGNED',
        },
        {
            serviceReportId: {
                contractId: '230920-CO-00001',
                serviceReportId: '230920-SR-00001',
            },
            dateTime: '12/09/2023 10:00 AM',
            client: {
                name: 'Client A',
                subClients: []
            },
            address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
            assignedTo: 'Jeffery Hong',
            status: 'SCHEDULED',
        },
        {
            serviceReportId: {
                contractId: '230920-CO-00001',
                serviceReportId: '230920-SR-00001',
            },
            dateTime: '12/09/2023 10:00 AM',
            client: {
                name: 'Client A',
                subClients: ['Sub-Client A']
            },
            address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
            assignedTo: 'Jeffery Hong',
            status: 'ON_HOLD',
        },
        {
            serviceReportId: {
                contractId: '230920-CO-00001',
                serviceReportId: '230920-SR-00001',
            },
            dateTime: '12/09/2023 10:00 AM',
            client: {
                name: 'Client A',
                subClients: ['Sub-Client A']
            },
            address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
            assignedTo: 'Jeffery Hong',
            status: 'COMPLETED',
        },
        {
            serviceReportId: {
                contractId: '230920-CO-00001',
                serviceReportId: '230920-SR-00001',
            },
            dateTime: '12/09/2023 10:00 AM',
            client: {
                name: 'Client A',
                subClients: ['Sub-Client A']
            },
            address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
            assignedTo: 'Jeffery Hong',
            status: 'REQUIRE_FOLLOW_UP',
        },
        {
            serviceReportId: {
                contractId: '230920-CO-00001',
                serviceReportId: '230920-SR-00001',
            },
            dateTime: '12/09/2023 10:00 AM',
            client: {
                name: 'Client A',
                subClients: ['Sub-Client A']
            },
            address: 'Blk 28 Jalan Bahagia, #03-21, Singapore 213810',
            assignedTo: 'Jeffery Hong',
            status: 'FOLLOW_UP_COMPLETED',
        },
    ];

    const statusLabels = {
        'UNASSIGNED': 'Unassigned',
        'SCHEDULED': 'Scheduled',
        'ON_HOLD': 'On-Hold',
        'COMPLETED': 'Completed',
        'REQUIRE_FOLLOW_UP': 'Requires Follow-up',
        'FOLLOW_UP_COMPLETED': 'Follow-up Completed'
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'UNASSIGNED': return {
                backgroundColor: '#D9D9D9',
                color: '#53616C',

            };
            case 'SCHEDULED': return {
                backgroundColor: '#D4F1F3',
                color: '#00B4AD',
            };
            case 'ON_HOLD': return {
                backgroundColor: '#D3D7F5',
                color: '#454FA2',
            };
            case 'COMPLETED': return {
                backgroundColor: '#00B4AD',
                color: '#FFFFFF',
            };
            case 'REQUIRE_FOLLOW_UP': return {
                backgroundColor: '#DD4949',
                color: '#FFFFFF',
            };
            case 'FOLLOW_UP_COMPLETED': return {
                backgroundColor: '#6CC294',
                color: '#FFFFFF',
            };
            default: return {
                backgroundColor: '#D9D9D9',
                color: '#53616C',

            };
        }
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Job Table" />
            <div className="flex flex-auto flex-col m-6 max-w-full">
                <div className="text-zinc-800 text-3xl font-bold leading-10">
                    Job Table
                </div>

                <div className='flex flex-col flex-auto mt-6'>

                    {/* Search & Filters */}
                    <div className='flex flex-row justify-between'>
                        <div className='flex items-center relative'>
                            <TextInput
                                className='w-full h-full pl-8 rounded-xl'
                                placeholder='Search'
                            />
                            <BiSearch className='text-gray-500 absolute text-[20px] left-2' />
                        </div>
                        <div className='flex gap-4 items-end'>
                            <FilterDropdown
                                name={'status'}
                                label={'Status'}
                                data={SERVICE_STATUS_FILTERS}
                                checkedData={checkedStatusFilters}
                                handleChecked={handleStatusChecked}
                            />

                            {/* Export Dropdown */}
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
                            {/* Export Dropdown */}
                        </div>
                    </div>
                    {/* Search & Filters */}
                    <div className='flex flex-1 mt-6 max-w-[80vw] relative'>
                        <div className="w-full h-[68vh] overflow-x-auto overflow-y-auto">
                            <table className="w-full text-black relative">
                                <thead className="relative bg-[#F0F0F0] rounded-full">
                                    <tr>
                                        <th className="px-4 py-2 sticky left-0 min-w-[150px] text-[#455361] text-left">Service Report ID</th>
                                        <th className="px-4 py-2 min-w-[100px] text-[#455361]">
                                            <div className='flex items-center'>
                                                <span>
                                                    Date/Time
                                                </span>
                                                <button>
                                                    <HiChevronUpDown />
                                                </button>
                                            </div>
                                        </th>
                                        <th className="px-4 py-2 min-w-[150px] text-[#455361]">
                                            <div className='flex items-center'>
                                                <span>
                                                    Client
                                                </span>
                                                <button>
                                                    <HiChevronUpDown />
                                                </button>
                                            </div>
                                        </th>
                                        <th className="px-4 py-2 min-w-[150px] text-[#455361] text-left">
                                            Address
                                        </th>
                                        <th className=" px-4 py-2 min-w-[150px] text-[#455361]">
                                            <div className='flex items-center'>
                                                <span>
                                                    Assigned To
                                                </span>
                                                <button>
                                                    <HiChevronUpDown />
                                                </button>

                                            </div>
                                        </th>
                                        <th className="px-4 py-2 min-w-[150px] text-[#455361]">
                                            Status
                                        </th>
                                        <th className="px-4 py-2 min-w-[150px] text-[#455361] text-left">
                                            Pdf Report
                                        </th>
                                        {/* Add table header columns for other days */}
                                    </tr>
                                </thead>
                                <tbody className="relative">
                                    {
                                        data.map((item, i) => (
                                            <tr className={`text-[#455361] ${i % 2 === 1 && 'bg-white rounded-full'}`} style={{
                                                borderRadius: '100px'
                                            }} key={i}>
                                                <td className='px-4 py-2 my-1'>
                                                    <div className='flex flex-col justify-center'>
                                                        <span>Contract ID:</span>
                                                        <b>{item.serviceReportId.contractId}</b>
                                                        <span>Service Report ID:</span>
                                                        <b>{item.serviceReportId.serviceReportId}</b>
                                                    </div>
                                                </td>

                                                <td className='px-4 py-2'>
                                                    <div className='flex flex-col'>
                                                        <b>{item.dateTime.split(' ')[0]}</b>
                                                        <span>{item.dateTime.split(' ').slice(1, 3).join(' ')}</span>
                                                    </div>
                                                </td>

                                                <td className='px-4 py-2'>
                                                    <div className='flex flex-col'>
                                                        <span className='text-secondary font-extrabold text-[14px]'>{item.client.name}</span>
                                                        <span>{item.client.subClients.join(',')}</span>
                                                    </div>
                                                </td>

                                                <td className='px-4 py-2 max-w-[200px]'>{item.address}</td>

                                                <td className='px-4 py-2 max-w-[200px]'>{item.assignedTo || '-'}</td>

                                                <td className='px-4 py-2 max-w-[200px]'>
                                                    <div className='rounded-full max-h-max py-2 text-center text-[14px]'
                                                        style={{
                                                            ...getStatusStyles(item.status),
                                                        }}
                                                    >
                                                        {statusLabels[item.status]}
                                                    </div>
                                                </td>

                                                <td className='px-4 py-2 max-w-[200px] gap-4'>
                                                    <div className='flex gap-4'>
                                                        <button>
                                                            <VscFilePdf size={24} className='text-primary' />
                                                        </button>
                                                        <button>
                                                            <BsSend size={24} className='text-primary' />
                                                        </button>
                                                        <Link href={'/services-report-detail'} method="get" as="button" type="button">
                                                            <AiOutlineRightCircle size={24} className='text-secondary' />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                    {/* <div className='flex flex-col flex-auto pt-6'>
                        <div className='flex-1 max-w-max overflow-y-auto overflow-x-auto'>
                            <div className='w-full max-w-max overflow-hidden'>

                            </div>
                        </div>
                    </div> */}

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
            </div>
        </AuthenticatedLayout>
    )
}

export default ServiceReport;

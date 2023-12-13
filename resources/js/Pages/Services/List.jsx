import { Head, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { AiOutlineRightCircle } from 'react-icons/ai';
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
import { Chip } from '@material-tailwind/react';

function List({ auth, services }) {
  const [checkedStatusFilters, setCheckedStatusFilters] = useState([]);

  const handleStatusChecked = (name, value, checked) => {
    if (checked) {
      setCheckedStatusFilters([...checkedStatusFilters, value]);
    } else {
      setCheckedStatusFilters(checkedStatusFilters.filter(f => f !== value));
    }
  };

  const statusLabels = {
    UNASSIGNED: 'Unassigned',
    SCHEDULED: 'Scheduled',
    ON_HOLD: 'On-Hold',
    COMPLETED: 'Completed',
    REQUIRE_FOLLOW_UP: 'Requires Follow-up',
    FOLLOW_UP_COMPLETED: 'Follow-up Completed',
  };

  const getStatusStyles = status => {
    switch (status) {
      case 'UNASSIGNED':
        return {
          backgroundColor: '#D9D9D9',
          color: '#53616C',
        };
      case 'SCHEDULED':
        return {
          backgroundColor: '#D4F1F3',
          color: '#00B4AD',
        };
      case 'ON_HOLD':
        return {
          backgroundColor: '#D3D7F5',
          color: '#454FA2',
        };
      case 'COMPLETED':
        return {
          backgroundColor: '#00B4AD',
          color: '#FFFFFF',
        };
      case 'REQUIRE_FOLLOW_UP':
        return {
          backgroundColor: '#DD4949',
          color: '#FFFFFF',
        };
      case 'FOLLOW_UP_COMPLETED':
        return {
          backgroundColor: '#6CC294',
          color: '#FFFFFF',
        };
      default:
        return {
          backgroundColor: '#D9D9D9',
          color: '#53616C',
        };
    }
  };

  const handleExport = () => {
    window.location.href = '/services/export';
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Job Table" />
      <div className="flex flex-auto flex-col m-6 max-w-full">
        <div className="text-zinc-800 text-3xl font-bold leading-10">
          Service Report
        </div>

        <div className="flex flex-col flex-auto mt-6">
          {/* Search & Filters */}
          <div className="flex flex-row justify-between">
            <div className="flex items-center relative">
              <TextInput
                className="w-full h-full pl-8 rounded-xl"
                placeholder="Search"
              />
              <BiSearch className="text-gray-500 absolute text-[20px] left-2" />
            </div>
            <div className="flex gap-4 items-end">
              <FilterDropdown
                name="status"
                label="Status"
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
                      <FiDownload size={20} fontWeight={800} />
                      <span className="px-2 font-bold">Export Data</span>
                    </button>
                  </span>
                </Dropdown.Trigger>
                <Dropdown.Content width="50">
                  <ExportFilter onExport={handleExport} />
                </Dropdown.Content>
              </Dropdown>
              {/* Export Dropdown */}
            </div>
          </div>
          {/* Search & Filters */}
          <div className="flex flex-1 mt-6 max-w-[80vw] relative">
            <div className="w-full h-[68vh] overflow-x-auto overflow-y-auto">
              <table className="w-full text-black relative">
                <thead className="relative bg-[#F0F0F0] rounded-full">
                  <tr>
                    <th className="px-4 py-2 sticky left-0 min-w-[150px] text-[#455361] text-left">
                      Service Report ID
                    </th>
                    <th className="px-4 py-2 min-w-[100px] text-[#455361]">
                      <div className="flex items-center">
                        <span>Date/Time</span>
                        <button>
                          <HiChevronUpDown />
                        </button>
                      </div>
                    </th>
                    <th className="px-4 py-2 min-w-[150px] text-[#455361]">
                      <div className="flex items-center">
                        <span>Client</span>
                        <button>
                          <HiChevronUpDown />
                        </button>
                      </div>
                    </th>
                    <th className="px-4 py-2 min-w-[150px] text-[#455361] text-left">
                      Address
                    </th>
                    <th className=" px-4 py-2 min-w-[150px] text-[#455361]">
                      <div className="flex items-center">
                        <span>Assigned To</span>
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
                  {services.data.map((service, i) => (
                    <tr
                      className={`text-[#455361] ${
                        i % 2 === 1 && 'bg-white rounded-full'
                      }`}
                      style={{
                        borderRadius: '100px',
                      }}
                      key={i}
                    >
                      <td className="px-4 py-2 my-1">
                        <div className="flex flex-col justify-center">
                          <span>Contract ID:</span>
                          <b>{service.contract_number}</b>
                          <span>Service Report ID:</span>
                          <b>{service.service_number}</b>
                        </div>
                      </td>

                      <td className="px-4 py-2">
                        <div className="flex flex-col">
                          <b>{service.service_date}</b>
                          <span>{service.service_time}</span>`
                        </div>
                      </td>

                      <td className="px-4 py-2">
                        <div className="flex flex-col">
                          <span className="text-secondary font-extrabold text-[14px]">
                            {service?.client?.name}
                          </span>
                          <span>{service?.sub_client?.name}</span>
                        </div>
                      </td>

                      <td className="px-4 py-2 max-w-[200px]">
                        {service.service_address}
                      </td>

                      <td className="px-4 py-2 max-w-[200px]">
                        {service?.leaders?.map(leader => (
                          <Chip
                            key={leader?.id}
                            value={leader?.name}
                            color="amber"
                          />
                        ))}
                        {service?.technicians?.map(technician => (
                          <Chip
                            key={technician?.id}
                            value={technician?.name}
                            color="green"
                          />
                        ))}
                      </td>

                      <td className="px-4 py-2 max-w-[200px]">
                        <div
                          className="rounded-full max-h-max py-2 text-center text-[14px]"
                          style={{
                            ...getStatusStyles(service.status),
                          }}
                        >
                          {statusLabels[service.status]}
                        </div>
                      </td>

                      <td className="px-4 py-2 max-w-[200px] gap-4">
                        <div className="flex gap-4">
                          <button>
                            <VscFilePdf size={24} className="text-primary" />
                          </button>
                          <a
                            href="https://api.whatsapp.com/send?phone=6591837475&text=Dear%20Customer%2C%20Here%20is%20the%20report%20link%3A%20https%3A%2F%2Fhcoolairconservices.com%2Fservice-report-detail.pdf"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <BsSend size={24} className="text-primary" />
                          </a>
                          <Link
                            href="/services-report-detail"
                            method="get"
                            as="button"
                            type="button"
                          >
                            <AiOutlineRightCircle
                              size={24}
                              className="text-secondary"
                            />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
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

          <div className="bg-bg-input-gray min-h-[2px] w-full" />

          {/* Pagination */}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default List;

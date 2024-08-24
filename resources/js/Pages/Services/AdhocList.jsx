import { Head, Link } from '@inertiajs/react';
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { AiOutlineRightCircle } from 'react-icons/ai';
import { VscFilePdf } from 'react-icons/vsc';
import { Chip } from '@material-tailwind/react';
import useDownloadReport from '@/Hooks/Service/useDownloadReport';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import ServiceStatus from '@/Components/Services/ServiceStatus';
import Pagination from '@/Components/Shared/Pagination';
import EditServiceButton from '@/Components/Services/EditServiceButton.jsx';
import CreateServiceButton from '@/Components/Services/CreateServiceButton.jsx';

function List({ auth, services, breadcrumb, clients, leaders, employees }) {
  const { data, links, meta } = services;

  const { handleDownloadReport } = useDownloadReport();

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Job Table" />
        <div className="flex flex-auto flex-col m-6 max-w-full justify-between">
            <Breadcrumb breadcrumbs={breadcrumb} />
            <div className="flex justify-between">
                <div className="text-zinc-800 text-3xl font-bold leading-10">
                    Service Report
                </div>
                <CreateServiceButton
                    clients={clients}
                    leaders={leaders}
                    employees={employees}
                >
                    Create New Service Report (Ad-Hoc)
                </CreateServiceButton>
            </div>
            <div className="flex flex-col flex-auto mt-6">
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
                                    </div>
                                </th>
                                <th className="px-4 py-2 min-w-[150px] text-[#455361]">
                                    <div className="flex items-center">
                                        <span>Client</span>
                                    </div>
                                </th>
                                <th className="px-4 py-2 min-w-[150px] text-[#455361] text-left">
                                    Address
                                </th>
                                <th className=" px-4 py-2 min-w-[150px] text-[#455361]">
                                    <div className="flex items-center">
                                        <span>Assigned To</span>
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
                            {data.map((service, i) => (
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
                                        <div className="flex flex-col gap-1">
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
                                        </div>
                                    </td>

                                    <td className="px-4 py-2 max-w-[200px]">
                                        <ServiceStatus status={service.status} />
                                    </td>

                                    <td className="px-4 py-2 max-w-[200px] gap-4">
                                        <div className="flex gap-4">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDownloadReport(service?.service_number)
                                                }
                                            >
                                                <VscFilePdf size={24} className="text-primary" />
                                            </button>
                                            <Link
                                                href={`/services/${service.id}`}
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
                <div className="bg-bg-input-gray min-h-[2px] w-full" />
                <div className="flex flex-initial justify-between items-center mt-4">
                    <Pagination links={links} meta={meta} />
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
  );
}

export default List;

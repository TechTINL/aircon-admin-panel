import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { AiOutlineRightCircle } from 'react-icons/ai';
import { BiSearch, BiUserCircle } from 'react-icons/bi';
import { Head, Link } from '@inertiajs/react';
import { BsArrowRightCircle, BsArrowUpCircle } from 'react-icons/bs';
import { HiChevronUpDown } from 'react-icons/hi2';
import SampleProfileImg from '@/assets/images/sample-profile.png';
import TextInput from '@/Components/TextInput';
import CreateSubClientModal from '@/Components/Clients/Modals/CreateSubClientModal';
import GeneralNotes from '@/Components/Clients/GeneralNotes';
import Contacts from '@/Components/Clients/POC/Contacts';
import BillingAddressList from '@/Components/Clients/BillingAddress/BillingAddressList';
import EditClientModal from '@/Components/Clients/Modals/EditClientModal';
import ClientInfo from '@/Components/Clients/ClientDetails/ClientInfo';
import TableRow from '@/Components/Ui/Table/TableRow';
import ClientTypeChip from '@/Components/Clients/ClientTypeChip';
import ClientHeader from '@/Components/Clients/ClientDetails/ClientHeader';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import ClientDetailNavigation from '@/Components/Clients/ClientDetails/ClientDetailNavigation.jsx';
import { format, parseISO } from 'date-fns';
import React from 'react';

function Profile({ auth, client, contacts, subClients, breadcrumb, services, adhocs }) {
    console.log(services)
    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Client List" />
            <div className="flex-auto flex flex-col">
                <div className="flexf flex-auto text-black bg-gray-100 overflow-y-auto p-6">
                    <div className="flex justify-between">
                        <ClientHeader />
                        <EditClientModal />
                    </div>
                    <Breadcrumb breadcrumbs={breadcrumb} />
                    <ClientDetailNavigation id={client?.id} />
                    <div className="grid grid-cols-3 my-4 gap-6">
                        <ClientInfo
                            name={client.name}
                            type={client.type}
                            contacts={contacts}
                            address={client.address}
                        />
                        <div className="flex-1 flex-col py-8 bg-white rounded-lg">
                            <BillingAddressList />
                        </div>
                        <div className="flex-1 flex-col">
                            <div className="bg-white p-6 mb-4 rounded-lg">
                                <Contacts />
                            </div>
                            <div className="p-6 bg-white rounded-lg">
                                <GeneralNotes />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex-1">
                            <h3 className="text-lg font-bold">Recent Contract</h3>
                            <div className="bg-white p-4 rounded-lg mt-3">

                                {services && services.length > 0 ? (
                                    services.map((service, index) => (
                                        <div key={index} className="p-3 my-3 border-2 rounded-lg">
                                            <div className="flex justify-between">
                                                <div className="flex items-center gap-2 pb-3">
                                                    <span className="text-sm font-bold">{service.name}</span>
                                                    <span className="text-xs">{format(parseISO(service?.service_at), "dd MMMM yyyy, h:mm a")}</span>
                                                </div>
                                                <Link
                                                    href={`/services/${service.id}`}
                                                    method="get"
                                                    as="button"
                                                    type="button"
                                                    className="flex gap-2 items-center text-[#00B4AD]"
                                                >
                                                    <span className="font-bold">View report</span>
                                                    <BsArrowRightCircle size={16} />
                                                </Link>
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="flex items-center gap-2 pb-3">
                                                    <span className="text-sm font-bold">Service Number</span>
                                                    <span className="text-xs">{service?.service_number}</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div>
                                                    {service.technicians && service.technicians.length > 0 ? (
                                                        service.technicians.map((technician, technicianIndex) => (
                                                            <div key={technician.id} className="flex gap-2 text-xs py-1">
                                                                <span className="font-bold">Technician {technicianIndex + 1}:</span>
                                                                <span>{technician.name}</span>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div>No Technicians Found</div>
                                                    )}
                                                </div>
                                                <div className="flex justify-end flex-col">
                                                    <span className="text-xs font-bold">Status</span>
                                                    <div className="flex gap-2 pt-2 text-xs">
                                                        <span>{service.status}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div>No Record Found</div>
                                )}

                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold">Recent AdHoc</h3>
                            {adhocs && adhocs.length > 0 ? (
                                    adhocs.map((adhoc, index) => (
                                        <div className="bg-white p-4 rounded-lg mt-3">
                                            <div className="flex justify-between">
                                                <span className="font-bold">{adhoc.name}</span>
                                                <span className="text-sm">{format(parseISO(adhoc?.service_at), "dd MMMM yyyy, h:mm a")}</span>
                                            </div>
                                            <div className="flex flex-col py-3">
                                                {adhoc.technicians && adhoc.technicians.length > 0 ? (
                                                    adhoc.technicians.map((technician, technicianIndex) => (
                                                        <div key={technician.id} className="flex gap-2 text-xs py-1">
                                                            <span className="font-bold">Technician {technicianIndex + 1}:</span>
                                                            <span>{technician.name}</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div>No Technicians Found</div>
                                                )}
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex justify-end flex-col">
                                                    <span className="text-xs font-bold">Status</span>
                                                    <div className="flex gap-2 pt-2 text-xs">
                                                        <span>{adhoc.status}</span>
                                                    </div>
                                                </div>
                                                <Link
                                                    href={`/services/${adhoc.id}`}
                                                    method="get"
                                                    as="button"
                                                    type="button"
                                                    className="flex gap-2 items-center text-[#00B4AD]"
                                                >
                                                    <span className="font-bold">View report</span>
                                                    <BsArrowRightCircle size={16} />
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <div>No Record Found</div>
                            )}
                        </div>
                    </div>

                    {client.parent_id === null && (
                        <>
                            <div className="flex flex-row justify-between mt-6">
                            <div className="flex items-center relative">
                                    <TextInput
                                        className="w-full h-full pl-8 rounded-xl"
                                        placeholder="Search"
                                    />
                                    <BiSearch className="text-gray-500 absolute text-[20px] left-2" />
                                </div>
                                <div className="flex gap-4 items-end">
                                    <CreateSubClientModal />
                                </div>
                            </div>
                            <div className="flex flex-1 mt-6 relative">
                                <div className="w-full overflow-x-auto overflow-y-auto">
                                    <table className="w-full text-black relative">
                                        <thead className="relative bg-[#F0F0F0] rounded-full">
                                        <tr>
                                            <th className="px-4 py-2 min-w-[100px] text-[#455361]">
                                                <div className="flex items-center">
                                                    <span className="text-primary">Sub-Client</span>{' '}
                                                    &nbsp; | ID
                                                    <button>
                                                        <HiChevronUpDown />
                                                    </button>
                                                </div>
                                            </th>
                                            <th className="px-4 py-2 sticky left-0 min-w-[150px] text-[#455361] text-left">
                                                Contact Person
                                            </th>
                                            <th className="px-4 py-2 sticky left-0 min-w-[150px] text-[#455361] text-left">
                                            Contact
                                            </th>
                                            <th className="px-4 py-2 sticky left-0 min-w-[150px] text-[#455361] text-left">
                                                Address
                                            </th>
                                            <th className="px-4 py-2 sticky left-0 min-w-max text-[#455361] text-left" />
                                        </tr>
                                        </thead>
                                        <tbody className="relative">
                                        {subClients.data.map((item, i) => (
                                            <TableRow index={i} key={i}>
                                                <td className="px-4 py-4 my-1">
                                                    <div className="flex flex-col justify-center max-w-[200px]">
                                                        <b className="text-[15px]">
                                                            {item.clientId.name}
                                                        </b>
                                                        <span className="text-[12px]">
                                {item.clientId.id}
                              </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 my-1 max-w-[200px]">
                                                    <div className="flex flex-col justify-center">
                              <span className="text-[15px]">
                                {item.contactPerson.name}
                              </span>
                                                        <ClientTypeChip type={item.contactPerson.type} />
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 my-1 max-w-[200px]">
                                                    <div className="flex flex-col justify-center">
                              <span className="text-[15px]">
                                {item.contact}
                              </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 my-1 max-w-[200px]">
                                                    <div className="flex flex-col justify-center">
                              <span className="text-[14px]">
                                {item.address}
                              </span>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4 my-1">
                                                    <Link
                                                        href={route('clients.profile', item.clientId.id)}
                                                        method="get"
                                                        as="button"
                                                        type="button"
                                                        className="flex flex-col justify-center"
                                                    >
                                                        <AiOutlineRightCircle
                                                            size={20}
                                                            className="text-secondary"
                                                        />
                                                    </Link>
                                                </td>
                                            </TableRow>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Profile;

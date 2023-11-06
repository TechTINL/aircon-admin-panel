import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
  AiOutlineEdit,
  AiOutlineMail,
  AiFillCloseCircle,
  AiOutlineRightCircle,
} from 'react-icons/ai';
import { BiSearch, BiUserCircle, BiInfoCircle } from 'react-icons/bi';
import { Head, Link } from '@inertiajs/react';
import {
  BsArrowRightCircle,
  BsArrowUpCircle,
  BsTelephone,
} from 'react-icons/bs';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { PiNotepadBold } from 'react-icons/pi';
import { HiChevronUpDown } from 'react-icons/hi2';
import NewClientPOCModal from '@/Components/Clients/Modals/NewClientPOCModal';
import NewGeneralNotesModal from '@/Components/Clients/Modals/NewGeneralNotesModal';
import DeletePOCModal from '@/Components/Clients/Modals/DeletePOCModal';
import SampleProfileImg from '@/assets/images/sample-profile.png';
import TextInput from '@/Components/TextInput';
import CreateSubClientModal from '@/Components/Clients/Modals/CreateSubClientModal';
import { POCData, clientsData } from '@/Helpers/constants';
import Mailto from '@/Components/Shared/Mailto';
import GeneralNotes from '@/Components/Clients/GeneralNotes';
import Contacts from '@/Components/Clients/POC/Contacts.jsx';

function Profile({ auth, client, contacts }) {
  const [openNewPOCModal, setOpenNewPOCModal] = useState(false);
  const [openDeletePOCModal, setOpenDeletePOCModal] = useState(false);
  const [openDeleteGeneralNoteModal, setOpenDeleteGeneralNoteModal] =
    useState(false);
  const [openCreateSubClientModal, setOpenCreateSubClientModal] =
    useState(false);
  const [dataToDelete, dataPocToDelete] = useState(null);
  const [showSubClients, setShowSubClients] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleClientsChecked = (name, value, checked) => {
    if (checked) {
      setCheckedClientsFilters([...checkedClientsFilters, value]);
    } else {
      setCheckedClientsFilters(checkedClientsFilters.filter(f => f !== value));
    }
  };

  const handleSubClients = index => {
    if (showSubClients === index) {
      setShowSubClients(null);
    } else {
      setShowSubClients(index);
    }
  };

  const handleOnDelete = (name, data) => {
    dataPocToDelete(data);
    switch (name) {
      case 'poc': {
        setOpenDeletePOCModal(true);
        break;
      }
      case 'general-notes': {
        setOpenDeleteGeneralNoteModal(true);
        break;
      }
    }
  };

  return (
    <AuthenticatedLayout user={auth?.user}>
      <Head title="Client List" />
      <DeletePOCModal
        data={dataToDelete}
        openModal={openDeletePOCModal}
        setOpenModal={setOpenDeletePOCModal}
      />
      <CreateSubClientModal
        openModal={openCreateSubClientModal}
        setOpenModal={setOpenCreateSubClientModal}
      />
      <div className="flex-auto flex flex-col">
        <div className="flexf flex-auto text-black bg-gray-100 overflow-y-auto p-6">
          <div className="flex justify-between">
            <div className="flex justify-center items-center gap-2">
              <h3 className="text-[#303030] font-bold text-2xl">
                Client Detail
              </h3>
              <div className="p-2 bg-[#D9D9D9] rounded-full">
                ID - {client.id}
              </div>
            </div>
            <div className="flex items-center gap-2 border border-[#00B4AD] px-6 py-2 rounded-lg">
              <AiOutlineEdit size={20} />
              <span className="text-[#00B4AD]">Edit Client</span>
            </div>
          </div>
          <div className="py-2">Data &gt; Client List &gt; Client Detail</div>
          <div className="flex gap-4 pb-4 border-b-2">
            <div className="flex gap-2 border bg-[#454FA23D] px-4 py-2 rounded-full">
              <BiUserCircle size={20} />
              <span>Client Profile</span>
            </div>
            <div className="flex gap-2 border border-[#455361] px-4 py-2 rounded-full">
              <BiUserCircle size={20} />
              <span>Contract</span>
            </div>
            <div className="flex gap-2 border border-[#455361] px-4 py-2 rounded-full">
              <BiUserCircle size={20} />
              <span>Service History</span>
            </div>
            <div className="flex gap-2 border border-[#455361] px-4 py-2 rounded-full">
              <BiUserCircle size={20} />
              <span>Notification Setting</span>
            </div>
          </div>
          <div className="flex my-4 gap-6">
            <div className="flex flex-4 flex-col pt-8 pb-14 px-10 justify-center bg-white items-center rounded-lg">
              <BiUserCircle
                size={40}
                className="flex justify-center items-center mb-10"
              />
              <span className="text-xl font-bold">{client.name}</span>
              <span>{client.type}</span>
              <div className="flex flex-col py-2 text-center">
                <span>{contacts[0].email ?? 'No email yet'}</span>
                <span>{client.address ?? 'No Address yet'}</span>
              </div>
              <div className="flex items-center gap-3 border border-[#00B4AD] px-6 py-2 mb-4 rounded-lg">
                <BiUserCircle size={20} />
                <span className="text-[#00B4AD]">See Location</span>
              </div>
              <div className="flex items-center gap-2 border border-[#00B4AD] px-14 py-2 rounded-lg">
                <BiUserCircle size={20} />
                <Mailto email={contacts[0].email}>Mail</Mailto>
              </div>
            </div>
            <div className="flex-1 flex-col py-8 bg-white rounded-lg">
              <Contacts />
            </div>
            <div className="flex-1 flex-col py-8 bg-white rounded-lg">
              <div className="flex justify-between px-6">
                <span className="text-xl font-bold">General Notes</span>
                <NewGeneralNotesModal clientId={client.id} />
              </div>
              <div className="flex flex-col max-h-[30vh] overflow-y-auto mt-4 gap-4 px-6">
                <GeneralNotes />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold">Recent Contract</h3>
              <div className="bg-white p-4 rounded-lg mt-3">
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <span className="text-[#00B4AD] text-sm font-bold">
                      Contract ID 240920-CO-00021
                    </span>
                    <span className="text-xs">3 of 4 Entries</span>
                  </div>
                  <BsArrowUpCircle size={26} className="text-[#00B4AD]" />
                </div>
                <div className="p-3 my-3 border-2 rounded-lg">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2 pb-3">
                      <span className="text-sm font-bold">3rd Service</span>
                      <span className="text-xs">
                        12 September 2024, 2:30 PM
                      </span>
                    </div>
                    <div className="flex gap-2 items-center text-[#00B4AD]">
                      <span className="font-bold">View report</span>
                      <BsArrowRightCircle size={16} />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <div className="flex gap-2 text-xs">
                        <span className="font-bold">Team Leader</span>
                        <span>Team Leader 1</span>
                      </div>
                      <div className="flex gap-2 text-xs py-1">
                        <span className="font-bold">Technician 1</span>
                        <span>Name 1</span>
                      </div>
                      <div className="flex gap-2 text-xs">
                        <span className="font-bold">Technician 2</span>
                        <span>Name 2</span>
                      </div>
                    </div>
                    <div className="flex justify-end flex-col text-xs font-bold">
                      <span>Uploaded by :</span>
                      <div className="flex gap-2 pt-2">
                        <img
                          src={SampleProfileImg}
                          alt="Profile"
                          className="rounded-full"
                        />
                        <span>Team leader name</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 my-3 border-2 rounded-lg">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2 pb-3">
                      <span className="text-sm font-bold">2nd Service</span>
                      <span className="text-xs">
                        12 September 2024, 2:30 PM
                      </span>
                    </div>
                    <div className="flex gap-2 items-center text-[#00B4AD]">
                      <span className="font-bold">View report</span>
                      <BsArrowRightCircle size={16} />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <div className="flex gap-2 text-xs">
                        <span className="font-bold">Team Leader</span>
                        <span>Team Leader 1</span>
                      </div>
                      <div className="flex gap-2 text-xs py-1">
                        <span className="font-bold">Technician 1</span>
                        <span>Name 1</span>
                      </div>
                      <div className="flex gap-2 text-xs">
                        <span className="font-bold">Technician 2</span>
                        <span>Name 2</span>
                      </div>
                    </div>
                    <div className="flex justify-end flex-col text-xs font-bold">
                      <span>Uploaded by :</span>
                      <div className="flex gap-2 pt-2">
                        <img
                          src={SampleProfileImg}
                          alt="Profile"
                          className="rounded-full"
                        />
                        <span>Team leader name</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 my-3 border-2 rounded-lg">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2 pb-3">
                      <span className="text-sm font-bold">1st Service</span>
                      <span className="text-xs">
                        12 September 2024, 2:30 PM
                      </span>
                    </div>
                    <div className="flex gap-2 items-center text-[#00B4AD]">
                      <span className="font-bold">View report</span>
                      <BsArrowRightCircle size={16} />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <div className="flex gap-2 text-xs">
                        <span className="font-bold">Team Leader</span>
                        <span>Team Leader 1</span>
                      </div>
                      <div className="flex gap-2 text-xs py-1">
                        <span className="font-bold">Technician 1</span>
                        <span>Name 1</span>
                      </div>
                      <div className="flex gap-2 text-xs">
                        <span className="font-bold">Technician 2</span>
                        <span>Name 2</span>
                      </div>
                    </div>
                    <div className="flex justify-end flex-col text-xs font-bold">
                      <span>Uploaded by :</span>
                      <div className="flex gap-2 pt-2">
                        <img
                          src={SampleProfileImg}
                          alt="Profile"
                          className="rounded-full"
                        />
                        <span>Team leader name</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold">Recent AdHoc</h3>
              <div className="bg-white p-4 rounded-lg mt-3">
                <div className="flex justify-between">
                  <span className="font-bold">Cleaning & Washing</span>
                  <span className="text-sm">12 September 2024, 2:30 PM</span>
                </div>
                <div className="flex flex-col py-3">
                  <div className="flex gap-2 text-xs">
                    <span className="font-bold">Team Leader</span>
                    <span>Team Leader 1</span>
                  </div>
                  <div className="flex gap-2 text-xs py-1">
                    <span className="font-bold">Technician 1</span>
                    <span>Name 1</span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="font-bold">Technician 2</span>
                    <span>Name 2</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col text-xs font-bold">
                    <span>Uploaded by :</span>
                    <div className="flex gap-2 pt-2">
                      <img
                        src={SampleProfileImg}
                        alt="Profile"
                        className="rounded-full"
                      />
                      <span>Team leader name</span>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center text-[#00B4AD]">
                    <span className="font-bold">View report</span>
                    <BsArrowRightCircle size={16} />
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg mt-3">
                <div className="flex justify-between">
                  <span className="font-bold">Refill Gas</span>
                  <span className="text-sm">12 September 2024, 2:30 PM</span>
                </div>
                <div className="flex flex-col py-3">
                  <div className="flex gap-2 text-xs">
                    <span className="font-bold">Team Leader</span>
                    <span>Team Leader 1</span>
                  </div>
                  <div className="flex gap-2 text-xs py-1">
                    <span className="font-bold">Technician 1</span>
                    <span>Name 1</span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="font-bold">Technician 2</span>
                    <span>Name 2</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col text-xs font-bold">
                    <span>Uploaded by :</span>
                    <div className="flex gap-2 pt-2">
                      <img
                        src={SampleProfileImg}
                        alt="Profile"
                        className="rounded-full"
                      />
                      <span>Team leader name</span>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center text-[#00B4AD]">
                    <span className="font-bold">View report</span>
                    <BsArrowRightCircle size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Search & Filters */}
          <div className="flex flex-row justify-between mt-6">
            <div className="flex items-center relative">
              <TextInput
                className="w-full h-full pl-8 rounded-xl"
                placeholder="Search"
              />
              <BiSearch className="text-gray-500 absolute text-[20px] left-2" />
            </div>
            <div className="flex gap-4 items-end">
              <button
                type="button"
                className="bg-primary hover:bg-green-300 text-white font-bold py-2 px-4 rounded"
                onClick={() => setOpenCreateSubClientModal(true)}
              >
                Create New Sub-Client
              </button>
            </div>
          </div>
          {/* Search & Filters */}
          <div className="flex flex-1 mt-6 max-w-[80vw] relative">
            <div className="w-full h-[68vh] overflow-x-auto overflow-y-auto">
              <table className="w-full text-black relative">
                <thead className="relative bg-[#F0F0F0] rounded-full">
                  <tr>
                    <th className="px-4 py-2 min-w-[100px] text-[#455361]">
                      <div className="flex items-center">
                        <span className="text-primary">Sub-Client</span> &nbsp;
                        | ID
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
                    <th className="px-4 py-2 sticky left-0 min-w-[150px] text-[#455361] text-left">
                      Sub-Clients
                    </th>
                    <th className="px-4 py-2 sticky left-0 min-w-[150px] text-[#455361] text-left">
                      Billing Address
                    </th>
                    <th className="px-4 py-2 sticky left-0 min-w-max text-[#455361] text-left" />
                  </tr>
                </thead>
                <tbody className="relative">
                  {clientsData.map((item, i) => (
                    <tr
                      className={`text-[#455361] ${
                        i % 2 === 1 && 'bg-white rounded-full'
                      }`}
                      key={i}
                    >
                      <td className="px-4 py-4 my-1">
                        <div className="flex flex-col justify-center max-w-[200px]">
                          <b className="text-[15px]">{item.clientId.name}</b>
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
                          <span
                            className={`${
                              item.contactPerson.type === 'Residential'
                                ? 'bg-primary'
                                : 'bg-secondary'
                            } text-white text-[13px] mt-2 rounded-full text-center px-2 w-max`}
                          >
                            {item.contactPerson.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 my-1 max-w-[200px]">
                        <div className="flex flex-col justify-center">
                          <span className="text-[15px]">{item.contact}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 my-1 max-w-[200px]">
                        <div className="flex flex-col justify-center">
                          <span className="text-[14px]">{item.address}</span>
                        </div>
                      </td>
                      <td
                        className={`z-[${i + 1}] px-4 py-4 my-1 max-w-[200px]`}
                      >
                        <div className="flex text-primary flex-row items-center relative">
                          <span className="text-primary text-[14px]">
                            {item.subClients.length}
                          </span>
                          <button
                            className={`z-${i + 1} ml-2`}
                            onClick={() => handleSubClients(i)}
                          >
                            <BiInfoCircle size={20} />
                          </button>
                          <div
                            className={`${
                              i === showSubClients ? 'flex flex-col' : 'hidden'
                            } absolute w-max text-white bg-[#838383] max-h-[200px] top-5 left-4 rounded-sm p-2 z-[${
                              i + 400
                            }]`}
                          >
                            <button
                              onClick={() => setShowSubClients(null)}
                              className="self-end"
                            >
                              <AiFillCloseCircle className="text-white" />
                            </button>
                            <span>Sub Client:</span>
                            {item.subClients.map(subClient => (
                              <span className="p-1" key={subClient.id}>
                                {subClient.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 my-1 max-w-[200px]">
                        <div className="flex flex-col justify-center">
                          <span className="text-[14px]">
                            {item.billingAddress}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4 my-1">
                        <Link
                          href="/client-details"
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Profile;

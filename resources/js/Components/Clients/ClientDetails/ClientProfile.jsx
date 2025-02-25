import React, { useState } from 'react';
import {
  AiOutlineEdit,
  AiOutlineMail,
  AiFillCloseCircle,
  AiOutlineRightCircle,
} from 'react-icons/ai';
import { BiSearch, BiUserCircle, BiInfoCircle } from 'react-icons/bi';
import { Link } from '@inertiajs/react';
import {
  BsArrowRightCircle,
  BsArrowUpCircle,
  BsTelephone,
} from 'react-icons/bs';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { PiNotepadBold } from 'react-icons/pi';
import { HiChevronUpDown } from 'react-icons/hi2';
import { FaRegMap } from 'react-icons/fa';
import { CiMail } from 'react-icons/ci';
import SampleProfileImg from '../../../assets/images/sample-profile.png';
import TextInput from '../../TextInput';
import NewClientPOCModal from '../Modals/NewClientPOCModal';
import NewGeneralNotesModal from '../Modals/NewGeneralNotesModal';
import DeletePOCModal from '../Modals/DeletePOCModal';
import DeleteGeneralNotesModal from '../Modals/DeleteGeneralNotesModal';
import CreateSubClientModal from '../Modals/CreateSubClientModal';
import { GeneralNotes, POCData, clientsData } from '../../../Helpers/constants';

function ClientProfile() {
  const [openNewPOCModal, setOpenNewPOCModal] = useState(false);
  const [openNewGeneralNotesModal, setOpenNewGeneralNotesModal] =
    useState(false);
  const [openDeletePOCModal, setOpenDeletePOCModal] = useState(false);
  const [openDeleteGeneralNoteModal, setOpenDeleteGeneralNoteModal] =
    useState(false);
  const [openCreateSubClientModal, setOpenCreateSubClientModal] =
    useState(false);
  const [dataToDelete, dataPocToDelete] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSubClients, setShowSubClients] = useState(null);

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

  const handleClientsChecked = (name, value, checked) => {
    if (checked) {
      setCheckedClientsFilters([...checkedClientsFilters, value]);
    } else {
      setCheckedClientsFilters(checkedClientsFilters.filter(f => f !== value));
    }
  };

  return (
    <div>
      <NewClientPOCModal
        openModal={openNewPOCModal}
        setOpenModal={setOpenNewPOCModal}
      />
      <NewGeneralNotesModal
        openModal={openNewGeneralNotesModal}
        setOpenModal={setOpenNewGeneralNotesModal}
      />
      <DeletePOCModal
        data={dataToDelete}
        openModal={openDeletePOCModal}
        setOpenModal={setOpenDeletePOCModal}
      />
      <DeleteGeneralNotesModal
        data={dataToDelete}
        openModal={openDeleteGeneralNoteModal}
        setOpenModal={setOpenDeleteGeneralNoteModal}
      />
      <CreateSubClientModal
        openModal={openCreateSubClientModal}
        setOpenModal={setOpenCreateSubClientModal}
      />
      <div className="flex my-4 gap-6">
        <div className="flex flex-4 flex-col pt-8 pb-14 px-10 justify-center bg-white items-center rounded-lg">
          <BiUserCircle
            size={20}
            className="flex justify-center items-center"
          />
          <span className="text-xl font-bold">Casuarina Curry</span>
          <span className="text-xl font-bold">(Thomson)</span>
          <span>Residential</span>
          <div className="flex flex-col py-2">
            <span>No email yet</span>
            <span>No address yet</span>
          </div>
          <div className="flex items-center gap-3 border border-[#00B4AD] px-6 py-2 mb-4 rounded-lg">
            <FaRegMap size={20} />
            <span className="text-[#00B4AD]">Location</span>
          </div>
          <div className="flex items-center gap-2 border border-[#00B4AD] px-14 py-2 rounded-lg">
            <CiMail size={20} />
            <span className="text-[#00B4AD]">Email</span>
          </div>
        </div>
        <div className="flex-1 flex-col py-8 bg-white rounded-lg">
          <div className="flex justify-between px-6">
            <span className="text-xl font-bold">POC Information</span>
            <button
              onClick={() => setOpenNewPOCModal(true)}
              className="text-xl font-bold text-[#00B4AD]"
            >
              + Add New
            </button>
          </div>
          <div className="max-h-[30vh] overflow-y-auto px-6">
            {POCData.map((poc, i) => (
              <div key={i}>
                <div className="flex justify-between pt-4">
                  <span className="text-md font-bold">
                    {poc.name || 'POC 1'}
                  </span>
                  <div className="flex items-center gap-2 text-primary">
                    <button>
                      <AiOutlineEdit size={20} />
                    </button>
                    <button onClick={() => handleOnDelete('poc', poc)}>
                      <RiDeleteBin5Line size={20} color="red" />
                    </button>
                  </div>
                </div>
                <span className="text-sm text-[#00B4AD] font-bold py-2">
                  {poc.personName || 'Albert'}
                </span>
                <div className="flex items-center gap-2 py-2">
                  <BsTelephone size={18} />
                  <span>{poc.phone || '+65 9208 3801'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <AiOutlineMail size={18} />
                  <span>{poc.email || 'alberts@casuarina.com.sg'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex-col py-8 bg-white rounded-lg">
          <div className="flex justify-between px-6">
            <span className="text-xl font-bold">General Notes</span>
            <button
              onClick={() => setOpenNewGeneralNotesModal(true)}
              className="text-xl font-bold text-[#00B4AD]"
            >
              + Add New
            </button>
          </div>
          <div className="flex flex-col max-h-[30vh] overflow-y-auto mt-4 gap-4 px-6">
            {GeneralNotes.map((note, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center text-secondary font-extrabold">
                    <PiNotepadBold size={18} />
                    <span>General Notes</span>
                  </div>
                  <button onClick={() => handleOnDelete('general-notes', note)}>
                    <RiDeleteBin5Line size={20} color="red" />
                  </button>
                </div>
                <div className="text-black text-[15px]">{note.notes}</div>
                <div className="text-[#303030] text-[12px]">
                  Updated on {note.dateTime} by{' '}
                  <span className="text-primary font-bold">
                    {note.updatedBy}
                  </span>
                </div>
              </div>
            ))}
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
                  <span className="text-xs">12 September 2024, 2:30 PM</span>
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
                  <span className="text-xs">12 September 2024, 2:30 PM</span>
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
                  <span className="text-xs">12 September 2024, 2:30 PM</span>
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
                    <span className="text-primary">Sub-Client</span> &nbsp; | ID
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
                      <span className="text-[12px]">{item.clientId.id}</span>
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
                  <td className={`z-[${i + 1}] px-4 py-4 my-1 max-w-[200px]`}>
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
                      <span className="text-[14px]">{item.billingAddress}</span>
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
  );
}

export default ClientProfile;

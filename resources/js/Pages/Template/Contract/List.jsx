import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { BiSearch } from 'react-icons/bi';
import TextInput from '@/Components/TextInput';
import { MdAddCircleOutline } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import NewContractTemplateModal from '@/Components/Template/Modals/NewContractTemplateModal';
import { IconButton } from '@material-tailwind/react';
import useDeleteContractTemplate from '@/Hooks/Template/Contract/useDeleteContract.js';
import DeleteConfirmationModal from '../../../Components/Template/Modals/DeleteConfirmationModal';

function List({ auth, contractTemplates }) {
  const { data: contracts } = contractTemplates;

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openNewContractModal, setOpenNewContractModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  const { handleDeleteContract } = useDeleteContractTemplate();

  const onEdit = contractData => {
    setSelectedContract(contractData);
    setOpenNewContractModal(true);
  };

  const handleDelete = contractData => {
    setSelectedContract(contractData);
    setOpenDeleteModal(true);
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Contract List" />
      <NewContractTemplateModal
        contract={selectedContract}
        title="Contract"
        openModal={openNewContractModal}
        setOpenModal={setOpenNewContractModal}
      />
      <DeleteConfirmationModal
        title="Contract"
        content={
          <div className="text-[#455361] flex flex-col">
            <b>Contract Template</b>
            <span>{selectedContract?.name}</span>
            <b>Number of Service Report</b>
            <span>{selectedContract?.service_count}</span>
          </div>
        }
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        onDelete={() => {
          handleDeleteContract(selectedContract.id, () => {
            setOpenDeleteModal(false);
          });
        }}
      />
      <div className="flex flex-auto flex-col m-6 gap-6 max-w-full">
        <div className="text-zinc-800 text-3xl font-bold leading-10">
          Contract Template
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <div className="flex items-center relative">
              <TextInput
                className="w-full h-full pl-8 rounded-xl"
                placeholder="Search"
              />
              <BiSearch className="text-gray-500 absolute text-[20px] left-2" />
            </div>
            <button
              onClick={() => onEdit(null)}
              className="flex text-white py-2 px-4 justify-center items-center gap-2 bg-primary rounded-xl"
            >
              <MdAddCircleOutline size={20} />
              <span>New Contract Template</span>
            </button>
          </div>
        </div>

        <div className="flex flex-1 max-w-[80vw] relative">
          <div className="w-full h-[68vh] overflow-x-auto overflow-y-auto">
            <table className="w-full text-black relative">
              <thead className="relative bg-[#F0F0F0] rounded-full">
                <tr>
                  <th className="px-4 py-2 sticky left-0 min-w-[150px]  max-w-[200px] text-[#455361] text-left">
                    Contract Name
                  </th>
                  <th className="px-4 py-2 sticky left-0 min-w-[150px] max-w-[200px] text-[#455361] text-center">
                    Number of Service Report
                  </th>
                  <th className="px-4 py-2 max-w-max" />
                </tr>
              </thead>
              <tbody className="relative">
                {contracts.map((contract, i) => (
                  <tr
                    className={`text-[#455361] ${
                      i % 2 === 1 && 'bg-white rounded-full'
                    } items-center`}
                    style={{
                      borderRadius: '100px',
                    }}
                    key={i}
                  >
                    <td className="px-4 py-2 my-1">{contract.name}</td>
                    <td className="px-4 py-2 text-center my-1">
                      {contract.service_count}
                    </td>
                    <td className="py-2 my-1 flex items-center justify-center gap-4">
                      <IconButton
                        variant="text"
                        onClick={() => onEdit(contract)}
                      >
                        <AiOutlineEdit className="text-primary" size={20} />
                      </IconButton>
                      <IconButton
                        variant="text"
                        onClick={() => handleDelete(contract)}
                      >
                        <RiDeleteBin6Line color="red" size={20} />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default List;

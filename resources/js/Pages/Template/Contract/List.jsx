import { Head, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { BiSearch } from 'react-icons/bi';
import TextInput from '@/Components/TextInput';
import { MdAddCircleOutline } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import DeleteConfirmationModal from '../../../Components/Template/Modals/DeleteConfirmationModal';
import NewTemplateModal from '../../../Components/Template/Modals/NewTemplateModal';

const List = ({ auth }) => {
    const contracts = [
        {
            name: 'One Year Quarterly Maintenance Contract',
            noOfSR: 4
        },
        {
            name: 'One Year Monthly Maintenance Contract',
            noOfSR: 12
        },
        {
            name: 'One Year Bi-monthly Maintenance Contract',
            noOfSR: 6
        },
        {
            name: 'Two Years Bi-monthly Maintenance Contract',
            noOfSR: 8
        },
        {
            name: 'One Year Triannual Maintenance Contract',
            noOfSR: 3
        },
        {
            name: 'Nine Months Quarterly Maintenance Contract',
            noOfSR: 3
        },
        {
            name: 'Half Year Quarterly Maintenance Contract',
            noOfSR: 2
        },
    ];

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openNewContractModal, setOpenNewContractModal] = useState(false);
    const [contract, setContract] = useState(null);

    const onEdit = (contract) => {
        setContract(contract);
        setOpenNewContractModal(true);
    }

    const handleDelete = (contract) => {
        setContract(contract);
        setOpenDeleteModal(true);
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Contract List" />
            <NewTemplateModal
                task={contract}
                title={'Contract'}
                openModal={openNewContractModal}
                setOpenModal={setOpenNewContractModal}
            />
            <DeleteConfirmationModal
                title={'Contract'}
                content={
                    <div className='text-[#455361] flex flex-col'>
                        <b>Contract Template</b>
                        <span>{contract?.name}</span>
                        <b>Number of Service Report</b>
                        <span>{contract?.noOfSR}</span>
                    </div>
                }
                openModal={openDeleteModal}
                setOpenModal={setOpenDeleteModal}
            />
            <div className="flex flex-auto flex-col m-6 gap-6 max-w-full">
                <div className="text-zinc-800 text-3xl font-bold leading-10">
                    Contract Template
                </div>

                <div className='flex flex-col'>
                    {/* Search & Filters */}
                    <div className='flex flex-row justify-between'>
                        <div className='flex items-center relative'>
                            <TextInput
                                className='w-full h-full pl-8 rounded-xl'
                                placeholder='Search'
                            />
                            <BiSearch className='text-gray-500 absolute text-[20px] left-2' />
                        </div>
                        <button onClick={() => onEdit(null)} className='flex text-white py-2 px-4 justify-center items-center gap-2 bg-primary rounded-xl'>
                            <MdAddCircleOutline size={20} />
                            <span>New Contract Template</span>
                        </button>
                    </div>
                </div>

                <div className='flex flex-1 max-w-[80vw] relative'>
                    <div className="w-full h-[68vh] overflow-x-auto overflow-y-auto">
                        <table className="w-full text-black relative">
                            <thead className="relative bg-[#F0F0F0] rounded-full">
                                <tr>
                                    <th className="px-4 py-2 sticky left-0 min-w-[150px]  max-w-[200px] text-[#455361] text-left">Contract Name</th>
                                    <th className="px-4 py-2 sticky left-0 min-w-[150px] max-w-[200px] text-[#455361] text-center">Number of Service Report</th>
                                    <th className="px-4 py-2 max-w-max">
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='relative'>
                                {
                                    contracts.map((contract, i) => (
                                        <tr className={`text-[#455361] ${i % 2 === 1 && 'bg-white rounded-full'} items-center`} style={{
                                            borderRadius: '100px'
                                        }} key={i}>
                                            <td className='px-4 py-2 my-1'>
                                                {contract.name}
                                            </td>
                                            <td className='px-4 py-2 text-center my-1'>
                                                {contract.noOfSR}
                                            </td>
                                            <td className='py-2 my-1 flex items-center justify-center gap-4'>
                                                <button onClick={() => onEdit(contract)}>
                                                    <AiOutlineEdit className='text-primary' size={20} />
                                                </button>
                                                <button onClick={() => handleDelete(contract)}>
                                                    <RiDeleteBin6Line color='red' size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default List;

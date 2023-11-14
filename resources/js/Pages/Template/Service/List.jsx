import { Head, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { BiSearch } from 'react-icons/bi';
import TextInput from '@/Components/TextInput';
import { MdAddCircleOutline } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import NewServiceModal from '../../../Components/Template/Service/Modals/NewServiceModal';
import DeleteConfirmationModal from '../../../Components/Template/Modals/DeleteConfirmationModal';
import NewTemplateModal from '../../../Components/Template/Modals/NewTemplateModal';

const List = ({ auth }) => {

    const tasks = [
        {
            name: 'Maintenance Contract - Quarterly (1 Yr)'
        },
        {
            name: 'Maintenance Contract - Bi-Monthly (1 Yr)'
        },
        {
            name: 'Maintenance Contract - Triannual (1 Yr)'
        },
        {
            name: 'Maintenance Contract - Quarterly (9 Mths)'
        },
        {
            name: 'Maintenance Contract - Quarterly (1/2 Yr)'
        },
        {
            name: 'Ad-hoc General Servicing'
        },
        {
            name: 'Checking'
        },
        {
            name: 'Chemical Flushing + Part Replacement'
        },
    ];

    const [openNewServiceModal, setOpenNewServiceModal] = useState(false);
    const [openDeleteServiceModal, setOpenDeleteServiceModal] = useState(false);
    const [service, setService] = useState(null);

    const onEdit = (service) => {
        setService(service);
        setOpenNewServiceModal(true);
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Service List" />
            <NewTemplateModal
                task={service}
                title={'Service'}
                openModal={openNewServiceModal}
                setOpenModal={setOpenNewServiceModal}
            />
            <DeleteConfirmationModal
                title={'Service'}
                content={<span className='text-[#455361]'>Maintenance Contract Quarterly</span>}
                openModal={openDeleteServiceModal}
                setOpenModal={setOpenDeleteServiceModal}
            />
            <div className="flex flex-auto flex-col m-6 gap-6 max-w-full">
                <div className="text-zinc-800 text-3xl font-bold leading-10">
                    Service Template
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
                            <span>New Service Template</span>
                        </button>
                    </div>
                </div>

                <div className='flex flex-1 max-w-[80vw] relative'>
                    <div className="w-full h-[68vh] overflow-x-auto overflow-y-auto">
                        <table className="w-full text-black relative">
                            <thead className="relative bg-[#F0F0F0] rounded-full">
                                <tr>
                                    <th className="px-4 py-2 sticky left-0 min-w-[150px] text-[#455361] text-left">Service Name</th>
                                    <th className="px-4 py-2 max-w-max">
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='relative'>
                                {
                                    tasks.map((task, i) => (
                                        <tr className={`text-[#455361] ${i % 2 === 1 && 'bg-white rounded-full'} items-center`} style={{
                                            borderRadius: '100px'
                                        }} key={i}>
                                            <td className='px-4 py-2 my-1'>
                                                {task.name}
                                            </td>
                                            <td className='py-2 my-1 flex items-center justify-center gap-4'>
                                                <button onClick={() => onEdit(task)}>
                                                    <AiOutlineEdit className='text-primary' size={20} />
                                                </button>
                                                <button onClick={() => setOpenDeleteServiceModal(true)}>
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

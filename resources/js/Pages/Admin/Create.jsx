
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EmployeeImg from '../../assets/images/employee_sample.png';
import TextInput from '../../Components/TextInput';
import DropdownInput from '../../Components/Common/DropdownInput';
import DatePicker from '../../Components/Common/DatePicker';
import InputLabel from '../../Components/InputLabel';
import PhoneNumberInput from '../../Components/Shared/PhoneNumberInput';
import DeleteModal from '../../Components/Employee/Modals/DeleteModal';

const adminTypes = [
    { label: 'Admin', value: 'admin' },
    { label: 'Super Admin', value: 'super_admin' },
]
const Create = ({ auth }) => {
    const [adminType, setAdminType] = useState('');
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Employee Create" />
            <DeleteModal openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} />
            <div className="flex-auto flex flex-col m-6">
                <div className='flex flex-col'>
                    <div className="text-zinc-800 text-3xl font-bold leading-10">
                        New Admin
                    </div>
                    <div className='text-[#BCBDC0]'>
                        Data &gt; Admin &gt; New Admin
                    </div>
                </div>

                <div className='flex flex-col bg-white rounded-xl p-6 max-w-[800px] gap-4 mt-12'>
                    <img src={EmployeeImg} className='object-contain rounded-full h-14 w-14 self-center' />

                    <div className='flex flex-col gap-1'>
                        <b className='text-black text-[16px]'>Employee Name <span className='text-red-600'>*</span></b>
                        <TextInput
                            className='w-full h-full rounded-xl'
                            placeholder='Employee Name'
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <b className='text-black text-[16px]'>Vehicle No.</b>
                        <DropdownInput
                            label={'Admin Type'}
                            items={adminTypes}
                            selectedItem={adminType}
                            onItemSelect={item => setAdminType(item)}
                        />
                    </div>
                    <button className='rounded-xl bg-primary py-2 w-full text-white font-bold mt-8'>Save Changes</button>
                    <button className='rounded-xl py-2 w-full text-red-600 font-bold' onClick={() => setOpenDeleteModal(true)}>Delete Employee</button>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Create;

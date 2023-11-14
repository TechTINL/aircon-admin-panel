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

const positions = [
    { label: 'Team Leader', value: 'team_leader' },
    { label: 'Sub-Contractor', value: 'sub_contractor' },
    { label: 'Full-Time Technician', value: 'full_time_technician' },
    { label: 'Part-Time Technician', value: 'part_time_technician' },
]
const Create = ({ auth }) => {
    const [jobPosition, setJobPosition] = useState(null);
    const [joinedSince, setJoinedSince] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Employee Create" />
            <DeleteModal openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} />
            <div className="flex-auto flex flex-col m-6">
                <div className='flex flex-col'>
                    <div className="text-zinc-800 text-3xl font-bold leading-10">
                        Edit Employee
                    </div>
                    <div className='text-[#BCBDC0]'>
                        Data &gt; Employee &gt; Edit Employee
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

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='flex flex-col'>
                            <b className='text-black text-[16px]'>Job Position</b>
                            <DropdownInput
                                label={'Employee Name'}
                                items={positions}
                                selectedItem={jobPosition}
                                onItemSelect={item => setJobPosition(item)}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <b className='text-black text-[16px]'>Joined Since</b>
                            <DatePicker
                                label={'Joined Since'}
                                classes={'rounded-xl'}
                                onChange={(value) => setJoinedSince(value)}
                                value={joinedSince}
                            />
                        </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <b className='text-black text-[16px]'>Vehicle No.</b>
                        <TextInput
                            className='w-full h-full rounded-xl'
                            placeholder='Vehicle Number'
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="phone"
                            value="Mobile Number"
                            className="text-zinc-800 text-base font-bold my-1"
                        />

                        <PhoneNumberInput
                            id="phone"
                            name="phone"
                            className="mt-1 block w-full"
                            value={phoneNumber}
                            onChange={value => setPhoneNumber(value)}
                        />
                    </div>

                    <button className='rounded-xl bg-primary py-2 w-full text-white font-bold mt-8'>Save Changes</button>
                    <button className='rounded-xl py-2 w-full text-red-600 font-bold' onClick={() => setOpenDeleteModal(true)}>Delete Employee</button>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Create
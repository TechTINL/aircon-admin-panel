import Modal from '@/Components/Modal';
import React, { useState } from 'react';
import { AiFillCloseCircle, AiOutlineClockCircle } from 'react-icons/ai';
import EmployeeImg from '../../../assets/images/employee_sample.png';

const DeleteModal = ({
    openModal,
    setOpenModal
}) => {

    return (
        <Modal
            show={openModal}
            onClose={() => setOpenModal(false)}
            maxWidth="4xl"
        >
            <div className='flex flex-col p-8 text-black gap-4'>
                <div className="flex justify-between">
                    <div className="text-zinc-800 text-3xl font-bold leading-10">
                        Delete Employee
                    </div>
                    <button onClick={() => setOpenModal(false)}>
                        <AiFillCloseCircle className="text-border-gray text-4xl" />
                    </button>
                </div>

                <div className='flex gap-4 border border-border-gray rounded-xl p-4'>
                    <img src={EmployeeImg} className='object-contain rounded-full h-14 w-14 self-center' />
                    <div className='flex flex-col py-2 justify-between'>
                        <span className='text-[18px]'>Anthony Birkin</span>
                        <span className='bg-[#F1F3FF] px-3 py-1 rounded-full text-[#454FA2]'>Team Leader</span>
                    </div>
                </div>
                <span>Are you sure you want to delete this employee?</span>
                <div className='flex flex-col items-center gap-4 justify-center mt-6'>
                    <button className='bg-red-600 py-2 w-full max-w-[600px] rounded-xl text-white font-bold'>Delete Employee</button>
                    <button className='py-2 w-full max-w-[600px] rounded-xl text-black font-bold'>Cancel</button>
                </div>
            </div>
        </Modal >
    )
}

export default DeleteModal
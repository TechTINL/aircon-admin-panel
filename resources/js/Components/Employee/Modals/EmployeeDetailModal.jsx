import Modal from '@/Components/Modal';
import React, { useState } from 'react'
import EmployeeImg from '../../../assets/images/employee_sample.png';
import { AiFillCloseCircle } from 'react-icons/ai';

const EmployeeDetailModal = ({
    openModal,
    setOpenModal
}) => {
    return (
        <Modal
            show={openModal}
            onClose={() => setOpenModal(false)}
            maxWidth="4xl"
        >
            <div className='flex flex-col px-8 py-12 text-black gap-4'>

                <div className='flex justify-between items-center'>

                    <div className='flex gap-4 justify-center items-center'>
                        <img src={EmployeeImg} className='object-contain rounded-full h-12 w-12' />
                        <div className='flex flex-col py-2 justify-between'>
                            <b className='text-[20px]'>Anthony Birkin</b>
                            <span className='text-[14px]'>+65 9183 7475</span>
                        </div>
                    </div>

                    <button onClick={() => setOpenModal(false)}>
                        <AiFillCloseCircle className="text-border-gray text-4xl" />
                    </button>
                </div>

                <div className='grid grid-cols-2 gap-8 text-[20px]'>
                    <div className='flex flex-col gap-1'>
                        <b>Job Position</b>
                        <span>Team Leader</span>
                    </div>
                    <div className=''></div>

                    <div className='flex flex-col gap-1'>
                        <b>Status</b>
                        <span className='text-primary'>Available</span>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <b>Joined Since</b>
                        <span className='text-[16px]'>10 September 2023</span>
                    </div>

                    <b>On Leave Schedule</b>
                    <div></div>

                    <div className='flex flex-col gap-1 -mt-5'>
                        <span>On Leave Date</span>
                        <b className='text-red-600'>24/12/2023 - 31/12/2023</b>
                        <span>12/08/2023 - 14/08/2023</span>
                        <span>10/08/2023</span>
                    </div>

                    <div className='flex flex-col gap-1 -mt-5'>
                        <span>On Leave Time</span>
                        <b className='text-red-600'>All Day</b>
                        <span>All Day</span>
                        <span>9:00 - 13:00</span>
                    </div>

                </div>

                <div className='flex flex-col items-center gap-6 mt-16'>
                    <button className='bg-primary text-white rounded-xl w-[80%] max-w-[800px] py-3 font-bold'>Edit Employee</button>
                    <button className='border border-red-600 text-red-600 rounded-xl w-[80%] max-w-[800px] py-3 font-bold'>Add Leave</button>
                </div>
            </div>
        </Modal>
    )
}

export default EmployeeDetailModal;
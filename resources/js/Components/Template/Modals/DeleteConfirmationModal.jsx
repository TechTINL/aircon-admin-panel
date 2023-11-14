import DatePicker from '@/Components/Common/DatePicker';
import DropdownInput from '@/Components/Common/DropdownInput';
import Modal from '@/Components/Modal';
import React, { useState } from 'react';
import { AiFillCloseCircle, AiOutlineClockCircle } from 'react-icons/ai';
import TextInput from '../../TextInput';

const DeleteConfirmationModal = ({
    title,
    content,
    openModal,
    setOpenModal
}) => {
    const [name, setName] = useState('')

    return (
        <Modal
            show={openModal}
            onClose={() => setOpenModal(false)}
            maxWidth="4xl"
        >
            <div className='flex flex-col p-8 text-black gap-8'>
                <div className="flex justify-between">
                    <div className="text-zinc-800 text-3xl font-bold leading-10">
                        Delete {title} Template
                    </div>
                    <button onClick={() => setOpenModal(false)}>
                        <AiFillCloseCircle className="text-border-gray text-4xl" />
                    </button>
                </div>

                <div>
                    <div className='flex p-4 border border-[#455361] rounded-xl'>
                        {content}
                    </div>

                    <div className='mt-2 text-[#455361]'>Are you sure you want to delete this {title} template?</div>
                </div>

                <div className='flex flex-col items-center justify-center mt-6'>
                    <button className='bg-red-600 py-2 w-full max-w-[600px] rounded-xl text-white font-bold'>Delete {title} Template</button>
                    <button className='py-2 w-full max-w-[600px] rounded-xl text-black font-bold'>Cancel</button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteConfirmationModal;

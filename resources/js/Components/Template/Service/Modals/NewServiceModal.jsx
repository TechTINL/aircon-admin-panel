import DatePicker from '@/Components/Common/DatePicker';
import DropdownInput from '@/Components/Common/DropdownInput';
import Modal from '@/Components/Modal';
import React, { useState } from 'react';
import { AiFillCloseCircle, AiOutlineClockCircle } from 'react-icons/ai';
import TextInput from '../../../TextInput';

const NewServiceModal = ({
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
            <div className='flex flex-col p-8 text-black gap-4'>
                <div className="flex justify-between">
                    <div className="text-zinc-800 text-3xl font-bold leading-10">
                        New Service Template
                    </div>
                    <button onClick={() => setOpenModal(false)}>
                        <AiFillCloseCircle className="text-border-gray text-4xl" />
                    </button>
                </div>

                <div className='flex flex-col gap-2'>
                    <b className='text-[16px]'>Service Name <span className='text-red-600'>*</span></b>
                    <TextInput
                        placeholder={'Service Name'}
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                </div>

                <div className='flex flex-col items-center justify-center mt-6'>
                    <button className='bg-primary py-2 w-full max-w-[600px] rounded-xl text-white font-bold'>Save Service Template</button>
                    <button className='py-2 w-full max-w-[600px] rounded-xl text-black font-bold'>Cancel</button>
                </div>
            </div>
        </Modal>
    )
}

export default NewServiceModal
import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import Modal from '../../Modal';
import TextInput from '../../TextInput';

const NewClientPOCModal = ({
    openModal,
    setOpenModal,
}) => {
    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)} maxWidth='4xl'>
            <div className='flex flex-col p-6 w-[100%] max-h-[80vh] overflow-y-auto'>
                <div className='flex justify-between items-center'>
                    <div className="text-zinc-800 text-3xl font-bold leading-10">
                        New POC
                    </div>
                    <button className='self-end' onClick={() => setOpenModal(false)}>
                        <AiFillCloseCircle
                            className='text-border-gray text-4xl'
                        />
                    </button>
                </div>
                <div className='flex flex-col mt-6'>

                    <div>Client Name <span className='text-red-600'>*</span></div>
                    <TextInput
                        id="name"
                        name="name"
                        className="mt-1 block w-full bg-gray-50"
                        placeholder='POC Name'
                        onChange={e => setData('name', e.target.value)}
                    />
                    <div className='flex gap-6 mt-4'>
                        <div className='flex-1'>
                            <div>Phone Number</div>
                            <TextInput
                                id="phone"
                                name="phone"
                                type='tel'
                                placeholder="Phone Number"
                                className="mt-1 block w-full bg-gray-50"
                                onChange={e => setData('name', e.target.value)}
                            />
                        </div>
                        <div className='flex-1'>
                            <div>Email</div>
                            <TextInput
                                id="email"
                                name="email"
                                type="email"
                                placeholder="poc@email.com"
                                className="mt-1 block w-full bg-gray-50"
                                onChange={e => setData('name', e.target.value)}
                            />
                        </div>
                    </div>
                    <button className='self-center mt-6 font-extrabold text-lg w-[70%] py-2 border text-white justify-center items-center bg-primary rounded-xl flex flex-row'>
                        Create POC
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default NewClientPOCModal
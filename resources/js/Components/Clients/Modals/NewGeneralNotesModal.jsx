import React, { useState } from 'react'
import Modal from '../../Modal';
import { AiFillCloseCircle } from 'react-icons/ai';
import TextInput from '../../TextInput';
import TextArea from '../../Shared/TextArea';

const NewGeneralNotesModal = ({
    openModal,
    setOpenModal,
}) => {
    const [notes, setNotes] = useState('');

    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)} maxWidth='4xl'>
            <div className='flex flex-col p-6 w-[100%] max-h-[80vh] overflow-y-auto'>
                <div className='flex justify-between items-center'>
                    <div className="text-zinc-800 text-3xl font-bold leading-10">
                        New General Notes
                    </div>
                    <button className='self-end' onClick={() => setOpenModal(false)}>
                        <AiFillCloseCircle
                            className='text-border-gray text-4xl'
                        />
                    </button>
                </div>
                <div className='flex flex-col mt-6'>
                    <div>General Note Contents <span className='text-red-600'>*</span></div>
                    <TextArea
                        id="general_note_contents"
                        placeholder="Insert General Notes here..."
                        onChange={value => setNotes(value)}
                    />
                    <button className='self-center mt-6 font-extrabold w-[70%] py-2 border text-white justify-center items-center bg-primary rounded-xl flex flex-row'>
                        Create General Notes
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default NewGeneralNotesModal;

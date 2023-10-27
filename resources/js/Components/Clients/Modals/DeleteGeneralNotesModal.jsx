import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import Modal from '../../Modal';
import { PiNotepadBold } from 'react-icons/pi';

const DeleteGeneralNotesModal = ({
    data,
    openModal,
    setOpenModal,
}) => {
    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)} maxWidth='4xl'>
            <div className='flex flex-col p-6 w-[100%] max-h-[80vh] overflow-y-auto'>
                <div className='flex justify-between items-center'>
                    <div className="text-zinc-800 text-3xl font-bold leading-10">
                        Delete General Note
                    </div>
                    <button className='self-end' onClick={() => setOpenModal(false)}>
                        <AiFillCloseCircle
                            className='text-border-gray text-4xl'
                        />
                    </button>
                </div>

                <div className='flex flex-col border border-border-gray rounded-lg p-4 mt-6'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-4 items-center text-secondary font-extrabold'>
                            <PiNotepadBold size={18} />
                            <span>General Notes</span>
                        </div>
                        <div className='text-[#303030] text-[15px] max-w-[400px]'>{data?.notes}</div>
                        <div className='text-[#303030] text-[12px]'>Updated on {data?.dateTime} by <span className='text-primary font-bold'>{data?.updatedBy}</span></div>
                    </div>
                </div>

                <div className='text-[#303030] my-4'>Are you sure you want to delete this general note?</div>
                <button onClick={() => setOpenModal(false)} className='self-center mt-6 font-extrabold w-[70%] py-2 text-white justify-center items-center bg-red-600 rounded-xl flex flex-row'>
                    Delete General Note
                </button>
                <button onClick={() => setOpenModal(false)} className='self-center mt-6 text-[16px] font-extrabold w-[70%] py-2 text-black justify-center items-center rounded-xl flex flex-row'>
                    Cancel
                </button>
            </div>
        </Modal>
    )
}
export default DeleteGeneralNotesModal;

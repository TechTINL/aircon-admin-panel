import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import GeneralNote from '@/Components/Clients/Note';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { router } from '@inertiajs/react';
import Modal from '../../Modal';

function DeleteGeneralNotesModal({ data }) {
  const [openModal, setOpenModal] = useState(false);

  const handleOnDelete = id => {
    router.delete(route('general-notes.destroy', id), {
      preserveScroll: true,
      onSuccess: () => {
        setOpenModal(false);
      },
    });
  };

  return (
    <>
      <button type="button" onClick={() => setOpenModal(true)}>
        <RiDeleteBin5Line size={20} color="red" />
      </button>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="4xl"
      >
        <div className="flex flex-col p-6 w-[100%] max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center">
            <div className="text-zinc-800 text-3xl font-bold leading-10">
              Delete General Note
            </div>
            <button className="self-end" onClick={() => setOpenModal(false)}>
              <AiFillCloseCircle className="text-border-gray text-4xl" />
            </button>
          </div>

          <div className="flex flex-col border border-border-gray rounded-lg p-4 mt-6">
            <GeneralNote data={data} />
          </div>

          <div className="text-[#303030] my-4">
            Are you sure you want to delete this general note?
          </div>
          <button
            type="button"
            onClick={() => handleOnDelete(data.id)}
            className="self-center mt-6 font-extrabold w-[70%] py-2 text-white justify-center items-center bg-red-600 rounded-xl flex flex-row"
          >
            Delete General Note
          </button>
          <button
            onClick={() => setOpenModal(false)}
            className="self-center mt-6 text-[16px] font-extrabold w-[70%] py-2 text-black justify-center items-center rounded-xl flex flex-row"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}
export default DeleteGeneralNotesModal;

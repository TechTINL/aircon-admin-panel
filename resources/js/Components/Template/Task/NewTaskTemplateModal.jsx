import Modal from '@/Components/Modal';
import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useForm } from '@inertiajs/react';
import TextInput from '../../TextInput';

function NewTaskTemplateModal({ openModal, setOpenModal }) {
  const { data, setData, post, errors } = useForm({
    name: '',
  });

  const handleSaveTask = e => {
    e.preventDefault();
    post('/task-templates', {
      onSuccess: () => {
        setOpenModal(false);
      },
      onError: error => {
        setOpenModal(false);
        console.log(error);
      },
    });
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} maxWidth="4xl">
      <div className="flex flex-col p-8 text-black gap-4">
        <div className="flex justify-between">
          <div className="text-zinc-800 text-3xl font-bold leading-10">
            New Task Template
          </div>
          <button type="button" onClick={() => setOpenModal(false)}>
            <AiFillCloseCircle className="text-border-gray text-4xl" />
          </button>
        </div>

        <form onSubmit={handleSaveTask}>
          <div className="flex flex-col gap-2">
            <b className="text-[16px]">
              Task Name<span className="text-red-600">*</span>
            </b>
            <TextInput
              placeholder="Task Name"
              onChange={e => setData('name', e.target.value)}
              value={data?.name}
            />
          </div>
          <div className="flex flex-col items-center justify-center mt-6 gap-4">
            <button
              type="submit"
              className="bg-primary py-2 w-full max-w-[600px] rounded-xl text-white font-bold"
            >
              Save Task Template
            </button>
            <button className="py-2 w-full max-w-[600px] rounded-xl text-black font-bold">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default NewTaskTemplateModal;

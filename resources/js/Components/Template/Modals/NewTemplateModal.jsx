import Modal from '@/Components/Modal';
import React, { useEffect, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import TextInput from '../../TextInput';

function NewTemplateModal({ task, title, openModal, setOpenModal }) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    setItem(task);
  }, [task]);

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} maxWidth="4xl">
      <div className="flex flex-col p-8 text-black gap-4">
        <div className="flex justify-between">
          <div className="text-zinc-800 text-3xl font-bold leading-10">
            {task ? 'Edit' : 'New'} {title} Template
          </div>
          <button onClick={() => setOpenModal(false)}>
            <AiFillCloseCircle className="text-border-gray text-4xl" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <b className="text-[16px]">
            {title} Name<span className="text-red-600">*</span>
          </b>
          <TextInput
            placeholder={`${title} Name`}
            onChange={e => setItem({ ...item, name: e.target.value })}
            value={item?.name}
          />
          {title === 'Contract' && (
            <div className="flex flex-col gap-2">
              <b className="text-[16px]">
                Number of Service<span className="text-red-600">*</span>
              </b>
              <TextInput
                type="number"
                placeholder="Number of Service"
                onChange={e => setItem({ ...item, noOfSR: e.target.value })}
                value={item?.noOfSR}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center mt-6 gap-4">
          <button className="bg-primary py-2 w-full max-w-[600px] rounded-xl text-white font-bold">
            Save {title} Template
          </button>
          <button className="py-2 w-full max-w-[600px] rounded-xl text-black font-bold">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default NewTemplateModal;

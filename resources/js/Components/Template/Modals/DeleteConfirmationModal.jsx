import Modal from '@/Components/Modal';
import { AiFillCloseCircle } from 'react-icons/ai';
import { IconButton } from '@material-tailwind/react';

function DeleteConfirmationModal({
  title,
  content,
  openModal,
  setOpenModal,
  onDelete,
}) {
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} maxWidth="4xl">
      <div className="flex flex-col p-8 text-black gap-8">
        <div className="flex justify-between">
          <div className="text-zinc-800 text-3xl font-bold leading-10">
            Delete {title} Template
          </div>
          <IconButton variant="text" onClick={() => setOpenModal(false)}>
            <AiFillCloseCircle className="text-border-gray text-4xl" />
          </IconButton>
        </div>

        <div>
          <div className="flex p-4 border border-[#455361] rounded-xl">
            {content}
          </div>

          <div className="mt-2 text-[#455361]">
            Are you sure you want to delete this {title} template?
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-6">
          <button
            className="bg-red-600 py-2 w-full max-w-[600px] rounded-xl text-white font-bold"
            onClick={onDelete}
          >
            Delete {title} Template
          </button>
          <button className="py-2 w-full max-w-[600px] rounded-xl text-black font-bold">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteConfirmationModal;

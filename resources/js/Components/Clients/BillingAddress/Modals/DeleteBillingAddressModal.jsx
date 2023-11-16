import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { router } from '@inertiajs/react';
import { FaRegMap } from 'react-icons/fa';
import Modal from '@/Components/Modal';

function DeleteBillingAddressModal({ data }) {
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = () => {
    router.delete(route('addresses.destroy', data.id), {
      preserveScroll: true,
      onSuccess: () => {
        setOpenModal(false);
      },
      onError: err => {
        console.log(err);
      },
    });
  };
  return (
    <>
      {/* <button> */}
      {/*  <AiOutlineEdit size={20} /> */}
      {/* </button> */}
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
              Delete Billing Address
            </div>
            <button className="self-end" onClick={() => setOpenModal(false)}>
              <AiFillCloseCircle className="text-border-gray text-4xl" />
            </button>
          </div>

          <div className="flex flex-col border border-border-gray rounded-lg p-4 mt-6">
            <span className="text-md font-bold">{data?.name}</span>
            <span className="text-sm text-[#00B4AD] font-bold py-2">
              {data?.personName}
            </span>
            <div className="flex items-center gap-2 py-2">
              <BsTelephone size={18} />
              <span>{data?.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegMap size={18} />
              <span>{data?.address}</span>
            </div>
          </div>

          <div className="my-4">
            Are you sure you want to delete this address?
          </div>
          <button
            onClick={handleDelete}
            className="self-center mt-6 font-extrabold w-[70%] py-2 text-white justify-center items-center bg-red-600 rounded-xl flex flex-row"
          >
            Delete Address
          </button>
          <button
            onClick={() => setOpenModal(false)}
            className="self-center mt-6 font-extrabold w-[70%] py-2 text-black justify-center items-center rounded-xl flex flex-row"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}
export default DeleteBillingAddressModal;

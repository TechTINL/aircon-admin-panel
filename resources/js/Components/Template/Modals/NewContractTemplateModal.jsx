import { AiFillCloseCircle } from 'react-icons/ai';
import { useForm } from '@inertiajs/react';
import { IconButton, Button } from '@material-tailwind/react';
import Modal from '@/Components/Modal';
import { useEffect } from 'react';
import TextInput from '../../TextInput';

function NewContractTemplateModal({ contract, openModal, setOpenModal }) {
  const { data, setData, post, patch, reset } = useForm({
    name: contract?.name || '',
    service_count: contract?.service_count || '',
  });

  useEffect(() => {
    if (contract) {
      setData({
        name: contract.name,
        service_count: contract.service_count,
      });
    }
  }, [contract]);

  const handleSubmit = () => {
    if (contract) {
      patch(route('contract-templates.update', contract.id), {
        onSuccess: () => setOpenModal(false),
      });
      return;
    }
    post(route('contract-templates.store'), {
      onSuccess: () => setOpenModal(false),
    });
  };

  const handleClose = () => {
    reset();
    setOpenModal(false);
  };

  return (
    <Modal show={openModal} onClose={handleClose} maxWidth="4xl">
      <div className="flex flex-col p-8 text-black gap-4">
        <div className="flex justify-between">
          <div className="text-zinc-800 text-3xl font-bold leading-10">
            {contract ? 'Edit' : 'New'} Contract Template
          </div>
          <IconButton variant="text" onClick={() => setOpenModal(false)}>
            <AiFillCloseCircle className="text-border-gray text-4xl" />
          </IconButton>
        </div>

        <div className="flex flex-col gap-2">
          <b className="text-[16px]">
            Contract Name<span className="text-red-600">*</span>
          </b>

          <TextInput
            placeholder="Contract Name"
            onChange={e => setData('name', e.target.value)}
            value={data?.name}
          />

          <div className="flex flex-col gap-2">
            <b className="text-[16px]">
              Number of Service<span className="text-red-600">*</span>
            </b>
            <TextInput
              type="number"
              placeholder="Number of Service"
              onChange={e => setData('service_count', e.target.value)}
              value={data?.service_count}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-6 gap-4">
          <Button
            className="bg-primary py-2 w-full max-w-[600px] rounded-xl text-white font-bold text-sm"
            onClick={handleSubmit}
          >
            Save Contract Template
          </Button>
          <Button
            variant="outlined"
            className="py-2 w-full max-w-[600px] rounded-xl text-black font-bold"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default NewContractTemplateModal;

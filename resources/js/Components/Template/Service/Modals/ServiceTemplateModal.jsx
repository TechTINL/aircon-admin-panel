import Modal from '@/Components/Modal';
import { useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useForm } from '@inertiajs/react';
import TextInput from '../../../TextInput';

function ServiceTemplateModal({ service, openModal, setOpenModal }) {
  const { data, setData, post, put, reset } = useForm({
    name: service?.name || '',
  });

  useEffect(() => {
    setData({ name: service?.name || '' });
  }, [service]);

  const handleSaveService = e => {
    e.preventDefault();

    if (service) {
      put(`/service-templates/${service.id}`, {
        onSuccess: () => {
          setOpenModal(false);
          reset();
        },
        onError: error => {
          setOpenModal(false);
        },
      });
    }

    post(route('service-templates.store'), {
      onSuccess: () => {
        setOpenModal(false);
        reset();
      },
      onError: error => {
        setOpenModal(false);
      },
    });
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} maxWidth="4xl">
      <div className="flex flex-col p-8 text-black gap-4">
        <div className="flex justify-between">
          <div className="text-zinc-800 text-3xl font-bold leading-10">
            {service ? 'Edit Service Template' : 'New Service Template'}
          </div>
          <button onClick={() => setOpenModal(false)}>
            <AiFillCloseCircle className="text-border-gray text-4xl" />
          </button>
        </div>

        <form onSubmit={handleSaveService}>
          <div className="flex flex-col gap-2">
            <b className="text-[16px]">
              Service Name <span className="text-red-600">*</span>
            </b>
            <TextInput
              placeholder="Service Name"
              onChange={e => setData('name', e.target.value)}
              value={data?.name}
            />
          </div>

          <div className="flex flex-col items-center justify-center mt-6">
            <button
              type="submit"
              className="bg-primary py-2 w-full max-w-[600px] rounded-xl text-white font-bold"
            >
              {service ? 'Save' : 'Create'}
            </button>
            <button
              type="button"
              className="py-2 w-full max-w-[600px] rounded-xl text-black font-bold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ServiceTemplateModal;

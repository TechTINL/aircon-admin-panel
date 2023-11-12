import { useState } from 'react';
import { useForm } from '@inertiajs/react';

function useCreateClient({ id = null }) {
  const [openModal, setOpenModal] = useState(false);

  const { data, setData, post, errors, reset } = useForm({
    name: '',
    type: '',
    address: '',
    billing_address: '',
    contact_name: '',
    email: '',
    contact_number: '',
    parent_id: id,
  });

  const handleSubmit = e => {
    e.preventDefault();
    post(route('clients.store'), {
      onSuccess: () => {
        setOpenModal(false);
        reset();
      },
    });
  };

  return {
    openModal,
    setOpenModal,
    data,
    setData,
    errors,
    handleSubmit,
  };
}

export default useCreateClient;

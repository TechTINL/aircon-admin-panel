import { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';

function useEditClient() {
  const { client } = usePage().props;
  const [openModal, setOpenModal] = useState(false);

  const { data, setData, errors, patch } = useForm({
    name: client.name,
    type: client.type,
    postal_code: client.postal_code,
    address: client.address,
    billing_address: client.billing_address,
    address_id: client?.address_id || null,
  });

  const handleSubmit = e => {
    e.preventDefault();
    patch(route('clients.update', client.id), {
      onSuccess: () => {
        setOpenModal(false);
      },
      onError: err => {
        setOpenModal(true);
        console.log(err);
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

export default useEditClient;

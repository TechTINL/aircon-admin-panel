import { useState } from 'react';
import { useForm } from '@inertiajs/react';

function useCreateBillingAddress(clientId) {
  const [openModal, setOpenModal] = useState(false);
  const { data, setData, error, reset, post } = useForm({
    name: '',
    phone: '',
    address: '',
    postal_code: '',
    isPrimary: false,
    client_id: clientId,
  });

  const handleSubmit = e => {
    e.preventDefault();
    post(route('addresses.store'), {
      onSuccess: () => {
        setOpenModal(false);
        reset();
      },
      onError: err => {
        console.log(err);
      },
    });
  };

  return {
    openModal,
    setOpenModal,
    data,
    setData,
    error,
    reset,
    handleSubmit,
  };
}

export default useCreateBillingAddress;

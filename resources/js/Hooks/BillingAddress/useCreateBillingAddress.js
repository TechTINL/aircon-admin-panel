import { useState } from 'react';
import { useForm } from '@inertiajs/react';

function useCreateBillingAddress() {
  const [openModal, setOpenModal] = useState(false);
  const { data, setData, error, reset, post } = useForm({
    name: '',
    phone: '',
    email: '',
    address: '',
    isPrimary: false,
  });

  const handleSubmit = e => {
    e.preventDefault();
    post(route('billing-addresses.store'), {
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

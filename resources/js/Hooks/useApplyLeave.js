import { useState } from 'react';
import { useForm } from '@inertiajs/react';

function useApplyLeave({ id }) {
  const [openModal, setOpenModal] = useState(false);

  const { data, setData, errors, post } = useForm({
    leave_date: null,
    reason: '',
    user_id: id,
  });

  const handleSubmit = e => {
    e.preventDefault();
    post(route('leave.store'), {
      onSuccess: () => {
        setOpenModal(false);
        setData({
          leave_date: null,
          reason: '',
          user_id: id,
        });
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
    errors,
    handleSubmit,
  };
}

export default useApplyLeave;

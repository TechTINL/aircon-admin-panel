import { router, useForm } from '@inertiajs/react';

function useApplyLeave({ id }, setOpenModal) {
  const { data, setData, errors } = useForm({
    leave_date: null,
    reason: '',
    user_id: id,
  });

  const handleSubmit = e => {
    e.preventDefault();
    router.post(
      route('leave.store'),
      {
        leave_date: data.leave_date,
        reason: data.reason,
        user_id: id,
      },
      {
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
      }
    );
  };

  return {
    data,
    setData,
    errors,
    handleSubmit,
  };
}

export default useApplyLeave;

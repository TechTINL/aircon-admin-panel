import { useForm, usePage } from '@inertiajs/react';

function useEditAdmin() {
  const { admin } = usePage().props;

  const { data, setData, reset, errors, patch } = useForm({
    id: admin.data.id,
    name: admin.data.name,
    phone: admin.data.phone,
  });

  function handleSubmit(e) {
    e.preventDefault();
    patch(route('admin.update', data.id), {
      onSuccess: () => {
        reset();
      },
      onError: errors => {
        console.log(errors);
      },
    });
  }

  return {
    data,
    setData,
    reset,
    errors,
    handleSubmit,
  };
}

export default useEditAdmin;

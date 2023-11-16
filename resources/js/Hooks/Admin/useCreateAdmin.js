import { useForm } from '@inertiajs/react';

function useCreateAdmin() {
  const { data, setData, post, errors, reset } = useForm({
    name: '',
    phone: '',
  });

  const submit = e => {
    e.preventDefault();
    post(route('admin.store'), {
      onSuccess: () => {
        reset();
      },
    });
  };

  return {
    data,
    setData,
    submit,
    errors,
  };
}

export default useCreateAdmin;

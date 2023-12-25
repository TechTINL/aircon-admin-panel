import { useForm } from '@inertiajs/react';

function useUpdateGst({ value }) {
  const { data, setData, patch, reset, errors, processing } = useForm({
    value,
  });

  function submit() {
    patch(route('gst.update', 1), {
      onSuccess: () => reset(),
      onError: errors => {
        console.log(errors);
      },
    });
  }

  return {
    data,
    setData,
    submit,
    errors,
    processing,
  };
}

export default useUpdateGst;

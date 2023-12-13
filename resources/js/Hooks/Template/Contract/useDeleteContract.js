import { router } from '@inertiajs/react';

function useDeleteContractTemplate() {
  const handleDeleteContract = (id, callback) => {
    router.delete(route('contract-templates.destroy', id), {
      onSuccess: () => {
        callback();
      },
    });
  };

  return { handleDeleteContract };
}

export default useDeleteContractTemplate;

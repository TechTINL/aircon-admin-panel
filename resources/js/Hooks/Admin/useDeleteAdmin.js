import { router } from '@inertiajs/react';

function useDeleteAdmin() {
  const deleteAdmin = id => {
    router.delete(route('admin.destroy', id), {
      onSuccess: () => {
        console.log('success');
      },
      onError: () => {
        console.log('error');
      },
    });
  };

  return {
    deleteAdmin,
  };
}

export default useDeleteAdmin;

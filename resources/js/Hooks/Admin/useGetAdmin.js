import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

function useGetAdmin() {
  const {
    admins: { data, links, meta },
  } = usePage().props;

  const getAdmin = deleted => {
    router.get(
      route('admin.index', {
        deleted,
      })
    );
  };

  return {
    admins: data || [],
    links,
    meta,
    getAdmin,
  };
}

export default useGetAdmin;

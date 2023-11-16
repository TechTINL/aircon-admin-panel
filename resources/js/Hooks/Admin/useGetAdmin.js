import { usePage } from '@inertiajs/react';
import { useState } from 'react';

function useGetAdmin() {
  const {
    admins: { data, links, meta },
  } = usePage().props;

  return {
    admins: data || [],
    links,
    meta,
  };
}

export default useGetAdmin;

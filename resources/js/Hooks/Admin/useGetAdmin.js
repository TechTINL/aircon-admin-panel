import { usePage } from '@inertiajs/react';

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

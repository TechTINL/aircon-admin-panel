import { usePage } from '@inertiajs/react';

function useGetEmployee() {
  const { employees } = usePage().props;

  return {
    employees: employees.data,
    links: employees.links,
    meta: employees.meta,
  };
}

export default useGetEmployee;

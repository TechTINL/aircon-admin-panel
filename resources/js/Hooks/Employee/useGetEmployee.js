import { usePage } from '@inertiajs/react';

function useGetEmployee() {
  const { employees } = usePage().props;

  return {
    employees: employees.data,
  };
}

export default useGetEmployee;

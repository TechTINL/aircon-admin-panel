import { router } from '@inertiajs/react';

function useUpdateService() {
  const updateService = form => {
    const data = {
      client_id: form?.selected_client?.value,
      sub_client_id: form?.selected_sub_client?.value,
      service_address: form.selected_service_address.address,
      billing_address: form.selected_billing_address.address,
      name: form?.name,
      leaders_id: form?.selected_leaders?.map(leader => leader.id),
      technician_count: form?.technician_count,
      employees_id: form?.selected_employees?.map(employee => employee.id),
      service_date: form?.service_date,
      service_time: form?.service_time.value,
      tasks: form?.tasks.map(task => ({
        name: task?.name,
        duration_hours: task?.hours,
        duration_minutes: task?.minutes,
        cost: task?.cost,
      })),
    };

    router.put(route('services.update', form.id), data, {
      onSuccess: () => {
        router.push(route('services.index'));
      },
      onError: errors => {
        console.log(errors);
      },
    });
  };

  return {
    updateService,
  };
}

export default useUpdateService;

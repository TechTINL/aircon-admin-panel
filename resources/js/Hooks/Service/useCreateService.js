import { router } from '@inertiajs/react';

function useCreateService() {
  const createService = form => {
    const data = {
      client_id: form?.selected_client?.id,
      sub_client_id: form?.selected_sub_client?.id,
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

    router.post(route('services.store'), data, {
      onSuccess: () => {
        router.push(route('services.index'));
      },
      onError: errors => {
        console.log(errors);
      },
    });
  };

  return {
    createService,
  };
}

export default useCreateService;

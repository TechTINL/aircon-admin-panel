import { router } from '@inertiajs/react';
import dayjs from 'dayjs';

function useUpdateService() {
  const updateService = form => {
    const data = {
      client_id: form?.selected_client?.value,
      sub_client_id: form?.selected_sub_client?.value,
      service_address: form.selected_service_address?.value,
      billing_address: form.selected_billing_address?.value,
      name: form?.name,
      leaders_id: form?.selected_leaders?.map(leader => leader.id),
      technician_count: form?.technician_count,
      employees_id: form?.selected_employees?.map(employee => employee.id),
      service_date: dayjs(form?.service_date).format('YYYY-MM-DD'),
      service_time: form?.service_time.value,
      tasks: form?.tasks.map(task => ({
        name: task?.name,
        duration_hours: task?.hours,
        duration_minutes: task?.minutes,
        cost: task?.cost,
      })),
      status: form?.required_follow_up
        ? 'requires-follow-up'
        : form?.on_hold
        ? 'on-hold'
        : 'completed',
      task_visitation_note: form?.task_visitation_note,
    };

    router.put(route('services.update', form.id), data, {
      onSuccess: () => {
        router.visit(route('services.show', form.id));
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

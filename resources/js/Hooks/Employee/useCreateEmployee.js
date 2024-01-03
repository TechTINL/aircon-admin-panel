import { router, useForm, usePage } from '@inertiajs/react';

function useCreateEmployee() {
  const { teams, roles, errors } = usePage().props;

  const { data, setData, processing, reset } = useForm({
    name: '',
    phone: '',
    role: '',
    team_id: '',
    organization: '',
  });

  const handleSubmit = e => {
    e.preventDefault();
    router.post(
      route('employee.store'),
      {
        name: data.name,
        phone: data.phone,
        role: data.role.value,
        team_id: data.team_id.value,
        organization: data.organization,
        vehicle: data.vehicle,
      },
      {
        onSuccess: () => reset(),
        onError: err => {
          console.log(err);
        },
      }
    );
  };

  return {
    teams: teams.map(team => ({
      label: team.name,
      value: team.id,
    })),
    roles,
    data,
    setData,
    processing,
    handleSubmit,
  };
}

export default useCreateEmployee;

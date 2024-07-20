import { router, useForm, usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';
function useCreateEmployee() {
  const { teams, roles, errors } = usePage().props;

  const { data, setData, processing, reset } = useForm({
    name: '',
    phone: '',
    role: '',
    team_id: '',
    organization: '',
  });

  const handleSubmit = e =>  {
    e.preventDefault();
      try{
           router.post(
              route('employee.store'),
              {
                  name: data.name,
                  phone: data.phone,
                  role: data.role.value,
                  team: data.team_id.value,
                  organization: data.organization,
                  vehicle: data.vehicle,
              },
              {
                  onSuccess: () => {
                      toast.success('Employee successfully created!');
                      reset();
                  },
                  onError: (err) => {
                      if (err) {
                          Object.keys(err).forEach((key, index) => {
                              setTimeout(() => {
                                  toast.error(err[key]);
                              }, index * 250); // Display each message 1 second apart
                          });
                      } else {
                          toast.error(err.message || 'Something went wrong. Please try again!');
                      }
                  },
           });

      }catch(e){
          toast.error(e.message());
      }
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

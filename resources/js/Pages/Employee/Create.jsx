import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import EmployeeImg from '@/assets/images/employee_sample.png';
import TextInput from '@/Components/TextInput';
import DropdownInput from '@/Components/Common/DropdownInput';
import InputLabel from '@/Components/InputLabel';
import PhoneNumberInput from '@/Components/Shared/PhoneNumberInput';
import useCreateEmployee from '@/Hooks/Employee/useCreateEmployee';
import InputError from '@/Components/InputError';

function Create({ auth, breadcrumbs, errors }) {
  const { teams, roles, data, setData, processing, handleSubmit } =
    useCreateEmployee();

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Employee Create" />
      <div className="flex-auto flex flex-col m-6">
        <div className="flex flex-col">
          <div className="text-zinc-800 text-3xl font-bold leading-10">
            Create Employee
          </div>
          <Breadcrumb breadcrumbs={breadcrumbs} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col bg-white rounded-xl p-6 max-w-[800px] gap-4 mt-12">
            <img
              src={`https://ui-avatars.com/api/?name=${data.name}&color=7F9CF5&background=EBF4FF`}
              className="object-contain rounded-full h-14 w-14 self-center"
              alt="employee-image"
            />
            <div className="flex flex-col gap-1">
              <b className="text-black text-[16px]">
                Employee Name <span className="text-red-600">*</span>
              </b>
              <TextInput
                className="w-full h-full rounded-xl"
                placeholder="Employee Name"
                value={data.name}
                onChange={e => setData('name', e.target.value)}
              />
              <InputError message={errors?.name} className="my-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <b className="text-black text-[16px]">Job Position</b>
                <DropdownInput
                  label="Employee Role"
                  items={roles}
                  selectedItem={data.role}
                  onItemSelect={item => setData('role', item)}
                />
                <InputError message={errors?.role} className="my-2" />
              </div>
              <div className="flex flex-col">
                <b className="text-black text-[16px]">Team</b>
                <DropdownInput
                  label="Team"
                  items={teams}
                  selectedItem={data.team_id}
                  onItemSelect={item => setData('team_id', item)}
                />
                <InputError message={errors?.team_id} className="my-2" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <b className="text-black text-[16px]">Organization</b>
              <TextInput
                className="w-full h-full rounded-xl"
                placeholder="Organization Name ..."
                value={data.organization}
                onChange={e => setData('organization', e.target.value)}
              />
              <InputError message={errors?.organization} className="my-2" />
            </div>

            <div>
              <InputLabel
                htmlFor="phone"
                value="Mobile Number"
                className="text-zinc-800 text-base font-bold my-1"
              />

              <PhoneNumberInput
                id="phone"
                name="phone"
                className="mt-1 block w-full"
                value={data.phone}
                onChange={value => setData('phone', value)}
              />
              <InputError message={errors?.phone} className="my-2" />
            </div>

            <div className="flex flex-col gap-1">
              <b className="text-black text-[16px]">Vehicle Number</b>
              <TextInput
                className="w-full h-full rounded-xl"
                placeholder="Vehicle No. ..."
                value={data.vehicle}
                onChange={e => setData('vehicle', e.target.value)}
              />
              <InputError message={errors?.vehicle} className="my-2" />
            </div>

            <button
              type="submit"
              disabled={processing}
              className="rounded-xl bg-primary py-2 w-full text-white font-bold mt-8"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}

export default Create;

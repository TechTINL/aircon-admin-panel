import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PhoneNumberInput from '@/Components/Shared/PhoneNumberInput';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import EmployeeImg from '@/assets/images/employee_sample.png';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import useCreateAdmin from '@/Hooks/Admin/useCreateAdmin';
import Select from 'react-select';

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'super-admin', label: 'Super Admin' },
];

function Create({ auth, breadcrumbs }) {
  const { data, setData, errors, submit: handleSubmit } = useCreateAdmin();

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Admin Create" />
      <div className="flex-auto flex flex-col m-6">
        <div className="flex flex-col">
          <div className="text-zinc-800 text-3xl font-bold leading-10">
            New Admin
          </div>
          <Breadcrumb breadcrumbs={breadcrumbs} />
        </div>

        <div className="flex flex-col bg-white rounded-xl p-6 max-w-[800px] gap-4 mt-12">
          <img
            src={EmployeeImg}
            className="object-contain rounded-full h-14 w-14 self-center"
            alt="admin-profile"
          />

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <b className="text-black text-[16px]">
                Admin Name <span className="text-red-600">*</span>
              </b>
              <TextInput
                className="w-full h-full rounded-xl"
                placeholder="Employee Name"
                value={data.name}
                onChange={e => setData('name', e.target.value)}
              />
              <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="flex flex-col gap-1">
              <b className="text-black text-[16px]">Phone Number</b>
              <PhoneNumberInput
                label="Phone Number"
                value={data.phone}
                onChange={value => setData('phone', value)}
              />
              <InputError message={errors.phone} className="mt-2" />
            </div>
            <div className="flex flex-col gap-1">
              <b className="text-black text-[16px]">Role</b>
              <Select
                options={roles}
                defaultValue={roles[0]}
                isClearable
                name="role"
                onChange={option => setData('role', option?.value)}
              />
              <InputError message={errors.phone} className="mt-2" />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-primary py-2 w-full text-white font-bold mt-8"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Create;

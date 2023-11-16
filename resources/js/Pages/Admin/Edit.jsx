import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PhoneNumberInput from '@/Components/Shared/PhoneNumberInput';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import EmployeeImg from '@/assets/images/employee_sample.png';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import useEditAdmin from '@/Hooks/Admin/useEditAdmin';

function Edit({ auth, breadcrumbs }) {
  const { data, setData, errors, handleSubmit } = useEditAdmin();

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Admin Edit" />
      <div className="flex-auto flex flex-col m-6">
        <div className="flex flex-col">
          <div className="text-zinc-800 text-3xl font-bold leading-10">
            Update Admin
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
            <button
              type="submit"
              className="rounded-xl bg-primary py-2 w-full text-white font-bold mt-8"
            >
              Update Changes
            </button>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Edit;

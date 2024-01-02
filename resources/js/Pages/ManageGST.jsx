import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';
import useUpdateGst from '@/Hooks/useUpdateGst';
import { Button } from '@material-tailwind/react';

function ManageGST({ auth, gst, flash }) {
  const { data, setData, errors, submit, processing } = useUpdateGst({
    value: gst.value,
  });

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Job Table" />
      <div className="flex flex-auto flex-col m-6 max-w-full">
        <div className="text-zinc-800 text-3xl font-bold leading-10">
          Manage GST
        </div>

        <div className="bg-white rounded-xl flex flex-col p-6 md:w-1/2 gap-4 mt-6">
          <span className="font-bold">GST Amount</span>
          <div className="relative flex items-center">
            <TextInput
              type="number"
              placeholder="GST"
              className="pr-8 w-full"
              value={data?.value}
              onChange={e => setData('value', e.target.value)}
            />
            <span className="ml-[-26px] text-[16px]"> % </span>
          </div>
          {errors.value && (
            <span className="text-red-500 text-sm">{errors.value}</span>
          )}
          {flash.success && (
            <span className="text-green-500 text-sm">{flash.success}</span>
          )}
          <Button
            type="button"
            className="bg-primary max-w-max"
            onClick={submit}
          >
            Update GST
          </Button>
        </div>
        <span className="text-[#53616C] text-[13px] my-2">
          Last Updated: {new Date(gst.updated_at).toLocaleString()}
        </span>
      </div>
    </AuthenticatedLayout>
  );
}

export default ManageGST;

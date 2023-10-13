import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

function Timeline({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Client List" />
      <div className="m-6">
        <div className="text-zinc-800 text-3xl font-bold leading-10">
          Job Table
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Timeline;

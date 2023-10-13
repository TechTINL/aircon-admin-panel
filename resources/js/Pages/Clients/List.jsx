import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

function List({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Client List" />
      <div className="m-6">
        <div className="text-zinc-800 text-3xl font-bold leading-10">
          Client List
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-primary hover:bg-green-300 text-white font-bold py-2 px-4 rounded"
            onClick={() => router.visit(route('clients.create'))}
          >
            Create New Client
          </button>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default List;

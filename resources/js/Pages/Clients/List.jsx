import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import Select from '@/Components/Shared/Select';
import SearchInput from '@/Components/Shared/SearchInput';
import Chip from '@/Components/Shared/Chip';
import Pagination from '@/Components/Shared/Pagination';

function List({ auth, clients: { data, meta } }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Client List" />
      <div className="m-6">
        <div className="text-zinc-800 text-3xl font-bold leading-10">
          Client List
        </div>
        <div className="grid grid-cols-3 my-8">
          <div>
            <SearchInput placeholder="Search ID, Name ..." />
          </div>
          <div className="col-span-2 flex justify-end gap-4">
            <div>
              <Select
                data={[
                  { label: 'All Clients', value: 'ALL' },
                  { label: 'Deleted Clients', value: 'DELETED' },
                ]}
                onChange={item => console.log(item)}
                selected={{ label: 'All Clients', value: 'ALL' }}
                name="clients"
                id="clients"
                placeholder="Choose Clients"
              />
            </div>
            <div>
              <button
                type="button"
                className="bg-primary hover:bg-green-300 text-white font-bold py-2 px-4 rounded"
                onClick={() => router.visit(route('clients.create'))}
              >
                Create New Client
              </button>
            </div>
          </div>
        </div>
        <div>
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Client ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contact Person
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contact
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Address
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Sub-Clients
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Billing Address
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map(client => (
                <tr key={client.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="text-gray-600 text-base font-semibold">
                      {client.name}
                    </div>
                    <div className="text-neutral-400 text-xs font-norma">
                      ID{client.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="text-gray-600 text-base font-normal">
                      {client.contact_name}
                    </div>
                    {client.type === 'RESIDENTIAL' && (
                      <Chip text={client.type} color="teal-500" />
                    )}
                    {client.type === 'COMMERCIAL' && (
                      <Chip text={client.type} color="indigo-800" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {`+${client.contact_phone}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.sub_clients}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.billing_address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      #
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination links={meta.links} meta={meta} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default List;

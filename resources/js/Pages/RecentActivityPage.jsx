import { Head } from '@inertiajs/react';
import { FiDownload } from 'react-icons/fi';
import useRecentActivity from '@/Hooks/useRecentActivity';
import RecentActivityTable from '@/Components/Activity/RecentActivityTable';
import Pagination from '@/Components/Shared/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Dropdown from '@/Components/Dropdown';
import ExportFilter from '@/Components/Services/ExportFilter';
import Breadcrumb from '@/Components/Common/Breadcrumb.jsx';

function RecentActivityPage({ auth, breadcrumbs }) {
  const { activities, links, meta } = useRecentActivity();

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Job Table" />
      <div className="flex flex-auto flex-col m-6 max-w-full">
        <div className="text-zinc-800 text-3xl font-bold leading-10">
          Recent Activity
        </div>
        <Breadcrumb breadcrumbs={breadcrumbs} />
        <div className="flex gap-4 justify-end my-4">
          <Dropdown>
            <Dropdown.Trigger>
              <span className="inline-flex rounded-md">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary focus:outline-none transition ease-in-out duration-150"
                >
                  <FiDownload size={20} fontWeight={800} />
                  <span className="px-2 font-bold">Export Data</span>
                </button>
              </span>
            </Dropdown.Trigger>
            <Dropdown.Content width="50">
              <ExportFilter />
            </Dropdown.Content>
          </Dropdown>
        </div>
        <RecentActivityTable
          activities={activities}
          pagination={
            <div className="my-6 flex justify-between">
              <Pagination links={links} meta={meta} />
            </div>
          }
        />
      </div>
    </AuthenticatedLayout>
  );
}

export default RecentActivityPage;

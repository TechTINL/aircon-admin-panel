import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
  AiOutlineInfoCircle,
  AiOutlineLeft,
  AiOutlineRight,
} from 'react-icons/ai';
import TimelineTable from '../../Components/Services/TimelineTable';
import JobFilters from '../../Components/Services/JobFilters';

function Timeline({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Job Table" />
      <div className="flex flex-auto flex-col m-6 max-w-full">
        <div className="flex-row flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-zinc-800 text-3xl font-bold leading-10">
              Job Table
            </div>
            <button>
              <AiOutlineInfoCircle
                className="text-primary ml-2"
                size={26}
                fontWeight={'bold'}
              />
            </button>
          </div>
          <div className="flex items-center pr-4">
            <JobFilters />
          </div>
        </div>
        <div className="flex flex-1 mt-6 max-w-[80vw] relative">
          <div className="absolute flex items-center top-2 right-[35vw] z-50">
            <AiOutlineLeft fontWeight={900} />
            <span className="text-black font-bold px-4">10 Dec 2023</span>
            <AiOutlineRight />
          </div>
          <TimelineTable />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Timeline;

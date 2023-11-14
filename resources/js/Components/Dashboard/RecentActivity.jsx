import { AiOutlineRight } from 'react-icons/ai';
import RecentActivityTable from '@/Components/Activity/RecentActivityTable';
import useRecentActivity from '@/Hooks/useRecentActivity';
import { Link } from '@inertiajs/react';

function RecentActivity() {
  const { activities } = useRecentActivity();

  return (
    <>
      <div className="flex justify-between text-[14px] font-bold">
        <span>Recent Activity</span>
        <Link
          className="text-secondary gap-2 font-bold items-center flex"
          href={route('activity.index')}
        >
          <span>See More</span>
          <AiOutlineRight size={14} />
        </Link>
      </div>
      <RecentActivityTable activities={activities} />
    </>
  );
}

export default RecentActivity;

import { usePage } from '@inertiajs/react';

function useRecentActivity() {
  const { activities } = usePage().props;

  return {
    activities: activities.data || [],
    links: activities?.links,
    meta: {
      total: activities?.total || 0,
      from: activities?.from || 0,
      to: activities?.to || 0,
      links: activities?.links,
    },
  };
}

export default useRecentActivity;

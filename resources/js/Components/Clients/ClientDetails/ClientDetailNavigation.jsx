import { BiUserCircle } from 'react-icons/bi';
import { Link } from '@inertiajs/react';

function ClientDetailNavigation({ id }) {
  return (
    <div className="flex gap-4 pb-4 border-b-2">
      <Link
        href={`/clients/${id}`}
        className="flex gap-2 border bg-[#454FA23D] px-4 py-2 rounded-full"
      >
        <BiUserCircle size={20} />
        <span>Client Profile</span>
      </Link>
      <Link
        href={`/clients/${id}/contracts`}
        className="flex gap-2 border border-[#455361] px-4 py-2 rounded-full"
      >
        <BiUserCircle size={20} />
        <span>Contract</span>
      </Link>
      <Link
        href={`/clients/${id}/services`}
        className="flex gap-2 border border-[#455361] px-4 py-2 rounded-full"
      >
        <BiUserCircle size={20} />
        <span>Service History</span>
      </Link>
    </div>
  );
}

export default ClientDetailNavigation;

import TableRow from '@/Components/Ui/Table/TableRow';
import { formatDateTime } from '@/Helpers/utils';

function RecentActivityTable({ activities, pagination = null }) {
  return (
    <div className="flex flex-1 relative">
      <div className="w-full h-[68vh] overflow-x-auto overflow-y-auto">
        <table className="w-full text-black relative">
          <thead className="relative bg-[#F0F0F0] rounded-full  text-[#455361] ">
            <tr>
              <th className="px-4 py-2 sticky left-0 min-w-[150px] text-left">
                Task Name
              </th>
              <th className="px-4 py-2 max-w-max text-left">Date/Time</th>
            </tr>
          </thead>
          <tbody className="relative">
            {activities.map((activity, i) => (
              <TableRow key={i} index={i}>
                <td className="px-4 py-2 my-1">{activity?.description}</td>
                <td className="px-4 py-2 my-1">
                  {formatDateTime(activity?.created_at)}
                </td>
              </TableRow>
            ))}
          </tbody>
        </table>
        {pagination}
      </div>
    </div>
  );
}

export default RecentActivityTable;

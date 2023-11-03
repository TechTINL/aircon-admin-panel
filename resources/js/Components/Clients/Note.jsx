import { PiNotepadBold } from 'react-icons/pi';
import { formatDateTime } from '@/Helpers/utils';
import DeleteGeneralNotesModal from '@/Components/Clients/Modals/DeleteGeneralNotesModal';

function GeneralNote({ data }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center text-secondary font-extrabold">
          <PiNotepadBold size={18} />
          <span>General Notes</span>
        </div>
        <DeleteGeneralNotesModal data={data} />
      </div>
      <div className="text-black text-[15px]">{data?.note}</div>
      <div className="text-[#303030] text-[12px]">
        Updated on {data?.dateTime} by {data?.updated_by_name} at{' '}
        <span className="text-primary font-bold">
          {formatDateTime(data?.updated_at)}
        </span>
      </div>
    </div>
  );
}

export default GeneralNote;

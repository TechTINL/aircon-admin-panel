import GeneralNote from '@/Components/Clients/Note';
import { usePage } from '@inertiajs/react';

function GeneralNotes() {
  const { generalNotes } = usePage().props;

  return generalNotes.length > 0 ? (
    <div className="flex flex-col gap-4">
      {generalNotes.map((note, i) => (
        <GeneralNote key={i} data={note} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center items-center">
        <div className="text-2xl font-bold text-[#00B4AD]">
          No General Notes
        </div>
      </div>
    </div>
  );
}

export default GeneralNotes;

import GeneralNote from '@/Components/Clients/Note';
import { usePage } from '@inertiajs/react';
import NewGeneralNotesModal from '@/Components/Clients/Modals/NewGeneralNotesModal';

function GeneralNotes() {
  const { client, generalNotes } = usePage().props;

  return (
    <>
      <div className="flex justify-between">
        <span className="text-xl font-bold">General Notes</span>
        <NewGeneralNotesModal clientId={client.id} />
      </div>
      <div className="flex flex-col max-h-[15vh] h-full overflow-y-auto mt-4 gap-4">
        {generalNotes.length > 0 ? (
          <div className="flex flex-col gap-4">
            {generalNotes.map(note => (
              // Use a unique identifier from the note if available instead of the index
              <GeneralNote key={note.id} data={note} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <div className="text-sm font-bold text-gray-300">
              No General Notes
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default GeneralNotes;

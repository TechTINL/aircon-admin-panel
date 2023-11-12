import { usePage } from '@inertiajs/react';
import Contact from '@/Components/Clients/POC/Contact';
import React from 'react';
import NewClientPOCModal from '@/Components/Clients/Modals/NewClientPOCModal';

function Contacts() {
  const { contacts } = usePage().props;

  return (
    <>
      <div className="flex justify-between">
        <span className="text-xl font-bold">POC Information</span>
        <NewClientPOCModal />
      </div>
      <div className="max-h-[30vh] h-full overflow-y-auto px-6">
        {contacts.length > 0 ? (
          <div className="flex flex-col gap-4">
            {contacts.map(contact => (
              <Contact key={contact.id} data={contact} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <div className="text-sm font-bold text-gray-300">
              No POC Information
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Contacts;

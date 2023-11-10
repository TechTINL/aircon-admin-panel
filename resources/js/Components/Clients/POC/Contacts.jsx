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
      <div className="max-h-[15vh] overflow-y-auto">
        {contacts.map((contact, i) => (
          <Contact key={i} index={i} data={contact} />
        ))}
      </div>
    </>
  );
}

export default Contacts;

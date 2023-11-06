import { usePage } from '@inertiajs/react';
import Contact from '@/Components/Clients/POC/Contact';
import React from 'react';
import NewClientPOCModal from '@/Components/Clients/Modals/NewClientPOCModal.jsx';

function Contacts() {
  const { contacts } = usePage().props;

  return (
    <>
      <div className="flex justify-between px-6">
        <span className="text-xl font-bold">POC Information</span>
        <NewClientPOCModal />
      </div>
      <div className="max-h-[30vh] overflow-y-auto px-6">
        {contacts.map((contact, i) => (
          <Contact key={i} data={contact} />
        ))}
      </div>
    </>
  );
}

export default Contacts;

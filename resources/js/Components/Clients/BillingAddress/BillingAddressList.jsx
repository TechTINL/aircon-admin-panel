import { usePage } from '@inertiajs/react';
import React from 'react';
import BillingAddressRow from '@/Components/Clients/BillingAddress/BillingAddressRow';
import NewBillingAddressModal from '@/Components/Clients/BillingAddress/Modals/NewBillingAddressModal';

function BillingAddressList() {
  const { addresses } = usePage().props;

  return (
    <>
      <div className="flex justify-between px-6">
        <span className="text-xl font-bold">Billing Address</span>
        <NewBillingAddressModal />
      </div>
      <div className="max-h-[30vh] overflow-y-auto px-6">
        {addresses.length > 0 ? (
          <div className="flex flex-col gap-4">
            {addresses.map(note => (
              // Use a unique identifier from the note if available instead of the index
              <BillingAddressRow key={note.id} data={note} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <div className="text-2xl font-bold text-[#00B4AD]">
              No Billing Address
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default BillingAddressList;

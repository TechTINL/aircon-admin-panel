import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { AiOutlineLeftCircle } from 'react-icons/ai';
import ServiceDetail from '../../Components/Contract/Create/ServiceDetail';
import ContractDetails from '../../Components/Contract/Create/ContractDetails';
import Summary from '../../Components/Contract/Create/Summary';

function Create({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Client List" />
      <div className="flex-auto flex flex-col m-6 gap-6">
        <div className="flex gap-4">
          <button>
            <AiOutlineLeftCircle size={20} />
          </button>
          <div className="text-zinc-800 text-3xl font-bold leading-10">
            New Contract
          </div>
        </div>
        <ContractDetails />
        <ServiceDetail />
        <Summary />
        <button className="bg-primary text-white rounded-xl py-2 font-bold">
          Confirm
        </button>
      </div>
    </AuthenticatedLayout>
  );
}

export default Create;

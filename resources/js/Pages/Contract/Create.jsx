import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { AiOutlineLeftCircle } from 'react-icons/ai';
import { IconButton } from '@material-tailwind/react';
import ContractDetails from '../../Components/Contract/Create/ContractDetails';

function Create({ auth, contractTemplates: templates, clients }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Client List" />
      <div className="flex-auto flex flex-col m-6 gap-6">
        <div className="flex gap-4">
          <Link href={route('contracts.index')}>
            <IconButton variant="text" className="rounded-full">
              <AiOutlineLeftCircle size={20} />
            </IconButton>
          </Link>
          <div className="text-zinc-800 text-3xl font-bold leading-10">
            New Contract
          </div>
        </div>
        <ContractDetails templates={templates} />
      </div>
    </AuthenticatedLayout>
  );
}

export default Create;

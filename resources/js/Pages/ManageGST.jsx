import { Head, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from '@/Components/TextInput';

function ManageGST({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Job Table" />
      <div className="flex flex-auto flex-col m-6 max-w-full">
        <div className="text-zinc-800 text-3xl font-bold leading-10">
          Manage GST
        </div>

        <div className="bg-white rounded-xl flex flex-col p-6 md:w-1/2 gap-4 mt-6">
          <span className="font-bold">
            GST Amount <span className="text-red-600">*</span>
          </span>
          <div className="relative flex items-center">
            <TextInput placeholder="GST" className="pr-8 w-full" />
            <span className="ml-[-26px] text-[16px]"> % </span>
          </div>
          <button className="bg-primary px-6 py-2 max-w-max text-white rounded-xl font-bold">
            Update GST
          </button>
        </div>
        <span className="text-[#53616C] text-[13px] mt-1">
          Last Updated on 20 September 2023, 9:30 AM
        </span>
      </div>
    </AuthenticatedLayout>
  );
}

export default ManageGST;

import React from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { PiClipboardTextLight } from 'react-icons/pi';
import { usePage } from '@inertiajs/react';

function ServiceDetailHead() {
  const {
    service: { data },
  } = usePage().props;
  return (
    <div className="flex flex-row w-full justify-between rounded-xl bg-white p-4">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <div className="text-2xl font-bold text-black">
            {data?.client?.name}
          </div>
          <div className="py-1 px-[30px] text-primary bg-[#BFFAF8] font-bold text-[16px] rounded-full">
            {data?.status}
          </div>
        </div>
        <div className="flex gap-4">
          <span className="text-[12px] text-border-gray">
            Contract ID: <b>{data?.contract_number}</b>
          </span>
          <span className="text-[12px] text-border-gray">
            Service Report ID: <b>{data?.service_number}</b>
          </span>
        </div>
        <div className="flex text-primary font-bold text-[16px]">
          <span>{data?.contract?.title}</span>
          <PiClipboardTextLight className="self-center ml-4 mr-1" />
          <span>{data?.service_no_of_time}</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <button className="bg-white border flex flex-row items-center text-primary border-primary rounded-xl px-4 py-2">
          <AiOutlineEdit className="text-2xl font-bold" />
          <span className="text-lg font-extrabold pl-2">Edit Report</span>
        </button>
      </div>
    </div>
  );
}

export default ServiceDetailHead;

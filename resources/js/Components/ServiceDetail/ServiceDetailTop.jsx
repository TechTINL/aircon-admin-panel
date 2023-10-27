import React from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { PiClipboardTextLight } from 'react-icons/pi';

const ServiceDetailTop = () => {
  return (
    <div className="flex flex-row w-full justify-between rounded-xl bg-white p-4">
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 items-center">
          <div className="text-2xl font-bold text-black ">
            Casuarina Curry (Thomson)
          </div>
          <div className="py-1 px-[30px] text-primary bg-[#BFFAF8] font-bold text-[16px] rounded-full">
            Scheduled
          </div>
        </div>
        <div className="flex pt-2">
          <span className="text-[12px] text-border-gray">
            Contract ID: <b>230920-CO-00001</b>
          </span>
          <span className="text-[12px] text-border-gray pl-4">
            Service Report ID: <b>230920-SR-00001</b>
          </span>
        </div>
        <div className="flex text-primary font-bold text-[16px]">
          <span>Contract Name Here</span>
          <PiClipboardTextLight className="self-center ml-4 mr-1" />
          <span>3 of 4</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <button className="bg-white border flex flex-row items-center text-primary border-primary rounded-xl px-4 py-2">
          <AiOutlineEdit className="text-2xl font-bold" />
          <span className="text-lg font-extrabold pl-2">Edit Report</span>
        </button>
        <button className="bg-white border flex flex-row items-center border-red-600 text-red-600 rounded-xl px-4 py-2">
          <AiOutlineDelete className="text-2xl font-bold" />
          <span className="text-lg font-extrabold pl-2">Delete Report</span>
        </button>
      </div>
    </div>
  );
};

export default ServiceDetailTop;

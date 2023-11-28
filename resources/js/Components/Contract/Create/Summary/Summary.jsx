import React from 'react';
import useSummary from '@/Hooks/Contract/useSummary.js';

function Summary() {
  const { contractAmount, totalTechnicians, tasksCost, totalAmount } =
    useSummary();

  return (
    <div className="bg-white rounded-xl p-6 flex flex-col gap-6">
      <span className="font-bold text-[14px]">Summary</span>
      <div className="grid grid-cols-2 gap-8 text-[14px]">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <b>Contract Value</b>
            <span className="">$ {contractAmount}</span>
          </div>
          <div className="flex justify-between">
            <b>Total Technicians</b>
            <span>{totalTechnicians}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <b>Task Cost</b>
            <span className="text-[14px]">$ {tasksCost}</span>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between italic">
              <b>Including GST 8%</b>
              <span className="">$ 8.00</span>
            </div>
            <div className="flex justify-between text-primary font-bold">
              <b>Total Amount</b>
              <span>$ {totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;

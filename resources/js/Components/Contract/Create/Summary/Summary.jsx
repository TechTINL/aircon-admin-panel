import React from 'react';
import useSummary from '@/Hooks/Contract/useSummary';

function Summary({ gst }) {
  const gstValue = gst / 100;
  const {
    contractAmount,
    contractGST,
    totalContractAmount,
    totalTechnicians,
    totalGST,
    tasksCost,
    totalAmount,
    finalAmount,
  } = useSummary({
    gst: gstValue,
  });

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
            <b>GST {gst}%</b>
            <span>$ {contractGST}</span>
          </div>
          <div className="flex justify-between">
            <b>Total Contract Value</b>
            <span>$ {totalContractAmount}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <b>Task Cost</b>
            <span className="text-[14px]">$ {tasksCost}</span>
          </div>
          <div className="flex justify-between">
            <b>GST {gst}%</b>
            <span className="">$ {totalGST}</span>
          </div>
          <div className="flex justify-between">
            <b>Total Task Amount</b>
            <span>$ {totalAmount}</span>
          </div>
          <div className="flex justify-between">
            <b>Final Amount</b>
            <span>$ {finalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;

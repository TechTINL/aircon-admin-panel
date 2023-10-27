import React from 'react';
import SignatureImg from '../../../assets/images/signature.png';

const RightComponent = () => {
  return (
    <div className="flex flex-1 flex-col rounded-xl gap-4 bg-white p-4 text-[16px]">
      <div className="grid grid-cols-2 w-full gap-4">
        <div className="flex flex-col gap-1 font-extrabold">
          <span className="">Service Name</span>
          <span className="text-secondary text-[16px]">
            Cleaning and Washing
          </span>
        </div>
        <div className="flex flex-col gap-1 font-extrabold">
          <span className="">Service Time</span>
          <span className="text-secondary">Cleaning and Washing</span>
        </div>
      </div>

      <div>
        <div className="font-extrabold">Tasks</div>
        <div className="pr-6">
          Supply labour, tools & materials to perform 2/3 aircon maintenance
          servicing for 7 Nos. of FCUs (6 WM + 1 Ducted), inclusive of test run
          system.
        </div>
      </div>

      <div>
        <div className="font-extrabold">Technician Service Report</div>
        <div className="pr-6">
          All 3 air cons are cleaned and washed successfully. Gas are also
          refilled without any issue. No need for any follow up.
        </div>
      </div>

      <div className="grid grid-cols-2 w-full gap-4">
        <div className="flex flex-col gap-3 font-extrabold">
          <span className="">Task Visitation Notes</span>
          <div className="bg-bg-light-gray w-full font-[500] min-h-[250px] rounded-xl flex flex-col justify-between p-4">
            <span className="">
              Client said to reach 11 AM not 9 AM to look out for spoilt part
            </span>
            <span className="text-border-gray pr-10">
              Updated on 3 May 2023, 9:30 AM by{' '}
              <span className="text-primary"> Admin Macy </span>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 font-extrabold">
          <span className="">Service Time</span>
          <div className="bg-bg-light-gray w-full min-h-[250px] rounded-xl flex justify-center items-center">
            <img
              src={SignatureImg}
              className="max-w-[80%] max-h-[80%] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightComponent;

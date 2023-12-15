import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import AirconImg from '../../../assets/images/aircon-sample.png';

function TeamDetail() {
  const {
    service: { data },
  } = usePage().props;

  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-w-[400px] max-w-[40%] flex-col rounded-xl bg-white p-4">
      <div className="flex justify-between text-[14px] font-bold text-black items-center">
        <span className="font-bold text-[16px]">Team In-Charge</span>
      </div>
      <div className="flex flex-col mt-2">
        <span className="font-bold text-[18px] text-black">Leader</span>
        {data?.leaders?.map(leader => (
          <span className="text-border-gray" key={leader?.id}>
            {leader.name}
          </span>
        ))}
      </div>

      <div className="flex flex-col mt-4">
        <span className="font-bold text-[18px] text-black">Technicians</span>
        <div className="flex w-full overflow-y-auto mt-2">
          <div className="flex gap-2">
            {data?.technicians?.map(technician => (
              <div
                className="px-4 py-[3px] text-[10px] border border-border-gray text-border-gray rounded-full"
                key={technician?.id}
              >
                {technician.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-row overflow-x-scroll py-4 max-h-[350px]">
        <div className="flex flex-col flex-wrap gap-4">
          <div className="h-[140px] rounded-xl bg-gray-300 w-[140px]">
            <img
              src={AirconImg}
              className="w-full h-full object-cover rounded-xl"
              onClick={() => setOpen(true)}
            />
          </div>
          <div className="h-[140px] rounded-xl bg-gray-300 w-[140px]">
            <img
              src={AirconImg}
              className="w-full h-full object-cover rounded-xl"
              onClick={() => setOpen(true)}
            />
          </div>
          <div className="h-[140px] rounded-xl bg-gray-300 w-[140px]">
            <img
              src={AirconImg}
              className="w-full h-full object-cover rounded-xl"
              onClick={() => setOpen(true)}
            />
          </div>
          <div className="h-[140px] rounded-xl bg-gray-300 w-[140px]">
            <img
              src={AirconImg}
              className="w-full h-full object-cover rounded-xl"
              onClick={() => setOpen(true)}
            />
          </div>
          <div className="h-[140px] rounded-xl bg-gray-300 w-[140px]">
            <img
              src={AirconImg}
              className="w-full h-full object-cover rounded-xl"
              onClick={() => setOpen(true)}
            />
          </div>
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={[
              { src: AirconImg },
              { src: AirconImg },
              { src: AirconImg },
              { src: AirconImg },
              { src: AirconImg },
            ]}
            plugins={[Zoom]}
          />
        </div>
      </div>
    </div>
  );
}

export default TeamDetail;

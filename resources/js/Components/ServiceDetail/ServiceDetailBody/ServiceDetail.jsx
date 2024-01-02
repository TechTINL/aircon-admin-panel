import React from 'react';
import { usePage } from '@inertiajs/react';
import { app_url } from '@/Helpers/utils';
import { IoCalendarClearOutline } from 'react-icons/io5';

function ServiceDetail() {
  const {
    service: { data },
  } = usePage().props;

  return (
    <div className="flex flex-1 flex-col rounded-xl gap-4 bg-white p-4 text-[16px]">
      <div className="grid grid-cols-2 w-full gap-4">
        <div className="flex flex-col gap-2 font-extrabold">
          <span className="text-zinc-800 text-sm font-bold leading-none">
            Service Name
          </span>
          <span className="text-indigo-800 text-base font-bold leading-tight">
            {data?.name}
          </span>
        </div>
        <div className="flex flex-col gap-2 font-extrabold">
          <div className="text-zinc-800 text-sm font-bold leading-none">
            Service Time
          </div>
          <div className="flex items-center gap-3 text-indigo-800 text-base font-bold leading-tight">
            <IoCalendarClearOutline size={24} />
            <span>
              {data?.service_date}, {data?.service_time}
            </span>
          </div>
        </div>
      </div>

      <div>
        <div className="font-extrabold">Tasks</div>
        <div className="pr-6">
          {data?.tasks?.map(task => (
            <div className="flex flex-row gap-2" key={task?.id}>
              <span className="text-stone-800">{task?.name}</span>
              {task?.cost > 0 && (
                <span className="text-stone-800">({task?.cost} SGD)</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="font-extrabold">Technician Service Report</div>
        <div className="pr-6">{data?.technician_report}</div>
      </div>

      <div className="grid grid-cols-2 w-full gap-4">
        <div className="flex flex-col gap-3 font-extrabold">
          <span className="">Task Visitation Notes</span>
          <div className="bg-bg-light-gray w-full font-[500] min-h-[250px] rounded-xl flex flex-col justify-between p-4">
            <span className="">{data?.task_visitation_note}</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 font-extrabold">
          <span className="">Signature</span>
          <div className="bg-bg-light-gray w-full min-h-[250px] rounded-xl flex justify-center items-center">
            <img
              src={app_url(data?.client_signature)}
              className="max-w-[80%] max-h-[80%] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetail;

import React from 'react';
import { PiClipboardTextLight } from 'react-icons/pi';
import { usePage } from '@inertiajs/react';
import { Chip } from '@material-tailwind/react';
import ServiceStatus from '@/Components/Services/ServiceStatus';
import CreateServiceButton from '@/Components/Services/CreateServiceButton';
import EditServiceButton from '@/Components/Services/EditServiceButton';

function ServiceDetailHead() {
  const {
    service: { data },
    clients,
    leaders,
    employees,
  } = usePage().props;
  return (
    <div className="flex flex-row w-full justify-between rounded-xl bg-white p-4">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <div className="text-2xl font-bold text-black">
            {data?.client?.name}
          </div>
          <Chip
            value={data?.type}
            color={data?.type === 'contract' ? 'teal' : 'indigo'}
          />
          <ServiceStatus status={data?.status} />
        </div>
        <div className="flex gap-4">
          {data?.contract_number && (
            <span className="text-[12px] text-border-gray">
              Contract ID: <b>{data?.contract_number}</b>
            </span>
          )}
          <span className="text-[12px] text-border-gray">
            Service Report ID: <b>{data?.service_number}</b>
          </span>
        </div>
        <div className="flex gap-4 text-primary font-bold text-[16px]">
          <span>{data?.contract?.title}</span>
          <span className="flex items-center">
            <PiClipboardTextLight className="self-center ml-4 mr-1" />
            <span>{data?.service_no_of_time}</span>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {data?.status === 'Requires Follow Up' && (
          <CreateServiceButton
            clients={clients}
            leaders={leaders}
            employees={employees}
          >
            Create New Service Report (Ad-Hoc)
          </CreateServiceButton>
        )}
        <div className="flex justify-end">
          <EditServiceButton
            service={data}
            clients={clients}
            leaders={leaders}
            employees={employees}
          >
            Edit Service Report
          </EditServiceButton>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetailHead;

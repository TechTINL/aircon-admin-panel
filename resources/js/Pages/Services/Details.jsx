import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { VscFilePdf } from 'react-icons/vsc';
import ServiceDetailHead from '@/Components/ServiceDetail/ServiceDetailHead';
import ServiceDetailBody from '@/Components/ServiceDetail/ServiceDetailBody';
import useDownloadReport from '@/Hooks/Service/useDownloadReport';
import ShareOnWhatsApp from '@/Components/Services/ShareOnWhatsApp';

function Details({ auth, service: { data } }) {
  const { handleDownloadReport } = useDownloadReport();

  const pocs = data?.subClient?.contacts || data?.client?.contacts || [];

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Service Detail" />
      <div className="flex flex-auto flex-col m-6 max-w-full gap-6">
        <ServiceDetailHead />
        <ServiceDetailBody />
        <div className="bg-[#DADADA] h-[1.5px] w-full" />
        <div className="flex flex-row justify-between">
          <div className="text-[16px]" />
          <div className="flex flex-col items-end gap-4">
            <div className="flex flex-row gap-6">
              <div>
                <button
                  className="font-extrabold text-[16px] gap-2 bg-secondary text-white flex items-center py-2 px-4 rounded-lg"
                  onClick={() => handleDownloadReport(data.service_number)}
                >
                  <VscFilePdf size={24} />
                  <span>Generate Report</span>
                </button>
              </div>
              <ShareOnWhatsApp
                pocs={pocs}
                serviceNumber={data.service_number}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Details;

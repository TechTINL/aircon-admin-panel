import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { VscFilePdf } from 'react-icons/vsc';
import { BsSendFill } from 'react-icons/bs';
import ServiceDetailHead from '@/Components/ServiceDetail/ServiceDetailHead';
import ServiceDetailBody from '@/Components/ServiceDetail/ServiceDetailBody';
import useDownloadReport from '@/Hooks/Service/useDownloadReport';

function Details({ auth, service: { data } }) {
  const { handleDownloadReport } = useDownloadReport();

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
              <button
                className="font-extrabold text-[16px] gap-2 bg-secondary text-white flex items-center py-2 px-4 rounded-lg"
                onClick={() => handleDownloadReport(data.service_number)}
              >
                <VscFilePdf size={24} />
                <span>Download Report</span>
              </button>
              <button className="font-[1000] text-[16px] gap-2 text-whatsapp-color border-whatsapp-color border-2 flex items-center py-2 px-4 rounded-lg">
                <BsSendFill size={22} />
                <span>Share on WhatsApp</span>
              </button>
            </div>
            <div className="border rounded-xl divide-y text-border-gray divide-border-gray border-border-gray w-[210px]">
              <div className="px-6 py-2">
                <div className="grid grid-cols-2 col-2">
                  <p className="text-teal-500 text-sm font-semibold">Client</p>
                  <div className="flex justify-end">
                    <b className="text-right text-gray-600 text-xs font-normal">
                      POC 1
                    </b>
                  </div>
                </div>
                <p>+65 654 321 123</p>
              </div>
              <div className="px-6 py-2">
                <div className="grid grid-cols-2 col-2">
                  <p className="text-teal-500 text-sm font-semibold">Rina</p>
                  <div className="flex justify-end">
                    <b className="text-right text-gray-600 text-xs font-normal">
                      POC 2
                    </b>
                  </div>
                </div>
                <p>+65 654 321 123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Details;

import React, { useState } from 'react';
import Modal from '@/Components/Modal';
import { AiFillCloseCircle } from 'react-icons/ai';
import { PiClipboardTextLight } from 'react-icons/pi';
import { FaEdit } from 'react-icons/fa';
import { Switch } from '@headlessui/react';
import moment from 'moment';
import { router } from '@inertiajs/react';
import { app_url } from '@/Helpers/utils.js';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

function JobDetailsModal({ service, openModal, setOpenModal, handleEdit }) {
  const [swichOn, setSwichOn] = useState(false);

  const handleSwitch = checked => {
    setSwichOn(!swichOn);
  };

  const onRouteDetails = () => {
    router.replace(`/services/${service.id}`);
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <div className="flex flex-col p-4 w-[100%] max-h-[80vh] overflow-y-auto">
        <button className="self-end" onClick={() => setOpenModal(false)}>
          <AiFillCloseCircle className="text-border-gray text-4xl" />
        </button>
        <div className="flex flex-col p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-[26px] font-bold text-black">
                {service?.name}
              </span>
            </div>
          </div>
          <div className="flex justify-end my-4">
            <span className="text-[12px] font-bold text-primary bg-[#D4F1F3] h-max px-4 py-1 rounded-full ml-4">
              {service?.status}
            </span>
            <span className="text-[16px] font-bold text-black px-4">
              On-Hold
            </span>
            <Switch
              checked={false}
              onChange={handleSwitch}
              className={`${
                swichOn ? 'bg-primary' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  swichOn ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
          {/* Switch */}
          <div className="flex my-2">
            <span className="text-[12px] text-border-gray">
              Contract ID: <b>{service?.contract_id}</b>
            </span>
            <span className="text-[12px] text-border-gray">
              Service Report ID: <b>{service?.service_number}</b>
            </span>
          </div>
          <div className="flex text-primary font-bold text-[16px]">
            <span>{service?.contract?.title}</span>
            <PiClipboardTextLight className="self-center ml-4 mr-1" />
            <span>{service?.service_no_of_time}</span>
          </div>

          <div className="flex justify-between text-[17px] font-bold text-black mt-4 items-center">
            <span className="">Team In-Charge</span>
            <span className="text-[17px] text-border-gray">
              Assigned by <span className="text-primary">Admin Macy</span>
            </span>
          </div>

          <div className="text-[14px] my-4">
            <div className="text-black font-bold">Team Leaders</div>
            <div>
              {service?.leaders?.map((leader, index) => (
                <span key={index} className="text-border-gray pl-2">
                  {leader?.name}
                  {', '}
                </span>
              ))}
            </div>

            <div className="text-black font-bold">Technicians</div>
            <div>
              {service?.technicians?.map((technician, index) => (
                <span key={index} className="text-border-gray pl-2">
                  {technician?.name}
                  {', '}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center text-[17px] font-bold text-black mt-4">
            <span className="">{service?.name}</span>
            <div>
              <div className="text-[13px] text-border-gray">Service Time </div>
              <div>
                {moment(new Date(service?.service_at)).format(
                  'DD MMMM YYYY, HH:MM A'
                )}
              </div>
            </div>
          </div>

          <div className="text-border-gray text-[14px]">
            <span className="font-bold">Tasks</span>
            {service?.tasks?.map((task, index) => (
              <div key={index} className="w-full flex flex-rows my-2">
                <div className="w-5/6 px-2">{task?.name}</div>
                <div className="w-1/6">
                  {task?.duration_hours} Hr, {task?.duration_minutes} Min
                  <br />({task?.cost} - SGD)
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-[17px] font-bold text-black mt-4">
            <span className="">Task Visitation Notes</span>
          </div>

          <div className="text-border-gray flex flex-col text-[14px]">
            {service?.task_visitation_note || ''}
          </div>
          <div className="text-black flex flex-row text-[14px]">
            <span>Updated by &nbsp;</span>
            <span className="text-primary">Admin Macy</span>
          </div>

          <div className="flex flex-row w-full overflow-x-scroll py-4">
            <div className="flex flex-row gap-4">
              {service?.photos.map((photo, index) => (
                <div
                  className="h-[140px] rounded-xl bg-gray-300 w-[140px]"
                  key={index}
                >
                  <img
                    src={app_url(photo.url)}
                    className="w-full h-full object-cover rounded-xl"
                    alt="service-photo"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center text-[17px] font-bold text-black mt-4">
            Technician Service Report
          </div>
          <div className="pr-6">{service?.technician_report}</div>

          <div className="flex justify-between items-center text-[17px] font-bold text-black mt-2">
            Client Signature
          </div>
          <div className="bg-bg-light-gray w-full min-h-[250px] rounded-xl flex justify-center items-center my-4">
            <img
              src={app_url(service?.client_signature)}
              className="max-w-[80%] max-h-[80%] object-contain"
            />
          </div>

          <div className="flex flex-col justify-center items-center mt-6 gap-4">
            <button
              onClick={handleEdit}
              className="bg-white w-[70%] py-2 border text-primary justify-center items-center border-primary rounded-xl flex flex-row"
            >
              <FaEdit className="text-primary text-lg" />
              <span className="pl-2">Edit report</span>
            </button>
            <button
              onClick={onRouteDetails}
              className="w-[70%] py-2 bg-primary rounded-xl text-white"
            >
              See More
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default JobDetailsModal;

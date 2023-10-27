import React, { useState } from 'react';
import Modal from '../Modal';
import { AiFillCaretDown, AiFillCloseCircle } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import TextInput from '../TextInput';
import Dropdown from '../Dropdown';
import { Switch } from '@headlessui/react';
import MDropDown from './MDropDown';
import { getTimes } from '../../Utils/utils';
import TextArea from '../Shared/TextArea';
import AirconImg from '../../assets/images/aircon-sample.png';
import SignatureImg from '../../assets/images/signature.png';

const EditServiceReportModal = ({ openModal, setOpenModal }) => {
  const times = getTimes()?.map(time => {
    return {
      label: time,
      value: time,
    };
  });
  console.log('Times:', times);
  const [selectedSubClient, setSelectedSubClient] = useState('Optional');
  const [selectedServiceName, setSelectedServiceName] = useState('Service-1');
  const [selectedTime, setSelectedTime] = useState(null);
  const [serviceDate, setServiceDate] = useState('13-09-2023');
  const [serviceTime, setServiceTime] = useState('9:00 AM');
  const [swichOn, setSwichOn] = useState(false);
  const [asPrivate, setAsPrivate] = useState(false);
  const [requireFollowUp, setRequireFollowUp] = useState(false);

  const handleSwitch = checked => {
    setSwichOn(!swichOn);
  };
  const subClients = [
    {
      label: 'Sub-Client 1',
      value: 'sub-client-1',
    },
    {
      label: 'Sub-Client 2',
      value: 'sub-client-2',
    },
    {
      label: 'Sub-Client 3',
      value: 'sub-client-3',
    },
  ];

  const nameOfServices = [
    {
      label: 'Service 1',
      value: 'Service-1',
    },
    {
      label: 'Service 2',
      value: 'Service-2',
    },
    {
      label: 'Service 3',
      value: 'Service-3',
    },
  ];

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} maxWidth="3xl">
      <div className="flex flex-col p-6 w-[100%] xl:max-w-[80vw] h-full max-h-[80vh] gap-4 overflow-y-auto">
        <div className="flex justify-between items-center">
          <span className="text-[26px] font-bold text-black">
            Edit Service Report
          </span>
          <button className="self-end" onClick={() => setOpenModal(false)}>
            <AiFillCloseCircle className="text-[#BCBDC0] text-4xl" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-[20px] font-bold text-black">
            Client Detail
          </span>

          <div className="flex flex-row gap-6">
            <div className="flex flex-1 flex-col gap-2">
              <span className="text-[18px] font-bold text-black">Client</span>
              <TextInput className="bg-bg-input-gray rounded-xl h-[40px]" />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <span className="text-[18px] font-bold text-black">
                Sub-Client
              </span>
              <Dropdown>
                <Dropdown.Trigger>
                  <span className="inline-flex rounded-md w-full h-full">
                    <button
                      type="button"
                      className="inline-flex justify-between items-center w-full h-[40px] px-3 py-2 bg-bg-input-gray text-sm leading-4 font-medium text-border-gray rounded-xl hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                    >
                      <span className="px-2 font-bold text-[14px]">
                        {selectedSubClient}
                      </span>
                      <AiFillCaretDown size={20} fontWeight={800} />
                    </button>
                  </span>
                </Dropdown.Trigger>
                <Dropdown.Content>
                  <div className="w-full">
                    {subClients.map((d, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedSubClient(d.value)}
                        className={`w-full ${
                          selectedSubClient === d.value && 'bg-slate-300'
                        }`}
                      >
                        <div className="px-4 py-2">{d.label}</div>
                        {i < subClients.length - 1 && <hr />}
                      </button>
                    ))}
                  </div>
                </Dropdown.Content>
              </Dropdown>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[20px] font-bold text-black">On-Hold</span>
          <Switch
            checked={false}
            onChange={handleSwitch}
            className={`${
              swichOn ? 'bg-secondary' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${
                swichOn ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>

        <div className="bg-bg-input-gray min-h-[2px] w-full"></div>

        <div className="flex flex-col gap-4">
          <span className="text-[20px] font-bold text-black">
            Service Report Detail
          </span>

          <div className="flex flex-row gap-6">
            <div className="flex flex-1 flex-col gap-2">
              <span className="text-[18px] font-bold text-black">
                Name of Service<span className="text-red-600">*</span>
              </span>
              <Dropdown>
                <Dropdown.Trigger>
                  <span className="inline-flex rounded-md w-full h-full">
                    <button
                      type="button"
                      className="inline-flex justify-between items-center w-full h-[40px] px-3 py-2 bg-bg-input-gray text-sm leading-4 font-medium text-border-gray rounded-xl hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                    >
                      <span className="px-2 font-bold text-[14px]">
                        {selectedServiceName}
                      </span>
                      <AiFillCaretDown size={20} fontWeight={800} />
                    </button>
                  </span>
                </Dropdown.Trigger>
                <Dropdown.Content>
                  {nameOfServices.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedServiceName(d.value)}
                      className={
                        selectedSubClient === d.value && 'bg-slate-300'
                      }
                    >
                      <div className="px-4 py-2">{d.label}</div>
                      {i < subClients.length - 1 && <hr />}
                    </button>
                  ))}
                </Dropdown.Content>
              </Dropdown>
            </div>
            <div className="flex flex-initial flex-col gap-2">
              <span className="text-[18px] font-bold text-black">
                Type of Service<span className="text-red-600">*</span>
              </span>
              <TextInput
                className="bg-bg-input-gray rounded-xl h-[40px]"
                placeholder="Contract"
              />
            </div>
          </div>

          <div className="flex flex-row gap-6">
            <div className="flex flex-1 flex-col gap-2">
              <span className="text-[18px] font-bold text-black">
                Service Date <span className="text-red-600">*</span>
              </span>
              <button className="rounded-xl h-[40px] bg-white border border-border-gray justify-between items-center px-4 flex">
                <div>{serviceDate}</div>
                <AiFillCaretDown size={20} fontWeight={800} />
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <span className="text-[18px] font-bold text-black">
                Service Time <span className="text-red-600">*</span>
              </span>
              <MDropDown
                items={times}
                selectedItem={selectedTime}
                placeholder={'Select Time'}
                handleOnSelect={item => setSelectedTime(item)}
              />
            </div>
          </div>

          <div className="flex flex-row gap-6">
            <div className="flex flex-1 flex-col gap-2">
              <span className="text-[18px] font-bold text-black">
                Contract ID
              </span>
              <TextInput
                placeholder="230920-CO-XXXX"
                className="bg-bg-input-gray text-black rounded-xl h-[40px]"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <span className="text-[18px] font-bold text-black">
                Service Report ID
              </span>
              <TextInput
                placeholder="230920-SR-XXXX"
                className="bg-bg-input-gray rounded-xl h-[40px]"
              />
            </div>
          </div>
        </div>

        <div className="bg-bg-input-gray min-h-[2px] w-full"></div>

        <div className="flex flex-col gap-4">
          <span className="text-[20px] font-bold text-black">Task Detail</span>

          <div className="flex flex-row items-end gap-6">
            <div className="flex flex-1 flex-col gap-2">
              <span className="text-[18px] font-bold text-black">
                Team Leader / Sub-Contractor
              </span>
              <button className="rounded-xl h-[40px] bg-white border border-border-gray justify-between items-center px-4 flex">
                <div>{'Cleaning and washing'}</div>
                <AiFillCaretDown size={20} fontWeight={800} />
              </button>
            </div>

            <div className="flex flex-initial w-[200px] flex-col gap-2">
              <span className="text-[18px] font-bold text-black">
                Technician Count
              </span>
              <button className="rounded-xl h-[40px] bg-white border border-border-gray justify-between items-center px-4 flex">
                <div>{'2'}</div>
                <AiFillCaretDown size={20} fontWeight={800} />
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <span className="text-[18px] font-bold text-black">
                Technician
              </span>
              <button className="rounded-xl h-[40px] bg-white border border-border-gray justify-between items-center px-4 flex">
                <div>
                  <div>hhhh</div>
                </div>
                <AiFillCaretDown size={20} fontWeight={800} />
              </button>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <span className="text-[18px] font-extrabold text-primary">
              Task 1
            </span>
            <button className="rounded-xl h-[40px] bg-white border border-border-gray justify-between items-center px-4 flex">
              <div>{'Cleaning and washing'}</div>
              <AiFillCaretDown size={20} fontWeight={800} />
            </button>
          </div>

          <div className="flex flex-row gap-6">
            <div className="flex flex-1 flex-col gap-2">
              <span className="text-[18px] font-bold text-black">Duration</span>
              <div className="flex max-w-full items-center">
                <TextInput
                  className="bg-white rounded-xl flex-1 h-[40px]"
                  placeholder="Contract"
                />
                <span className="ml-1 text-md">Hour</span>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <span className="text-[18px] font-bold text-black"> &nbsp; </span>
              <div className="flex flex-1 items-center">
                <TextInput
                  className="bg-white rounded-xl flex-1 h-[40px]"
                  placeholder="Contract"
                />
                <span className="pl-1 text-md">Mins</span>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-2 ">
              <span className="text-[18px] font-bold text-black">Cost</span>
              <div className="flex flex-1 items-center">
                <TextInput
                  className="bg-bg-input-gray flex-1 rounded-xl h-[40px]"
                  placeholder="Contract"
                />
                <span className="pl-1 text-md">$</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-input-gray min-h-[2px] w-full"></div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <span className="text-[18px] font-extrabold text-primary">
              Task 2
            </span>
            <button className="rounded-xl h-[40px] bg-white border border-border-gray justify-between items-center px-4 flex">
              <div>{'Cleaning and washing'}</div>
              <AiFillCaretDown size={20} fontWeight={800} />
            </button>

            <div className="flex flex-row gap-6">
              <div className="flex flex-1 flex-col gap-2">
                <span className="text-[18px] font-bold text-black">
                  Duration
                </span>
                <div className="flex max-w-full items-center">
                  <TextInput
                    className="bg-white rounded-xl flex-1 h-[40px]"
                    placeholder="Contract"
                  />
                  <span className="ml-1 text-md">Hour</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <span className="text-[18px] font-bold text-black">
                  {' '}
                  &nbsp;{' '}
                </span>
                <div className="flex flex-1 items-center">
                  <TextInput
                    className="bg-white rounded-xl flex-1 h-[40px]"
                    placeholder="Contract"
                  />
                  <span className="pl-1 text-md">Mins</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2 ">
                <span className="text-[18px] font-bold text-black">Cost</span>
                <div className="flex flex-1 items-center">
                  <TextInput
                    className="bg-bg-input-gray flex-1 rounded-xl h-[40px]"
                    placeholder="Contract"
                  />
                  <span className="pl-1 text-md">$</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-1 flex-row w-full overflow-x-scroll">
            <div className="flex flex-row gap-4">
              <div className="h-[140px] rounded-xl bg-gray-300 w-[140px]">
                <img
                  src={AirconImg}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="h-[140px] rounded-xl bg-gray-300 w-[140px]">
                <img
                  src={AirconImg}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="h-[140px] rounded-xl bg-gray-300 w-[140px]">
                <img
                  src={AirconImg}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="h-[140px] rounded-xl bg-gray-300 w-[140px]">
                <img
                  src={AirconImg}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
          <button className="flex border border-primary w-[140px] h-[140px] rounded-xl justify-center items-center">
            <GrAdd className="text-primary" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-[18px] font-extrabold text-black">
            Technical Service Report
          </span>
          <div className="border border-bg-input-gray rounded-xl p-4">
            All 3 air cons are cleaned and washed successfully. Gas are also
            refilled without any issue. No need for any follow up.
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-[18px] font-extrabold text-black">
            Task Visitation Note
          </span>
          <TextArea
            className="border border-bg-input-gray rounded-xl p-4"
            placeholder="Type visitation notes here"
          />
        </div>

        <div className="bg-bg-input-gray min-h-[2px] w-full"></div>

        <div className="flex flex-row gap-4 text-[16px] text-black">
          <div className="flex flex-col flex-1 gap-4">
            <div className="text-[18px] font-extrabold text-black">
              Client's Signature
            </div>
            <div className="bg-bg-input-gray w-full min-h-[250px] rounded-xl flex justify-center items-center">
              <img
                src={SignatureImg}
                className="max-w-[80%] max-h-[80%] object-contain"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col mt-4 gap-6 pl-6 font-extrabold">
            <div className="flex justify-between">
              <span>Set as Private</span>
              <Switch
                checked={false}
                onChange={() => setAsPrivate(!asPrivate)}
                className={`${
                  asPrivate ? 'bg-secondary' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    asPrivate ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
            <div className="flex justify-between">
              <span>Require Follow-Up</span>
              <Switch
                checked={false}
                onChange={() => setRequireFollowUp(!requireFollowUp)}
                className={`${
                  requireFollowUp ? 'bg-secondary' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    requireFollowUp ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditServiceReportModal;

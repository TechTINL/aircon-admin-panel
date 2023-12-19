import {
  Button,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
} from '@material-tailwind/react';
import { AiFillCloseCircle } from 'react-icons/ai';
import Select from 'react-select';
import TextInput from '@/Components/TextInput';
import DatePicker from '@/Components/Common/DatePicker';
import TextArea from '@/Components/Shared/TextArea';
import React from 'react';
import TimePicker from '@/Components/Common/TimePicker';
import { FaRegTrashCan } from 'react-icons/fa6';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiDollar } from 'react-icons/bi';
import useServiceFormModel from '@/Hooks/Service/useServiceFormModel.js';

function ServiceFormModal({ openModal, setOpenModal, clients, service }) {
  const handleOpen = () => setOpenModal(!openModal);
  const { form, dispatch } = useServiceFormModel({ clients, service });

  return (
    <Dialog open={openModal} handler={handleOpen} className="px-4 py-3">
      <DialogHeader className="flex justify-between">
        <div className="text-zinc-800 text-3xl font-bold leading-10">
          {service
            ? 'Edit Service Report (Contract)'
            : 'New Service Report (Ad-Hoc)'}
        </div>
        <IconButton variant="text" onClick={() => setOpenModal(false)}>
          <AiFillCloseCircle className="text-border-gray text-4xl" />
        </IconButton>
      </DialogHeader>
      <DialogBody className="h-[42rem] overflow-scroll">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-6">
              <div className="w-full">
                <div className="flex justify-between">
                  <span className="text-black font-bold text-[16px]">
                    Service Report ID
                  </span>
                  <span className="text-black text-[12px] italic">
                    This is auto-generated.
                  </span>
                </div>
                <TextInput
                  disabled
                  value={form?.service_number || '230920-CO-XXXXX'}
                  className="w-full rounded-xl bg-[#BCBDC0] border-none"
                />
              </div>
              <div className="w-full">
                <div className="flex justify-between">
                  <span className="text-black font-bold text-[16px]">
                    Contract ID
                  </span>
                  <span className="text-black text-[12px] italic">
                    This is auto-generated.
                  </span>
                </div>
                <TextInput
                  disabled
                  value={form?.contract_number || '230920-CO-XXXXX'}
                  className="w-full rounded-xl bg-[#BCBDC0] border-none"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-black font-bold text-base">Client</span>
            <Select
              options={form?.client_options}
              onChange={selectedOption => {
                dispatch({
                  type: 'SET_SELECTED_CLIENT',
                  payload: selectedOption,
                });
              }}
              value={form?.selected_client}
              isDisabled={!!service}
            />
          </div>
          {form?.sub_client_options.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-black font-bold text-base">Sub-Client</span>
              <Select
                options={form?.sub_client_options}
                onChange={selectedOption => {
                  dispatch({
                    type: 'SET_SELECTED_SUB_CLIENT',
                    payload: selectedOption,
                  });
                }}
                value={form?.selected_sub_client}
                isDisabled={!!service}
              />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <span className="text-black font-bold text-base">
              Service Address
            </span>
            <Select
              options={form?.service_addresses}
              onChange={selectedOption => {
                dispatch({
                  type: 'SET_SELECTED_SERVICE_ADDRESS',
                  payload: selectedOption,
                });
              }}
              value={form?.selected_service_address}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-black font-bold text-base">
              Billing Address
            </span>
            <Select
              options={form?.billing_addresses}
              onChange={selectedOption => {
                dispatch({
                  type: 'SET_SELECTED_BILLING_ADDRESS',
                  payload: selectedOption,
                });
              }}
              value={form?.selected_billing_address}
            />
          </div>
          <hr />
          <div className="flex flex-col gap-2">
            <span className="text-black font-bold text-base">
              Service Detail
            </span>
            <div className="p-4 flex flex-col border border-border-gray rounded-xl text-[14px] gap-2">
              <span className="text-primary">Service Request</span>
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <span>Name of Service</span>
                </div>
                <TextArea
                  id="service-name"
                  placeholder="Name of Service"
                  value={form?.name}
                  onChange={e => {
                    dispatch({
                      type: 'SET_NAME',
                      payload: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="flex flex-col gap-1 flex-1">
                  <span>Team Leader</span>
                  <Select isMulti isSearchable />
                </div>
                <div className="flex flex-col gap-1 max-w-max">
                  <span>Technician Count</span>
                  <TextInput
                    placeholder="Technician Count"
                    className="rounded flex-1"
                  />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <span>Technician / Sub-Contractor</span>
                  <Select isMulti isSearchable />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <span>Date</span>
                  <DatePicker classes="rounded-xl" align="left" />
                </div>
                <div className="flex flex-col gap-1">
                  <span>Time</span>
                  <TimePicker classes="rounded-xl" />
                </div>
                <div className="flex gap-1 justify-end items-center mt-5">
                  <IconButton variant="text">
                    <FaRegTrashCan size={22} color="red" />
                  </IconButton>
                </div>
              </div>
              <hr />
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <span className="text-primary">Job Description</span>
                  </div>
                  <TextArea id="task-name" placeholder="Task Name" />
                </div>
                <div>
                  <h3 className="text-primary font-semibold">Duration</h3>
                  <div className="flex gap-4 items-center">
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2 items-center">
                        <Input variant="outlined" label="Hours" />
                        <Input variant="outlined" label="Minutes" />
                        <Input
                          variant="outlined"
                          label="Cost"
                          icon={<BiDollar size={22} />}
                        />
                        <div className="w-full">
                          <IconButton variant="text">
                            <RiDeleteBin6Line color="red" size={22} />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}

export default ServiceFormModal;

import {
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  Button,
  Switch,
  DialogFooter,
} from '@material-tailwind/react';
import { AiFillCloseCircle } from 'react-icons/ai';
import Select from 'react-select';
import TextInput from '@/Components/TextInput';
import DatePicker from '@/Components/Common/DatePicker';
import TextArea from '@/Components/Shared/TextArea';
import React from 'react';
import TimePicker from '@/Components/Common/TimePicker';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiDollar } from 'react-icons/bi';
import useServiceFormModel from '@/Hooks/Service/useServiceFormModel';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { usePage } from '@inertiajs/react';

function ServiceFormModal({
  openModal,
  setOpenModal,
  clients,
  service,
  leaders,
  employees,
  onSubmit,
}) {
  const { gst: gstPercentage } = usePage().props;

  const gstValue = gstPercentage / 100;

  const handleOpen = () => setOpenModal(!openModal);
  const { form, dispatch, tasksCost, gst, totalAmount } = useServiceFormModel({
    clients,
    service,
    leaders,
    employees,
    gstValue,
  });

  const handleSaveServiceReport = () => {
    onSubmit(form);
  };

  return (
    <Dialog
      open={openModal}
      handler={handleOpen}
      className="px-4 py-3"
      size="lg"
    >
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
      <DialogBody className="h-[42rem] overflow-y-scroll">
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
                  onChange={value => {
                    dispatch({
                      type: 'SET_NAME',
                      payload: value,
                    });
                  }}
                />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <div className="flex flex-col gap-1 flex-1">
                  <span>Team Leader</span>
                  <Select
                    isMulti
                    isSearchable
                    options={form?.leaders}
                    onChange={selectedOption => {
                      dispatch({
                        type: 'SET_SELECTED_LEADERS',
                        payload: selectedOption,
                      });
                    }}
                    value={form?.selected_leaders}
                  />
                </div>
                <div className="flex flex-col gap-1 max-w-max">
                  <span>Technician Count</span>
                  <TextInput
                    placeholder="Technician Count"
                    className="rounded flex-1"
                    type="number"
                    value={form?.technician_count}
                    onChange={e => {
                      dispatch({
                        type: 'SET_TECHNICIAN_COUNT',
                        payload: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <span>Technician / Sub-Contractor</span>
                  <Select
                    isMulti
                    isSearchable
                    value={form?.selected_employees}
                    options={form?.employees}
                    onChange={selectedOption => {
                      dispatch({
                        type: 'SET_SELECTED_EMPLOYEES',
                        payload: selectedOption,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <span>Date</span>
                  <DatePicker
                    classes="rounded-xl"
                    align="left"
                    value={form?.service_date}
                    onChange={date => {
                      dispatch({
                        type: 'SET_SERVICE_DATE',
                        payload: date,
                      });
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span>Time</span>
                  <TimePicker
                    classes="rounded-xl"
                    value={form?.service_time}
                    onChange={time => {
                      dispatch({
                        type: 'SET_SERVICE_TIME',
                        payload: time,
                      });
                    }}
                  />
                </div>
              </div>
              <hr />
              <div className="flex flex-col gap-4">
                {form?.tasks.map((task, index) => (
                  <>
                    <div className="flex flex-col" key={index}>
                      <div className="flex justify-between items-center">
                        <span className="text-primary">Job Description</span>
                      </div>
                      <TextArea
                        id="task-name"
                        placeholder="Task Name"
                        value={task?.name}
                        onChange={value => {
                          dispatch({
                            type: 'SET_TASK_NAME',
                            payload: value,
                            index,
                          });
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-primary font-semibold">Duration</h3>
                      <div className="flex gap-4 items-center">
                        <div className="flex flex-col gap-1">
                          <div className="flex gap-2 items-center">
                            <Input
                              variant="outlined"
                              label="Hours"
                              value={task?.hours}
                              onChange={e => {
                                dispatch({
                                  type: 'SET_TASK_HOURS',
                                  payload: e.target.value,
                                  index,
                                });
                              }}
                            />
                            <Input
                              variant="outlined"
                              label="Minutes"
                              value={task?.minutes}
                              onChange={e => {
                                dispatch({
                                  type: 'SET_TASK_MINUTES',
                                  payload: e.target.value,
                                  index,
                                });
                              }}
                            />
                            <Input
                              variant="outlined"
                              label="Cost"
                              icon={<BiDollar size={22} />}
                              value={task?.cost}
                              onChange={e => {
                                dispatch({
                                  type: 'SET_TASK_COST',
                                  payload: e.target.value,
                                  index,
                                });
                              }}
                            />
                            <div className="w-full">
                              <IconButton
                                variant="text"
                                onClick={() => {
                                  dispatch({
                                    type: 'REMOVE_TASK',
                                    index,
                                  });
                                }}
                              >
                                <RiDeleteBin6Line color="red" size={22} />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
                <Button
                  color="teal"
                  variant="outlined"
                  className="flex justify-center items-center gap-3 w-full"
                  onClick={() => {
                    dispatch({
                      type: 'ADD_TASK',
                    });
                  }}
                >
                  <span>Add More Task</span>
                  <MdOutlineAddCircleOutline size={20} />
                </Button>
              </div>
            </div>
          </div>
          <hr />
          {form?.is_edit_form && (
            <>
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <span className="text-black mb-4">
                    Technician Service Report
                  </span>
                </div>
                <TextArea
                  id="technician-service-report"
                  placeholder="Technician Service Report"
                  value={form?.technician_report}
                  onChange={value => {
                    dispatch({
                      type: 'SET_TECHNICIAN_REPORT',
                      payload: value,
                    });
                  }}
                />
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <span className="text-black mb-4">Task Visitation Notes</span>
                </div>
                <TextArea
                  id="task-visitation-notes"
                  placeholder="Task Visitation Note"
                  value={form?.task_visitation_notes}
                  onChange={value => {
                    dispatch({
                      type: 'SET_TASK_VISITATION_NOTES',
                      payload: value,
                    });
                  }}
                />
              </div>
              <div className="flex justify-between gap-4">
                <div className="w-full">
                  <span className="text-black mb-4">Client Signature</span>
                  <img
                    src={form.client_signature}
                    alt="signature"
                    className="h-20 rounded-lg object-cover object-center bg-gray-100 my-4"
                  />
                </div>
                <div className="w-full mx-4">
                  <div className="flex items-center justify-between">
                    <span className="text-black font-semibold mb-4">
                      Set as Private
                    </span>
                    <div>
                      <Switch
                        color="indigo"
                        checked={form?.report_status === 'private'}
                        onChange={e => {
                          dispatch({
                            type: 'SET_REPORT_STATUS',
                            payload: e.target.checked ? 'private' : 'public',
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black font-semibold mb-4">
                      Requires follow-up
                    </span>
                    <div>
                      <Switch
                        color="indigo"
                        checked={form?.required_follow_up}
                        onChange={e => {
                          dispatch({
                            type: 'SET_REQUIRED_FOLLOW_UP',
                            payload: e.target.checked,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black font-semibold mb-4">
                      Mark as Completed
                    </span>
                    <div>
                      <Switch
                        color="indigo"
                        checked={form?.mark_as_completed}
                        onChange={e => {
                          dispatch({
                            type: 'SET_MARK_AS_COMPLETED',
                            payload: e.target.checked,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black font-semibold mb-4">
                      On Hold
                    </span>
                    <div>
                      <Switch
                        color="indigo"
                        checked={form?.on_hold}
                        onChange={e => {
                          dispatch({
                            type: 'SET_ON_HOLD',
                            payload: e.target.checked,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          <hr />
          <div className="flex flex-col gap-2">
            <span className="mb-4 text-black font-bold text-lg">Summary</span>
            <div className="flex flex-row justify-between gap-10">
              <div className="flex flex-row justify-between w-full">
                <span className="text-black font-semibold text-sm">
                  Total Technicians
                </span>
                <span className="text-black font-semibold text-sm">
                  {form?.technician_count || 0}
                </span>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-row justify-between">
                  <span className="text-black font-semibold text-sm">
                    Task Cost
                  </span>
                  <span className="text-black font-light text-sm">
                    $ {tasksCost}
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="text-black font-extralight text-sm">
                    GST {gstPercentage}%
                  </span>
                  <span className="text-black font-light text-sm">$ {gst}</span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="text-primary font-semibold text-sm">
                    Total Amount
                  </span>
                  <span className="text-black font-light text-sm">
                    $ {totalAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          className="w-full"
          color="teal"
          onClick={handleSaveServiceReport}
        >
          Save Service Report
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default ServiceFormModal;

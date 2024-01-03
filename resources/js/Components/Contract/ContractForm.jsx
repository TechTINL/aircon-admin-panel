import { Link } from '@inertiajs/react';
import { AiOutlineLeftCircle } from 'react-icons/ai';
import { Button, IconButton, Input } from '@material-tailwind/react';
import useContractForm from '@/Hooks/useContractForm';
import CreatableSelect from 'react-select/creatable';
import TextInput from '@/Components/TextInput';
import Select from 'react-select';
import TextArea from '@/Components/Shared/TextArea';
import TimePicker from '@/Components/Common/TimePicker';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import React, { useState } from 'react';
import { BiDollar } from 'react-icons/bi';
import DatePickerDialog from '@/Components/Common/DatePickerDialog';
import SelectTemplateModal from '@/Components/Template/SelectTemplateModal';

function ContractForm({
  contractTemplates: templates,
  serviceTemplates,
  taskTemplates,
  clients,
  leaders,
  technicians,
  gst,
  contract,
  saveContract,
}) {
  const { form, dispatch } = useContractForm({
    contractTemplates: templates,
    clients,
    contract,
    leaders,
    technicians,
    gstValue: gst / 100,
  });

  const [openServiceTemplateModal, setOpenServiceTemplateModal] =
    useState(false);
  const [openTaskTemplateModal, setOpenTaskTemplateModal] = useState(false);

  const updateServicesName = value => {
    dispatch({
      type: 'SET_ALL_SERVICE_NAMES',
      payload: value,
    });
  };

  const updateTasksName = value => {
    dispatch({
      type: 'SET_ALL_TASK_NAMES',
      payload: value,
    });
  };

  const getLeaders = service => {
    return (
      service.leaders?.map(leader => ({
        label: leader.name || leader.label,
        value: leader.id || leader.value,
      })) || []
    );
  };

  const getTechnicians = service => {
    return (
      service.technicians?.map(technician => ({
        label: technician.name || technician.label,
        value: technician.id || technician.value,
      })) || []
    );
  };

  return (
    <div className="flex-auto flex flex-col m-6 gap-6">
      <div className="flex gap-4">
        <Link href={route('contracts.index')}>
          <IconButton variant="text" className="rounded-full">
            <AiOutlineLeftCircle size={20} />
          </IconButton>
        </Link>
        <div className="text-zinc-800 text-3xl font-bold leading-10">
          {form?.isEdit ? 'Edit' : 'Create'} Contract
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 flex flex-col gap-4">
        <span className="font-bold text-[16px]">Contract Detail</span>
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-black font-bold text-[18px]">
              Contract Title
            </span>
            <CreatableSelect
              isClearable
              options={form?.title_options}
              onChange={value => {
                dispatch({ type: 'SET_SELECTED_TITLE', payload: value });
              }}
              value={form?.selected_title}
            />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-black font-bold text-[16px]">
              No. of Service
            </span>
            <TextInput
              type="number"
              value={form?.service_count}
              onChange={e => {
                dispatch({
                  type: 'SET_SERVICE_COUNT',
                  payload: e.target.value,
                });
              }}
              className="rounded-xl disabled:bg-[#BCBDC0] disabled:border-none"
            />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-black font-bold text-[16px]">Client</span>
            <Select
              isClearable
              isSearchable
              options={form?.clients}
              onChange={option => {
                dispatch({ type: 'SET_SELECTED_CLIENT', payload: option });
              }}
              value={form?.selected_client}
            />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-black font-bold text-[16px]">Sub Client</span>
            <Select
              isClearable
              isSearchable
              options={form?.sub_clients}
              onChange={option => {
                dispatch({
                  type: 'SET_SELECTED_SUB_CLIENT',
                  payload: option,
                });
              }}
              value={form?.selected_sub_client}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-black font-bold text-[16px]">
            Service Address
          </span>
          <Select
            isClearable
            isSearchable
            options={form?.service_addresses}
            onChange={option => {
              dispatch({
                type: 'SET_SELECTED_SERVICE_ADDRESS',
                payload: option,
              });
            }}
            value={form?.selected_service_address}
          />
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-black font-bold text-[16px]">
            Billing Address
          </span>
          <Select
            isClearable
            isSearchable
            options={form?.billing_addresses}
            onChange={option => {
              dispatch({
                type: 'SET_SELECTED_BILLING_ADDRESS',
                payload: option,
              });
            }}
            value={form?.selected_billing_address}
          />
        </div>
        <div className="flex flex-wrap flex-row gap-3">
          <div className="flex flex-col flex-1 gap-2">
            <span className="text-black font-bold text-[16px]">
              Contract-Term Start
            </span>
            <DatePickerDialog
              className="rounded-xl border-red-500"
              value={form?.start_date}
              clearIcon={null}
              format="dd/MM/y"
              onChange={value => {
                dispatch({
                  type: 'SET_START_DATE',
                  payload: value,
                });
              }}
            />
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <span className="text-black font-bold text-[16px]">
              Contract-Term End
            </span>
            <DatePickerDialog
              classes="rounded-xl"
              value={form?.end_date}
              clearIcon={null}
              format="dd/MM/y"
              onChange={value => {
                dispatch({
                  type: 'SET_END_DATE',
                  payload: value,
                });
              }}
            />
          </div>
          <div className="flex flex-col flex-1 gap-2">
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
              value="230920-CO-XXXXX"
              className="rounded-xl bg-[#BCBDC0] border-none"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-black font-bold text-[16px]">
            Contract Amount
          </span>
          <div className="flex items-center gap-2">
            <span>$</span>
            <TextInput
              type="number"
              placeholder="Contract Amount"
              className="rounded-xl flex-1"
              value={form?.amount}
              onChange={e => {
                dispatch({
                  type: 'SET_AMOUNT',
                  payload: e.target.value,
                });
              }}
            />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 flex flex-col gap-2">
        <span className="font-bold text-[14px]">Service Detail</span>
        {!form?.isEdit && (
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 2xl:gap-4">
            <div className="flex flex-1 flex-col gap-2">
              <span className="font-bold text-[16px]">Repeats</span>
              <Select
                isClearable
                isSearchable
                options={form?.repeat_options}
                onChange={option => {
                  dispatch({
                    type: 'SET_SELECTED_REPEAT',
                    payload: option,
                  });
                }}
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <span className="font-bold text-[16px]">Every</span>
              <div className="flex items-center gap-1">
                <div className="flex-1 w-full">
                  <Input
                    type="number"
                    label="Months"
                    placeholder="months"
                    value={form?.months}
                    onChange={e => {
                      dispatch({
                        type: 'SET_MONTHS',
                        payload: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <span className="text-black font-bold text-[16px]">
                Start Date
              </span>
              <DatePickerDialog
                classes="rounded-xl"
                value={form?.start_date}
                clearIcon={null}
                format="dd/MM/y"
                onChange={value => {
                  dispatch({
                    type: 'SET_START_DATE',
                    payload: value,
                  });
                }}
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <span className="font-bold text-[16px]">Time</span>
              <Select
                isClearable
                isSearchable
                value={form?.start_time}
                options={form?.start_times}
                onChange={value => {
                  dispatch({
                    type: 'SET_START_TIME',
                    payload: value,
                  });
                }}
              />
            </div>
          </div>
        )}
        <span className="font-bold text-[16px]">Service Request</span>
        {form?.services.map((service, index) => (
          <div
            className="p-4 flex flex-col border border-border-gray rounded-xl text-[14px] gap-2"
            key={index}
          >
            <span className="text-primary">Service Request</span>
            <div className="flex flex-col">
              <div className="flex justify-between items-center ">
                <span>Name of Service</span>
                <Button
                  type="button"
                  variant="text"
                  className="text-primary"
                  onClick={() => {
                    setOpenServiceTemplateModal(true);
                  }}
                >
                  Select template
                </Button>
              </div>
              <TextArea
                id="service-name"
                placeholder="Name of Service"
                value={service?.name}
                onChange={value => {
                  dispatch({
                    type: 'SET_SERVICE_NAME',
                    payload: value,
                    index,
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
                  options={form?.leader_options}
                  value={getLeaders(service)}
                  onChange={value => {
                    dispatch({
                      type: 'SET_SELECTED_LEADERS',
                      payload: value,
                      index,
                    });
                  }}
                />
              </div>
              <div className="flex flex-col gap-1 max-w-max">
                <span>Technician Count</span>
                <TextInput
                  placeholder="Technician Count"
                  className="rounded flex-1"
                  value={service?.technician_count}
                  onChange={e => {
                    dispatch({
                      type: 'SET_TECHNICIAN_COUNT',
                      payload: e.target.value,
                      index,
                    });
                  }}
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <span>Technician / Sub-Contractor</span>
                <Select
                  isMulti
                  isSearchable
                  options={form?.technician_options}
                  value={getTechnicians(service)}
                  onChange={value => {
                    dispatch({
                      type: 'SET_SELECTED_TECHNICIANS',
                      payload: value,
                      index,
                    });
                  }}
                />
              </div>
              <div className="flex flex-col gap-1 max-w-max">
                <span>Date</span>
                <DatePickerDialog
                  classes="rounded-xl"
                  value={service.service_date}
                  clearIcon={null}
                  format="dd/MM/y"
                />
              </div>
              <div className="flex flex-col gap-1 max-w-max">
                <span>Time</span>
                <TimePicker
                  classes="rounded-xl"
                  value={
                    service.service_time?.label
                      ? service.service_time
                      : {
                          label: service.service_time,
                          value: service.service_time,
                        }
                  }
                />
              </div>
              <div className="flex gap-1 max-w-max items-center mt-5">
                <Button
                  onClick={() =>
                    dispatch({
                      type: 'REMOVE_SERVICE',
                      index,
                    })
                  }
                  variant="text"
                  color="red"
                  buttonType="outline"
                  rounded
                  iconOnly
                  className="bg-transparent hover:bg-transparent"
                >
                  <RiDeleteBin6Line color="red" size={22} />
                </Button>
              </div>
            </div>
            <div className="w-full h-[1px] bg-border-gray" />

            {service?.tasks.map((task, taskIndex) => (
              <div className="flex flex-col gap-4" key={task.id}>
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <span className="text-primary">Job Description</span>
                    <Button
                      type="button"
                      variant="text"
                      className="text-primary"
                      onClick={() => {
                        setOpenTaskTemplateModal(true);
                      }}
                    >
                      Select template
                    </Button>
                  </div>
                  <TextArea
                    id="task-name"
                    placeholder="Job Description"
                    value={task?.name}
                    onChange={value => {
                      dispatch({
                        type: 'SET_TASK_NAME',
                        payload: value,
                        index,
                        taskIndex,
                      });
                    }}
                  />
                </div>
                <div className="flex gap-4 items-center">
                  <div className="flex flex-col flex-1 gap-1">
                    <b>Duration</b>
                    <div className="flex gap-2 items-center">
                      <Input
                        label="Hours"
                        type="number"
                        className="flex-1"
                        value={task.duration_hours}
                        onChange={e => {
                          dispatch({
                            type: 'SET_TASK_HOURS',
                            payload: e.target.value,
                            index,
                            taskIndex,
                          });
                        }}
                      />
                      <Input
                        label="Minutes"
                        type="number"
                        className="flex-1"
                        value={task.duration_minutes}
                        onChange={e => {
                          dispatch({
                            type: 'SET_TASK_MINUTES',
                            payload: e.target.value,
                            index,
                            taskIndex,
                          });
                        }}
                      />
                      <Input
                        label="Cost"
                        icon={<BiDollar size={22} />}
                        value={task?.cost}
                        onChange={e => {
                          dispatch({
                            type: 'SET_TASK_COST',
                            payload: e.target.value,
                            index,
                            taskIndex,
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
                              serviceIndex: index,
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
            ))}
            <Button
              className="border border-secondary text-secondary flex justify-center items-center py-2 rounded-xl gap-4"
              variant="outlined"
              onClick={() => {
                dispatch({
                  type: 'ADD_TASK',
                  index,
                });
              }}
            >
              <span>Add More Task</span>
              <MdOutlineAddCircleOutline size={20} />
            </Button>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-6 flex flex-col gap-6">
        <span className="font-bold text-[14px]">Summary</span>
        <div className="grid grid-cols-2 gap-8 text-[14px]">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <b>Contract Value</b>
              <span className="">$ {form?.amount}</span>
            </div>
            <div className="flex justify-between">
              <b>GST {gst}%</b>
              <span>$ {Number(form?.contract_gst_amount).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <b>Total Contract Value</b>
              <span>$ {Number(form?.total_contract_amount).toFixed(2)}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <b>Task Cost</b>
              <span className="text-[14px]">$ {form?.tasks_cost}</span>
            </div>
            <div className="flex justify-between">
              <b>GST {gst}%</b>
              <span className="">$ {form?.tasks_gst}</span>
            </div>
            <div className="flex justify-between">
              <b>Total Task Amount</b>
              <span>$ {form?.total_tasks_amount}</span>
            </div>
            <div className="flex justify-between">
              <b>Final Amount</b>
              <span>$ {form?.total_amount}</span>
            </div>
          </div>
        </div>
      </div>
      <SelectTemplateModal
        openModal={openServiceTemplateModal}
        setOpenModal={setOpenServiceTemplateModal}
        templateOptions={serviceTemplates}
        handleSave={value => {
          updateServicesName(value?.name);
        }}
      />
      <SelectTemplateModal
        openModal={openTaskTemplateModal}
        setOpenModal={setOpenTaskTemplateModal}
        templateOptions={taskTemplates}
        handleSave={value => {
          updateTasksName(value?.name);
        }}
      />
      <button
        className="bg-primary text-white rounded-xl py-2 font-bold"
        onClick={() => {
          saveContract(form);
        }}
      >
        Confirm
      </button>
    </div>
  );
}

export default ContractForm;

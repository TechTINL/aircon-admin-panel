import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { AiOutlineLeftCircle } from 'react-icons/ai';
import { Button, IconButton, Input } from '@material-tailwind/react';
import useCreateContract from '@/Hooks/Contract/useCreateContract';
import CreateContractContext from '@/Context/CreateContractContext';
import ServiceDetail from '@/Components/Contract/Create/ServiceDetail';
import Summary from '@/Components/Contract/Create/Summary/Summary';
import useContractForm from '@/Hooks/useContractForm';
import CreatableSelect from 'react-select/creatable';
import TextInput from '@/Components/TextInput';
import Select from 'react-select';
import DatePicker from '@/Components/Common/DatePicker';
import TextArea from '@/Components/Shared/TextArea';
import TimePicker from '@/Components/Common/TimePicker';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import ContractDetails from '../../Components/Contract/Create/ContractDetails';

function EditForm({ auth, contractTemplates: templates, clients, gst }) {
  const contract = usePage().props?.contract;
  const { form, dispatch } = useContractForm({
    contractTemplates: templates,
    clients,
  });

  const {
    title,
    setTitle,
    defaultTitle,
    setDefaultTitle,
    defaultClient,
    setDefaultClient,
    defaultSubClient,
    setDefaultSubClient,
    templateOptions,
    serviceCount,
    setServiceCount,
    clientOptions,
    selectedClient,
    setSelectedClient,
    subClientOptions,
    selectedSubClient,
    setSelectedSubClient,
    serviceAddress,
    setServiceAddress,
    billingAddress,
    setBillingAddress,
    contractTermStart,
    setContractTermStart,
    contractTermEnd,
    setContractTermEnd,
    contractAmount,
    setContractAmount,
    serviceRepeatOptions,
    selectedServiceRepeat,
    setSelectedServiceRepeat,
    dateOption,
    setDateOption,
    timeOptions,
    time,
    setTime,
    serviceData,
    setServiceData,
    handleAddTask,
    handleRemoveTask,
    createContract,
    isEdit,
    setIsEdit,
  } = useCreateContract(templates, clients, contract);

  return (
    <CreateContractContext.Provider
      value={{
        title,
        setTitle,
        defaultTitle,
        setDefaultTitle,
        defaultClient,
        setDefaultClient,
        defaultSubClient,
        setDefaultSubClient,
        templateOptions,
        serviceCount,
        setServiceCount,
        clientOptions,
        selectedClient,
        setSelectedClient,
        subClientOptions,
        selectedSubClient,
        setSelectedSubClient,
        serviceAddress,
        setServiceAddress,
        billingAddress,
        setBillingAddress,
        contractTermStart,
        setContractTermStart,
        contractTermEnd,
        setContractTermEnd,
        contractAmount,
        setContractAmount,
        serviceRepeatOptions,
        selectedServiceRepeat,
        setSelectedServiceRepeat,
        timeOptions,
        dateOption,
        setDateOption,
        time,
        setTime,
        serviceData,
        setServiceData,
        handleAddTask,
        handleRemoveTask,
        isEdit,
        setIsEdit,
      }}
    >
      <AuthenticatedLayout user={auth.user}>
        <Head title="Client List" />
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
                />
              </div>
              {form?.sub_clients.length > 0 && (
                <div className="flex flex-col gap-3">
                  <span className="text-black font-bold text-[16px]">
                    Sub Client
                  </span>
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
                  />
                </div>
              )}
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
                    type: 'SET_SERVICE_ADDRESS',
                    payload: option,
                  });
                }}
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
                    type: 'SET_BILLING_ADDRESS',
                    payload: option,
                  });
                }}
              />
            </div>
            <div className="flex flex-wrap flex-row gap-3">
              <div className="flex flex-col flex-1 gap-2">
                <span className="text-black font-bold text-[16px]">
                  Contract-Term Start
                </span>
                <DatePicker
                  classes="rounded-xl"
                  value={form?.start_date}
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
                <DatePicker
                  classes="rounded-xl"
                  value={form?.end_date}
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
                <DatePicker
                  classes="rounded-xl"
                  value={form?.start_date}
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
            <span className="font-bold text-[16px]">Service Request</span>
            {form?.services.map((service, index) => (
              <div
                className="p-4 flex flex-col border border-border-gray rounded-xl text-[14px] gap-2"
                key={index}
              >
                <span className="text-primary">Service Request</span>
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <span>Name of Service</span>
                    <Button
                      type="button"
                      variant="text"
                      className="text-primary"
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
                  <div className="flex flex-col gap-1 max-w-max">
                    <span>Date</span>
                    <DatePicker classes="rounded-xl" />
                  </div>
                  <div className="flex flex-col gap-1 max-w-max">
                    <span>Time</span>
                    <TimePicker classes="rounded-xl" />
                  </div>
                  <div className="flex gap-1 max-w-max items-center mt-5">
                    <button>
                      <RiDeleteBin6Line color="red" size={22} />
                    </button>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-border-gray" />

                <button className="border border-secondary text-secondary flex justify-center items-center py-2 rounded-xl gap-4">
                  <span>Add More Task</span>
                  <MdOutlineAddCircleOutline size={20} />
                </button>
              </div>
            ))}
          </div>
          <p>
            Above is to test Rina's Calendar Issue UI (Temp fix will remove
            later)
          </p>
          <ContractDetails />
          <ServiceDetail />
          <Summary gst={gst} />
          <button
            className="bg-primary text-white rounded-xl py-2 font-bold"
            onClick={() => {
              createContract();
            }}
          >
            Confirm
          </button>
        </div>
      </AuthenticatedLayout>
    </CreateContractContext.Provider>
  );
}

export default EditForm;

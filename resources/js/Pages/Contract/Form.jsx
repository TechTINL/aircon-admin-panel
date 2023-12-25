import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { AiOutlineLeftCircle } from 'react-icons/ai';
import { IconButton } from '@material-tailwind/react';
import useCreateContract from '@/Hooks/Contract/useCreateContract';
import CreateContractContext from '@/Context/CreateContractContext';
import ServiceDetail from '@/Components/Contract/Create/ServiceDetail';
import Summary from '@/Components/Contract/Create/Summary/Summary';
import useContractForm from '@/Hooks/useContractForm';
import ContractCreatableSelect from '@/Components/Contract/Create/ContractCreateableSelect.jsx';
import CreatableSelect from 'react-select/creatable';
import TextInput from '@/Components/TextInput.jsx';
import ContractDetails from '../../Components/Contract/Create/ContractDetails';

function Form({ auth, contractTemplates: templates, clients }) {
  const contract = usePage().props?.contract;
  const { form, dispatch } = useContractForm({
    contractTemplates: templates,
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
                  value={serviceCount}
                  onChange={e => setServiceCount(e.target.value)}
                  className="rounded-xl disabled:bg-[#BCBDC0] disabled:border-none"
                />
              </div>
            </div>
          </div>
          <ContractDetails />
          <ServiceDetail />
          <Summary />
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

export default Form;

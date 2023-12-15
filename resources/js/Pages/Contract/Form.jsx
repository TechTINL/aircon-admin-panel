import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { AiOutlineLeftCircle } from 'react-icons/ai';
import { IconButton } from '@material-tailwind/react';
import useCreateContract from '@/Hooks/Contract/useCreateContract';
import CreateContractContext from '@/Context/CreateContractContext';
import ServiceDetail from '@/Components/Contract/Create/ServiceDetail';
import Summary from '@/Components/Contract/Create/Summary/Summary';
import ContractDetails from '../../Components/Contract/Create/ContractDetails';

function Form({ auth, contractTemplates: templates, clients }) {
  const contract = usePage().props?.contract;

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
              {isEdit ? 'Edit' : 'Create'} Contract
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

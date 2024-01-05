import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';
import ContractForm from '@/Components/Contract/ContractForm';
import { prepareContractData } from '@/Utils/utils';

function CreateForm({
  auth,
  contractTemplates: templates,
  serviceTemplates,
  taskTemplates,
  clients,
  leaders,
  technicians,
  gst,
}) {
  const createContract = form => {
    const formData = prepareContractData(form);
    router.post(route('contracts.store'), formData, {
      preserveScroll: true,
      onError: errors => {
        console.log(errors);
      },
    });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Create Contract" />
      <ContractForm
        gst={gst}
        contractTemplates={templates}
        serviceTemplates={serviceTemplates}
        taskTemplates={taskTemplates}
        clients={clients}
        leaders={leaders}
        technicians={technicians}
        saveContract={createContract}
      />
    </AuthenticatedLayout>
  );
}

export default CreateForm;

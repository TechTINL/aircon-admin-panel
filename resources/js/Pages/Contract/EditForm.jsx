import { Head, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';
import ContractForm from '@/Components/Contract/ContractForm';
import { prepareContractData } from '@/Utils/utils.js';

function EditForm({
  auth,
  contractTemplates: templates,
  serviceTemplates,
  taskTemplates,
  contract,
  clients,
  leaders,
  technicians,
  gst,
}) {
  const updateContract = form => {
    const formData = prepareContractData(form);
    router.put(route('contracts.update', form?.contract_id), formData, {
      preserveScroll: true,
      onError: errors => {
        console.log(errors);
      },
    });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Edit Contract" />
      <ContractForm
        gst={gst}
        contractTemplates={templates}
        contract={contract}
        serviceTemplates={serviceTemplates}
        taskTemplates={taskTemplates}
        clients={clients}
        leaders={leaders}
        technicians={technicians}
        saveContract={updateContract}
      />
    </AuthenticatedLayout>
  );
}

export default EditForm;

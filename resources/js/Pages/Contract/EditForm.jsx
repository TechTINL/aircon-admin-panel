import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';
import ContractForm from '@/Components/Contract/ContractForm';

function EditForm({
  auth,
  contractTemplates: templates,
  serviceTemplates,
  taskTemplates,
  clients,
  leaders,
  technicians,
  gst,
}) {
  const contract = usePage().props?.contract;

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Edit Contract" />
      <ContractForm
        gst={gst}
        contract={contract}
        contractTemplates={templates}
        serviceTemplates={serviceTemplates}
        taskTemplates={taskTemplates}
        clients={clients}
        leaders={leaders}
        technicians={technicians}
      />
    </AuthenticatedLayout>
  );
}

export default EditForm;

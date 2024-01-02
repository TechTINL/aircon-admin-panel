import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';
import ContractForm from '@/Components/Contract/ContractForm';

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
      />
    </AuthenticatedLayout>
  );
}

export default CreateForm;

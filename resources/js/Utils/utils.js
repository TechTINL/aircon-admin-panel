import dayjs from 'dayjs';

export const getTimes = () => {
  const times = [];
  for (let i = 8; i <= 20; i++) {
    times.push(`${i < 13 ? i : i - 12}:00 ${i < 12 ? 'AM' : 'PM'}`);
    times.push(`${i < 13 ? i : i - 12}:30 ${i < 12 ? 'AM' : 'PM'}`);
  }
  return times;
};

export const getTimesForTimePicker = () => {
  const times = [];
  for (let i = 0; i <= 24; i++) {
    times.push(`${i < 13 ? i : i - 12}:00 ${i < 12 ? 'AM' : 'PM'}`);
    if (i < 24) {
      times.push(`${i < 13 ? i : i - 12}:30 ${i < 12 ? 'AM' : 'PM'}`);
    }
  }
  return times;
};

export const getAddresses = (clients, client_id, sub_client_id) => {
  if (sub_client_id) {
    return (
      clients
        ?.find(client => client.id === client_id)
        ?.sub_clients.find(sub_client => sub_client.id === sub_client_id)
        ?.addresses.map(address => ({
          ...address,
          label: address.address,
          value: address.id,
        })) || []
    );
  }
  return (
    clients
      ?.find(client => client.id === client_id)
      ?.addresses.map(address => ({
        ...address,
        label: address.address,
        value: address.id,
      })) || []
  );
};

export const prepareContractData = form => {
  const unassignedServiceCount = form.services
    ?.map(service => service.technicians.length)
    .filter(count => count === 0).length;

  const assignedServiceCount = form.services
    ?.map(service => service.technicians.length)
    .filter(count => count > 0).length;

  const data = {
    title: form?.selected_title?.label,
    service_address: form?.selected_service_address?.label,
    billing_address: form?.selected_billing_address?.label,
    service_count: form?.service_count,
    unassigned_service_count: unassignedServiceCount,
    assigned_service_count: assignedServiceCount,
    start_date: dayjs(form?.start_date).format('DD-MM-YYYY'),
    end_date: dayjs(form?.end_date).format('DD-MM-YYYY'),
    amount: form?.amount,
    client_id: form?.selected_client?.value,
    sub_client_id: form?.selected_sub_client?.value,
    contract_amount: form?.amount,
    service_repeat: form?.selected_repeat?.value,
    date_option: form?.dateOption,
    time: form?.time,
    serviceData: form?.services.map(service => ({
      ...service,
      teamLeaderIds: service?.leaders?.map(leader => leader?.value),
      technicianIds: service?.technicians?.map(technician => technician?.value),
      service_date: dayjs(service?.service_date).format('YYYY-MM-DD'),
    })),
  };

  return data;
};

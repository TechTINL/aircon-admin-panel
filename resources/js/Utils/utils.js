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
    start_date: dayjs(form?.start_date).format('MM/DD/YYYY'),
    end_date: dayjs(form?.end_date).format('MM/DD/YYYY'),
    amount: form?.amount,
    client_id: form?.selected_client?.value,
    sub_client_id: form?.selected_sub_client?.value,
    contract_amount: form?.amount,
    service_repeat: form?.selected_repeat?.value,
    date_option: form?.dateOption,
    time: form?.time,
    serviceData: form?.services.map(service => ({
      ...service,
      teamLeaderIds: service?.leaders?.map(
        leader => leader?.id || leader?.value
      ),
      technicianIds: service?.technicians?.map(
        technician => technician?.id || technician?.value
      ),
      service_date: dayjs(service?.service_date).format('MM/DD/YYYY'),
      service_time:
        typeof service?.service_time === 'string'
          ? service?.service_time
          : service?.service_time?.value,
    })),
  };

  return data;
};

export const getTotalContractAmount = (amount, gst) => {
  amount = Number(amount).toFixed(2);
  gst = Number(gst).toFixed(2);
  return Number(amount) + Number(gst);
};

export const calculateTasksGst = (tasksCost, gst) => {
  tasksCost = Number(tasksCost).toFixed(2);
  gst = Number(gst).toFixed(2);

  const total = Number(tasksCost) * Number(gst);
  return total.toFixed(2);
};

export const calculateTotalTasksAmount = (tasksCost, gst) => {
  tasksCost = Number(tasksCost).toFixed(2);
  gst = Number(gst).toFixed(2);

  const total = Number(tasksCost) + Number(gst);
  return total.toFixed(2);
};

export const calculateTotalContractAmount = (
  totalContractAmount,
  totalTasksAmount
) => {
  totalContractAmount = Number(totalContractAmount).toFixed(2);
  totalTasksAmount = Number(totalTasksAmount).toFixed(2);

  const total = Number(totalContractAmount) + Number(totalTasksAmount);
  return total.toFixed(2);
};

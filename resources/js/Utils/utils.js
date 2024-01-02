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

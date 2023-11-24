import axios from 'axios';

export const fetchClients = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_URL}/clients-list`
  );
  return data;
};

export const fetchSubClients = async clientId => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_URL}/clients/${clientId}/sub-clients`
  );
  return data;
};

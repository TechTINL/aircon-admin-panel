import { useReducer } from 'react';
import { produce } from 'immer';

const getAddresses = (clients, client_id, sub_client_id) => {
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

function useServiceFormModel({ clients, service }) {
  const [form, dispatch] = useReducer(
    produce((draft, action) => {
      switch (action.type) {
        case 'SET_SELECTED_CLIENT':
          draft.selected_client = action.payload;
          draft.sub_client_options = action.payload?.sub_clients.map(
            sub_client => ({
              ...sub_client,
              label: sub_client.name,
              value: sub_client.id,
            })
          );
          break;
        case 'SET_SUB_CLIENT_OPTIONS':
          draft.sub_client_options = action.payload;
          break;
        case 'SET_SELECTED_SUB_CLIENT':
          draft.selected_sub_client = action.payload;
          draft.service_addresses = action.payload?.addresses.map(
            addresses => ({
              ...addresses,
              label: addresses.address,
              value: addresses.id,
            })
          );
          draft.billing_addresses = action.payload?.addresses.map(
            addresses => ({
              ...addresses,
              label: addresses.address,
              value: addresses.id,
            })
          );
          break;
        case 'SET_SERVICE_ADDRESS_OPTIONS':
          draft.service_addresses = action.payload;
          break;
        case 'SET_SELECTED_SERVICE_ADDRESS':
          draft.selected_service_address = action.payload;
          break;
        case 'SET_SELECTED_BILLING_ADDRESS':
          draft.selected_billing_address = action.payload;
          break;
        case 'SET_NAME':
          draft.name = action.payload;
          break;
        default:
          break;
      }
    }),
    {
      service_number: service?.service_number || '',
      contract_number: service?.contract_number || '',
      client_options:
        clients?.map(client => ({
          ...client,
          label: client.name,
          value: client.id,
        })) || [],
      selected_client: service?.client
        ? {
            label: service?.client?.name,
            value: service?.client?.id,
          }
        : null,
      sub_client_options:
        clients
          ?.find(client => client.id === service?.client?.id)
          ?.sub_clients.map(sub_client => ({
            ...sub_client,
            label: sub_client.name,
            value: sub_client.id,
          })) || [],
      selected_sub_client: service?.sub_client
        ? {
            label: service?.sub_client?.name,
            value: service?.sub_client?.id,
          }
        : null,
      service_addresses: getAddresses(
        clients,
        service?.client?.id,
        service?.sub_client?.id
      ),
      selected_service_address: service?.service_address
        ? {
            label: service?.service_address,
            value: service?.service_address,
          }
        : null,
      billing_addresses: getAddresses(
        clients,
        service?.client?.id,
        service?.sub_client?.id
      ),
      selected_billing_address: service?.billing_address
        ? {
            label: service?.billing_address,
            value: service?.billing_address,
          }
        : null,
      name: service?.name || '',
      service_date: service?.service_date || '',
      description: '',
      leader: '',
      employees: [],
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      tasks: [],
    }
  );

  return { form, dispatch };
}

export default useServiceFormModel;

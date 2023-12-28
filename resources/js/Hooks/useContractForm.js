import { produce } from 'immer';
import { useReducer } from 'react';
import { getAddresses, getTimes } from '@/Utils/utils';

function useContractForm({ contractTemplates, clients, contract, gstValue }) {
  const [form, dispatch] = useReducer(
    produce((draft, action) => {
      switch (action.type) {
        case 'SET_SELECTED_TITLE': {
          draft.selected_title = action.payload;
          draft.service_count = action.payload?.service_count;

          const currentServiceCount = draft.services.length;
          const targetServiceCount = action.payload?.service_count;

          if (currentServiceCount > targetServiceCount) {
            draft.services = draft.services.slice(0, targetServiceCount);
          } else if (currentServiceCount < targetServiceCount) {
            draft.services = [
              ...draft.services,
              ...Array(targetServiceCount - currentServiceCount).fill({
                name: '',
                leaders: [],
                technician_count: '',
                technicians: [],
                service_date: '',
                service_time: '',
                tasks: [
                  {
                    name: '',
                    hours: '',
                    minutes: '',
                    cost: '',
                  },
                ],
              }),
            ];
          }
          break;
        }
        case 'SET_SERVICE_COUNT': {
          draft.service_count = action.payload;

          const currentServiceCount = draft.services.length;
          const targetServiceCount = action.payload;

          if (currentServiceCount > targetServiceCount) {
            draft.services = draft.services.slice(0, targetServiceCount);
          } else {
            draft.services = [
              ...draft.services,
              ...Array(
                Number(targetServiceCount) - Number(currentServiceCount)
              ).fill({
                name: '',
                leaders: [],
                technician_count: '',
                technicians: [],
                service_date: '',
                service_time: '',
                tasks: [
                  {
                    name: '',
                    hours: '',
                    minutes: '',
                    cost: '',
                  },
                ],
              }),
            ];
          }
          break;
        }
        case 'SET_SELECTED_CLIENT':
          draft.selected_client = action.payload;
          draft.sub_clients = action.payload?.sub_clients.map(sub_client => {
            return {
              ...sub_client,
              value: sub_client.id,
              label: sub_client.name,
            };
          });
          break;
        case 'SET_SELECTED_SUB_CLIENT':
          draft.selected_sub_client = action.payload;
          draft.service_addresses = getAddresses(
            clients,
            draft.selected_client?.id,
            action.payload?.id
          );
          draft.billing_addresses = getAddresses(
            clients,
            draft.selected_client?.id,
            action.payload?.id
          );
          break;
        case 'SET_SELECTED_SERVICE_ADDRESS':
          draft.selected_service_address = action.payload;
          break;
        case 'SET_SELECTED_BILLING_ADDRESS':
          draft.selected_billing_address = action.payload;
          break;
        case 'SET_START_DATE':
          draft.start_date = action.payload;
          break;
        case 'SET_END_DATE':
          draft.end_date = action.payload;
          break;
        case 'SET_SELECTED_REPEAT':
          draft.selected_repeat = action.payload;
          draft.months = action.payload?.months;
          break;
        case 'SET_AMOUNT':
          draft.amount = action.payload;
          break;
        case 'SET_MONTHS':
          draft.months = action.payload;
          break;
        case 'SET_START_TIME':
          draft.selected_start_time = action.payload;
          break;
        case 'SET_SERVICE_NAME':
          draft.services[action.index].name = action.payload;
          break;
        default:
          break;
      }
    }),
    {
      isEdit: !!contract,
      selected_title:
        {
          label: contract?.title || '',
          value: contract?.title || '',
        } || '',
      service_count: contract?.service_count || '',
      title_options: contractTemplates.map(template => {
        return {
          ...template,
          value: template.id,
          label: template.name,
        };
      }),
      clients: clients
        .filter(client => client.parent_id === null)
        .map(client => {
          return {
            ...client,
            value: client.id,
            label: client.name,
          };
        }),
      selected_client: contract?.client
        ? {
            ...contract?.client,
            value: contract?.client?.id,
            label: contract?.client?.name,
          }
        : null,
      sub_clients:
        clients
          ?.find(client => client.id === contract?.client?.id)
          ?.sub_clients.map(sub_client => ({
            ...sub_client,
            label: sub_client.name,
            value: sub_client.id,
          })) || [],
      selected_sub_client: contract?.sub_client
        ? {
            ...contract?.sub_client,
            value: contract?.sub_client?.id,
            label: contract?.sub_client?.name,
          }
        : null,
      service_addresses: getAddresses(
        clients,
        contract?.client?.id,
        contract?.sub_client?.id
      ),
      selected_service_address: contract?.service_address
        ? {
            label: contract?.service_address,
            value: contract?.service_address,
          }
        : null,
      billing_addresses: getAddresses(
        clients,
        contract?.client?.id,
        contract?.sub_client?.id
      ),
      selected_billing_address: contract?.billing_address
        ? {
            label: contract?.billing_address,
            value: contract?.billing_address,
          }
        : null,
      start_date: contract?.start_date || null,
      end_date: contract?.end_date || null,
      amount: contract?.amount || '',
      repeat_options: [
        {
          label: 'Monthly',
          value: 'monthly',
          months: 1,
        },
        {
          label: 'Quarterly',
          value: 'quarterly',
          months: 3,
        },
      ],
      selected_repeat: contract?.repeat || '',
      months: contract?.months || '',
      start_times: getTimes().map(time => ({
        label: time,
        value: time,
      })),
      selected_start_time: contract?.start_time || getTimes()[0],
      services: contract?.services || [
        {
          name: '',
          leaders: [],
          technician_count: '',
          technicians: [],
          service_date: '',
          service_time: '',
          tasks: [
            {
              name: '',
              hours: '',
              minutes: '',
              cost: '',
            },
          ],
        },
      ],
      contract_gst_amount: contract?.amount * gstValue || 0,
    }
  );

  return {
    form,
    dispatch,
  };
}

export default useContractForm;

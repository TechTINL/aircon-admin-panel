import { produce } from 'immer';
import { useEffect, useReducer } from 'react';
import {
  calculateTasksGst,
  calculateTotalContractAmount,
  calculateTotalTasksAmount,
  getAddresses,
  getTimes,
  getTotalContractAmount,
} from '@/Utils/utils';
import dayjs from 'dayjs';

function generateServiceDate(date, months, serviceIndex) {
  if (!date) {
    return null;
  }
  return dayjs(date)
    .add(serviceIndex * months, 'month')
    .toDate();
}

function useContractForm({
  contractTemplates,
  clients,
  contract,
  leaders,
  technicians,
  gstValue,
}) {
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
          draft.service_addresses = getAddresses(
            clients,
            draft.selected_client?.id
          );
          draft.billing_addresses = getAddresses(
            clients,
            draft.selected_client?.id
          );
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
          if (!draft.isEdit) {
            console.log('isEdit', draft.isEdit);
            draft.services = draft.services.map((service, index) => {
              return {
                ...service,
                service_date: generateServiceDate(
                  action.payload,
                  draft.months,
                  index
                ),
              };
            });
          }
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
          draft.contract_gst_amount = action.payload * gstValue;
          draft.total_contract_amount =
            Number(action.payload) + Number(action.payload) * gstValue;
          break;
        case 'SET_MONTHS':
          draft.months = action.payload;
          break;
        case 'SET_START_TIME':
          draft.selected_start_time = action.payload;
          draft.services = draft.services.map(service => {
            return {
              ...service,
              service_time: action.payload,
            };
          });
          break;
        case 'SET_DATE':
          draft.services[action.index].service_date = action.payload;
          break;
        case 'SET_TIME':
          draft.services[action.index].service_time = action.payload;
          break;
        case 'SET_ALL_SERVICE_NAMES':
          draft.services = draft.services.map(service => {
            return {
              ...service,
              name: action.payload,
            };
          });
          break;
        case 'SET_SERVICE_NAME':
          draft.services[action.index].name = action.payload;
          break;
        case 'SET_SELECTED_LEADERS':
          draft.services[action.index].leaders = action.payload;
          break;
        case 'SET_TECHNICIAN_COUNT':
          draft.services[action.index].technician_count = action.payload;
          break;
        case 'SET_SELECTED_TECHNICIANS':
          draft.services[action.index].technicians = action.payload;
          break;
        case 'ADD_TASK':
          draft.services[action.index].tasks.push({
            name: '',
            hours: '',
            minutes: '',
            cost: '',
          });
          break;
        case 'SET_ALL_TASK_NAMES':
          draft.services = draft.services.map(service => {
            return {
              ...service,
              tasks: service?.tasks?.map(task => {
                return {
                  ...task,
                  name: action.payload,
                };
              }),
            };
          });
          break;
        case 'SET_TASK_NAME':
          draft.services[action.index].tasks[action.taskIndex].name =
            action.payload;
          break;
        case 'SET_TASK_HOURS':
          draft.services[action.index].tasks[action.taskIndex].hours =
            action.payload;
          break;
        case 'SET_TASK_MINUTES':
          draft.services[action.index].tasks[action.taskIndex].minutes =
            action.payload;
          break;
        case 'SET_TASK_COST':
          draft.services[action.index].tasks[action.taskIndex].cost =
            action.payload;
          break;
        case 'SET_TASKS_COST':
          draft.tasks_cost = action.payload;
          break;
        case 'SET_TASKS_GST':
          draft.tasks_gst = action.payload;
          break;
        case 'SET_TOTAL_TASKS_AMOUNT':
          draft.total_tasks_amount = action.payload;
          break;
        case 'SET_TOTAL_AMOUNT':
          draft.total_amount = action.payload;
          break;
        case 'REMOVE_TASK':
          draft.services[action.serviceIndex].tasks.splice(action.index, 1);
          break;
        default:
          break;
      }
    }),
    {
      isEdit: !!contract?.id,
      contract_id: contract?.id || '',
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
      leader_options:
        leaders?.map(leader => ({
          ...leader,
          label: leader.name,
          value: leader.id,
        })) || [],
      technician_options:
        technicians?.map(technician => ({
          ...technician,
          label: technician.name,
          value: technician.id,
        })) || [],
      contract_gst_amount:
        Number(contract?.amount).toFixed(2) * Number(gstValue).toFixed(2) || 0,
      total_contract_amount:
        getTotalContractAmount(contract?.amount, gstValue) || 0,
      tasks_cost: 0,
      tasks_gst: 0,
      total_tasks_amount: 0,
      total_amount: 0,
    }
  );

  useEffect(() => {
    let _tasksCost = 0;
    const sumTaskCosts = tasks =>
      tasks.reduce((total, task) => total + (Number(task.cost) || 0), 0);

    form?.services?.forEach(service => {
      _tasksCost += sumTaskCosts(service.tasks);
    });

    dispatch({
      type: 'SET_TASKS_COST',
      payload: _tasksCost,
    });

    dispatch({
      type: 'SET_TASKS_GST',
      payload: calculateTasksGst(_tasksCost, gstValue) || 0,
    });

    dispatch({
      type: 'SET_TOTAL_TASKS_AMOUNT',
      payload: calculateTotalTasksAmount(_tasksCost, gstValue) || 0,
    });

    dispatch({
      type: 'SET_TOTAL_AMOUNT',
      payload: calculateTotalContractAmount(
        form.total_contract_amount,
        form.total_tasks_amount
      ),
    });
  }, [form.services, form.amount]);

  return {
    form,
    dispatch,
  };
}

export default useContractForm;

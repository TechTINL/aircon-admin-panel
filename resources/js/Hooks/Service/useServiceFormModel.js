import { useEffect, useReducer, useState } from 'react';
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

function useServiceFormModel({ clients, service, leaders, employees }) {
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
        case 'SET_SELECTED_LEADERS':
          draft.selected_leaders = action.payload;
          break;
        case 'SET_TECHNICIAN_COUNT':
          draft.technician_count = action.payload;
        case 'SET_SELECTED_EMPLOYEES':
          draft.selected_employees = action.payload;
          break;
        case 'SET_SERVICE_DATE':
          draft.service_date = action.payload;
          break;
        case 'SET_SERVICE_TIME':
          draft.service_time = action.payload;
          break;
        case 'SET_TASK_NAME':
          draft.tasks[action.index].name = action.payload;
          break;
        case 'SET_TASK_HOURS':
          draft.tasks[action.index].hours = action.payload;
          break;
        case 'SET_TASK_MINUTES':
          draft.tasks[action.index].minutes = action.payload;
          break;
        case 'SET_TASK_COST':
          draft.tasks[action.index].cost = action.payload;
          break;
        case 'ADD_TASK':
          draft.tasks.push({
            name: '',
            hours: '',
            minutes: '',
            cost: '',
          });
          break;
        case 'REMOVE_TASK':
          draft.tasks.splice(action.index, 1);
          break;
        case 'SET_TECHNICIAN_REPORT':
          draft.technician_report = action.payload;
          break;
        case 'SET_TASK_VISITATION_NOTES':
          draft.task_visitation_notes = action.payload;
          break;
        case 'SET_REPORT_STATUS':
          draft.report_status = action.payload;
          break;
        case 'SET_REQUIRED_FOLLOW_UP':
          if (action.payload) {
            draft.required_follow_up = action.payload;
            draft.mark_as_completed = false;
            draft.on_hold = false;
          } else {
            draft.required_follow_up = action.payload;
            draft.mark_as_completed = true;
            draft.on_hold = false;
          }
          break;
        case 'SET_MARK_AS_COMPLETED':
          if (action.payload) {
            draft.mark_as_completed = action.payload;
            draft.required_follow_up = false;
            draft.on_hold = false;
          } else {
            draft.mark_as_completed = action.payload;
            draft.required_follow_up = true;
            draft.on_hold = false;
          }
          break;
        case 'SET_ON_HOLD':
          if (action.payload) {
            draft.on_hold = action.payload;
            draft.required_follow_up = false;
            draft.mark_as_completed = false;
          } else {
            draft.on_hold = action.payload;
            draft.required_follow_up = true;
            draft.mark_as_completed = false;
          }
          break;
        default:
          break;
      }
    }),
    {
      is_edit_form: !!service,
      id: service?.id || '',
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
      leaders:
        leaders?.map(leader => ({
          ...leader,
          label: leader.name,
          value: leader.id,
        })) || [],
      selected_leaders:
        service?.leaders?.map(leader => ({
          ...leader,
          label: leader.name,
          value: leader.id,
        })) || [],
      technician_count: service?.technician_count || '',
      employees:
        employees?.map(employee => ({
          ...employee,
          label: employee.name,
          value: employee.id,
        })) || [],
      selected_employees:
        service?.technicians?.map(employee => ({
          ...employee,
          label: employee.name,
          value: employee.id,
        })) || [],
      service_date: service?.service_date || '',
      service_time: service?.service_time
        ? {
            label: service?.service_time,
            value: service?.service_time,
          }
        : '',
      tasks: service?.tasks.map(task => ({
        ...task,
        name: task.name,
        hours: task.duration_hours,
        minutes: task.duration_minutes,
        cost: task.cost,
      })) || [
        {
          name: '',
          hours: '',
          minutes: '',
          cost: '',
        },
      ],
      technician_report: service?.technician_report || '',
      task_visitation_notes: service?.task_visitation_notes || '',
      client_signature: service?.client_signature || '',
      report_status: service?.report_status || '',
      required_follow_up: service?.status === 'Requires Follow Up' || false,
      mark_as_completed: service?.status === 'Completed' || false,
      on_hold: service?.status === 'On Hold' || false,
    }
  );

  const totalTasksCost = () => {
    let total = 0;
    form?.tasks.forEach(task => {
      total += parseInt(task?.cost, 10) || 0;
    });
    return total;
  };

  const [tasksCost, setTasksCost] = useState(0);
  const [gst, setGst] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const result = totalTasksCost();
    const calculatedGst = result * 0.09;

    setTasksCost(result);
    setGst(calculatedGst);

    // Calculate totalAmount using the latest values of result and calculatedGst
    const newTotalAmount = result + calculatedGst;
    setTotalAmount(newTotalAmount);
  }, [form]); // Dependency on form.tasks

  return { form, dispatch, tasksCost, gst, totalAmount };
}

export default useServiceFormModel;

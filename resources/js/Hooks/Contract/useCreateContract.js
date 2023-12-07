import { useEffect, useState } from 'react';
import { getTimes } from '@/Utils/utils';
import { router } from '@inertiajs/react';

function useCreateContract(templates, clients) {
  const [title, setTitle] = useState('');
  const [templateOptions, setTemplateOptions] = useState([]);
  const [clientOptions, setClientOptions] = useState([]);
  const [subClientOptions, setSubClientOptions] = useState([]);
  const [address, setAddress] = useState('');
  const [serviceCount, setServiceCount] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedSubClient, setSelectedSubClient] = useState(null);
  const [contractTermStart, setContractTermStart] = useState();
  const [contractTermEnd, setContractTermEnd] = useState();
  const [contractAmount, setContractAmount] = useState(0);
  const [serviceRepeatOptions, setServiceRepeatOptions] = useState([
    {
      value: 'monthly',
      label: 'Monthly',
    },
    {
      value: 'quarterly',
      label: 'Quarterly',
    },
    {
      value: 'semi-annually',
      label: 'Semi-Annually',
    },
    {
      value: 'annually',
      label: 'Annually',
    },
  ]);
  const [selectedServiceRepeat, setSelectedServiceRepeat] = useState('monthly');
  const timeOptions = getTimes().map(time => ({
    label: time,
    value: time,
  }));
  const [time, setTime] = useState(timeOptions[0]);
  const [serviceData, setServiceData] = useState([]);

  useEffect(() => {
    if (templates) {
      const options = templates.map(template => {
        return {
          value: template.id,
          label: template.name,
          serviceCount: template.service_count,
        };
      });
      setTemplateOptions(options);
    }

    if (clients) {
      const options = clients
        .filter(client => client.parent_id === null)
        .map(client => {
          return {
            id: client.id,
            value: client.id,
            label: client.name,
            parent_id: client.parent_id,
            addresses: client.addresses,
          };
        });
      setClientOptions(options);
    }

    if (selectedClient) {
      const options = clients
        .filter(client => client.parent_id === selectedClient.id)
        .map(client => {
          return {
            id: client.id,
            value: client.id,
            label: client.name,
            parent_id: client.parent_id,
            addresses: client.addresses,
          };
        });
      setSubClientOptions(options);
    }

    if (serviceCount > 0) {
      const upperLimit = serviceCount - serviceData.length;
      for (let i = 1; i <= upperLimit; i++) {
        setServiceData(prevState => [
          ...prevState,
          {
            name: '',
            teamLeaderId: '',
            technicianCount: '',
            technicianIds: [],
            date: '',
            time: '',
            tasks: [
              {
                name: '',
                durationHr: '',
                durationMin: '',
                cost: '',
              },
            ],
          },
        ]);
      }
    }

    // cleanup
    return () => {
      setTemplateOptions([]);
      setClientOptions([]);
    };
  }, [templates, clients, selectedClient, serviceCount]);

  const handleAddTask = serviceIndex => {
    const newServiceData = [...serviceData];
    newServiceData[serviceIndex].tasks.push({
      name: '',
      durationHr: '',
      durationMin: '',
      cost: '',
    });
    setServiceData(newServiceData);
  };

  const handleRemoveTask = (serviceIndex, taskIndex) => {
    const newServiceData = [...serviceData];
    newServiceData[serviceIndex].tasks.splice(taskIndex, 1);
    setServiceData(newServiceData);
  };

  const createContract = () => {
    const unassignedServiceCount = serviceData
      .map(service => service.technicianIds.length)
      .filter(count => count === 0).length;

    const assignedServiceCount = serviceData
      .map(service => service.technicianIds.length)
      .filter(count => count > 0).length;

    const contract = {
      title,
      billing_address: address,
      service_count: Number(serviceCount),
      unassigned_service_count: Number(unassignedServiceCount),
      assigned_service_count: Number(assignedServiceCount),
      start_date: contractTermStart,
      end_date: contractTermEnd,
      amount: contractAmount,
      client_id: selectedClient.id,
      subClient_id: selectedSubClient.id,
      serviceRepeat: selectedServiceRepeat,
      serviceData,
    };

    router.post(route('contracts.store'), contract, {
      preserveScroll: true,
      onError: errors => {
        console.log(errors);
      },
    });
  };

  return {
    title,
    setTitle,
    templateOptions,
    clientOptions,
    subClientOptions,
    serviceCount,
    setServiceCount,
    selectedTemplate,
    setSelectedTemplate,
    selectedClient,
    setSelectedClient,
    selectedSubClient,
    setSelectedSubClient,
    address,
    setAddress,
    contractTermStart,
    setContractTermStart,
    contractTermEnd,
    setContractTermEnd,
    contractAmount,
    setContractAmount,
    serviceRepeatOptions,
    selectedServiceRepeat,
    setSelectedServiceRepeat,
    timeOptions,
    time,
    setTime,
    serviceData,
    setServiceData,
    handleAddTask,
    handleRemoveTask,
    createContract,
  };
}

export default useCreateContract;

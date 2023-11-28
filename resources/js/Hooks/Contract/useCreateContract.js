import { useEffect, useState } from 'react';
import { getTimes } from '@/Utils/utils.js';
import { router } from '@inertiajs/react';

function useCreateContract(templates, clients) {
  const [templateOptions, setTemplateOptions] = useState([]);
  const [clientOptions, setClientOptions] = useState([]);
  const [subClientOptions, setSubClientOptions] = useState([]);
  const [serviceCount, setServiceCount] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedSubClient, setSelectedSubClient] = useState(null);
  const [contractTermStart, setContractTermStart] = useState();
  const [contractTermEnd, setContractTermEnd] = useState();
  const [contractAmount, setContractAmount] = useState();
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
  const [selectedServiceRepeat, setSelectedServiceRepeat] = useState(null);
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
        };
      });
      setTemplateOptions(options);
    }

    if (clients) {
      const options = clients
        .filter(client => client.parent_id === null)
        .map(client => {
          return {
            value: client.id,
            label: client.name,
            parent_id: client.parent_id,
          };
        });
      setClientOptions(options);
    }

    if (selectedClient) {
      const options = clients
        .filter(client => client.parent_id === selectedClient)
        .map(client => {
          return {
            value: client.id,
            label: client.name,
            parent_id: client.parent_id,
          };
        });
      setSubClientOptions(options);
    }

    if (serviceCount > 0) {
      for (let i = 1; i <= serviceCount; i++) {
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
    console.log(selectedTemplate);

    const contract = {
      clientId: selectedClient,
      subClientId: selectedSubClient,
      contractTermStart,
      contractTermEnd,
      contractAmount,
      serviceRepeat: selectedServiceRepeat,
      serviceData,
    };

    console.log(contract);

    // router.post(route('contracts.store'), contract);
  };

  return {
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

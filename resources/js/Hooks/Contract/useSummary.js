import { useContext, useEffect, useState } from 'react';
import CreateContractContext from '@/Context/CreateContractContext.js';

function useSummary() {
  const { contractAmount, serviceData } = useContext(CreateContractContext);

  const [totalTechnicians, setTotalTechnicians] = useState(0);
  const [tasksCost, setTasksCost] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let _totalTechnicians = 0;
    let _tasksCost = 0;
    let _totalAmount = 0;

    const parseInteger = value => parseInt(value, 10) || 0;

    const sumTaskCosts = tasks =>
      tasks.reduce((total, task) => total + (Number(task.cost) || 0), 0);

    serviceData.forEach(service => {
      _totalTechnicians += parseInteger(service.technicianCount);
      _tasksCost += sumTaskCosts(service.tasks);
      _totalAmount += sumTaskCosts(service.tasks) * 1.08;
    });

    setTotalTechnicians(_totalTechnicians);
    setTasksCost(_tasksCost);
    setTotalAmount(_totalAmount);
  }, [serviceData]);

  return {
    contractAmount,
    totalTechnicians,
    tasksCost,
    totalAmount,
  };
}

export default useSummary;

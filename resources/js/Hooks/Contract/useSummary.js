import { useContext, useEffect, useState } from 'react';
import CreateContractContext from '@/Context/CreateContractContext';

function useSummary({ gst = 0.09 }) {
  const { contractAmount, serviceData } = useContext(CreateContractContext);

  const [contractGST, setContractGST] = useState(0);
  const [totalContractAmount, setTotalContractAmount] = useState(0);

  const [totalTechnicians, setTotalTechnicians] = useState(0);
  const [tasksCost, setTasksCost] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalGST, setTotalGST] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  useEffect(() => {
    const _contractGST = Number(contractAmount) * gst;
    setContractGST(_contractGST);
    setTotalContractAmount(Number(contractAmount) + _contractGST);
  }, [contractAmount]);

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
    });

    const _totalGST = _tasksCost * gst;
    setTotalGST(_totalGST);
    _totalAmount = Number(_tasksCost) + Number(_totalGST);

    setTotalTechnicians(_totalTechnicians);
    setTasksCost(_tasksCost);
    setTotalAmount(_totalAmount);
    setFinalAmount(Number(_totalAmount) + Number(totalContractAmount));
  }, [contractAmount, serviceData]);

  return {
    contractAmount,
    contractGST,
    totalContractAmount,
    totalTechnicians,
    totalGST,
    tasksCost,
    totalAmount,
    finalAmount,
  };
}

export default useSummary;

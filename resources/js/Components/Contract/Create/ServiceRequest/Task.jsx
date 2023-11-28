import TextArea from '@/Components/Shared/TextArea';
import TextInput from '@/Components/TextInput';
import React, { useContext, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import CreateContractContext from '@/Context/CreateContractContext';

function Task({ serviceIndex, taskIndex }) {
  const { serviceData, setServiceData, handleRemoveTask } = useContext(
    CreateContractContext
  );

  const handleOnNameChange = value => {
    const newData = [...serviceData];
    newData[serviceIndex].tasks[taskIndex].name = value;
    setServiceData(newData);
  };

  const handleOnDurationHrChange = value => {
    const newData = [...serviceData];
    newData[serviceIndex].tasks[taskIndex].durationHr = value;
    setServiceData(newData);
  };

  const handleOnDurationMinChange = value => {
    const newData = [...serviceData];
    newData[serviceIndex].tasks[taskIndex].durationMin = value;
    setServiceData(newData);
  };

  const handleOnCostChange = value => {
    const newData = [...serviceData];
    newData[serviceIndex].tasks[taskIndex].cost = value;
    setServiceData(newData);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <span className="text-primary">Task Title</span>
          <button className="text-primary font-bold">Select template</button>
        </div>
        <TextArea
          id="task-name"
          placeholder="Task Name"
          value={serviceData[serviceIndex].tasks[taskIndex].name}
          onChange={value => handleOnNameChange(value)}
        />
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex flex-col flex-1 gap-1">
          <b>Duration</b>
          <div className="flex gap-2 items-center">
            <TextInput
              value={serviceData[serviceIndex].tasks[taskIndex].durationHr}
              onChange={e => handleOnDurationHrChange(e.target.value)}
              className="flex-1"
            />
            <span>Hours</span>
            <TextInput
              className="flex-1"
              value={serviceData[serviceIndex].tasks[taskIndex].durationMin}
              onChange={e => handleOnDurationMinChange(e.target.value)}
            />
            <span>Minutes</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <b>Cost</b>
          <div className="flex gap-2 items-center">
            <TextInput
              value={serviceData[serviceIndex].tasks[taskIndex].cost}
              onChange={e => handleOnCostChange(e.target.value)}
            />
            <span>$</span>
            <button onClick={() => handleRemoveTask(serviceIndex, taskIndex)}>
              <RiDeleteBin6Line color="red" size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;

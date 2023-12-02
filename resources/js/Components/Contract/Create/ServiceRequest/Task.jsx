import TextArea from '@/Components/Shared/TextArea';
import React, { useContext } from 'react';
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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <span className="text-primary">Task Title</span>
          <button className="text-primary font-bold">Select template</button>
        </div>
        <div className="flex">
          <TextArea
            id="task-name"
            placeholder="Task Name"
            className="grow"
            value={serviceData[serviceIndex].tasks[taskIndex].name}
            onChange={value => handleOnNameChange(value)}
          />
          <button onClick={() => handleRemoveTask(serviceIndex, taskIndex)}>
            <RiDeleteBin6Line color="red" size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Task;

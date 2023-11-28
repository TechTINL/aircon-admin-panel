import TextArea from '@/Components/Shared/TextArea';
import TextInput from '@/Components/TextInput';
import React, { useContext, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import CreateContractContext from '@/Context/CreateContractContext';

function Task({ serviceIndex, taskIndex, taskName }) {
  const { handleRemoveTask } = useContext(CreateContractContext);
  const [name, setName] = useState(taskName);
  const [durationHr, setDurationHr] = useState(1);
  const [durationMin, setDurationMin] = useState(1);
  const [cost, setCost] = useState(0.0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <span className="text-primary">{taskName}</span>
          <button className="text-primary font-bold">Select template</button>
        </div>
        <TextArea
          placeholder="Task Name"
          value={name}
          onChange={value => setName(value)}
        />
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex flex-col flex-1 gap-1">
          <b>Duration</b>
          <div className="flex gap-2 items-center">
            <TextInput value={durationHr} className="flex-1" />
            <span> Hour </span>
            <TextInput value={durationMin} className="flex-1" />
            <span> Mins </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <b>Cost</b>
          <div className="flex gap-2 items-center">
            <TextInput value={durationMin} />
            <span> $ </span>
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

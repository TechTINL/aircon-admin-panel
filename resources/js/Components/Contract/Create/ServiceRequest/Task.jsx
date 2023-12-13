import TextArea from '@/Components/Shared/TextArea';
import TextInput from '@/Components/TextInput';
import React, { useContext, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import CreateContractContext from '@/Context/CreateContractContext';
import { Button } from '@material-tailwind/react';
import SelectTemplateModal from '@/Components/Template/SelectTemplateModal';
import { usePage } from '@inertiajs/react';
import { produce } from 'immer';

function Task({ serviceIndex, taskIndex }) {
  const { taskTemplates } = usePage().props;

  const { serviceData, setServiceData, handleRemoveTask } = useContext(
    CreateContractContext
  );

  const [openTemplateModal, setOpenTemplateModal] = useState(false);

  const handleOnNameChange = value => {
    setServiceData(
      produce(draft => {
        draft[serviceIndex].tasks[taskIndex].name = value;
      })
    );
  };

  const handleOnDurationHrChange = value => {
    setServiceData(
      produce(draft => {
        draft[serviceIndex].tasks[taskIndex].durationHr = value;
      })
    );
  };

  const handleOnDurationMinChange = value => {
    setServiceData(
      produce(draft => {
        draft[serviceIndex].tasks[taskIndex].durationMin = value;
      })
    );
  };

  const handleOnCostChange = value => {
    setServiceData(
      produce(draft => {
        draft[serviceIndex].tasks[taskIndex].cost = value;
      })
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <span className="text-primary">Job Description</span>
          <Button
            type="button"
            variant="text"
            className="text-primary"
            onClick={() => {
              setOpenTemplateModal(true);
            }}
          >
            Select template
          </Button>
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
              type="number"
              value={serviceData[serviceIndex].tasks[taskIndex].durationHr}
              onChange={e => handleOnDurationHrChange(e.target.value)}
              className="flex-1"
            />
            <span>Hours</span>
            <TextInput
              type="number"
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
              type="number"
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
      <SelectTemplateModal
        openModal={openTemplateModal}
        setOpenModal={setOpenTemplateModal}
        templateOptions={taskTemplates}
        handleSave={value => {
          handleOnNameChange(value?.name);
        }}
      />
    </div>
  );
}

export default Task;

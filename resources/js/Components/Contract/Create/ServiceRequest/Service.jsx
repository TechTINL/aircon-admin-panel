import React, { useContext, useEffect, useReducer, useState } from 'react';
import { produce } from 'immer';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { Button } from '@material-tailwind/react';
import CreateContractContext from '@/Context/CreateContractContext';
import { usePage } from '@inertiajs/react';
import Select from 'react-select';
import TextInput from '@/Components/TextInput';
import SelectTemplateModal from '@/Components/Template/SelectTemplateModal';
import TextArea from '../../../Shared/TextArea';
import DatePicker from '../../../Common/DatePicker';
import TimePicker from '../../../Common/TimePicker';
import Task from './Task';

function Service({ index }) {
  const { leaders, employees, serviceTemplates } = usePage().props;

  const { serviceData, setServiceData, handleAddTask } = useContext(
    CreateContractContext
  );

  const [leaderOptions, setLeaderOptions] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [selectedLeader, setSelectedLeader] = useState('');
  const [openServiceTemplateModal, setOpenServiceTemplateModal] =
    useState(false);

  const updateServiceName = value => {
    setServiceData(
      produce(draft => {
        draft[index].name = value;
      })
    );
  };

  const updateSelectedLeader = values => {
    setServiceData(
      produce(draft => {
        draft[index].teamLeaderIds = values.map(value => value.value);
      })
    );
  };

  const updateSelectedEmployees = values => {
    setServiceData(
      produce(draft => {
        draft[index].technicianIds = values.map(value => value.value);
      })
    );
  };

  const updateTechnicianCount = value => {
    setServiceData(
      produce(draft => {
        draft[index].technicianCount = value;
      })
    );
  };

  const updateServiceDate = value => {
    setServiceData(
      produce(draft => {
        draft[index].date = value;
      })
    );
  };

  const updateServiceTime = value => {
    setServiceData(
      produce(draft => {
        draft[index].time = value;
      })
    );
  };

  useEffect(() => {
    const leaderOptionsData = leaders.map(leader => {
      return {
        label: leader.name,
        value: leader.id,
      };
    });
    setLeaderOptions(leaderOptionsData);

    const employeeOptionsData = employees.map(employee => {
      return {
        label: employee.name,
        value: employee.id,
      };
    });
    setEmployeeOptions(employeeOptionsData);
  }, [leaders, employees]);

  return (
    <div className="p-4 flex flex-col border border-border-gray rounded-xl text-[14px] gap-2">
      <span className="text-primary">Service Request</span>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <span>
            Name of Service <span className="text-red-600">*</span>
          </span>
          <Button
            type="button"
            variant="text"
            className="text-primary"
            onClick={() => {
              setOpenServiceTemplateModal(true);
            }}
          >
            Select template
          </Button>
        </div>
        <TextArea
          id="service-name"
          placeholder="Name of Service"
          value={serviceData[index]?.name}
          onChange={value => updateServiceName(value)}
        />
      </div>

      <div className="flex flex-row gap-2 items-center">
        <div className="flex flex-col gap-1 flex-1">
          <span>Team Leader</span>
          <Select
            isMulti
            isSearchable
            options={leaderOptions}
            onChange={option => updateSelectedLeader(option)}
          />
        </div>
        <div className="flex flex-col gap-1 max-w-max">
          <span>Technician Count</span>
          <TextInput
            placeholder="Technician Count"
            className="rounded flex-1"
            onChange={e => updateTechnicianCount(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <span>Technician / Sub-Contractor</span>
          <Select
            isMulti
            isSearchable
            options={employeeOptions}
            onChange={option => updateSelectedEmployees(option)}
          />
        </div>
        <div className="flex flex-col gap-1 max-w-max">
          <span>Date</span>
          <DatePicker
            classes="rounded-xl"
            onChange={value => updateServiceDate(value)}
            value={serviceData[index]?.date}
          />
        </div>
        <div className="flex flex-col gap-1 max-w-max">
          <span>Time</span>
          <TimePicker
            classes="rounded-xl"
            onChange={value => updateServiceTime(value)}
            value={serviceData[index]?.time}
          />
        </div>
        <div className="flex gap-1 max-w-max items-center mt-5">
          <button>
            <RiDeleteBin6Line color="red" size={22} />
          </button>
        </div>
      </div>
      <div className="w-full h-[1px] bg-border-gray" />

      {serviceData[index]?.tasks?.map((task, i) => (
        <Task
          serviceIndex={index}
          taskIndex={i}
          key={i}
          taskName={`Task ${i + 1}`}
        />
      ))}

      <button
        className="border border-secondary text-secondary flex justify-center items-center py-2 rounded-xl gap-4"
        onClick={() => handleAddTask(index)}
      >
        <span>Add More Task</span>
        <MdOutlineAddCircleOutline size={20} />
      </button>
      <SelectTemplateModal
        openModal={openServiceTemplateModal}
        setOpenModal={setOpenServiceTemplateModal}
        templateOptions={serviceTemplates}
        handleSave={value => {
          updateServiceName(value?.name);
        }}
      />
    </div>
  );
}

export default Service;

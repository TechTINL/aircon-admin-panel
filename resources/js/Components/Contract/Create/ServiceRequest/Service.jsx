import React, { useContext, useEffect, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import CreateContractContext from '@/Context/CreateContractContext';
import { usePage } from '@inertiajs/react';
import Select from 'react-select';
import TextInput from '@/Components/TextInput';
import TextArea from '../../../Shared/TextArea';
import DatePicker from '../../../Common/DatePicker';
import TimePicker from '../../../Common/TimePicker';
import Task from './Task';

function Service({ index }) {
  const { leaders, employees } = usePage().props;

  const { serviceData, setServiceData, handleAddTask } = useContext(
    CreateContractContext
  );

  const [leaderOptions, setLeaderOptions] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [selectedLeader, setSelectedLeader] = useState('');
  const [srDate, setSRDate] = useState(new Date().toLocaleDateString());
  const [srTime, setSRTime] = useState({ label: '9:00 AM', value: '9:00 AM' });

  const updateServiceName = value => {
    const newData = [...serviceData];
    newData[index].name = value;
    setServiceData(newData);
  };

  const updateSelectedLeader = value => {
    const newData = [...serviceData];
    if (newData[index]) {
      newData[index].teamLeaderId = value;
    }
    setServiceData(newData);
  };

  const updateSelectedEmployees = values => {
    const newData = [...serviceData];
    newData[index].technicianIds = values.map(value => value.value);
    setServiceData(newData);
  };

  const updateTechnicianCount = value => {
    const newData = [...serviceData];
    newData[index].technicianCount = value;
    setServiceData(newData);
  };

  const handleOnDurationHrChange = value => {
    const newData = [...serviceData];
    newData[index].durationHr = value;
    setServiceData(newData);
  };

  const handleOnDurationMinChange = value => {
    const newData = [...serviceData];
    newData[index].durationMin = value;
    setServiceData(newData);
  };

  const handleOnCostChange = value => {
    const newData = [...serviceData];
    newData[index].cost = value;
    setServiceData(newData);
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

  useEffect(() => {
    updateSelectedLeader(selectedLeader);
    const employeeOptionsData = employees.map(employee => {
      return {
        label: employee.name,
        value: employee.id,
      };
    });
    setEmployeeOptions(employeeOptionsData);
  }, [selectedLeader]);

  return (
    <div className="p-4 flex flex-col border border-border-gray rounded-xl text-[14px] gap-2">
      <span className="text-primary">Service Request</span>

      <div className="flex flex-col">
        <div className="flex justify-between">
          <span>
            Name of Service <span className="text-red-600">*</span>
          </span>
          <button className="text-primary">Select template</button>
        </div>
        <TextArea
          id="service-name"
          placeholder="Name of Service"
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
            onChange={option => setSelectedLeader(option.value)}
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
            isClearable
            isSearchable
            options={employeeOptions}
            onChange={option => updateSelectedEmployees(option)}
          />
        </div>
        <div className="flex flex-col gap-1 max-w-max">
          <span>Date</span>
          <DatePicker
            classes="rounded-xl"
            onChange={value => setSRDate(value)}
            value={srDate}
          />
        </div>
        <div className="flex flex-col gap-1 max-w-max">
          <span>Time</span>
          <TimePicker
            classes="rounded-xl"
            onChange={value => setSRTime(value)}
            value={srTime}
          />
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex flex-col flex-1 gap-1">
          <b>Duration</b>
          <div className="flex gap-2 items-center">
            <TextInput
              value={serviceData[index]?.durationHr}
              onChange={e => handleOnDurationHrChange(e.target.value)}
              className="flex-1"
            />
            <span>Hours</span>
            <TextInput
              className="flex-1"
              value={serviceData[index]?.durationMin}
              onChange={e => handleOnDurationMinChange(e.target.value)}
            />
            <span>Minutes</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <b>Cost</b>
          <div className="flex gap-2 items-center">
            <TextInput
              value={serviceData[index]?.cost}
              onChange={e => handleOnCostChange(e.target.value)}
            />
            <span>$</span>
          </div>
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
    </div>
  );
}

export default Service;

import React, { useState } from 'react'
import TextArea from '../../../Shared/TextArea';
import { DropdownSelect } from '../../../Common/DropdownSelect';
import DatePicker from '../../../Common/DatePicker';
import TimePicker from '../../../Common/TimePicker';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineAddCircleOutline } from 'react-icons/md';

const dropDownTeamType = [
    [
        {
            label: 'Team Leader',
            value: 'team-leader'
        }
    ],
    [
        {
            label: 'Sub-Contractor',
            value: 'sub-contractor'
        }
    ]
];

const technicianCounts = [
    [
        {
            label: '1',
            value: 1
        }
    ],
    [
        {
            label: '2',
            value: 2
        }
    ],
    [
        {
            label: '3',
            value: 3
        }
    ],
    [
        {
            label: '4',
            value: 4
        }
    ],
    [
        {
            label: '5',
            value: 5
        }
    ],
    [
        {
            label: '6',
            value: 6
        }
    ],
    [
        {
            label: '7',
            value: 7
        }
    ],
    [
        {
            label: '8',
            value: 8
        }
    ],
    [
        {
            label: '9',
            value: 9
        }
    ],
    [
        {
            label: '2',
            value: 2
        }
    ],
]

const ServiceRequest = ({
    requestNumber
}) => {
    const [name, setName] = useState('');
    const [teamType, setTeamType] = useState(dropDownTeamType[0][0]);
    const [technicianCount, setTechnicianCount] = useState(technicianCounts[0][0]);
    const [srDate, setSRDate] = useState(new Date().toLocaleDateString());
    const [srTime, setSRTime] = useState({ label: '9:00 AM', value: '9:00 AM' });

    return (
        <div className='p-4 flex flex-col border border-border-gray rounded-xl text-[14px] gap-2'>
            <span className='text-primary'>Service Request {requestNumber || 1}</span>

            <div className='flex flex-col'>
                <div className='flex justify-between'>
                    <span>Name of Service <span className='text-red-600'>*</span></span>
                    <button className='text-primary'>Select template</button>
                </div>
                <TextArea
                    placeholder="Name of Service"
                    value={name}
                    onChange={value => setName(value)}
                />
            </div>

            <div className='flex flex-row gap-2 items-center'>
                <div className='flex flex-col gap-1 flex-1'>
                    <span>Team Leader/ Sub-Contractor</span>
                    <DropdownSelect
                        items={dropDownTeamType}
                        selectedItem={teamType}
                        handleItemSelect={item => setTeamType(item)}
                    />
                </div>
                <div className='flex flex-col gap-1 max-w-max'>
                    <span>Technician Count</span>
                    <DropdownSelect
                        items={technicianCounts}
                        selectedItem={technicianCount}
                        handleItemSelect={item => setTechnicianCount(item)}
                    />
                </div>
                <div className='flex flex-col gap-1 flex-1'>
                    <span>Technician</span>
                    <DropdownSelect
                        items={dropDownTeamType}
                        selectedItem={teamType}
                        handleItemSelect={item => setTeamType(item)}
                    />
                </div>
                <div className='flex flex-col gap-1 max-w-max'>
                    <span>Date</span>
                    <DatePicker
                        classes={'rounded-xl'}
                        onChange={(value) => setSRDate(value)}
                        value={srDate}
                    />
                </div>
                <div className='flex flex-col gap-1 max-w-max'>
                    <span>Time</span>
                    <TimePicker
                        classes={'rounded-xl'}
                        onChange={(value) => setSRTime(value)}
                        value={srTime}
                    />
                </div>
                <div className='flex gap-1 max-w-max items-center mt-5'>
                    <button>
                        <RiDeleteBin6Line color='red' size={22} />
                    </button>
                    <button>
                        <MdOutlineAddCircleOutline className='text-primary' size={22} />
                    </button>
                </div>
            </div>
            <div className='w-full h-[1px] bg-border-gray'></div>

            <div className='flex flex-col'>
                <div className='flex flex-col'>
                    <div className='flex justify-between'>
                        <span className='text-primary'>Task 1 Name</span>
                        <button className='text-primary font-bold'>Select template</button>
                    </div>
                    <TextArea
                        placeholder="Task Name"
                        value={name}
                        onChange={value => setName(value)}
                    />
                </div>  
                
            </div>
        </div>
    )
}

export default ServiceRequest;

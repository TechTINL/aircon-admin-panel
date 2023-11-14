import DatePicker from '@/Components/Common/DatePicker'
import DropdownInput from '@/Components/Common/DropdownInput'
import { DropdownSelect } from '@/Components/Common/DropdownSelect'
import TimePicker from '@/Components/Common/TimePicker'
import Dropdown from '@/Components/Dropdown'
import Modal from '@/Components/Modal'
import { Menu } from '@headlessui/react'
import React, { useState } from 'react'
import { AiFillCloseCircle, AiOutlineClockCircle } from 'react-icons/ai'
import { BiChevronDown } from 'react-icons/bi'

const ApplyLeaveModal = ({
    openModal,
    setOpenModal
}) => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [leaveDate, setLeaveDate] = useState(null);
    const [leaveTime, setLeaveTime] = useState(null);

    const employeeList = [
        {
            label: 'Employee 1',
            value: 'employee_1'
        },
        {
            label: 'Employee 2',
            value: 'employee_2'
        }
    ];

    const leaveTimes = [
        {
            label: 'All Day',
            value: 'all_day',
        },
        {
            label: '09:00 - 13:00',
            value: '09:00_13:00',
        },
        {
            label: '13:00 - 19:00',
            value: '13:00_19:00',
        },
    ]
    return (
        <Modal
            show={openModal}
            onClose={() => setOpenModal(false)}
            maxWidth="4xl"
        >
            <div className='flex flex-col p-8 text-black gap-4'>
                <div className="flex justify-between">
                    <div className="text-zinc-800 text-3xl font-bold leading-10">
                        Apply Leave
                    </div>
                    <button onClick={() => setOpenModal(false)}>
                        <AiFillCloseCircle className="text-border-gray text-4xl" />
                    </button>
                </div>

                <div className='flex flex-col gap-2'>
                    <b className='text-[16px]'>Employee Name</b>
                    <DropdownInput
                        label={'Employee Name'}
                        items={employeeList}
                        selectedItem={selectedEmployee}
                        onItemSelect={item => setSelectedEmployee(item)}
                    />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-2'>
                        <b className='text-[16px]'>Leave Date</b>
                        <DatePicker
                            label={'Leave Date'}
                            classes={'rounded-xl'}
                            onChange={(value) => setLeaveDate(value)}
                            value={leaveDate}
                            isRange={true}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <b className='text-[16px]'>Leave Time</b>
                        <DropdownInput
                            label={'Leave Time'}
                            items={leaveTimes}
                            selectedItem={leaveTime}
                            onItemSelect={item => setLeaveTime(item)}
                            endIcon={<AiOutlineClockCircle size={20} color='black' />}
                        />
                    </div>
                </div>

                <div className='flex justify-center mt-6'>
                    <button className='bg-primary py-2 w-full max-w-[600px] rounded-xl text-white font-bold'>Apply Leave</button>
                </div>
            </div>
        </Modal>
    )
}

export default ApplyLeaveModal
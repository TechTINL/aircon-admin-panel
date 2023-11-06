import React, { useState } from 'react';
import { DropdownSelect } from '../../Common/DropdownSelect';
import { getTimes } from '../../../Utils/utils';
import ServiceRequest from './ServiceRequest';

const dropDownServiceRepeats = [
    [
        {
            label: 'Quarterly',
            value: 'quarterly',
        },
    ]
];

const dropDownEvery = [
    [
        {
            label: 3,
            value: 3
        }
    ],
    [
        {
            label: 4,
            value: 4
        }
    ],
]

const dropDownEndsAfter = [
    [
        {
            label: 3,
            value: 3
        }
    ],
    [
        {
            label: 4,
            value: 4
        }
    ],
]

const dropDownTimes = [
    ...getTimes().map(time => {
        return [
            {
                label: time,
                value: time
            }
        ]
    })
]

const ServiceDetail = () => {
    const [selectedRepeat, setSelectedRepeat] = useState(dropDownServiceRepeats[0][0]);
    const [every, setEvery] = useState(dropDownEvery[0][0]);
    const [time, setTime] = useState(dropDownTimes[0][0]);
    const [endsAfter, setEndsAfter] = useState(dropDownEvery[0][0]);
    return (
        <div className='bg-white rounded-xl p-6 flex flex-col gap-2'>
            <span className='font-bold text-[14px]'>Service Detail</span>
            <div className='grid grid-cols-2 xl:grid-cols-4 gap-2 2xl:gap-4'>
                <div className='flex flex-1 flex-col gap-2'>
                    <span className='font-bold text-[16px]'>Repeats</span>
                    <DropdownSelect
                        items={dropDownServiceRepeats}
                        selectedItem={selectedRepeat}
                        handleItemSelect={(item) => setSelectedRepeat(item)}
                        inputClass={'overflow-hidden rounded-full'}
                    />
                </div>
                <div className='flex flex-1 flex-col gap-2'>
                    <span className='font-bold text-[16px]'>Every</span>
                    <div className='flex items-center gap-1'>
                        <div className='flex-1 w-full'>
                            <DropdownSelect
                                items={dropDownEvery}
                                selectedItem={every}
                                handleItemSelect={(item) => setEvery(item)}
                                inputClass={'rounded-full'}
                            />
                        </div>
                        <span className='text-[14px]'>months</span>
                    </div>
                </div>
                <div className='flex flex-1 flex-col gap-2'>
                    <span className='font-bold text-[16px]'>Time</span>
                    <DropdownSelect
                        items={dropDownTimes}
                        selectedItem={time}
                        handleItemSelect={(item) => setTime(item)}
                        inputClass={'overflow-hidden rounded-full'}
                    />
                </div>
                <div className='flex flex-1 flex-col gap-2'>
                    <span className='font-bold text-[16px]'>Ends After</span>
                    <div className='flex items-center gap-1'>
                        <div className='flex-1 w-full'>
                            <DropdownSelect
                                items={dropDownServiceRepeats}
                                selectedItem={selectedRepeat}
                                handleItemSelect={(item) => setSelectedRepeat(item)}
                                inputClass={'overflow-hidden rounded-full'}
                            />
                        </div>
                        <span className='text-[14px]'>times</span>
                    </div>
                </div>
            </div>

            <span className='font-bold text-[16px]'>Service Request</span>
            <ServiceRequest />
        </div>
    )
}

export default ServiceDetail;

import React from 'react';
import AirconImg from '../../../assets/images/aircon-sample.png';

const LeftComponent = () => {
    return (
        <div className='flex min-w-[400px] max-w-[40%] flex-col rounded-xl bg-white p-4'>
            <div className='flex justify-between text-[14px] font-bold text-black items-center'>
                <span className='font-bold text-[16px]'>Team In-Charge</span>
                <span className='text-border-gray'>Assigned by <span className='text-primary'>Admin Macy</span></span>
            </div>
            <div className='flex flex-col mt-2'>
                <span className='font-bold text-[18px] text-black'>Team Name</span>
                <span className='text-border-gray'>Team leader name</span>
                <div className='flex w-full overflow-y-auto mt-2'>
                    <div className='flex flex-row gap-2'>
                        <div className='px-4 py-[3px] text-[10px] border border-border-gray text-border-gray rounded-full'>Jeffrey Hong</div>
                        <div className='px-4 py-[3px] text-[10px] border border-border-gray text-border-gray rounded-full'>serviceMan A</div>
                        <div className='px-4 py-[3px] text-[10px] border border-border-gray text-border-gray rounded-full'>serviceMan B</div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col mt-2'>
                <span className='font-bold text-[18px] text-black'>Team Name</span>
            </div>

            <div className='flex flex-row overflow-x-scroll py-4 max-h-[350px]'>
                <div className='flex flex-col flex-wrap gap-4'>
                    <div className='h-[140px] rounded-xl bg-gray-300 w-[140px]'>
                        <img src={AirconImg} className='w-full h-full object-cover rounded-xl' />
                    </div>
                    <div className='h-[140px] rounded-xl bg-gray-300 w-[140px]'>
                        <img src={AirconImg} className='w-full h-full object-cover rounded-xl' />
                    </div>
                    <div className='h-[140px] rounded-xl bg-gray-300 w-[140px]'>
                        <img src={AirconImg} className='w-full h-full object-cover rounded-xl' />
                    </div>
                    <div className='h-[140px] rounded-xl bg-gray-300 w-[140px]'>
                        <img src={AirconImg} className='w-full h-full object-cover rounded-xl' />
                    </div>
                    <div className='h-[140px] rounded-xl bg-gray-300 w-[140px]'>
                        <img src={AirconImg} className='w-full h-full object-cover rounded-xl' />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LeftComponent;
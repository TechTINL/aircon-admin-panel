import React from 'react'

const index = () => {
    return (
        <div className='bg-white rounded-xl p-6 flex flex-col gap-6'>
            <span className='font-bold text-[14px]'>Summary</span>
            <div className='grid grid-cols-2 gap-8 text-[14px]'>
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <b>Contract Value</b>
                        <span className=''>$ 1,000.00</span>
                    </div>
                    <div className='flex justify-between'>
                        <b>Total Technicians</b>
                        <span>3</span>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <b>Task Cost</b>
                        <span className='text-[14px]'>$ 1,00.00</span>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex justify-between italic'>
                            <b>Including GST 8%</b>
                            <span className=''>$ 8.00</span>
                        </div>
                        <div className='flex justify-between text-primary font-bold'>
                            <b>Total Amount</b>
                            <span>$ 108.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index
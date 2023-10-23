import React from 'react'
import Calendar from 'react-calendar'
import { FiDownload } from 'react-icons/fi'

const ExportFilter = () => {
    return (
        <div className='flex flex-col w-auto rounded-xl'>
            <div className='flex border-border-gray border-b-[1px]'>
                <div className='flex flex-col border-border-gray border-r-[1px]'>
                    <div className='flex flex-col flex-2 min-w-[200px] px-4 py-2 border-border-gray border-b-[1px] justify-center'>
                        <span className='text-indigo-800 font-bold text-[16px]'>Time Range</span>
                        <span className='text-border-gray text-[16px]'>24 Sept - 2 Oct</span>
                    </div>
                    <button className='flex flex-1 flex-col min-w-[200px] px-4 py-2 text-border-gray border-border-gray border-b-[1px] justify-center'>
                        Today
                    </button>
                    <button className='flex flex-1 flex-col min-w-[200px] px-4 py-2 text-border-gray border-border-gray border-b-[1px] justify-center'>
                        Yesterday
                    </button>
                    <button className='flex flex-1 flex-col min-w-[200px] px-4 py-2 text-border-gray border-border-gray border-b-[1px] justify-center'>
                        This Week
                    </button>
                    <button className='flex flex-1 flex-col min-w-[200px] px-4 py-2 text-border-gray border-border-gray border-b-[1px] justify-center'>
                        Last Week
                    </button>
                    <button className='flex flex-1 flex-col min-w-[200px] px-4 py-2 text-border-gray justify-center'>
                        Last Month
                    </button>
                </div>
                <div className='p-4'>
                    <Calendar
                        selectRange
                        showDoubleView
                    />
                </div>
            </div>
            <div className='justify-center flex py-4'>
                <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary focus:outline-none transition ease-in-out duration-150"
                >
                    <FiDownload
                        size={20}
                        fontWeight={800}
                    />
                    <span className='px-2 font-bold'>Export Data</span>
                </button>
            </div>
        </div>
    )
}

export default ExportFilter
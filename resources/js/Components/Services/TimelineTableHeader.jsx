import React from 'react'
import { formatTime } from '../../Helpers/utils';

const TimelineTableHeader = () => {

    const handleScroll = (e) => {
        e.stopPropagation();
        const scrollleft = e.target.scrollLeft;
        setScrollLeft(scrollleft)
    }

    const renderColumns = () => {
        const columns = [];
        for (let i = 8; i <= 20; i++) {
            columns.push(<div className='flex w-[150px] justify-center items-center'>
                <span>{formatTime(`${i}:00`)}</span>
            </div>);
            if (i < 20) {
                columns.push(<div className='flex w-[150px] justify-center items-center'>
                    <span>{formatTime(`${i}:30`)}</span>
                </div>);
            }
        }
        return columns;
    }
    return (
        <div className='flex flex-row h-max bg-[#F0F0F0] text-black p-3 rounded-t-xl max-w-full overflow-hidden'>
            {/* <div className='flex flex-col'>
                <div className='justify-center items-center bg-slate-600'>
                    {new Date().toDateString()}
                </div>
            </div> */}
            <div onScroll={handleScroll} className='flex flex-1 bg-red-500 overflow-x-scroll scroll'>
                <div className='flex'>
                    {
                        ...renderColumns()
                    }
                </div>
            </div>
        </div>
    )
}

export default TimelineTableHeader;

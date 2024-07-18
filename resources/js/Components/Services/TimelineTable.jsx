import { useEffect, useRef, useState } from 'react';
// import { CalendarIcon, CaretDown } from "../../components/svgs";
// import { CustomizedCalendar } from "./CustomizedCalendar";
import { formatTime } from '../../Helpers/utils';
import JobDetailsModal from './JobDetailsModal';
import EditServiceReportModal from './EditServiceReportModal';

export const TimelineTable = ({ data, setIsShowLoading }) => {
    const [appointments, setAppointments] = useState([]);
    const eventsRef = useRef < HTMLDivElement > null;
    const [scrollLeft, setScrollLeft] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [selectedService, setSelectedService] = useState(null)

    const handleEdit = () => {
        setOpenModal(false);
        setOpenEditModal(true);
    };

    const renderColumns = (isHeader = false) => {
        const columns = [];
        for (let i = 8; i <= 20; i++) {
            columns.push(
                <th className="py-2 min-w-[100px] border border-[#BCBDC0]">
                    {isHeader && (
                        <span className="text-[12px] text-black">
                            {formatTime(`${i}:00`)}
                        </span>
                    )}
                </th>
            );
            if (i < 20) {
                columns.push(
                    <th className="py-2 min-w-[100px] max-w-[100px] border border-[#BCBDC0]">
                        {isHeader && (
                            <span className="text-[12px] text-black">
                                {formatTime(`${i}:30`)}
                            </span>
                        )}
                    </th>
                );
            }
        }
        return columns;
    };

    const getTaskClassNames = (task, index) => {
        const [time, indicator] = task?.service_time?.split(' ');
        let [startHour, startMin] = time?.split(':');
        startHour = Number(startHour) + (indicator?.toUpperCase() === 'PM' ? 12 : 0);
        const startTime = (Number(startHour) - 8) * 60 + Number(startMin);

        const endTime = startTime + 60;

        const left = 0 + 100 * (startTime / 30);
        const width = 100 + 100 * ((endTime - startTime) / 30);

        let backgroundColor = '#EFEFEF',
            tileBgColor = '#455361',
            titleTextColor = '#000000',
            textColor = '#000000',
            statusTextColor = '#000000';

        switch (task.status) {
            case 'completed': {
                backgroundColor = '#00B4AD';
                tileBgColor = '#128A86';
                textColor = '#FFFFFF';
                titleTextColor = '#FFFFFF';
                statusTextColor = '#FFFFFF';
                break;
            }
            case 'follow-up-completed': {
                backgroundColor = '#55C395';
                tileBgColor = '#24895F';
                textColor = '#FFFFFF';
                titleTextColor = '#FFFFFF';
                statusTextColor = '#FFFFFF';
                break;
            }
            case 'to-notify': {
                backgroundColor = '#EAEBF8';
                tileBgColor = '#454FA2';
                textColor = '#53616C';
                titleTextColor = '#454FA2';
                statusTextColor = '#F97B30';
                break;
            }
        }
        return {
            backgroundColor,
            tileBgColor,
            titleTextColor,
            statusTextColor,
            textColor,
            left,
            width,
            zIndex: startTime,
        };
    };

    const renderTaskCard = (task, i) => {
        const styles = getTaskClassNames(task, i);
        return (
            <td
                key={`j-${i}`}
                onClick={() => {
                    setSelectedService(task);
                    setOpenModal(true);
                }}
                className={`absolute top-[4%] h-[90%] w-[95%] flex rounded-r-2xl cursor-pointer overflow-ellipsis hover: z-[1000]`}
                style={{
                    backgroundColor: styles.backgroundColor,
                    left: styles.left,
                    width: styles.width,
                    zIndex: styles.zIndex
                }}
            >
                <div
                    className={`rounded-lg h-full w-2`}
                    style={{ backgroundColor: styles.tileBgColor }}
                ></div>
                <div className="flex flex-col p-2">
                    <span
                        className={`font-bold flex flex-nowrap`}
                        style={{ color: styles.titleTextColor }}
                    >
                        <span className='max-w-[140px] whitespace-nowrap overflow-hidden text-ellipsis'>
                            {task?.name || 'N/A'}
                        </span>
                        <span
                            className="italic text-[12px] font-thin pl-2"
                            style={{ color: styles.statusTextColor }}
                        >
                            {task.status}
                        </span>
                    </span>
                    <span className={`text-[10px]`} style={{ color: styles.textColor }}>
                        {task?.service_address}
                    </span>
                </div>
            </td>
        );
    };

    useEffect(() => {
        if (data?.length > 0) {
            setTasks(data);
        }
    }, [data])


    useEffect(() => {
        if (eventsRef?.current) {
            eventsRef?.current.scroll(scrollLeft, 0);
        }
    }, [eventsRef, scrollLeft]);

    return (
        <div className="w-full h-[80vh] overflow-x-auto overflow-y-auto rounded-xl">
            <JobDetailsModal
                service={selectedService}
                openModal={openModal}
                setOpenModal={setOpenModal}
                handleEdit={handleEdit}
            />
            <EditServiceReportModal
                openModal={openEditModal}
                setOpenModal={setOpenEditModal}
            />
            <table className="min-w-full bg-table-header-bg text-black relative">
                <thead className="relative">
                    <tr>
                        <th
                            className="px-4 py-2 sticky left-0 min-w-[150px] bg-table-header-bg"
                            rowSpan={2}
                        >
                            Time
                        </th>
                      
                        
                        <tr>
                            <th
                                className="px-4 py-2 sticky top-0 h-10 overflow-hidden border border-[#BCBDC0] border-t-0"
                                colSpan={25}
                            ></th>
                        </tr>
                        <tr className="h-10">{...renderColumns(true)}</tr>
                        {/* Add table header columns for other days */}
                    </tr>
                </thead>
                <tbody className="relative bg-white">
                <tr>
                            <td className="px-4 py-2 sticky left-0 bg-[#F8F8F8] border border-[#F2F2F2] z-40">
                                UnAssigned
                            </td>
                            <tr className="h-[120px] relative">
                            <div className='absolute bg-[#F8F8F8] py-3 rounded mx-12 mt-4 border-l-8 border-custom-border'>
                                    <div className='flex justify-between'>
                                        <p className='mx-2 text-sm font-bold'>Unassigned</p>
                                        <p className='mx-2 text-sm text-yellow'>Assign Now</p>
                                    </div>
                                    <p className='max-w-full px-2 text-sm overflow-hidden text-ellipsis whitespace-nowrap'>Blk 129 Bt Batok, #12-60, Singapore 3...</p>
                                    <div className='flex justify-between mt-3'>
                                        <p className='mx-2 text-sm font-bold'>Contract Name</p>

                                        <p className="mx-2 text-sm flex items-center">
                                            <span className="mx-0">
                                                <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                stroke-width="0"
                                                viewBox="0 0 256 256"
                                                className="lg:mx-1"
                                                height="22"
                                                width="22"
                                                xmlns="http://www.w3.org/2000/svg"
                                                >
                                                <path d="M106,112a6,6,0,0,1,6-6h32a6,6,0,0,1,0,12H112A6,6,0,0,1,106,112ZM230,72V200a14,14,0,0,1-14,14H40a14,14,0,0,1-14-14V72A14,14,0,0,1,40,58H82V48a22,22,0,0,1,22-22h48a22,22,0,0,1,22,22V58h42A14,14,0,0,1,230,72ZM94,58h68V48a10,10,0,0,0-10-10H104A10,10,0,0,0,94,48ZM38,72v42.79A186,186,0,0,0,128,138a185.91,185.91,0,0,0,90-23.22V72a2,2,0,0,0-2-2H40A2,2,0,0,0,38,72ZM218,200V128.37A198.12,198.12,0,0,1,128,150a198.05,198.05,0,0,1-90-21.62V200a2,2,0,0,0,2,2H216A2,2,0,0,0,218,200Z"></path>
                                                </svg>
                                            </span>
                                            <span className='mx-0'>3 of 4</span>
                                        </p>

                                    </div>
                                </div>
                                <div className='absolute left-80 bg-[#F8F8F8] py-3 rounded mx-12 mt-4 border-l-8 border-custom-border'>
                                    <div className='flex justify-between'>
                                        <p className='mx-2 text-sm font-bold'>Unassigned</p>
                                        <p className='mx-2 text-sm text-yellow'>Assign Now</p>
                                    </div>
                                    <p className='max-w-full px-2 text-sm overflow-hidden text-ellipsis whitespace-nowrap'>Blk 129 Bt Batok, #12-60, Singapore 3...</p>
                                    <div className='flex justify-between mt-3'>
                                        <p className='mx-2 text-sm font-bold'>Contract Name</p>

                                        <p className="mx-2 text-sm flex items-center">
                                            <span className="mx-0">
                                                <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                stroke-width="0"
                                                viewBox="0 0 256 256"
                                                className="lg:mx-1"
                                                height="22"
                                                width="22"
                                                xmlns="http://www.w3.org/2000/svg"
                                                >
                                                <path d="M106,112a6,6,0,0,1,6-6h32a6,6,0,0,1,0,12H112A6,6,0,0,1,106,112ZM230,72V200a14,14,0,0,1-14,14H40a14,14,0,0,1-14-14V72A14,14,0,0,1,40,58H82V48a22,22,0,0,1,22-22h48a22,22,0,0,1,22,22V58h42A14,14,0,0,1,230,72ZM94,58h68V48a10,10,0,0,0-10-10H104A10,10,0,0,0,94,48ZM38,72v42.79A186,186,0,0,0,128,138a185.91,185.91,0,0,0,90-23.22V72a2,2,0,0,0-2-2H40A2,2,0,0,0,38,72ZM218,200V128.37A198.12,198.12,0,0,1,128,150a198.05,198.05,0,0,1-90-21.62V200a2,2,0,0,0,2,2H216A2,2,0,0,0,218,200Z"></path>
                                                </svg>
                                            </span>
                                            <span className='mx-0'>3 of 4</span>
                                        </p>

                                    </div>
                                </div>

                            {...renderColumns()}
                            
                            </tr>
                            {/* Add table data for other time slots and days */}
                        </tr>
                    {tasks?.map((task, i) => (
                        <tr>
                            <td className="px-4 py-2 sticky left-0 bg-[#F8F8F8] border border-[#F2F2F2] z-40">
                                {task.name}
                            </td>
                            <tr className="h-[120px] relative">
                                {task?.services?.map((tt, j) => renderTaskCard(tt, j))}
                                {...renderColumns()}
                            </tr>
                            {/* Add table data for other time slots and days */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        // <div className="flex flex-auto w-full">

        //     {/* <TimelineTableHeader /> */}
        // </div>
    );
};
export default TimelineTable;

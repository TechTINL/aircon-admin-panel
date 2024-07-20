import { useEffect, useRef, useState } from 'react';
import { formatTime } from '../../Helpers/utils';
import JobDetailsModal from './JobDetailsModal';
import EditServiceReportModal from './EditServiceReportModal';

export const TimelineTable = ({ data, setIsShowLoading }) => {
    const [appointments, setAppointments] = useState([]);
    const eventsRef = useRef<HTMLDivElement>(null);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [selectedService, setSelectedService] = useState(null);

    const initialData = [
        {
            id: 1,
            name: "Unassigned",
            assignStatus: "Assign Now",
            address: "Blk 129 Bt Batok, #12-60, Singapore 3...",
            contractName: "Contract Name",
            progress: "3 of 4"
        },
        {
            id: 2,
            name: "Unassigned",
            assignStatus: "Assign Now",
            address: "Blk test 129 Bt Batok, #12-60, Singapore 3...",
            contractName: "Contract Name",
            progress: "3 of 4"
        },
        {
            id: 4,
            name: "Unassigned",
            assignStatus: "Assign Now",
            address: "Blk test 129 Bt Batok, #12-60, Singapore 3...",
            contractName: "Contract Name",
            progress: "3 of 4"
        },
        {
            id: 5,
            name: "Unassigned",
            assignStatus: "Assign Now",
            address: "Blk test 129 Bt Batok, #12-60, Singapore 3...",
            contractName: "Contract Name",
            progress: "3 of 4"
        },
        {
            id: 8,
            name: "Unassigned",
            assignStatus: "Assign Now",
            address: "Blk test 129 Bt Batok, #12-60, Singapore 3...",
            contractName: "Contract Name",
            progress: "3 of 4"
        },
       
    ];

    const employeesData = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Alice Johnson" },
        { id: 4, name: "Michael Brown" },
        { id: 5, name: "Emily Davis" },
        { id: 6, name: "Christopher Wilson" },
        { id: 7, name: "Jessica Taylor" },
        { id: 8, name: "David Anderson" },
        { id: 9, name: "Sarah Martinez" },
        { id: 10, name: "James White" }
    ];
    

    const handleEdit = () => {
        setOpenModal(false);
        setOpenEditModal(true);
    };

    const renderColumns = (isHeader = false) => {
        const columns = [];
        for (let i = 8; i <= 20; i++) {
            columns.push(
                <th className="py-2 min-w-[100px] border border-[#BCBDC0]" key={`hour-${i}`}>
                    {isHeader && (
                        <span className="text-[12px] text-black">
                            {formatTime(`${i}:00`)}
                        </span>
                    )}
                </th>
            );
            if (i < 20) {
                columns.push(
                    <th className="py-2 min-w-[100px] max-w-[100px] border border-[#BCBDC0]" key={`half-hour-${i}`}>
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

    useEffect(() => {
        if (data?.length > 0) {
            setTasks(data);
        }
    }, [data]);

    useEffect(() => {
        if (eventsRef?.current) {
            eventsRef?.current.scroll(scrollLeft, 0);
        }
    }, [eventsRef, scrollLeft]);

    const hours = Array.from({ length: 18 }, (_, i) => i + 8);

    const formatHour = (hour) => {
        const isPM = hour >= 12;
        const displayHour = hour % 12 || 12; // Convert to 12-hour format
        const period = isPM ? 'PM' : 'AM';
        return `${displayHour}:00 ${period}`;
    };

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
                <thead className="bg-gray-200">
                    <tr>
                        <th
                            className="px-4 py-2 sticky top-0 left-0 bg-gray-200 border border-gray-300"
                            rowSpan={2}
                        >
                            Time
                        </th>
                        <th
                            className="px-4 py-2 sticky text-sm text-nowrap top-0 h-10 overflow-hidden border border-[#BCBDC0] border-t-0"
                            colSpan={24} // Adjusted colSpan to match the number of hours
                        >
                            <div className="flex">
                                {hours.map(hour => (
                                    <div key={hour} className="p-2 border font-sm rounded m-1 bg-gray-100 text-center w-20">
                                        {formatHour(hour)}
                                    </div>
                                ))}
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="relative bg-white">
                    {/* Unassigned Tasks Row */}
                    <tr>
                        <td className="px-4 py-2 sticky left-0 bg-[#F8F8F8] border border-[#F2F2F2] z-40">
                            Unassigned
                        </td>
                        {initialData.map((data) => (
                            <td key={data.id} className="border border-[#BCBDC0]">
                                <div className='bg-[#F8F8F8] py-3 rounded mx-2 border-l-8 border-custom-border'>
                                    <div className='flex justify-between'>
                                        <p className='mx-2 text-sm font-bold'>{data.name}</p>
                                        <p className='mx-2 text-sm text-yellow'>{data.assignStatus}</p>
                                    </div>
                                    <p className='max-w-full px-2 text-sm overflow-hidden text-ellipsis whitespace-nowrap'>{data.address}</p>
                                    <div className='flex justify-between mt-3'>
                                        <p className='mx-2 text-sm font-bold'>{data.contractName}</p>
                                        <p className="mx-2 text-sm flex items-center">
                                            <span className="mx-0">
                                                <svg
                                                    stroke="currentColor"
                                                    fill="currentColor"
                                                    strokeWidth="0"
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
                            </td>
                        ))}
                    </tr>

                    {/* Employee Rows */}
                    {employeesData.map((employee) => (
                        <tr key={employee.id} >
                            <td className="px-4 py-2 sticky left-0 bg-[#F8F8F8] border border-[#F2F2F2] z-40">
                                {employee.name}
                            </td>
                            {Array.from({ length: 24 }).map((_, index) => (
                                <td key={index} className="border border-[#BCBDC0]" style={{ height: '100px' }}>
                                    {/* Content for each hour slot can be added here */}
                                </td>
                            ))}
                        </tr>
                    ))}

                    {/* Task Rows */}
                    {tasks?.map((task, i) => (
                        <tr key={i}>
                            <td className="px-4 py-2 sticky left-0 bg-[#F8F8F8] border border-[#F2F2F2] z-40" >
                                {/* Task details */}
                            </td>
                            {task?.services?.map((tt, j) => renderTaskCard(tt, j))}
                            {/* {renderColumns()} */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TimelineTable;

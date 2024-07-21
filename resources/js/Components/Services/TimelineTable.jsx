import { useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { formatTime } from '../../Helpers/utils';
import JobDetailsModal from './JobDetailsModal';
import EditServiceReportModal from './EditServiceReportModal';

const TimelineTable = ({ data, setIsShowLoading }) => {
    const [appointments, setAppointments] = useState([]);
    const eventsRef = useRef(null);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [selectedService, setSelectedService] = useState(null);

    // Sample data for tasks and employees
    const initialData = [
        {
            "id": 1,
            "name": "Task 1",
            "assignStatus": "Assign Now",
            "address": "Blk 129 Bt Batok, #12-60, Singapore 3...",
            "contractName": "Contract A",
            "progress": "1 of 3"
        },
        {
            "id": 2,
            "name": "Task 2",
            "assignStatus": "Assign Now",
            "address": "Blk 231 Orchard Road, #05-01, Singapore 2...",
            "contractName": "Contract B",
            "progress": "2 of 3"
        },
        {
            "id": 3,
            "name": "Task 3",
            "assignStatus": "Assign Now",
            "address": "Blk 512 Woodlands Ave 3, #08-30, Singapore 7...",
            "contractName": "Contract C",
            "progress": "3 of 3"
        },
        {
            "id": 4,
            "name": "Task 4",
            "assignStatus": "Assign Now",
            "address": "Blk 76 Pasir Ris Central, #15-22, Singapore 5...",
            "contractName": "Contract D",
            "progress": "1 of 2"
        },
        {
            "id": 5,
            "name": "Task 5",
            "assignStatus": "Assign Now",
            "address": "Blk 419 Jurong West St 52, #03-11, Singapore 6...",
            "contractName": "Contract E",
            "progress": "2 of 2"
        }
    ]
    

    const employeesData = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Alice Johnson" },
        { id: 4, name: "Johnson" },
        { id: 5, name: "test" },
        { id: 6, name: "hamza" },
        // Add more employees as needed
    ];

    const onDragEnd = (result) => {
        const { source, destination } = result;

        // If there's no destination, exit
        if (!destination) return;

        const { droppableId: sourceDroppableId, index: sourceIndex } = source;
        const { droppableId: destinationDroppableId, index: destinationIndex } = destination;

        const updatedTasks = Array.from(tasks);
        const [movedTask] = updatedTasks.splice(sourceIndex, 1);

        // Parse source and destination droppable IDs to extract employee and time
        const [sourceType, sourceEmployeeId, sourceHour] = sourceDroppableId.split('-');
        const [destinationType, destinationEmployeeId, destinationHour] = destinationDroppableId.split('-');

        if (sourceDroppableId === destinationDroppableId) {
            // Reorder within the same list
            updatedTasks.splice(destinationIndex, 0, movedTask);
        } else {
            // Move between different lists (e.g., different employees or times)
            updatedTasks.splice(destinationIndex, 0, {
                ...movedTask,
                assignedTo: parseInt(destinationEmployeeId),
                time: parseInt(destinationHour)
            });
        }

        setTasks(updatedTasks);
    };

    const handleEdit = () => {
        setOpenModal(false);
        setOpenEditModal(true);
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
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="w-full h-[80vh] overflow-x-auto overflow-y-auto rounded-xl" ref={eventsRef}>
                <JobDetailsModal
                    service={selectedService}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    handleEdit={handleEdit}
                />
                <EditServiceReportModal
                    openModal={openEditModal}
                    setOpenOpenModal={setOpenEditModal}
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
                                        <div key={hour} className="p-2 mx-2 border font-sm rounded m-1 border border-gray-300 bg-gray-100 text-center w-48">
                                            {formatHour(hour)}
                                        </div>
                                    ))}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="relative bg-white">
                        {/* Unassigned Tasks Row */}
                        <Droppable droppableId="unassigned-0" type="TASK">
                            {(provided) => (
                                <tr
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <td className="px-4 py-2 sticky left-0 bg-[#F8F8F8] border border-[#F2F2F2] z-40 w-48">
                                        Unassigned
                                    </td>
                                    <td className="flex border border-[#BCBDC0] w-48 relative cells" colSpan={24}>
                                        {initialData.map((data, index) => (
                                            <Draggable key={data.id} draggableId={`task-${data.id}`} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="bg-[#F8F8F8] py-3 rounded tasks mx-2 border-l-8 w-48 border-custom-border"
                                                    >
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
                                                                <span className='mx-0'>{data.progress}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </td>
                                </tr>
                            )}
                        </Droppable>

                        {/* Employee Rows */}
                        {employeesData.map((employee) => (
                            <tr key={employee.id}>
                                <td className="px-4 py-2 sticky left-0 bg-[#F8F8F8] border border-[#F2F2F2] z-40">
                                    {employee.name}
                                </td>
                                {hours.map((hour) => (
                                    <Droppable
                                        key={`${employee.id}-${hour}`}
                                        droppableId={`employee-${employee.id}-${hour}`}
                                        type="TASK"
                                    >
                                        {(provided) => (
                                            <td
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className="border border-[#BCBDC0] w-48 relative cells"
                                            >
                                                {tasks
                                                    .filter(task => task.assignedTo === employee.id && task.time === hour)
                                                    .map((task, taskIndex) => (
                                                        <Draggable
                                                            key={task.id}
                                                            draggableId={`task-${task.id}`}
                                                            index={taskIndex}
                                                        >
                                                            {(provided) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className="absolute"
                                                                    style={{
                                                                        top: `${taskIndex * 60}px`, // Adjust positioning logic as needed
                                                                    }}
                                                                >
                                                                    <div className='flex justify-between'>
                                                                        <p className='mx-2 text-sm font-bold'>{task.name}</p>
                                                                        <p className='mx-2 text-sm text-yellow'>{task.assignStatus}</p>
                                                                    </div>
                                                                    <p className='max-w-full px-2 text-sm overflow-hidden text-ellipsis whitespace-nowrap'>{task.address}</p>
                                                                    <div className='flex justify-between mt-3'>
                                                                        <p className='mx-2 text-sm font-bold'>{task.contractName}</p>
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
                                                                            <span className='mx-0'>{task.progress}</span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                {provided.placeholder}
                                            </td>
                                        )}
                                    </Droppable>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DragDropContext>
    );
};

export default TimelineTable;

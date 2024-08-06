import { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Oval } from 'react-loader-spinner';

import '../../../css/app.css';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const ItemTypes = {
    TASK: 'task',
};

function Task({ task }) {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.TASK,
        item: { task },
        end: (item, monitor) => {
            if (monitor.didDrop()) {
                const dropResult = monitor.getDropResult();
            }
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Unassigned':
                return '#dcdcdc ';
            case 'On-Hold':
                return '#dcdcdc';
            case 'scheduled':
                return '#dcdcdc ';
            case 'Completed':
                return '#00B4AD';
            case 'Requires Follow-up':
                return '#dcdcdc ';
            case 'Follow-up Completed':
                return '#90ee90 ';
            default:
                return '#ffffff';
        }
    };
    const getBorderColor = (status) => {
        switch (status) {
            case 'Unassigned':
                return '#808080';
            case 'On-Hold':
                return '#808080';
            case 'scheduled':
                return '#808080';
            case 'Completed':
                return '#4caf50';
            case 'Requires Follow-up':
                return '#808080';
            case 'Follow-up Completed':
                return '#4caf50';
            default:
                return '#e0e0e0';
        }
    };
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                backgroundColor: getStatusColor(task.service.status),
                borderLeft: `8px solid ${getBorderColor(task.service.status)}`,
            }}
            className="cells bg-[#F8F8F8] py-3 rounded tasks mx-2 w-[14rem]"
        >
            <div className="flex justify-between">
                <p className="mx-2 text-sm font-bold">{task.service.name}</p>
                <p className="mx-2 text-sm text-yellow">{task.service.status}</p>
            </div>
            <p className="max-w-full px-2 text-sm overflow-hidden whitespace-nowrap float-left">{truncateText(task.service.service_address, 25)}</p>
            <br />
            <div className="flex justify-between mt-2">
                <p className="mx-2 text-sm font-bold float-left">{truncateText(task.name, 15)}</p>
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
                    <span className="mx-0">Good</span>
                </p>
            </div>
        </div>
    );
}

function ScheduleSlot({ hour, employee, task, moveTask }) {
    const [, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: (item) => moveTask(item.task, employee, hour),
    });
    return (
        <td ref={drop} className="t-data">
            {task && <Task task={task} />}
        </td>
    );
}

const formatDate = (date) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options).replace(/ /g, ' ');
};

function TimelineTable({ loading, setLoading }) {
    const [tasks, setTasks] = useState([]);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [isStaffOpen, setIsStaffOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('ShowAll');
    const [selectedStaff, setSelectedStaff] = useState('ShowAll');
    const [employees, setEmployees] = useState([]);
    const [roles, setRoles] = useState([]);
    const [date, setDate] = useState(() => {
        const today = new Date();
        return formatDate(today);
    });
    const hours = ['8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm', '6:00 pm', '7:00 pm', '8:00 pm'];

    const getData = async () => {
        setLoading(true);
        try {
            const response = await fetch('/get-data/' + date);
            const data = await response.json();

            const tasksJson = Array.isArray(data.tasks) ? data.tasks : [];
            const employeesJson = Array.isArray(data.employees) ? data.employees : [];
            const rolesJson = Array.isArray(data.roles) ? data.roles : [];
            const unAssigned = { id: 0, name: 'UnAssigned' };
            const showAll = { label: 'ShowAll', value: 'show-all' };
            setTasks(tasksJson);
            setEmployees([unAssigned, ...employeesJson]);
            setRoles([showAll, ...rolesJson]);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1500);
        }
    };

    useEffect(() => {
        getData();
    }, [date]);

    const toggleStatusDropdown = () => {
        setIsStatusOpen(!isStatusOpen);
    };
    const toggleStaffDropdown = () => {
        setIsStaffOpen(!isStaffOpen);
    };

    const handleStatusChange = (status) => {
        setLoading(true);
        setSelectedStatus(status);
        setIsStatusOpen(false);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    const handleStaffChange = (staff) => {
        setLoading(true);
        setSelectedStaff(staff);
        setIsStaffOpen(false);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    const filteredTasks = tasks.filter((task) => {
        if (selectedStatus === 'ShowAll') return true;
        return task.service.status.toLowerCase() === selectedStatus.toLowerCase();
    });

    const filteredEmployees = employees.filter((employee) => {
        if (employee.id === 0 || selectedStaff === 'ShowAll') return true;
        return employee.role.toLowerCase() === selectedStaff.toLowerCase();
    });

    const moveTask = async (task, employee, hour) => {
        setTasks((prevTasks) =>
            prevTasks.map((t) =>
                t.id === task.id ? { ...t, assign: 1, employee_id: employee.id, hour: hour, service: { ...t.service, service_time: hour } } : t
            )
        );
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            const response = await fetch('/set-tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken,
                },
                body: JSON.stringify({
                    taskId: task.id,
                    employeeId: employee.id,
                    hour: hour,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Task updated successfully:', result);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const extractHour = (timeString) => {
        const timePattern = /^(\d{1,2}):(\d{2})\s?(AM|PM)$/i;
        const match = timeString.match(timePattern);

        if (!match) {
            throw new Error("Invalid time format");
        }

        let [_, hours, minutes, period] = match;
        hours = parseInt(hours, 10);

        if (period.toUpperCase() === 'PM' && hours < 12) {
            hours += 12;
        }
        if (period.toUpperCase() === 'AM' && hours === 12) {
            hours = 0;
        }

        return hours;
    };

    const checkHour = (service, box) => {
        const serviceHour = extractHour(service);
        const boxHour = extractHour(box);
        return serviceHour === boxHour;
    };

    const dateChange = (action) => {
        const currentDate = new Date(date);
        if (action === 'pre') {
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            currentDate.setDate(currentDate.getDate() + 1);
        }
        setDate(formatDate(currentDate));
        setLoading(true);
        getData();
    };

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center w-full h-screen">
                    <Oval color="#00BFFF" height={80} width={80} />
                </div>
            ) : (
                <div>
                    <div className='flex px-4'>
                        <div className="flex items-center">
                            <div className="text-zinc-800 text-3xl font-bold leading-10">Job Table</div>
                        </div>
                        <div className="flex items-center status-check pr-4">
                            <div className="flex gap-4 items-end max-w-max">
                                <div className="relative inline-block text-left">
                                    <div>
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-border-gray text-sm leading-4 font-medium rounded-full text-border-gray bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            id="menu-button"
                                            aria-expanded={isStatusOpen}
                                            aria-haspopup="true"
                                            onClick={toggleStatusDropdown}
                                        >
                                            Status
                                            <svg
                                                className="-mr-1 h-5 w-5 text-gray-400"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75,0,0,1-1.06z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    {isStatusOpen && (
                                        <div
                                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="menu-button"
                                            tabIndex={-1}
                                        >
                                            <div className="py-1" role="none">
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-700"
                                                    role="menuitem"
                                                    tabIndex={-1}
                                                    id="menu-item-0"
                                                    onClick={() => handleStatusChange('ShowAll')}
                                                >
                                                    ShowAll
                                                </a>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-700"
                                                    role="menuitem"
                                                    tabIndex={-1}
                                                    id="menu-item-0"
                                                    onClick={() => handleStatusChange('Unassigned')}
                                                >
                                                    Unassigned
                                                </a>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-700"
                                                    role="menuitem"
                                                    tabIndex={-1}
                                                    id="menu-item-1"
                                                    onClick={() => handleStatusChange('On-Hold')}
                                                >
                                                    On-Hold
                                                </a>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-700"
                                                    role="menuitem"
                                                    tabIndex={-1}
                                                    id="menu-item-2"
                                                    onClick={() => handleStatusChange('Scheduled')}
                                                >
                                                    Scheduled
                                                </a>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-700"
                                                    role="menuitem"
                                                    tabIndex={-1}
                                                    id="menu-item-2"
                                                    onClick={() => handleStatusChange('Completed')}
                                                >
                                                    Completed
                                                </a>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-700"
                                                    role="menuitem"
                                                    tabIndex={-1}
                                                    id="menu-item-2"
                                                    onClick={() => handleStatusChange('Requires Follow-up')}
                                                >
                                                    Requires Follow-up
                                                </a>
                                                <form method="POST" action="#" role="none">
                                                    <button
                                                        type="submit"
                                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                                                        role="menuitem"
                                                        tabIndex={-1}
                                                        id="menu-item-3"
                                                        onClick={() => handleStatusChange('Follow-up Completed')}
                                                    >
                                                        Follow-up Completed
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="relative inline-block text-left">
                                    <div>
                                        <button type="button"
                                            className="inline-flex items-center px-3 py-2 border border-border-gray text-sm leading-4 font-medium rounded-full text-border-gray bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            id="menu-button" aria-expanded={isStaffOpen} aria-haspopup="true" onClick={toggleStaffDropdown}>Staff
                                            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>

                                    {isStaffOpen && (
                                        <div
                                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="menu-button"
                                            tabIndex={-1}
                                        >
                                            <div className="py-1" role="none">
                                                {
                                                    roles.map((role) => (
                                                        <a
                                                            key={role.label}
                                                            href="#"
                                                            className="block px-4 py-2 text-sm text-gray-700"
                                                            role="menuitem"
                                                            tabIndex={-1}
                                                            id="menu-item-0"
                                                            onClick={() => handleStaffChange(role.label)}
                                                        >
                                                            {role.label}
                                                        </a>
                                                    ))
                                                }

                                                <form method="POST" action="#" role="none">
                                                    <button
                                                        type="submit"
                                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                                                        role="menuitem"
                                                        tabIndex={-1}
                                                        id="menu-item-3"
                                                        onClick={() => handleStaffChange('Follow-up Completed')}
                                                    >
                                                        Follow-up Completed
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="relative">
                                    <div>
                                        <span className="inline-flex">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-xl text-white bg-primary focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {/* <FaDownload size={20} /> */}
                                                <span className="px-2 font-bold">Export Data</span>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute flex items-center top-2 right-[35vw] z-50">
                        <AiOutlineLeft className="cursor-pointer" fontWeight={900} onClick={() => dateChange('pre')} />
                        <span className="text-black font-bold px-4">{date}</span>
                        <AiOutlineRight className="cursor-pointer" onClick={() => dateChange('nxt')} />
                    </div>
                    <DndProvider backend={HTML5Backend}>
                        <div className="table-container mt-10">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="t-heading">Time</th>
                                        {hours.map((hour) => (
                                            <th key={hour} className="t-heading">
                                                {hour}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEmployees.map((employee) => (
                                        <tr key={employee.id}>
                                            <td className="t-data text-center">{employee.name}</td>
                                            {hours.map((hour) => {
                                                let task = filteredTasks.find(
                                                    (t) =>
                                                        t.service.employee_ids.includes(employee.id) &&
                                                        checkHour(t.service.service_time, hour)
                                                );

                                                if (employee.id === 0 && !task) {
                                                    const unassignedIndex = hours.indexOf(hour);
                                                    task = filteredTasks.find(
                                                        (t) => t.service.employee_ids.length <= 0 && tasks.indexOf(t) === unassignedIndex
                                                    );
                                                }
                                                return (
                                                    <ScheduleSlot
                                                        key={hour}
                                                        hour={hour}
                                                        employee={employee}
                                                        task={task}
                                                        moveTask={moveTask}
                                                    />
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </DndProvider>
                </div>
            )}
        </>
    );
}

export default TimelineTable;

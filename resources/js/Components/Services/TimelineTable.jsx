import { useEffect, useRef, useState } from 'react';
// import { CalendarIcon, CaretDown } from "../../components/svgs";
// import { CustomizedCalendar } from "./CustomizedCalendar";
import { formatTime } from '../../Helpers/utils';
import JobDetailsModal from './JobDetailsModal';
import EditServiceReportModal from './EditServiceReportModal';

export const TimelineTable = ({ setIsShowLoading }) => {
  const [appointments, setAppointments] = useState([]);
  const eventsRef = useRef < HTMLDivElement > null;
  const [scrollLeft, setScrollLeft] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const tasks = [
    {
      name: 'Unassigned',
      tasks: [
        {
          clientName: 'Client Name',
          addresss: 'Blk 129 Bt Batok, #12-60, Singapore 3...',
          start: '10:00 AM',
          end: '11:00 AM',
          status: 'unassign',
        },
        {
          clientName: 'Client Name',
          addresss: 'Blk 129 Bt Batok, #12-60, Singapore 3...',
          start: '10:30 AM',
          end: '11:30 AM',
          status: 'unassign',
        },
        {
          clientName: 'Client Name',
          addresss: 'Blk 129 Bt Batok, #12-60, Singapore 3...',
          start: '11:00 AM',
          end: '12:00 AM',
          status: 'unassign',
        },
      ],
    },
    {
      name: 'Employee Name',
      tasks: [],
    },
    {
      name: 'Employee Name',
      tasks: [
        {
          clientName: 'Client Name',
          addresss: 'Blk 129 Bt Batok, #12-60, Singapore 3...',
          start: '8:15 AM',
          end: '9:20 AM',
          status: 'completed',
        },
      ],
    },
    {
      name: 'Employee Name',
      tasks: [],
    },
    {
      name: 'Employee Name',
      tasks: [
        {
          clientName: 'Client Name',
          addresss: 'Blk 129 Bt Batok, #12-60, Singapore 3...',
          start: '8:15 AM',
          end: '9:20 AM',
          status: 'to-notify',
        },
      ],
    },
    {
      name: 'Employee Name',
      tasks: [],
    },
    {
      name: 'Employee Name',
      tasks: [
        {
          clientName: 'Client Name',
          addresss: 'Blk 129 Bt Batok, #12-60, Singapore 3...',
          start: '9:15 AM',
          end: '10:20 AM',
          status: 'follow-up-completed',
        },
      ],
    },
  ];
  // useEffect(() => {
  //     if (eventsRef?.current) {
  //         eventsRef?.current.scroll(scrollLeft, 0);
  //     }
  // }, [eventsRef, scrollLeft]);

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
    let [startHour, startMin] = task?.start?.split(' ')[0]?.split(':');
    startHour =
      Number(startHour) + (task?.start?.split(' ')[1] === 'PM' ? 12 : 0);
    const startTime = (Number(startHour) - 8) * 60 + Number(startMin);

    let [endHour, endMin] = task?.end?.split(' ')[0]?.split(':');
    endHour = Number(endHour) + (task?.end?.split(' ')[1] === 'PM' ? 12 : 0);
    const endTime = (Number(endHour) - 8) * 60 + Number(endMin);

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
      zIndex: (index + 1) * 10,
    };
  };

  const renderTaskCard = (task, i) => {
    const styles = getTaskClassNames(task, i);

    return (
      <td
        key={`j-${i}`}
        onClick={() => setOpenModal(true)}
        className={`absolute top-[4%] h-[90%] w-[95%] flex rounded-r-2xl cursor-pointer`}
        style={{
          backgroundColor: styles.backgroundColor,
          left: styles.left,
          width: styles.width,
          zIndex: styles.zIndex,
        }}
      >
        <div
          className={`rounded-lg h-full w-2`}
          style={{ backgroundColor: styles.tileBgColor }}
        ></div>
        <div className="flex flex-col p-2">
          <span
            className={`font-bold`}
            style={{ color: styles.titleTextColor }}
          >
            {task?.clientName}
            <span
              className="italic text-[12px] font-thin pl-2"
              style={{ color: styles.statusTextColor }}
            >
              {task.status}
            </span>
          </span>
          <span className={``} style={{ color: styles.textColor }}>
            {task?.addresss}
          </span>
        </div>
      </td>
    );
  };

  return (
    <div className="w-full h-[80vh] overflow-x-auto overflow-y-auto rounded-xl">
      <JobDetailsModal
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
          {tasks.map((task, i) => (
            <tr>
              <td className="px-4 py-2 sticky left-0 bg-[#F8F8F8] border border-[#F2F2F2] z-40">
                {task.name}
              </td>
              <tr className="h-[100px] relative">
                {task?.tasks?.map((tt, j) => renderTaskCard(tt, j))}
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

import { useEffect, useState } from 'react';
import { formatTime } from '../../Helpers/utils';
import JobDetailsModal from './JobDetailsModal';
import EditServiceReportModal from './EditServiceReportModal';
import ServiceFormModal from '@/Components/Services/ServiceFormModal.jsx';
import { usePage } from '@inertiajs/react';
import useUpdateService from '@/Hooks/Service/useUpdateService.js';

export const TimelineTable = ({ data, setIsShowLoading }) => {
  console.log('data', data);
  const { updateService } = useUpdateService();

  const [openModal, setOpenModal] = useState(false);
  const [openServiceModal, setOpenServiceModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const handleEdit = () => {
    setOpenModal(false);
    setOpenServiceModal(true);
  };

  const renderColumnHeader = (isHeader, hour) => {
    return (
      <th className="py-2 min-w-[100px] border border-[#BCBDC0]">
        {isHeader && (
          <span className="text-[12px] text-black">{formatTime(hour)}</span>
        )}
      </th>
    );
  };
  const renderColumns = (isHeader = false) => {
    const columns = [];
    for (let i = 8; i <= 20; i++) {
      columns.push(renderColumnHeader(isHeader, `${i}:00`));
      if (i < 20) {
        columns.push(renderColumnHeader(isHeader, `${i}:30`));
      }
    }
    return columns;
  };
  const getTaskClassNames = (task, index) => {
    const [time, indicator] = task?.service_time?.split(' ');
    let [startHour, startMin] = time?.split(':');
    startHour =
      Number(startHour) + (indicator?.toUpperCase() === 'PM' ? 12 : 0);
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
          zIndex: styles.zIndex,
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
            <span className="max-w-[140px] whitespace-nowrap overflow-hidden text-ellipsis">
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
    console.log('data task', data);
    if (data?.length > 0) {
      setTasks(data);
    }
  }, [data]);

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
      <ServiceFormModal
        openModal={openServiceModal}
        setOpenModal={setOpenServiceModal}
        service={selectedService}
        clients={usePage().props.clients}
        leaders={usePage().props.leaders}
        employees={usePage().props.employees}
        onSubmit={form => updateService(form)}
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
          </tr>
        </thead>
        <tbody className="relative bg-white">
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

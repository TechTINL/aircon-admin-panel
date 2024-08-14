import { Head } from '@inertiajs/react';
import DatePicker from 'react-date-picker';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineInfoCircle,
  AiOutlineLeft,
  AiOutlineRight,
} from 'react-icons/ai';
import TimelineTable from '@/Components/Services/TimelineTable';
import useDateNavigator from '@/Hooks/useDateNavigator';
import { IconButton } from '@material-tailwind/react';
import JobFilters from '../../Components/Services/JobFilters';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

function Timeline({ auth, users }) {
  const {
    currentDate,
    goToNextDay,
    goToPrevDay,
    goToNextMonth,
    goToPrevMonth,
    goToSelectedDate,
  } = useDateNavigator();

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Job Table" />
      <div className="flex flex-auto flex-col m-6 max-w-full">
        <div className="flex-row flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-zinc-800 text-3xl font-bold leading-10">
              Job Table
            </div>
            <button>
              <AiOutlineInfoCircle
                className="text-primary ml-2"
                size={26}
                fontWeight="bold"
              />
            </button>
          </div>
          <div className="flex items-center pr-4">
            <JobFilters />
          </div>
        </div>
        <div className="flex flex-1 mt-6 max-w-[80vw] relative">
          <div className="absolute flex items-center right-[35vw] z-50">
            <IconButton variant="text" onClick={goToPrevMonth}>
              <AiOutlineDoubleLeft fontWeight={900} />
            </IconButton>
            <IconButton variant="text" onClick={goToPrevDay}>
              <AiOutlineLeft fontWeight={900} />
            </IconButton>
            <DatePicker
              value={currentDate}
              onChange={goToSelectedDate}
              format="dd-MM-y"
              clearIcon={null}
              calendarClassName="z-50"
            />
            <IconButton variant="text" onClick={goToNextDay}>
              <AiOutlineRight fontWeight={900} />
            </IconButton>
            <IconButton variant="text" onClick={goToNextMonth}>
              <AiOutlineDoubleRight fontWeight={900} />
            </IconButton>
          </div>
          <TimelineTable data={users} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default Timeline;

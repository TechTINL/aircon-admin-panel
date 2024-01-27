import { useState, useCallback } from 'react';
import dayjs from 'dayjs';
import { router } from '@inertiajs/react';

const useDateNavigator = (initialDate = dayjs()) => {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const updateRouter = useCallback(newDate => {
    router.replace(`/services-time-line?date=${newDate.format('YYYY-MM-DD')}`);
  }, []);

  const goToNextDay = useCallback(() => {
    const nextDay = currentDate.add(1, 'day');
    setCurrentDate(nextDay);
    updateRouter(nextDay);
  }, [currentDate, updateRouter]);

  const goToPrevDay = useCallback(() => {
    const prevDay = currentDate.subtract(1, 'day');
    setCurrentDate(prevDay);
    updateRouter(prevDay);
  }, [currentDate, updateRouter]);

  const goToNextMonth = useCallback(() => {
    const nextMonth = currentDate.add(1, 'month');
    setCurrentDate(nextMonth);
    updateRouter(nextMonth);
  }, [currentDate, updateRouter]);

  const goToPrevMonth = useCallback(() => {
    const prevMonth = currentDate.subtract(1, 'month');
    setCurrentDate(prevMonth);
    updateRouter(prevMonth);
  }, [currentDate, updateRouter]);

  return {
    currentDate,
    goToNextDay,
    goToPrevDay,
    goToNextMonth,
    goToPrevMonth,
  };
};

export default useDateNavigator;

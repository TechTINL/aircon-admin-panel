import { useContext, useEffect } from 'react';
import CreateContractContext from '@/Context/CreateContractContext';
import dayjs from 'dayjs';
import { produce } from 'immer';

function useServiceDetail() {
  const {
    serviceRepeatOptions,
    selectedServiceRepeat,
    setSelectedServiceRepeat,
    dateOption,
    setDateOption,
    timeOptions,
    time,
    setTime,
    serviceCount,
    serviceData,
    setServiceData,
  } = useContext(CreateContractContext);

  const handleOnDateChange = value => {
    const d = new Date(value).toLocaleDateString();
    setDateOption(d);
  };

  useEffect(() => {
    setServiceData(
      produce(serviceData, draft => {
        draft.forEach((service, index) => {
          service.date = dayjs(dateOption)
            .add(index * selectedServiceRepeat, 'month')
            .format('YYYY-MM-DD');
          service.time = time;
        });
      })
    );
  }, [selectedServiceRepeat, dateOption, time]);

  return {
    serviceRepeatOptions,
    selectedServiceRepeat,
    setSelectedServiceRepeat,
    dateOption,
    setDateOption,
    handleOnDateChange,
    timeOptions,
    setTime,
    serviceCount,
  };
}

export default useServiceDetail;

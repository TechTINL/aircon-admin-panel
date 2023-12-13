import { useContext } from 'react';
import Service from '@/Components/Contract/Create/ServiceRequest/Service';
import Select from 'react-select';
import CreateContractContext from '@/Context/CreateContractContext';

function ServiceDetail() {
  const {
    serviceRepeatOptions,
    setSelectedServiceRepeat,
    selectedServiceRepeat,
    timeOptions,
    setTime,
    serviceCount,
  } = useContext(CreateContractContext);

  return (
    <div className="bg-white rounded-xl p-6 flex flex-col gap-2">
      <span className="font-bold text-[14px]">Service Detail</span>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 2xl:gap-4">
        <div className="flex flex-1 flex-col gap-2">
          <span className="font-bold text-[16px]">Repeats</span>
          <Select
            isClearable
            isSearchable
            options={serviceRepeatOptions}
            onChange={option => setSelectedServiceRepeat(option.value)}
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <span className="font-bold text-[16px]">Every</span>
          <div className="flex items-center gap-1">
            <div className="flex-1 w-full">
              <input
                type="number"
                value={selectedServiceRepeat}
                className="w-full h-full pl-8 rounded-xl"
                disabled
              />
            </div>
            <span className="text-[14px]">months</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <span className="font-bold text-[16px]">Time</span>
          <Select
            isClearable
            isSearchable
            options={timeOptions}
            onChange={option => setTime(option.value)}
          />
        </div>
      </div>
      <span className="font-bold text-[16px]">Service Request</span>
      {Array.from({ length: serviceCount }, (_, i) => (
        <Service key={i} index={i} />
      ))}
    </div>
  );
}

export default ServiceDetail;

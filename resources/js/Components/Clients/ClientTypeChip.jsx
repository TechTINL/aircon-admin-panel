import React, { useEffect, useState } from 'react';

function ClientTypeChip({ type }) {
  const [chipColor, setChipColor] = useState('');

  useEffect(() => {
    const getChipColor = () => {
      if (type === 'Condo / Apartment') {
        return 'bg-red-500';
      }
      if (type === 'HDB') {
        return 'bg-orange-500';
      }
      if (type === 'Landed') {
        return 'bg-amber-500';
      }
      if (type === 'Commercial (Office / Shop / Mgmt)') {
        return 'bg-yellow-500';
      }
      if (type === 'Industrial (Factory / Warehouse)') {
        return 'bg-lime-500';
      }
      if (type === 'Dormitory') {
        return 'bg-green-500';
      }
      return 'bg-primary';
    };

    setChipColor(getChipColor());
  }, []);

  return (
    <span
      className={`${chipColor} text-white text-[13px] mt-2 rounded-full text-center px-2 w-max`}
    >
      {type}
    </span>
  );
}

export default ClientTypeChip;

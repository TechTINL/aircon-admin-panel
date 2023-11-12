import { usePage } from '@inertiajs/react';

function ClientHeader() {
  const { client } = usePage().props;

  const getTitle = () => {
    if (client.parent_id == null) {
      return 'Client Detail';
    }
    return 'Sub Client Detail';
  };

  const getID = () => {
    return `ID - ${client.id}`;
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <h3 className="text-[#303030] font-bold text-2xl">{getTitle()}</h3>
      <div className="p-2 bg-[#D9D9D9] rounded-full">{getID()}</div>
    </div>
  );
}

export default ClientHeader;

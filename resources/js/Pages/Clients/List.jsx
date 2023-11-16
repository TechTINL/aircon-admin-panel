import { Head, Link } from '@inertiajs/react';
import { BiInfoCircle } from 'react-icons/bi';
import React, { useState } from 'react';
import { AiOutlineRightCircle } from 'react-icons/ai';
import { HiChevronUpDown } from 'react-icons/hi2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { CLIENTS_FILTERS } from '@/Helpers/constants';
import Pagination from '@/Components/Shared/Pagination';
import Divider from '@/Components/Ui/Divider';
import FilterDropdown from '@/Components/Services/FilterDropdown';
import NewClientModal from '@/Components/Clients/Modals/NewClientModal';
import Searchbar from '@/Components/Ui/Searchbar';
import SubClientPopover from '@/Components/Clients/List/SubClientPopover';
import ClientTypeChip from '@/Components/Clients/ClientTypeChip';

function List({ auth, clients }) {
  const [checkedClientsFilters, setCheckedClientsFilters] = useState([]);
  const [showSubClients, setShowSubClients] = useState(null);

  const handleClientsChecked = (name, value, checked) => {
    if (checked) {
      setCheckedClientsFilters([...checkedClientsFilters, value]);
    } else {
      setCheckedClientsFilters(checkedClientsFilters.filter(f => f !== value));
    }
  };

  const handleSubClients = index => {
    if (showSubClients === index) {
      setShowSubClients(null);
    } else {
      setShowSubClients(index);
    }
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Client List" />
      <div className="flex-auto flex flex-col m-6">
        <div className="text-zinc-800 text-3xl font-bold leading-10">
          Client List
        </div>
        <div className="flex flex-col flex-auto mt-6">
          <div className="flex flex-row justify-between">
            <Searchbar url="clients.index" />
            <div className="flex gap-4 items-end">
              <FilterDropdown
                name="clients"
                label="Clients"
                data={CLIENTS_FILTERS}
                checkedData={checkedClientsFilters}
                handleChecked={handleClientsChecked}
              />
              <NewClientModal />
            </div>
          </div>

          <div className="flex flex-1 mt-6 max-w-[80vw] relative">
            <div className="w-full h-[68vh] overflow-x-auto overflow-y-auto">
              <table className="w-full text-black relative">
                <thead className="relative bg-[#F0F0F0] rounded-full">
                  <tr>
                    <th className="px-4 py-2 min-w-[100px] text-[#455361]">
                      <div className="flex items-center">
                        <span className="text-primary">Client</span> &nbsp; | ID
                        <button>
                          <HiChevronUpDown />
                        </button>
                      </div>
                    </th>
                    <th className="px-4 py-2 sticky left-0 min-w-[150px] text-[#455361] text-left">
                      Contact Person
                    </th>
                    <th className="px-4 py-2 sticky left-0 min-w-[150px] text-[#455361] text-left">
                      Contact
                    </th>
                    <th className="px-4 py-2 sticky left-0 min-w-[150px] text-[#455361] text-left">
                      Address
                    </th>
                    <th className="px-4 py-2 sticky left-0 min-w-[150px] text-[#455361] text-left">
                      Sub-Clients
                    </th>
                    <th className="px-4 py-2 sticky left-0 min-w-max text-[#455361] text-left" />
                  </tr>
                </thead>
                <tbody className="relative">
                  {clients.data.map((item, i) => (
                    <tr
                      className={`text-[#455361] ${
                        i % 2 === 1 && 'bg-white rounded-full'
                      }`}
                      key={i}
                    >
                      <td className="px-4 py-4 my-1">
                        <div className="flex flex-col justify-center max-w-[200px]">
                          <b className="text-[15px]">{item.clientId.name}</b>
                          <span className="text-[12px]">
                            {item.clientId.id}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 my-1 max-w-[200px]">
                        <div className="flex flex-col justify-center">
                          <span className="text-[15px]">
                            {item.contactPerson.name}
                          </span>
                          <ClientTypeChip type={item.contactPerson.type} />
                        </div>
                      </td>
                      <td className="px-4 py-4 my-1 max-w-[200px]">
                        <div className="flex flex-col justify-center">
                          <span className="text-[15px]">{item.contact}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 my-1 max-w-[200px]">
                        <div className="flex flex-col justify-center">
                          <span className="text-[14px]">{item.address}</span>
                        </div>
                      </td>
                      <td
                        className={`z-[${i + 1}] px-4 py-4 my-1 max-w-[200px]`}
                      >
                        <div className="flex text-primary flex-row items-center relative">
                          <span className="text-primary text-[14px]">
                            {item.subClients.length}
                          </span>
                          <button
                            className={`z-${i + 1} ml-2`}
                            onClick={() => handleSubClients(i)}
                          >
                            <BiInfoCircle size={20} />
                          </button>
                          <SubClientPopover
                            show={showSubClients === i}
                            subClients={item.subClients}
                            onClose={() => setShowSubClients(null)}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-4 my-1">
                        <Link
                          href={route('clients.profile', item.clientId.id)}
                          method="get"
                          as="button"
                          type="button"
                          className="flex flex-col justify-center"
                        >
                          <AiOutlineRightCircle
                            size={20}
                            className="text-secondary"
                          />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Divider />

          <div className="flex flex-initial justify-between items-center mt-4">
            <Pagination links={clients.links} meta={clients.meta} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default List;

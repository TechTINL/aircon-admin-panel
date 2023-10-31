import { Head, Link } from '@inertiajs/react';
import { BiInfoCircle, BiSearch } from 'react-icons/bi';
import { useState } from 'react';
import { AiFillCloseCircle, AiOutlineRightCircle } from 'react-icons/ai';
import { HiChevronUpDown } from 'react-icons/hi2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { clientFilters } from '@/Helpers/constants';
import Pagination from '@/Components/Shared/Pagination';
import Divider from '@/Components/Ui/Divider';
import FilterDropdown from '@/Components/Services/FilterDropdown';
import TextInput from '@/Components/TextInput';
import NewClientModal from '@/Components/Clients/Modals/NewClientModal';

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
          {/* Search & Filters */}
          <div className="flex flex-row justify-between">
            <div className="flex items-center relative">
              <TextInput
                className="w-full h-full pl-8 rounded-xl"
                placeholder="Search"
              />
              <BiSearch className="text-gray-500 absolute text-[20px] left-2" />
            </div>
            <div className="flex gap-4 items-end">
              <FilterDropdown
                name="clients"
                label="Clients"
                data={clientFilters}
                checkedData={checkedClientsFilters}
                handleChecked={handleClientsChecked}
              />
              <NewClientModal />
            </div>
          </div>
          {/* Search & Filters */}

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
                    <th className="px-4 py-2 sticky left-0 min-w-[150px] text-[#455361] text-left">
                      Billing Address
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
                          <span
                            className={`${
                              item.contactPerson.type === 'Residential'
                                ? 'bg-primary'
                                : 'bg-secondary'
                            } text-white text-[13px] mt-2 rounded-full text-center px-2 w-max`}
                          >
                            {item.contactPerson.type}
                          </span>
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
                          <div
                            className={`${
                              i === showSubClients ? 'flex flex-col' : 'hidden'
                            } absolute w-max text-white bg-[#838383] max-h-[200px] top-5 left-4 rounded-sm p-2 z-[${
                              i + 400
                            }]`}
                          >
                            <button
                              onClick={() => setShowSubClients(null)}
                              className="self-end"
                            >
                              <AiFillCloseCircle className="text-white" />
                            </button>
                            <span>Sub Client:</span>
                            {item.subClients.map(subClient => (
                              <span className="p-1" key={subClient.id}>
                                {subClient.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 my-1 max-w-[200px]">
                        <div className="flex flex-col justify-center">
                          <span className="text-[14px]">
                            {item.billingAddress}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4 my-1">
                        <Link
                          href="/client-details"
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

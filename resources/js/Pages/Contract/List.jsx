import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { BiChevronDown, BiFilter, BiSearch } from 'react-icons/bi';
import { useState } from 'react';
import { AiOutlineRightCircle } from 'react-icons/ai';
import { HiChevronUpDown } from 'react-icons/hi2';
import { CONTRACT_CLIENT_FILTERS } from '@/Helpers/constants';
import Divider from '@/Components/Ui/Divider';
import TextInput from '@/Components/TextInput';
import Dropdown from '@/Components/Dropdown';
import { MdAdd } from 'react-icons/md';

function List({ auth, contracts }) {
  const { data, links, meta } = contracts;

  const [checkedClientFilter, setCheckedClientFilter] = useState(
    CONTRACT_CLIENT_FILTERS[0]
  );

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Client List" />
      <div className="flex-auto flex flex-col m-6">
        <div className="text-zinc-800 text-3xl font-bold leading-10">
          Contract List
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
              <Dropdown>
                <Dropdown.Trigger>
                  <span className="inline-flex rounded-md">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-border-gray text-sm leading-4 font-medium rounded-full text-border-gray bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                    >
                      <BiFilter size={20} fontWeight={800} />
                      <span className="px-2 font-bold text-[14px]">
                        {checkedClientFilter.label}
                      </span>
                      <BiChevronDown size={20} fontWeight={800} />
                    </button>
                  </span>
                </Dropdown.Trigger>
                <Dropdown.Content>
                  <div className="flex flex-col">
                    {CONTRACT_CLIENT_FILTERS.map((filter, i) => (
                      <button
                        key={i}
                        onClick={() => setCheckedClientFilter(filter)}
                        className="flex items-start p-2"
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </Dropdown.Content>
              </Dropdown>
              <Link
                href="/contracts/create"
                as="button"
                type="button"
                className="flex gap-1 items-center bg-primary hover:bg-green-300 text-white font-bold py-2 px-4 rounded-xl"
              >
                <MdAdd size={22} />
                Add New Contract
              </Link>
            </div>
          </div>
          {/* Search & Filters */}

          <div className="flex flex-1 mt-6 max-w-[80vw] relative">
            <div className="w-full h-[68vh] overflow-x-auto overflow-y-auto">
              <table className="w-full text-black relative">
                <thead className="relative bg-[#F0F0F0] rounded-full">
                  <tr className="text-[#455361] font-[400]">
                    <th className="px-4 py-2">
                      <div className="flex items-center">
                        <span>Contract Name</span>
                        <button>
                          <HiChevronUpDown />
                        </button>
                      </div>
                    </th>
                    <th className="px-4 py-2 text-left">Address</th>
                    <th className="px-4 py-2">
                      <div className="flex items-center">
                        <span>Start Date</span>
                        <button>
                          <HiChevronUpDown />
                        </button>
                      </div>
                    </th>
                    <th className=" px-4 py-2">
                      <div className="flex items-center">
                        <span>Due Date</span>
                        <button>
                          <HiChevronUpDown />
                        </button>
                      </div>
                    </th>
                    <th className="px-4 py-2 max-w-[80px]">Unassigned SR</th>
                    <th className="px-4 py-2 max-w-[80px]">Assigned SR</th>
                    <th className="px-4 py-2 max-w-[50px]">Total SR</th>
                    <th className="px-4 py-2">Created Date</th>
                    <th className="px-4 py-2" />
                    {/* Add table header columns for other days */}
                  </tr>
                </thead>
                <tbody className="relative">
                  {data.map((item, i) => (
                    <tr
                      className={`text-[#455361] text-[14px] ${
                        i % 2 === 1 && 'bg-white rounded-full'
                      }`}
                      style={{
                        borderRadius: '100px',
                      }}
                      key={i}
                    >
                      <td className="px-4 py-2 my-1 max-w-[100px]">
                        <div className="flex flex-col justify-center">
                          {item?.subClient ? (
                            <span className="text-gray-600 text-[13px]">
                              {item?.client?.name} /{' '}
                              <span className="text-secondary">
                                {item?.subClient?.name}
                              </span>
                            </span>
                          ) : (
                            <span className="text-secondary">
                              {item?.client?.name}
                            </span>
                          )}
                          <span className="text-black font-bold">
                            {item?.title}
                          </span>
                          <span className="text-[12px]">
                            Contract ID: <b>{item?.contract_number}</b>
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-2 w-[180px]">
                        {item?.client?.address}
                      </td>
                      <td className="px-4 py-2 max-w-[200px]">
                        {item.start_date}
                      </td>
                      <td className="px-4 py-2 max-w-[200px]">
                        {item.end_date}
                      </td>
                      <td className="px-4 py-2 max-w-[50px] text-center">
                        {item.unassigned_service_count}
                      </td>
                      <td className="px-4 py-2 max-w-[50px] text-center">
                        {item.assigned_service_count}
                      </td>
                      <td className="px-4 py-2 max-w-[50px] text-center">
                        {item.service_count}
                      </td>
                      <td className="px-4 py-2 max-w-[200px] text-center">
                        {item?.created_at}
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
            {/* <Pagination links={contracts?.links} meta={contracts?.meta} /> */}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default List;

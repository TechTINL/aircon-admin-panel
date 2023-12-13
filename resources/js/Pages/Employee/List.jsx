import { Head, Link } from '@inertiajs/react';
import { BiFilter, BiInfoCircle, BiSearch, BiUserCircle } from 'react-icons/bi';
import { useState } from 'react';
import { HiChevronUpDown } from 'react-icons/hi2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
  EMPLOYEE_JOB_POSITION_FILTERS,
  EMPLOYEE_STATUS_FILTERS,
  JOB_STATUS,
} from '@/Helpers/constants';
import Divider from '@/Components/Ui/Divider';
import TextInput from '@/Components/TextInput';
import { MdAdd } from 'react-icons/md';
import { DropdownSelect } from '@/Components/Common/DropdownSelect';
import ExportData from '@/Components/Services/ExportData';
import { PiNotebook } from 'react-icons/pi';
import EmployeeDetailModal from '@/Components/Employee/Modals/EmployeeDetailModal';
import useGetEmployee from '@/Hooks/Employee/useGetEmployee';
import TableRow from '@/Components/Ui/Table/TableRow';
import Pagination from '@/Components/Shared/Pagination';

function List({ auth }) {
  const [checkedJobPositionFilters, setCheckedJobPositionFilters] = useState(
    []
  );
  const [selectedStatusFilter, setSelectedStatusFilter] = useState(
    EMPLOYEE_STATUS_FILTERS[0][0]
  );
  const [openEmployeeDetailModal, setOpenEmployeeDetailModal] = useState(false);
  const [openApplyLeaveModal, setOpenApplyLeaveModal] = useState(false);

  const handleStatusFilterSelect = item => {
    setSelectedStatusFilter(item);
  };

  const handleAddLeave = () => {
    setOpenEmployeeDetailModal(false);
    setOpenApplyLeaveModal(true);
  };

  const handleCheckJobPositionFilters = (item, checked) => {
    if (checked) {
      setCheckedJobPositionFilters([...checkedJobPositionFilters, item.value]);
    } else {
      setCheckedJobPositionFilters(
        checkedJobPositionFilters.filter(filter => filter !== item.value)
      );
    }
  };
  const { employees, links, meta } = useGetEmployee();

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Client List" />
      <EmployeeDetailModal
        openModal={openEmployeeDetailModal}
        setOpenModal={setOpenEmployeeDetailModal}
        handleAddLeave={handleAddLeave}
      />
      <div className="flex-auto flex flex-col m-6">
        <div className="flex justify-between">
          <div className="text-zinc-800 text-3xl font-bold leading-10">
            Employee
          </div>
          <ExportData />
        </div>
        <div className="flex mt-2 gap-4">
          <button className="px-4 gap-2 rounded-full py-1 bg-[#454FA23D] flex items-center">
            <BiUserCircle size={20} />
            Employee List
          </button>
          <button className="px-4 gap-2 rounded-full py-1 border-[2px] border-[#454FA23D] flex items-center">
            <PiNotebook size={20} />
            On-Leave Schedule
          </button>
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
              <DropdownSelect
                label="Job Position"
                withCheckbox
                items={EMPLOYEE_JOB_POSITION_FILTERS}
                selectedItem={checkedJobPositionFilters}
                handleItemSelect={handleCheckJobPositionFilters}
                prefixIcon={<BiFilter size={20} fontWeight={800} />}
              />

              <DropdownSelect
                items={EMPLOYEE_STATUS_FILTERS}
                selectedItem={selectedStatusFilter}
                handleItemSelect={handleStatusFilterSelect}
                prefixIcon={<BiFilter size={20} fontWeight={800} />}
              />

              <button
                type="button"
                className="flex gap-1 items-center border text-primary border-primary font-bold py-2 px-4 rounded-xl"
                onClick={() => setOpenApplyLeaveModal(true)}
              >
                <MdAdd size={22} />
                Apply Leave
              </button>
              <Link
                href={route('employee.create')}
                method="get"
                type="button"
                className="flex gap-1 items-center bg-primary text-white font-bold py-2 px-4 rounded-xl"
              >
                <MdAdd size={22} />
                New Employee
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
                        <span>Employee Name | Phone Num</span>
                        <button>
                          <HiChevronUpDown />
                        </button>
                      </div>
                    </th>
                    <th className="px-4 py-2 text-left">Job Position</th>
                    <th className="px-4 py-2 text-left">Team</th>
                    <th className="px-4 py-2 text-left">Organisation</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left min-w-[100px]">
                      Last Online
                    </th>
                    <th className="px-4 py-2" />
                    {/* Add table header columns for other days */}
                  </tr>
                </thead>
                <tbody className="relative">
                  {employees.map((item, i) => (
                    <TableRow index={i} key={item.id}>
                      <td className="px-4 py-2 my-1 max-w-[100px]">
                        <div className="flex flex-col justify-center">
                          <span className="text-black font-bold">
                            {item.name}
                          </span>
                          <span className="text-[12px]">{item.phone}</span>
                        </div>
                      </td>

                      <td className="px-4 py-2 w-[180px]">{item.role}</td>
                      <td className="px-4 py-2 max-w-[200px]">{item.team}</td>
                      <td className="px-4 py-2 max-w-[200px]">
                        {item.organization || '-'}
                      </td>
                      <td
                        className={`px-4 py-2 max-w-[50px] text-primary ${
                          item.status === 'on_leave' && 'text-red-600'
                        }`}
                      >
                        {JOB_STATUS[item.status]}
                      </td>
                      <td className="px-4 py-2 max-w-[100px]">
                        {item.lastOnline}
                      </td>
                      <td className="px-4 py-4 my-1">
                        <button
                          className="flex flex-col justify-center"
                          onClick={() => setOpenEmployeeDetailModal(true)}
                        >
                          <BiInfoCircle size={20} className="text-secondary" />
                        </button>
                      </td>
                    </TableRow>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Divider />

          <div className="flex flex-initial justify-between items-center mt-4">
            <Pagination links={links} meta={meta} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default List;

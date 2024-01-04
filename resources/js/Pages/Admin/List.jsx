import { Head, Link } from '@inertiajs/react';
import { BiSearch } from 'react-icons/bi';
import { HiChevronUpDown } from 'react-icons/hi2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { JOB_POSTION } from '@/Helpers/constants';
import Divider from '@/Components/Ui/Divider';
import TextInput from '@/Components/TextInput';
import { MdAdd } from 'react-icons/md';
import { BsPencilSquare } from 'react-icons/bs';
import Breadcrumb from '@/Components/Common/Breadcrumb';
import useGetAdmin from '@/Hooks/Admin/useGetAdmin';
import Pagination from '@/Components/Shared/Pagination';
import TableRow from '@/Components/Ui/Table/TableRow';
import ApplyLeaveModal from '@/Components/Employee/Modals/ApplyLeaveModal';
import { LuCalendarPlus } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import useDeleteAdmin from '@/Hooks/Admin/useDeleteAdmin';
import { Checkbox, IconButton } from '@material-tailwind/react';

function List({ auth, breadcrumbs }) {
  const { admins, links, meta, getAdmin } = useGetAdmin();
  const { deleteAdmin } = useDeleteAdmin();
  const [openModal, setOpenModal] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState({
    id: null,
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const deletedParam = queryParams.get('deleted');
    setShowDeleted(deletedParam === '1');
  }, []);

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Admin List" />
      <ApplyLeaveModal
        user={selectedAdmin}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <div className="flex-auto flex flex-col m-6">
        <div className="flex justify-between">
          <div className="text-zinc-800 text-3xl font-bold leading-10">
            Admin List
          </div>
        </div>
        <Breadcrumb breadcrumbs={breadcrumbs} />

        <div className="flex flex-col flex-auto mt-6">
          {/* Search & Filters */}
          <div className="flex flex-row justify-between">
            <div className="flex items-center relative">
              <TextInput
                className="w-full h-full pl-8 rounded-xl"
                placeholder="Search"
                icon={<BiSearch size={22} />}
              />
            </div>
            {auth.permissions.includes('admin.any') && (
              <div className="flex gap-4 items-end">
                <Checkbox
                  color="blue"
                  label="Show Deleted"
                  checked={showDeleted}
                  onChange={event => {
                    setShowDeleted(event.target.checked);
                    getAdmin(event.target.checked);
                  }}
                />
                <Link
                  href="/admin/create"
                  method="get"
                  type="button"
                  className="flex gap-1 items-center bg-primary text-white font-bold py-2 px-4 rounded-xl"
                >
                  <MdAdd size={22} />
                  New Admin
                </Link>
              </div>
            )}
          </div>
          {/* Search & Filters */}

          <div className="flex flex-1 mt-6 max-w-[80vw] relative">
            <div className="w-full overflow-x-auto overflow-y-auto">
              <table className="w-full text-black relative">
                <thead className="relative bg-[#F0F0F0] rounded-full">
                  <tr className="text-[#455361] font-[400]">
                    <th className="px-4 py-2">
                      <div className="flex items-center">
                        <span>Admin Name</span>
                        <button>
                          <HiChevronUpDown />
                        </button>
                      </div>
                    </th>
                    <th className="px-4 py-2 text-left">Phone Number</th>
                    <th className="px-4 py-2 text-left">Role</th>
                    <th className="px-4 py-2 text-left">Last Online</th>
                    <th className="px-4 py-2 text-left">Joined Since</th>
                    <th className="px-4 py-2 max-w-[40px]" />
                  </tr>
                </thead>
                <tbody className="relative">
                  {admins.map((item, i) => (
                    <TableRow index={i} key={item.id}>
                      <td className="px-4 py-2 my-1">{item.name}</td>
                      <td className="px-4 py-2">{item.phone}</td>
                      <td className="px-4 py-2">{JOB_POSTION[item.role]}</td>
                      <td className="px-4 py-2">{item.lastOnline}</td>
                      <td className="px-4 py-2">{item.joined}</td>
                      <td className="px-4 py-4 my-1 flex gap-4">
                        <button
                          type="button"
                          className="flex flex-col justify-center"
                          onClick={() => {
                            setOpenModal(true);
                            setSelectedAdmin(item);
                          }}
                        >
                          <LuCalendarPlus size={22} />
                        </button>
                        <Link
                          href={route('admin.edit', item.id)}
                          method="get"
                          as="button"
                          type="button"
                          className="flex flex-col justify-center"
                        >
                          <BsPencilSquare size={20} />
                        </Link>
                        <IconButton
                          variant="text"
                          color="red"
                          onClick={() => deleteAdmin(item.id)}
                        >
                          <FaRegTrashCan size={20} />
                        </IconButton>
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

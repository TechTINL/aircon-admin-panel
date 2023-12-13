import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { MdAddCircleOutline } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import TaskTemplateModal from '@/Components/Template/Task/TaskTemplateModal';
import { IconButton } from '@material-tailwind/react';
import DeleteConfirmationModal from '../../../Components/Template/Modals/DeleteConfirmationModal';

function List({ auth, taskTemplates }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const onEdit = t => {
    setSelectedTask(t);
    setOpenTaskModal(true);
  };

  const onDelete = () => {
    router.delete(`/task-templates/${selectedTask?.id}`, {
      onSuccess: () => {
        setOpenDeleteModal(false);
      },
      onError: error => {
        setOpenDeleteModal(false);
      },
    });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Task List" />
      <TaskTemplateModal
        task={selectedTask}
        openModal={openTaskModal}
        setOpenModal={setOpenTaskModal}
      />
      <DeleteConfirmationModal
        title="Task"
        content={<span className="text-[#455361]">{selectedTask?.name}</span>}
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        onDelete={onDelete}
      />
      <div className="flex flex-auto flex-col m-6 gap-6 max-w-full">
        <div className="text-zinc-800 text-3xl font-bold leading-10">
          Task Template
        </div>

        <div className="flex flex-col">
          {/* Search & Filters */}
          <div className="flex flex-row justify-between">
            <div className="flex items-center relative">
              {/* <TextInput */}
              {/*  className="w-full h-full pl-8 rounded-xl" */}
              {/*  placeholder="Search" */}
              {/* /> */}
              {/* <BiSearch className="text-gray-500 absolute text-[20px] left-2" /> */}
            </div>
            <button
              onClick={() => onEdit(null)}
              className="flex text-white py-2 px-4 justify-center items-center gap-2 bg-primary rounded-xl"
            >
              <MdAddCircleOutline size={20} />
              <span>New Task Template</span>
            </button>
          </div>
        </div>

        <div className="flex flex-1 max-w-[80vw] relative">
          <div className="w-full h-[68vh] overflow-x-auto overflow-y-auto">
            <table className="w-full text-black relative">
              <thead className="relative bg-[#F0F0F0] rounded-full">
                <tr>
                  <th className="px-4 py-2 sticky left-0 min-w-[150px] text-[#455361] text-left">
                    Task Name
                  </th>
                  <th className="px-4 py-2 max-w-max" />
                </tr>
              </thead>
              <tbody className="relative">
                {taskTemplates.map((task, i) => (
                  <tr
                    className={`text-[#455361] ${
                      i % 2 === 1 && 'bg-white rounded-full'
                    } items-center`}
                    style={{
                      borderRadius: '100px',
                    }}
                    key={i}
                  >
                    <td className="px-4 py-2 my-1">{task.name}</td>
                    <td className="py-2 my-1 flex items-center justify-center gap-4">
                      <IconButton
                        variant="text"
                        type="button"
                        onClick={() => onEdit(task)}
                      >
                        <AiOutlineEdit className="text-primary" size={20} />
                      </IconButton>
                      <IconButton
                        variant="text"
                        onClick={() => {
                          setOpenDeleteModal(true);
                          setSelectedTask(task);
                        }}
                      >
                        <RiDeleteBin6Line color="red" size={20} />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default List;

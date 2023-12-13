import DatePicker from '@/Components/Common/DatePicker';
import Modal from '@/Components/Modal';
import { AiFillCloseCircle } from 'react-icons/ai';
import useApplyLeave from '@/Hooks/useApplyLeave';
import TextInput from '@/Components/TextInput';

function ApplyLeaveModal({ user, openModal, setOpenModal }) {
  const { data, setData, handleSubmit } = useApplyLeave(user, setOpenModal);

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} maxWidth="4xl">
      <div className="flex flex-col p-8 text-black gap-4">
        <div className="flex justify-between">
          <div className="text-zinc-800 text-3xl font-bold leading-10">
            Apply Leave
          </div>
          <button onClick={() => setOpenModal(false)}>
            <AiFillCloseCircle className="text-border-gray text-4xl" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <b className="text-[16px]">Employee Name</b>
          <div className="px-4 py-2 border border-gray-900 rounded-lg hover:cursor-not-allowed">
            {user.name}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <b className="text-[16px]">Leave Date</b>
              <DatePicker
                label="Leave Date"
                classes="rounded-xl"
                onChange={value => setData('leave_date', value)}
                value={data.leave_date}
                isRange
              />
              <p className="text-sm text-gray-600">
                To select single date, click on the date twice
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <b className="text-[16px]">Reason</b>
              <TextInput
                label="Reason"
                placeholder="Reason"
                onChange={e => setData('reason', e.target.value)}
                value={data.reason}
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-primary py-2 w-full max-w-[600px] rounded-xl text-white font-bold"
            >
              Apply Leave
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ApplyLeaveModal;

import { AiFillCloseCircle } from 'react-icons/ai';

function SubClientPopover({ show, subClients, onClose }) {
  return (
    <div
      className={`${
        show ? 'flex flex-col' : 'hidden'
      } absolute w-max text-white bg-[#838383] max-h-[200px] top-5 left-4 rounded-sm p-2 z-10`}
    >
      <button type="button" onClick={onClose} className="self-end">
        <AiFillCloseCircle className="text-white" />
      </button>
      <span>Sub Client:</span>
      {subClients.map(subClient => (
        <span className="p-1" key={subClient.id}>
          {subClient.name}
        </span>
      ))}
    </div>
  );
}

export default SubClientPopover;

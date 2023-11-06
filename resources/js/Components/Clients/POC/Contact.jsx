import { AiOutlineMail } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import DeletePOCModal from '@/Components/Clients/Modals/DeletePOCModal';

function Contact({ data: contact, index }) {
  return (
    <div key={index}>
      <div className="flex justify-between items-start pt-4">
        <div>
          <span className="text-md text-[#00B4AD] font-bold py-2">
            {contact.name || `POC ${key + 1}`}
          </span>
          <div className="flex items-center gap-2 py-2">
            <BsTelephone size={18} />
            <span>{contact.phone || ''}</span>
          </div>
          <div className="flex items-center gap-2">
            <AiOutlineMail size={18} />
            <span>{contact.email || ''}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-primary">
          <DeletePOCModal data={contact} />
        </div>
      </div>
    </div>
  );
}

export default Contact;

import { BsPencilSquare } from 'react-icons/bs';
import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import ServiceFormModal from '@/Components/Services/ServiceFormModal';

function EditServiceButton({ clients, service, children }) {
  const [openModel, setOpenModel] = useState(false);

  return (
    <div>
      <Button
        variant="outlined"
        className="text-md font-extrabold flex items-center gap-3"
        color="teal"
        onClick={() => setOpenModel(true)}
      >
        <BsPencilSquare size={24} />
        {children}
      </Button>
      <ServiceFormModal
        openModal={openModel}
        setOpenModal={setOpenModel}
        clients={clients}
        service={service}
      />
    </div>
  );
}

export default EditServiceButton;

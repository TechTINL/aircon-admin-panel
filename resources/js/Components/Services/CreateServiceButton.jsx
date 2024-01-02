import { BsPencilSquare } from 'react-icons/bs';
import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import ServiceFormModal from '@/Components/Services/ServiceFormModal';
import useCreateService from '@/Hooks/Service/useCreateService';

function CreateServiceButton({ clients, leaders, employees, children }) {
  const [openModel, setOpenModel] = useState(false);
  const { createService } = useCreateService();

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
        leaders={leaders}
        employees={employees}
        onSubmit={data => createService(data)}
      />
    </div>
  );
}

export default CreateServiceButton;

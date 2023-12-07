import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Radio,
} from '@material-tailwind/react';
import { useState } from 'react';

function SelectTemplateModal({
  openModal,
  setOpenModal,
  templateOptions: templates,
  handleSave,
}) {
  const [selectedTemplate, setSelectedTemplate] = useState('');

  return (
    <Dialog open={openModal} handler={() => setOpenModal(!openModal)}>
      <DialogHeader>Templates</DialogHeader>
      <DialogBody>
        <div className="flex flex-col gap-4">
          {templates?.map(template => (
            <Radio
              name="title"
              key={template?.id}
              label={template?.name}
              color="teal"
              onChange={() => setSelectedTemplate(template)}
            />
          ))}
          <Button
            type="button"
            color="teal"
            onClick={() => {
              handleSave(selectedTemplate);
              setOpenModal(false);
            }}
            className="mx-10 mt-12"
          >
            Choose
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
}

export default SelectTemplateModal;

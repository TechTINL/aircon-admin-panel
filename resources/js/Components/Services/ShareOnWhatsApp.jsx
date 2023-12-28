import { BsSendFill } from 'react-icons/bs';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  List,
  ListItem,
} from '@material-tailwind/react';
import React, { useState } from 'react';

function ShareOnWhatsApp({ pocs, serviceNumber }) {
  const [open, setOpen] = useState(0);
  const handleOpen = value => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <div>
      <Accordion open={open === 1}>
        <ListItem className="p-0" selected={open === 1}>
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className="py-2 flex justify-center font-[1000] text-[18px] text-whatsapp-color hover:text-whatsapp-color border-whatsapp-color border-2 rounded-lg bg-blue-gray-50"
          >
            <BsSendFill size={15} className="mr-2" />
            <span>Share on WhatsApp</span>
          </AccordionHeader>
        </ListItem>
        <AccordionBody className="py-1">
          <List className="p-0">
            {pocs.map(poc => (
              <ListItem
                className="flex flex-col gap-2 hover:border-2 border-primary"
                key={poc.id}
                onClick={() => {
                  window.open(
                    `https://api.whatsapp.com/send?phone=${
                      poc?.phone
                    }&text=Hello%20${
                      poc?.name
                    },Here%20is%20the%20link%20to%20your%20service%20report:%20${
                      import.meta.env.VITE_APP_URL
                    }/report/download?service_number=${serviceNumber}`
                  );
                }}
              >
                <div className="flex justify-between w-full">
                  <span className="text-teal-500 text-sm font-semibold">
                    {poc?.name}
                  </span>
                  <span className="text-right text-gray-600 text-xs font-normal">
                    POC {poc?.id}
                  </span>
                </div>
                <div className="flex justify-start w-full">
                  <p>{poc?.phone}</p>
                </div>
              </ListItem>
            ))}
          </List>
        </AccordionBody>
      </Accordion>
    </div>
  );
}

export default ShareOnWhatsApp;

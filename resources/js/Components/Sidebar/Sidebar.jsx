import { Link, usePage } from '@inertiajs/react';
import { DashboardIcon } from '@/Components/Shared/assets/Icons';
import ApplicationLogo from '@/Components/ApplicationLogo';
import SidebarContext from '@/Context/SidebarContext';
import NavItem from '@/Components/Sidebar/NavItem';
import { useContext, useState } from 'react';
import {
  PiBriefcaseLight,
  PiFolder,
  PiUsersFourLight,
  PiWrenchLight,
} from 'react-icons/pi';
import { FiTrendingUp } from 'react-icons/fi';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from '@material-tailwind/react';

function Sidebar({ children }) {
  const { url } = usePage();
  const { isSidebarCollapsed } = useContext(SidebarContext);

  const isDashboardActive = url.includes('/dashboard');
  const isServiceTimelineActive = url.includes('/services-time-line');
  const isServiceReportActive = url.includes('/service-report');

  const [open, setOpen] = useState(0);
  const [templateOpen, setTemplateOpen] = useState(0);

  const handleOpen = value => {
    setOpen(open === value ? 0 : value);
  };

  const handleTemplateOpen = value => {
    setTemplateOpen(templateOpen === value ? 0 : value);
  };

  return (
    <div
      className={`z-50 flex h-auto ${
        isSidebarCollapsed ? 'w-[7%]' : 'w-1/6'
      } flex-col border-r bg-white pt-4 shadow-xl shadow-right`}
    >
      {!isSidebarCollapsed && (
        <div className="flex justify-center">
          <ApplicationLogo className="block h-20 w-auto fill-current text-gray-800" />
        </div>
      )}
      <div className="lg:mx-4 md:mx-2 lg:mt-8">
        <NavItem
          text="Dashboard"
          isActive={isDashboardActive}
          url="/dashboard"
          icon={<DashboardIcon className="lg:mx-4 md:mx-1" />}
        />
        <NavItem
          text="Task Table"
          isActive={isServiceTimelineActive}
          url="/services-time-line"
          icon={<PiBriefcaseLight size={22} className="lg:mx-4 md:mx-1" />}
        />
        <NavItem
          text="Service Report"
          isActive={isServiceReportActive}
          url="/service-report"
          icon={<PiWrenchLight size={22} className="lg:mx-4 md:mx-1" />}
        />
        <List>
          <Accordion
            open={open === 1}
            icon={
              <FaChevronDown
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 1 ? 'rotate-180' : ''
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <PiFolder className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Data
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <Link href="/clients">
                  <ListItem>
                    <ListItemPrefix>
                      <FaChevronRight strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Client
                  </ListItem>
                </Link>
                <Link href="/contracts">
                  <ListItem>
                    <ListItemPrefix>
                      <FaChevronRight strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Contract
                  </ListItem>
                </Link>
                <Link href="/employee">
                  <ListItem>
                    <ListItemPrefix>
                      <FaChevronRight strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Employee
                  </ListItem>
                </Link>
                <Link href="/admin">
                  <ListItem>
                    <ListItemPrefix>
                      <FaChevronRight strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Admin
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>
        </List>
        <List>
          <Accordion
            open={templateOpen === 1}
            icon={
              <FaChevronDown
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  templateOpen === 1 ? 'rotate-180' : ''
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={templateOpen === 1}>
              <AccordionHeader
                onClick={() => handleTemplateOpen(1)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <PiUsersFourLight className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Template
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <Link href="/task-templates">
                  <ListItem>
                    <ListItemPrefix>
                      <FaChevronRight strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Task
                  </ListItem>
                </Link>
                <Link href="/service-templates">
                  <ListItem>
                    <ListItemPrefix>
                      <FaChevronRight strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Service
                  </ListItem>
                </Link>
                <Link href="/contract-templates">
                  <ListItem>
                    <ListItemPrefix>
                      <FaChevronRight strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Contract
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>
        </List>
        <NavItem
          text="Manage GST"
          isActive={url.includes('/manage-gst')}
          url="/manage-gst"
          icon={<FiTrendingUp size={22} className="lg:mx-4 md:mx-1" />}
        />
      </div>
      {children}
    </div>
  );
}

export default Sidebar;

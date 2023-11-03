import { usePage } from '@inertiajs/react';
import { DashboardIcon } from '@/Components/Shared/assets/Icons';
import ApplicationLogo from '@/Components/ApplicationLogo';
import SidebarContext from '@/Context/SidebarContext';
import NavItem from '@/Components/Sidebar/NavItem';
import { useContext } from 'react';
import { PiBriefcase, PiBriefcaseLight, PiFolder, PiFolderThin, PiUsersFourLight, PiWrenchLight } from 'react-icons/pi';
import { BiFolder, BiWrench } from 'react-icons/bi';
import { FiTrendingUp } from 'react-icons/fi';

function Sidebar({ children }) {
  const { url } = usePage();
  const { isSidebarCollapsed } = useContext(SidebarContext);

  const isDashboardActive = url.includes('/dashboard');
  const isServiceTimelineActive = url.includes('/services-time-line');
  const isServiceReportActive = url.includes('/service-report');
  const isClientActive = url.includes('/clients');
  const isTemplateActive = url.includes('/template');

  return (
    <div
      className={`z-50 flex h-auto ${isSidebarCollapsed ? 'w-[7%]' : 'w-1/6'
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
        <div className='flex'>
          <PiFolder size={22} className="text-gray-600 lg:mx-4 md:mx-1" />
          <div className='flex flex-col'>
            <span>Data</span>
            <NavItem
              text="Client"
              isActive={isClientActive}
              url="/clients"
            />
            <NavItem
              text="Contract"
              isActive={url.includes('/contract')}
              url="/contract"
            />
            <NavItem
              text="Employee"
              isActive={url.includes('/employee')}
              url="/employee"
            />
            <NavItem
              text="Admin"
              isActive={url.includes('/admin')}
              url="/admin"
            />
          </div>
        </div>

        <NavItem
          text="Template"
          isActive={url.includes('/template')}
          url="/template"
          icon={<PiUsersFourLight size={22} className="lg:mx-4 md:mx-1" />}
        />

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

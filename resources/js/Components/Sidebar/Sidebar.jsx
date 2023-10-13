import { usePage } from '@inertiajs/react';
import { DashboardIcon } from '@/Components/Shared/assets/Icons';
import ApplicationLogo from '@/Components/ApplicationLogo';
import SidebarContext from '@/Context/SidebarContext';
import NavItem from '@/Components/Sidebar/NavItem';
import { useContext } from 'react';

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
      className={`z-50 flex h-screen ${
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
          text="Job Table"
          isActive={isServiceTimelineActive}
          url="/services-time-line"
          icon={<DashboardIcon className="lg:mx-4 md:mx-1" />}
        />
        <NavItem
          text="Service Report"
          isActive={isServiceReportActive}
          url="/job-table"
          icon={<DashboardIcon className="lg:mx-4 md:mx-1" />}
        />
        <NavItem
          text="Clients"
          isActive={isClientActive}
          url="/clients"
          icon={<DashboardIcon className="lg:mx-4 md:mx-1" />}
        />
        <NavItem
          text="Template"
          isActive={isTemplateActive}
          url="/job-table"
          icon={<DashboardIcon className="lg:mx-4 md:mx-1" />}
        />
      </div>
      {children}
    </div>
  );
}

export default Sidebar;

import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Link } from '@inertiajs/react';
import SidebarContext from '@/Context/SidebarContext';

function NavItem({ isActive, url, icon, text }) {
  const { isSidebarCollapsed } = useContext(SidebarContext);
  return (
    <div className="mt-2">
      <div
        className={`py-2 rounded-2xl
        ${isActive ? 'text-indigo-800 text-base font-semibold' : 'text-black'}
        ${isSidebarCollapsed ? 'inline-block' : ''}
        `}
      >
        <Link href={url} className="flex items-center group relative rounded">
          {icon}
          {isSidebarCollapsed ? (
            <span className="absolute start-full top-1/2 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
              {text}
            </span>
          ) : (
            <span className="truncate">{text}</span>
          )}
        </Link>
      </div>
    </div>
  );
}

NavItem.propTypes = {
  isActive: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
};

export default NavItem;

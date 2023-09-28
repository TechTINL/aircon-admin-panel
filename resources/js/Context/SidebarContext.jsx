import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const SidebarContext = createContext({
  isSidebarCollapsed: false,
  setIsSidebarCollapsed: () => {},
});

export function SidebarProvider({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const value = useMemo(
    () => ({ isSidebarCollapsed, setIsSidebarCollapsed }),
    [isSidebarCollapsed, setIsSidebarCollapsed]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

SidebarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SidebarContext;

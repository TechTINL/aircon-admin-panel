import { useState, useEffect } from 'react';

// On Icon click, make the sidebar collapse, state is stored in localStorage
function useSidebarCollapsed() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const storedValue = localStorage.getItem('isSidebarCollapsed');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  useEffect(() => {
    localStorage.setItem(
      'isSidebarCollapsed',
      JSON.stringify(isSidebarCollapsed)
    );
  }, [isSidebarCollapsed]);

  return [isSidebarCollapsed, setIsSidebarCollapsed];
}

export default useSidebarCollapsed;

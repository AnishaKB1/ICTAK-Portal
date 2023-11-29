import React from 'react'

import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewListIcon from '@mui/icons-material/ViewList';




const Sidebar = ({openSidebarToggle, OpenSidebar, onSidebarItemClick }) => {
  console.log('OpenSidebar type:', typeof OpenSidebar);
    const handleSidebarToggle = () => {
    OpenSidebar();
  };
  return (
    <div>
      <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
           
            <span className='icon close_icon' onClick={handleSidebarToggle}>X</span>
        </div>

        <ul className='sidebar-list' >
            <li className='sidebar-list-item' onClick={() => onSidebarItemClick('Mentordash')}>
          
                    <DashboardIcon className='icon'/> Dashboard
              
            </li>
            <li className='sidebar-list-item' onClick={() => onSidebarItemClick('Viewtopic')} >
           
                    <ViewListIcon className='icon'/> Submissions
                  
            </li>

          
        </ul>
    </aside>
    </div>
  );
}

export default Sidebar;

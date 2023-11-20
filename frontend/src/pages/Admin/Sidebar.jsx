import React from 'react'

import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
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
            {/* <div className='sidebar-brand'>
            <img
            src={flogo}
            alt="Logo"
            style={{
              display: { xs: 'none', md: 'flex' },
              marginRight: 1,
              height: '80px', // Adjust the height as needed
              width: '250px',
            }}
          />
            </div> */}
            <span className='icon close_icon' onClick={handleSidebarToggle}>X</span>
        </div>

        <ul className='sidebar-list' >
            <li className='sidebar-list-item' onClick={() => onSidebarItemClick('Dashboard')}>
          
                    <DashboardIcon className='icon'/> Dashboard
              
            </li>
            <li className='sidebar-list-item' onClick={() => onSidebarItemClick('Addproject')} >
           
                    <AddCircleIcon className='icon'/> Add Project
                  
            </li>
            <li className='sidebar-list-item' onClick={() => onSidebarItemClick('Projectview')}>
           
           <ViewListIcon className='icon'/> Projects
         
          </li>
            <li className='sidebar-list-item'  onClick={() => onSidebarItemClick('Addmentor')}>
          
                    <PersonAddIcon className='icon'/> Add Mentor
                  
            </li>
            <li className='sidebar-list-item' onClick={() => onSidebarItemClick('Mentorview')}>
           
                    <ViewListIcon className='icon'/> Mentors
                    
            </li>
          
        </ul>
    </aside>
    </div>
  );
}

export default Sidebar;

import React from 'react';
import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import FooterDash from './FooterDash';
import './dash.css';
import Addproject from './Addproject';
import Addmentor from './Addmentor';
import Mentorview from './Mentorview';
import Projectview from './Projectview';
import Dashboard from './Dashboard';


const Admindash = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    
    const [selectedOption, setSelectedOption] = useState('Dashboard');
  
      const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
      };
      const handleSidebarItemClick = (option) => {
        setSelectedOption(option);
      };
  return (
    <div className='grid-header'>
      <Header OpenSidebar={OpenSidebar}/>
      <div/>
      <div className='grid-container'>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} onSidebarItemClick={handleSidebarItemClick} />
{selectedOption === 'Addproject' && <Addproject/>}
{selectedOption === 'Dashboard' && <Dashboard/>}
      {selectedOption === 'Projectview' && <Projectview/>}
      {selectedOption === 'Addmentor' && <Addmentor/>}
      {selectedOption === 'Mentorview' && <Mentorview/>} 
 
      
      </div>
       <FooterDash/>
    </div>
  );
}

export default Admindash;

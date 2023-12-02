import React from 'react';
import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar';
import Mentordash from './Mentordash';
import './Mentordash.css';
import Viewtopic from './Viewtopic';
import { useLocation } from 'react-router-dom';

const Mentormain = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const location =useLocation();
    const pathnameWithoutSlash = location.pathname.substring(1);
    const [selectedOption, setSelectedOption] = useState(pathnameWithoutSlash);
    

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
      {<Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} onSidebarItemClick={handleSidebarItemClick} /> }

  {selectedOption === 'Mentordash' && <Mentordash/>}
      {selectedOption === 'Viewtopic' && <Viewtopic/>} 
 
      
      </div>
 
    </div>
  );
}

export default Mentormain;







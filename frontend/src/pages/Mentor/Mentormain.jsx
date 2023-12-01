import React from 'react';
import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar';
import Mentordash from './Mentordash';
import './Mentordash.css';
import Viewtopic from './Viewtopic';

const Mentormain = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    
    const [selectedOption, setSelectedOption] = useState('Mentordash');
  
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







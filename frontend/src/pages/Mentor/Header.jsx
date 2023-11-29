import React from 'react'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import logo from './images/logo.svg' ;
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = ({OpenSidebar}) => {
  return (
    <div>
    <header className='header'>
    <div className='menu-icon'>
            <FormatAlignJustifyIcon className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='sidebar-brand'>
            <img
            src={logo}
            alt="Logo"
            style={{
              display: { xs: 'none', md: 'flex' },
              marginRight: 1,
              height: '50px', // Adjust the height as needed
              width: '200px',
            }}
          />
            </div> 
     {/* <div className='header-left'>
        <BsSearch  className='icon'/>
    </div> */}
    <div className='header-right'>
      <Link to={'/'}>
        <LogoutIcon className='icon'/>
        </Link>
    </div> 
</header>
</div>
  );
}

export default Header;

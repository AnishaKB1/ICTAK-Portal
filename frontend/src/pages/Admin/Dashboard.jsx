import React from 'react';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import PeopleIcon from '@mui/icons-material/People';


const Dashboard = ({ onSidebarItemClick  }) => {
  return (
    <div className='dashcont'>
      <main className='main-container'>
        <div className='main-title'>
          <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
          <div className='card'  onClick={() => onSidebarItemClick('Projectview')}>
            <div className='card-inner'>

             <h4>Projects</h4>
                <ViewModuleIcon className='card_icon' />
             
          </div>
          </div>

          <div className='card' onClick={() => onSidebarItemClick('Mentorview')}>
            <div className='card-inner'>
                <h4>Mentors</h4>
                <PeopleIcon className='card_icon' />
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
  }

export default Dashboard;
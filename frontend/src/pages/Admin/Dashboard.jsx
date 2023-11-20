import React from 'react';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <main className='main-container'>
        <div className='main-title'>
          <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
          <div className='card'>
            <div className='card-inner'>
              <Link to={'/Projectview'} style={{ color: 'white', textDecoration: 'none' }}>
                <h4>Projects</h4>
                <ViewModuleIcon className='card_icon' />
              </Link>
            </div>
          </div>

          <div className='card'>
            <div className='card-inner'>
              <Link to={'/Mentorview'} style={{ color: 'white', textDecoration: 'none' }}>
                <h4>Mentors</h4>
                <PeopleIcon className='card_icon' />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
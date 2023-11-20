
import './App.css';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/ICTAK/Home';
import Aboutus from './pages/ICTAK/Aboutus';
import Contact from './pages/ICTAK/Contact';
import Main from './components/Main';
import Login from './components/Login';
import Admindash from './pages/Admin/Admindash';
import Dashboard from '@mui/icons-material/Dashboard';
import Addproject from './pages/Admin/Addproject';
import Projectview from './pages/Admin/Projectview';
import Addmentor from './pages/Admin/Addmentor';
import Mentorview from './pages/Admin/Mentorview';

function App() {
 
 
  return (
    

    <div className='App'>
    <Routes>
      {/* Routes in home page   */}
      <Route path = '/'  element={<Main child ={<Home />}/>}></Route>
      <Route path = '/login' element={<Main child ={<Login/>}/>}></Route>
      <Route path = '/About'  element={<Main child ={<Aboutus />}/>}></Route>
      <Route path = '/Contact'  element={<Main child ={<Contact />}/>}></Route>
      
      
      
      {/* Routes to Admin dashboard */}
       <Route path = '/Dashboard' element={<Admindash child={<Dashboard/>}/>}></Route>
       <Route path = '/Addproject' element={<Admindash child={<Addproject/>}/>}></Route>
       <Route path = '/Projectview' element={<Admindash  child={<Projectview/>}/>}></Route>
       <Route path = '/Mentorview' element={<Admindash  child={<Mentorview/>}/>}></Route>
       <Route path = '/Addmentor' element={<Admindash  child={<Addmentor/>}/>}></Route> 
      </Routes>
       </div>
  
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axiosInstance from '../../axiosinterceptor';
import Addmentor from './Addmentor';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Mentorview = () => {
  const [mentors, setMentors] = useState([]);
  var[update,setUpdate] = useState(false);
  var[singleValue,setSingleValue]=useState([])

  useEffect(()=>{
    fetchPost();
 },[]);
 function fetchPost(){
  axiosInstance.get('http://localhost:3000/mentor/view').then((res)=>{
    setMentors(res.data);
  
  })
 }
 const updateBlog = (val)=>{
  console.log("update clicked",val);
  setUpdate(true);
  setSingleValue(val)
}

function deletePost (id) {
  axiosInstance.delete(`http://localhost:3000/mentor/delete/${id}`)
   .then((res) => {
    alert(res.data);
    fetchPost();
    window.location.reload(false);
   })
   .catch((error) => {
     console.error('Error deleting post:', error);
   });
};
let finalJSX= (
  <div className="table-container">
  <TableContainer className="mentor-table" component={Paper} sx={{ maxHeight: 440 }}>
  <Table >
    <TableHead id='thead' >
      <TableRow >
        <TableCell className="table-cell" align="center" >Name</TableCell>
        <TableCell className="table-cell" align="center">Email</TableCell>
        <TableCell className="table-cell" align="center">Phone Number</TableCell>
        <TableCell className="table-cell" align="center">Password</TableCell>
        <TableCell className="table-cell" align="center">Project Title</TableCell>
        <TableCell  className="table-cell" align="center"> </TableCell>
        <TableCell  className="table-cell" align="center"> </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {mentors.map((mentor) => (
        <TableRow key={mentor._id}>
          <TableCell className="table-cell" align="center">{mentor.name}</TableCell>
          <TableCell className="table-cell"  align="center">{mentor.email}</TableCell>
          <TableCell className="table-cell" align="center">{mentor.phoneNumber}</TableCell>
          <TableCell  className="table-cell" align="center">{mentor.password}</TableCell>
          <TableCell  className="table-cell" align="center">{mentor.projectTitle.title}</TableCell>
          
          <TableCell  className="table-cell" align="center">
          <EditIcon className="action-button" onClick={()=>updateBlog(mentor)} color='primary' /> 
          </TableCell>
          <TableCell className="table-cell"  align="center">
          <DeleteIcon className="action-button" onClick={() => deletePost(mentor._id)} color='primary'/> 
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
</div>
)
if(update) finalJSX=<Addmentor method="put" data={singleValue}/>
return (

 
  finalJSX
  

 )
}

export default Mentorview;

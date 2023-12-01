import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableContainer,Paper,TableHead, TableBody, TableRow, TableCell, Select, MenuItem, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



const Viewtopic = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedBatchOrProject, setSelectedBatchOrProject] = useState('');
  const mentorId = localStorage.getItem('userid');

  useEffect(() => {
    // Fetch submissions based on batch or project
    axios.get(`http://localhost:3000/sub/mentor/submissions?id=${mentorId}&batchOrProjectId=${selectedBatchOrProject}`)
      .then((res) => setSubmissions(res.data))
      .catch((error) => console.error('Error fetching submissions:', error));
  }, [selectedBatchOrProject]);

  const handleBatchOrProjectChange = (event) => {
    setSelectedBatchOrProject(event.target.value);
  };




  return (
    <div>
      <h1>Submissions</h1>
    <div className="container">
    <div className="selection-container">
  <label htmlFor="selection" className="selection-label">Select Batch or Project:</label>
  <Select value={selectedBatchOrProject} onChange={handleBatchOrProjectChange} id='selection'>
    <MenuItem value="">Select Batch or Project</MenuItem>
    <MenuItem value="batch">Batch</MenuItem>
    <MenuItem value="project">Project</MenuItem>
  </Select>
</div>
      <div className="tableContainer">
      <TableContainer className="mentor-table" component={Paper} sx={{ maxHeight: 600 }}>
  <Table >
  <TableHead id='thead' >
      <TableRow >
          
            <TableCell  className="table-cell" align="center">Student Name</TableCell>
            <TableCell  className="table-cell" align="center">Batch</TableCell>
            <TableCell  className="table-cell" align="center">Email</TableCell>
            <TableCell  className="table-cell" align="center">Project Title</TableCell>
            <TableCell  className="table-cell" align="center">Submission Url</TableCell>
            <TableCell  className="table-cell" align="center">Status</TableCell>
            <TableCell  className="table-cell" align="center"> </TableCell>
            <TableCell  className="table-cell" align="center"> </TableCell>
            <TableCell  className="table-cell" align="center"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {submissions.map((submission) => (
            <TableRow key={submission._id}>
              <TableCell className="table-cell" align="center">{submission.student.name}</TableCell>
              <TableCell className="table-cell" align="center">{submission.student.batch}</TableCell>
              <TableCell className="table-cell" align="center">{submission.student.email}</TableCell>
              <TableCell className="table-cell" align="center">{submission.project.title}</TableCell>
              <TableCell className="table-cell" align="center">{submission. referenceMaterial}</TableCell>
              <TableCell className="table-cell" align="center">{submission.status}</TableCell>
              <TableCell className="table-cell" align="center">
                <Button>Evaluate</Button> </TableCell>
              <TableCell className="table-cell" align="center">
                  <EditIcon
                    className="action-button"
                    // onClick={() => updateBlog(mentor)}
                    color="primary"
                  />
                </TableCell>
                <TableCell className="table-cell" align="center">
                  <DeleteIcon
                    className="action-button"
                    // onClick={() => deletePost(mentor._id)}
                    color="primary"
                  />
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      </div>
    </div>
    </div>
  );
};


export default Viewtopic;

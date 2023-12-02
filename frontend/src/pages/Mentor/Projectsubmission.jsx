import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableContainer, Paper, TableHead, TableBody, TableRow, TableCell, Select, MenuItem, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header'
import Sidebar from './Sidebar';
import Evaluate from './Evaluate';

const Projectsubmission = ({ }) => {

    const [submissions, setSubmissions] = useState([]);
    var[update,setUpdate] = useState(false);
    var[singleValue,setSingleValue]=useState([])
    const mentorId = localStorage.getItem('userid');
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const [selectedOption, setSelectedOption] = useState('Mentordash');
    const navigate = useNavigate();
    // const projectId = params.projectId;
    const { projectId } = useParams();
    console.log(projectId, 'projectId')


    useEffect(() => {

        if (projectId) {
            // Fetch submissions based on the selected project ID
            axios.get(`http://localhost:3000/sub/mentor/projects?id=${mentorId}&projectId=${projectId}`)
                .then((res) => setSubmissions(res.data))
                .catch((error) => console.error('Error fetching submissions:', error));

        }
    }, [mentorId, projectId]);
    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    };
    const handleSidebarItemClick = (option) => {
        console.log(option)
        if (option == 'Viewtopic') {
            navigate(`/` + option);
        }
        else {
            navigate(`/` + option);
        }

    };

    const handleEvaluate = (submissionId) => {
        navigate(`/Evaluate/${submissionId}`);
    };

    function deletePost (submissionId) {
        axios.delete(`http://localhost:3000/sub/submissions/delete/${submissionId}`)
          .then((res) => {
           alert(res.data);
           axios.get(`http://localhost:3000/sub/mentor/projects?id=${mentorId}&projectId=${projectId}`)
        .then((res) => setSubmissions(res.data))
        .catch((error) => console.error('Error fetching submissions:', error));
         
          })
          .catch((error) => {
            console.error('Error deleting post:', error);
          });
      };
   



    const updatesub = (val) => {
        console.log("update clicked", val);
        navigate(`/Evaluate/${val._id}?edit=T`);
        // Check if val has the expected properties
        if (val && val._id) {
          console.log("val._id:", val._id);
          console.log("val.name:", val.name);
          setUpdate(true);
          setSingleValue(val);
        } else {
          console.error("Received invalid value for updatesub");
        }
      };
      
      let finalJSX= (
        <div className='grid-header'>
            <Header OpenSidebar={OpenSidebar} />
        <div />
        
            <div className='grid-container'>
                {<Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} onSidebarItemClick={handleSidebarItemClick} />}
               <div className='subcontent'>
                <div>
                <h1 className='sub'>Submissions</h1>
                </div>
                <div className="tableContainer">
                    <TableContainer className="mentor-table" component={Paper} sx={{ maxHeight: 600 }}>
                        <Table >
                            <TableHead id='thead' >
                                <TableRow >

                                    <TableCell className="table-cell" align="center">Student Name</TableCell>
                                    <TableCell className="table-cell" align="center">Batch</TableCell>
                                    <TableCell className="table-cell" align="center">Email</TableCell>
                                    <TableCell className="table-cell" align="center">Project Title</TableCell>
                                    <TableCell className="table-cell" align="center">Submission Url</TableCell>
                                    <TableCell className="table-cell" align="center">Status</TableCell>
                                    <TableCell className="table-cell" align="center"> </TableCell>
                                    <TableCell className="table-cell" align="center"> </TableCell>
                                    <TableCell className="table-cell" align="center"> </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {submissions.map((submission) => (
                                    <TableRow key={submission._id}>
                                        <TableCell className="table-cell" align="center">{submission.student.name}</TableCell>
                                        <TableCell className="table-cell" align="center">{submission.student.batch}</TableCell>
                                        <TableCell className="table-cell" align="center">{submission.student.email}</TableCell>
                                        <TableCell className="table-cell" align="center">{submission.project.title}</TableCell>
                                        <TableCell className="table-cell" align="center">{submission.submissionUrl}</TableCell>
                                        <TableCell className="table-cell" align="center">{submission.status}</TableCell>
                                        <TableCell className="table-cell" align="center">
                                            <Button id="submit" variant="contained" onClick={()=>handleEvaluate(submission._id)} >Evaluate</Button> </TableCell>
                                        <TableCell className="table-cell" align="center">
                                            <EditIcon
                                                className="action-button"
                                                onClick={() => updatesub(submission)}
                                                color="primary"
                                            />
                                        </TableCell>
                                        <TableCell className="table-cell" align="center">
                                            <DeleteIcon
                                                className="action-button"
                                                onClick={() => deletePost(submission._id)}
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
        </div>

    );
    if (update && singleValue && singleValue._id){
        finalJSX=<Evaluate method="put" data={singleValue}/>
            }
      return (
      
       
        finalJSX
        
      
       )
      
}

export default Projectsubmission;

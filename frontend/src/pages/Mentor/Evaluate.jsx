import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Typography, Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useParams, useNavigate,useLocation  } from 'react-router-dom';

const Evaluate = (props) => {
  const [formData, setFormData] = useState({
    marks: '',
    comments: '',
    referenceMaterial: '',
  });
  const [submission, setSubmission] = useState({});
  const mentorId = localStorage.getItem('userid');
  const [errors, setErrors] = useState({});
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Mentordash');
  const location = useLocation();
  const searchValue = new URLSearchParams(location.search).get('edit');
  console.log(searchValue,'searchValue')
  const navigate = useNavigate();
  const { submissionId } = useParams();

  useEffect(() => {
    if (submissionId && props.method === 'put' && props.data) {
      // If it's an update and data is available, set the form data
      setFormData({
        marks: props.data.marks || '',
        comments: props.data.comments || '',
        referenceMaterial: props.data.referenceMaterial || '',
      });
    }
  }, [submissionId, props.method, props.data]);



  useEffect(() => {
    if (submissionId) {
      if(searchValue=='T'){
        getSubmissions(submissionId)
      }
      // Fetch submissions based on the selected project ID
      axios
        .get(`http://localhost:3000/sub/student/projects?id=${mentorId}&submissionId=${submissionId}`)
        .then((res) => setSubmission(res.data))
        .catch((error) => console.error('Error fetching submissions:', error));
    }
  }, [mentorId, submissionId]);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const getSubmissions = (submissionId) => {
      axios.get(`http://localhost:3000/sub/evaluate/${submissionId}`)
      .then((res)=>{
          const submissionData = res.data;
          console.log(submissionData,'submissionData')
          setFormData(submissionData);
      })
      .catch((error) => {
          console.error('Error fetching submission:', error);
      });
  }
  const handleSidebarItemClick = (option) => {
    if (option === 'Viewtopic') {
      navigate(`/${option}`);
    } else {
      navigate(`/${option}`);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.marks.trim()) {
      newErrors.marks = 'Marks is required';
    }
    if (!formData.comments.trim()) {
      newErrors.comments = 'Comments is required';
    }
    if (!formData.referenceMaterial.trim()) {
      newErrors.referenceMaterial = 'Reference Material is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    console.log('props.method', props.method);
    if (searchValue === 'T') {
      axios
      .put(`http://localhost:3000/sub/evaluate/${submissionId}`, formData)
        .then((response) => {
          if (response.data === 'Updated Successfully') {
            alert(response.data);
           
            navigate('/Viewtopic');
          } else {
            alert('not updated');
          }
        });
    } else {
      if (validateForm()) {
        axios
        .post(`http://localhost:3000/sub/submit/${submissionId}`, formData)
        .then((res) => {
          if (res.data === 'Posted Successfully') {
            alert(res.data);
            // window.location.reload(false);
            navigate('/Viewtopic');
          } else {
            alert('not updated');
          }
        });
    }
  }

  
  };

// const getNavigations=(projectId)=>{
//   navigate(`/Projectsubmission/${projectId}`);
// }






  return (
    <div className='grid-header'>
      <Header OpenSidebar={OpenSidebar} />
      <div className='grid-container'>
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} onSidebarItemClick={handleSidebarItemClick} />
        <div className='contents'>
          <div className='typo'>
  {submission && submission.student && (
    <Typography id="data" variant="h4">
      {submission.student.name}
    </Typography>
  )}
  {submission && submission.student && (
    <Typography id="data" variant="h6">
      Batch: {submission.student.batch}
    </Typography>
  )}
  {submission && submission.project && (
    <Typography id="data" variant="h6">
      Project Title: {submission.project.title}
    </Typography>
  )}
  {submission && (
    <Typography id="data" variant="h6">
      Submission Url: {submission.submissionUrl}
    </Typography>
  )}
</div>
<br/>
        <div>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '100%', maxWidth: '400px' },
            }}
            noValidate
            autoComplete="off"
          >
            <div id="pro">
              <form id="proform">
                <br />
                <h3 id="prohead">Evaluation Form </h3>
                <Grid container spacing={3}>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Marks(Out of 20)"
                      variant="outlined"
                      fullWidth
                      name="marks"
                      value={formData.marks}
                      onChange={handleChange}
                      error={!!errors.marks}
                      helperText={errors.marks}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Comments"
                      variant="outlined"
                      fullWidth
                      name="comments"
                      
                      value={formData.comments}
                      onChange={handleChange}
                      error={!!errors.comments}
                      helperText={errors.comments}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Reference Material"
                      variant="outlined"
                      fullWidth
                      name="referenceMaterial"
                      value={formData.referenceMaterial}
                      onChange={handleChange}
                      error={!!errors.referenceMaterial}
                      helperText={errors.referenceMaterial}
                    />
                  </Grid>
                  <br />
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Box>
        </div>
      </div>
    </div>
    </div>
      );
};

      export default Evaluate;
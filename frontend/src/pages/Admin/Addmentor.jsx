import React, { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import axiosInstance from '../../axiosinterceptor';

const Addmentor = (props) => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm(); 
  const [mentors, setMentors] = useState({
    name: props.data ? props.data.name : '',
    email: props.data ? props.data.email : '',
    phoneNumber: props.data ? props.data.phoneNumber : '',
    password: props.data ? props.data.password : '',
    projectTitle: props.data ? props.data.projectTitle : '',
  });
  const [errors, setErrors] = useState({});
  const [projectList, setProjectList] = useState([]); 

  useEffect(() => {
    // Fetch project titles from the backend
    axiosInstance.get('http://localhost:3000/project/protitle')
      .then((response) => setProjectList(response.data))
      .catch((error) => console.error('Error fetching projects:', error));
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!mentors.name.trim()) {
      newErrors.name = 'Name is required';
    }
   
    if (!mentors.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(mentors.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!mentors.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(mentors.phoneNumber)) {
      
      newErrors.phoneNumber = 'Invalid Phone Number';
    }
 
  
    if (!mentors.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}/.test(mentors.password)) {
      newErrors.password =
        'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character.';
    }
    if (!mentors.projectTitle.trim()) {
      newErrors.projectTitle = 'Project Title is required';
    }
    

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleChange = (e) => {
    
    setMentors({
      ...mentors,
      [e.target.name]: e.target.value,
    });
  };

  const registerMentor = (e) => {
   
    if (props.method === 'put') {
      axiosInstance
        .put(`http://localhost:3000/mentor/update/+{props.data._id}`, mentors)
        .then((response) => {
          if (response.data === 'Updated Successfully') {
            alert(response.data);
            window.location.reload(false);
            navigate('/Mentorview');
          } else {
            alert('not updated');
          }
        });
    } else {
      if (validateForm()) {
      axiosInstance
        .post('http://localhost:3000/mentor/add', mentors)
        .then((res) => {
          alert(res.data);
          navigate('/Mentorview');
        });
    }
  }
  };
  const handleRegister = (e) => {
    e.preventDefault();
    registerMentor();
  };

  return (
    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '100%', maxWidth: '400px' },
    }}
    noValidate
    autoComplete="off"
  >
    <div id="mentor">
          <form id="mentorform">
            <br />
            <h3 id="mentorhead">Mentor Registration </h3>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  className="textfields"
                  id="outlined-error"
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={mentors.name}
                  onChange={handleChange}
                  error={Boolean(errors.name)}
          helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  className="textfields"
                  id="outlined-error"
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={mentors.email}
                  onChange={handleChange}
                  error={Boolean(errors.email)}
          helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  className="textfields"
                  id="outlined-error"
                  label="Phone Number"
                  variant="outlined"
                  name="phoneNumber"
                  value={mentors.phoneNumber}
                  onChange={handleChange}
                  error={Boolean(errors.phoneNumber)}
          helperText={errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  className="textfields"
                  id="outlined-error"
                  label="Password"
                  variant="outlined"
                  name="password"
                  value={mentors.password}
                  onChange={handleChange}
                  error={Boolean(errors.password)}
          helperText={errors.password}
                />
              </Grid>


        {/* Other form fields */}
        <Grid item xs={12} sm={6}>
  <FormControl fullWidth>
    <InputLabel id="project-title-label">Project Title</InputLabel>
    <Controller
      name="projectTitle"
      control={control}
      defaultValue={mentors.projectTitle} 
      render={({ field }) => (
        <Select
          labelId="project-title-label"
          id="project-title"
          value={mentors.projectTitle} // Use the project ID from the state
          onChange={(e) => handleChange({ target: { name: 'projectTitle', value: e.target.value } })}
          // {...field}
        >
          {projectList.map((project) => (
            <MenuItem key={project._id} value={project._id}>
              {project.title}
            </MenuItem>
          ))}
        </Select>
      )}
    />
    {errors.projectTitle && (
      <p className="error-message">{errors.projectTitle}</p>
    )}
  </FormControl>
</Grid>
      </Grid>
      <br/>
      <br/>
      <Button type="submit" id='submit' variant="contained" color="primary" onClick={handleRegister}>
        Register
      </Button>
    </form>
    
    </div>
    </Box>
  );
}

export default Addmentor;

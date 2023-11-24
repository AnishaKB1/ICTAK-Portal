import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { TextField, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosinterceptor';


const Addproject = (props) => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: props.data ? props.data.title : '',
    description: props.data ? props.data.description : '',
    imageUrl: props.data ? props.data.imageUrl: '',
    referenceUrl: props.data ? props.data.referenceUrl : '',
    
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Descripion is required';
    }
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image url is required';
    }
    if (!formData.referenceUrl.trim()) {
      newErrors.referenceUrl = 'Reference url is required';
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
  
    if (props.method === 'put') {
      axiosInstance
        .put('http://localhost:3000/project/update/' + props.data._id, formData)
        .then((response) => {
          if (response.data === 'Updated Successfully') {
            alert(response.data);
            window.location.reload(false);
            navigate('/Projectview');
          } else {
            alert('not updated');
          }
        });
    } else {
      if (validateForm()) {
      axiosInstance
        .post('http://localhost:3000/project/add', formData)
        .then((res) => {
          alert(res.data);
          navigate('/Projectview');
        });
    }
  }
  };

  return (
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
            <h3 id="prohead">Project Registration Form </h3>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  className="textfields"
                  id="outlined-error"
                  label="Project Title"
                  variant="outlined"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  error={Boolean(errors.title)}
          helperText={errors.title}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  className="textfields"
                  id="outlined-error"
                  label="Description"
                  variant="outlined"
                  name="description"
                  multiline rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  error={Boolean(errors.description)}
          helperText={errors.description}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  className="textfields"
                  id="outlined-error"
                  label="Image URL"
                  variant="outlined"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  error={Boolean(errors.imageUrl)}
          helperText={errors.imageUrl}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  className="textfields"
                  id="outlined-error"
                  label="Reference Material URL"
                  value={formData.referenceUrl}
                  variant="outlined"
                  name="referenceUrl"
                  onChange={handleChange}
                  error={Boolean(errors.referenceUrl)}
          helperText={errors.referenceUrl}
                />
              </Grid>
              </Grid>
            <br />
            <Button id="submit" variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </form>
        </div>
      </Box>
    </div>
  );
}

export default Addproject;

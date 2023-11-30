// Mentordash.jsx

import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Mentordash = () => {
  const { mentorId: urlMentorId } = useParams();
  const [mentorId, setMentorId] = useState(null);
  const [mentorName, setMentorName] = useState('');
  const [mentorProjects, setMentorProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Extract mentorId from token or other source
    const token = sessionStorage.getItem('userToken');

    if (token) {
      axios
        .post('http://localhost:3000/admin/login', { token })
        .then((response) => {
          const { mentorId } = response.data;
          setMentorId(mentorId);
        })
        .catch((error) => {
          console.error('Error during login:', error);
        });
    }
  }, []); 

  useEffect(() => {
    console.log('Mentor ID from state:', mentorId);

    if (mentorId) {
      axios
        .get(`http://localhost:3000/mentordash/mentors?id=${mentorId}`, {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
          },
        })
        .then((response) => {
          const mentorData = response.data[0];
          setMentorName(mentorData.name);
          setMentorProjects(mentorData.projectTitle);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching mentor data:', error);
          setIsLoading(false);
        });
    }
  }, [mentorId]);

  const handleCardClick = (projectId) => {
    navigate(`/submission/${projectId}`);
  };

  return (
    <div>
      <Typography variant="h4">Welcome, {mentorName}!</Typography>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {mentorProjects.map((project) => (
            <Card key={project._id} onClick={() => handleCardClick(project._id)}>
              <CardContent>
                <Typography variant="h5">{project.title}</Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleCardClick(project._id)}
              >
                Go to Submission
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Mentordash;


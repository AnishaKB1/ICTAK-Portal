import React from 'react';
import styled from 'styled-components';
import flogo from './images/flogo.png' ;

import FacebookIcon from '@mui/icons-material/Facebook';

import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';






const FooterDash = () => {
  const FooterContainer = styled.footer`
  background-color: gray;
  color: #fff;
  padding: 20px;
  text-align: center;
  width:100%;
 
`;

const Logo = styled.img`
  max-width: 100px;
  height: auto;
`;

const Heading = styled.h3`
  margin-bottom: 10px;
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Icon = styled.div`
  margin: 0 10px;
  font-size: 20px;
`;


  return (
    <div>
       <FooterContainer>
      <Logo src={flogo} alt="Logo" />
      <p style={{ color: 'white' }}>
            Copyright © 2020 ICT Academy of Kerala. All Rights Reserved.
          </p>

      <IconsContainer>
        <Icon>
        <Link to="https://www.facebook.com/ictkerala/" target="_blank" rel="noopener noreferrer">
          <FacebookIcon />
          </Link>
          
        </Icon>
        <Icon>
        <Link to="https://www.instagram.com/ictkerala/?hl=en" target="_blank" rel="noopener noreferrer">
          <InstagramIcon />
          </Link>
        </Icon>
        <Icon>
        <Link to="https://www.youtube.com/user/ictkerala" target="_blank" rel="noopener noreferrer">
        <YouTubeIcon/>
        </Link>
        </Icon>
      </IconsContainer>
      
    </FooterContainer>
    </div>
  );
}

export default FooterDash;

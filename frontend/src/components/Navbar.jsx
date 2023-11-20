import React, { useState } from 'react';
import { AppBar, Box, Button, Dialog,
  DialogContent,Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from './images/logo.svg';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';

import Login from './Login';





const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false);


  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenLogin = () => {
    setOpenLogin(true);
    handleCloseNavMenu(); // Close the menu when login is opened
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };
  return (

 
      <AppBar position="static" sx={{ backgroundColor: 'beige' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                style={{ color: 'black' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={'/'} style={{ color: 'white', textDecoration: 'none' }}>
                      Home
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center">
                    <Link to={'/About'} style={{ color: 'white', textDecoration: 'none' }}>
                      About Us
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center">
                    <Link to={'/Contact'} style={{ color: 'white', textDecoration: 'none' }}>
                      Contact Us
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center">
                    <Button onClick={handleOpenLogin}>
                      
                      <Link to={'/login'} style={{ color: 'white', textDecoration: 'none' }}>
                        Login
                      </Link>
                    </Button>
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>

            <img
              src={logo}
              alt="Logo"
              style={{
                display: { xs: 'none', md: 'flex' },
                marginRight: 1,
                height: '80px',
                width: '250px',
              }}
            />

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block', marginLeft: '100px', fontSize: 'medium' }}
              >
                <Link to={'/'} style={{ color: 'black', textDecoration: 'none' }}>
                  Home
                </Link>
              </Button>
              <br /> <br /> <br />
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block', fontSize: 'medium' }}
              >
                <Link to={'/About'} style={{ color: 'black', textDecoration: 'none' }}>
                  About Us
                </Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block', fontSize: 'medium' }}
              >
                <Link to={'/Contact'} style={{ color: 'black', textDecoration: 'none' }}>
                  Contact Us
                </Link>
              </Button>
              <LoginIcon color="primary" fontSize="large" style={{ marginLeft: '500px', marginTop: '20px' }} />
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleOpenLogin}
                sx={{ my: 2, color: 'white', display: 'block', marginLeft: '5px', fontSize: 'medium' }}
              >
                <Link to={'/login'} style={{ color: 'white', textDecoration: 'none' }}>
                  Login
                </Link>
              </Button>
              <Dialog open={openLogin} onClose={handleCloseLogin}>
        <DialogContent           sx={{
          backgroundColor:'beige',
            width: '100%', // Set the initial width
            maxHeight: '100%', // Set the initial maxHeight
            overflowY: 'auto', // Enable vertical scrolling if content overflows
            '@media (min-width: 600px)': {
              width: '600px', // Adjust width for larger screens
              maxHeight: '80vh', // Adjust maxHeight for larger screens
            },
          }}> <Login/>
          </DialogContent>
        </Dialog>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
  
  );
};

export default Navbar;
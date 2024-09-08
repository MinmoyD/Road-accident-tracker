import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, IconButton } from '@mui/material';


const NavBar = () => {
  return (
    <AppBar position="static" color="primary">
      <Container>
        <Toolbar>
          
          {/* <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <img src='../src/images.png' alt="Logo" style={{ height: 40 }} />
          </IconButton> */}
          
          {/* Title */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Road Accident Tracker
          </Typography>

          {/* Navigation Buttons */}
          <Button color="inherit" component={Link} to="/">
      Home
    </Button>
    <Button color="inherit" component={Link} to="/accident">
      Analysis
    </Button>
          <Button color="inherit">About</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;

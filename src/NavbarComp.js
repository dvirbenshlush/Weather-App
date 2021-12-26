import './App.css';
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import GradeIcon from '@mui/icons-material/Grade';
import {Nav} from 'react-bootstrap';

import FavoriteIcon from '@mui/icons-material/Favorite';
// import Tabs from '@mui/material/Tabs';
// import Box from '@mui/material/';

const NavbarComp = ()=> {
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
    return (
      <div>
        <Nav style={{borderRadius:"50px 50px",border:"1px solid #c5baba",display: "inline-flex", flexDirection: "row",marginBottom: "20px"}}>
          <Nav.Item >
            <Nav.Link
              // underline="hover"
              // sx={{ display: "flex", alignItems: "center" }}
              // color="inherit"
              href="/"
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              HOME 
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              // underline="hover"
              // sx={{ display: "flex", alignItems: "center" }}
              // color="inherit"
              href="/favorite"
            >
              <GradeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              FAVORITE
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
  
export default NavbarComp;
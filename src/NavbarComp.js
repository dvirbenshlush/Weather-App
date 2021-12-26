import './App.css';
import React from 'react';
import GetCity from './Components/GetCity.js';
import Favorite from './Components/Favorite';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {store} from './ReduxStorage/store';
import {saveState} from './ReduxStorage/localStorage';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import GradeIcon from '@mui/icons-material/Grade';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import { Button, Navbar, Nav, Container } from 'react-bootstrap';

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
        <Nav style={{borderRadius:"50px 50px",border:"1px solid #c5baba",display: "inline-flex", flexDirection: "row",marginBottom: "100px"}}>
          <Nav.Item >
            <Nav.Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              href="/"
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              HOME
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
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
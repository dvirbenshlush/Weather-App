import './App.css';
import HomeIcon from '@mui/icons-material/Home';
import GradeIcon from '@mui/icons-material/Grade';
import {Nav} from 'react-bootstrap';
import { changeMode } from './redux/actions';
import { connect } from 'react-redux';
import {Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';



import FavoriteIcon from '@mui/icons-material/Favorite';
// import Tabs from '@mui/material/Tabs';
// import Box from '@mui/material/';
const mapDispatchToProps = (dispatch, ownProps) => ({
  changeMode: (item) => dispatch(changeMode(item)),
});

const NavbarComp = (props)=> {


   const [item, setItem] = useState(false);

   function clickHandler(e) {
     props.changeMode(item);
   }



    return (
      <div>
        <FormGroup>
          <FormControlLabel
            onClick={clickHandler}
            control={<Switch  />}
            label="Dark Mood"
          />
        </FormGroup>
        <Nav
          style={{
            borderRadius: "50px 50px",
            border: "1px solid #c5baba",
            display: "inline-flex",
            flexDirection: "row",
            marginBottom: "20px",
          }}
        >
          <Nav.Item>
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
  
export default connect(null ,mapDispatchToProps)(NavbarComp);

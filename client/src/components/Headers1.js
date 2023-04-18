import { margin } from '@mui/system';
import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from "react-router-dom";


const Headers = () => {
  var email = sessionStorage.getItem('email');
    const handleClick = () => {
      sessionStorage.removeItem('email');
    };
  return (
    <>    
      <Navbar bg="dark" fixed="top" style = {{zIndex:1}}>
        <Container>
          {/* <NavLink to="/" className=" text-light text-decoration-none">IIT Ropar</NavLink> */}
          <Nav className="navbar-brand d-flex justify-content-between">
  <img src={process.env.PUBLIC_URL + '/images/download.png'} style={{width:60, marginRight:20}} alt=" " />
  <NavLink to="/" className="text-light text-decoration-none font-weight-bolder mt-3 mb-3">IIT Ropar</NavLink>
  <span style={{ display: 'inline-block', width: '1100px' }}></span>

  <NavLink to="/register" className="text-light text-decoration-none font-weight-bolder mt-3 mb-3">Signup</NavLink>
</Nav>


        </Container>
      </Navbar>
      <div style={{height:90}}/>
    </>
  );
};

export default Headers
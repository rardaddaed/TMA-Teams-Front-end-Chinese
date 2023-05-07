import React, { useContext,useEffect, useState } from "react";
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import '../App.css';

function Navigation(props) {

  const { language, onLanguageChange } = props;

  const handleSelectLanguageClick = (value) => {
    onLanguageChange(value);
  };


  // Returns nav bar
  return (
    <Navbar className="nav" variant="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">TMA Teams</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">{props.lanContent.NavHome}</Nav.Link>
            <Nav.Link href="/createsurvey">{props.lanContent.NavSurveys}</Nav.Link>
            <Nav.Link href="/csv">Upload</Nav.Link>
          </Nav>
          
          <Dropdown onSelect={handleSelectLanguageClick}>
            <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
            {props.lanContent.NavLanguage}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="english">{props.lanContent.NavLanguageEng}</Dropdown.Item>
              <Dropdown.Item eventKey="chinese">{props.lanContent.NavLanguageCn}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
      <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
        User Profile
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="/profile">Profile Settings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#action/3.3">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation

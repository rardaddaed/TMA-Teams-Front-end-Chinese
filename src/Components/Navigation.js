import React, { useContext, useEffect, useState } from "react";
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { AuthContext } from 'react-oauth2-code-pkce';
import '../App.css';
import logo from '../img/Mindset_Academy_logo.png'

function Navigation(props) {
  const { token, login, logOut } = useContext(AuthContext);

  const { language, onLanguageChange } = props;
  const [loggingOut, setLoggingOut] = useState(false);

  const handleSelectLanguageClick = (value) => {
    onLanguageChange(value);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    logOut();
  }


  // Returns nav bar
  return (
    <Navbar className="nav" variant="light" expand="lg">
      <Container>
        <Navbar.Brand className='logo' href="/home">
        <img src={logo} alt="React Bootstrap logo" width="130" height="40" className="d-inline-block align-top"/>
          <span className="logo-text">TMA Teams</span>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">{props.lanContent.NavHome}</Nav.Link>
            <Nav.Link href="/createsurvey">{props.lanContent.NavSurveys}</Nav.Link>
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
      {props.lanContent.NavUser}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="/profile">{props.lanContent.ProfileTitle}</Dropdown.Item>
        <Dropdown.Item href="/viewsurvey">{props.lanContent.NavViewSurvey}</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout}>{props.lanContent.NavLogout}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation

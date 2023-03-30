import React, { useContext,useEffect, useState } from "react";
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { LoginContext } from "../App";

function Navigation(props) {

  const { isLoggedIn } = useContext(LoginContext);

  const { language, onLanguageChange } = props;

  // Removes the token and sets loggedin state to false if logout is performed
  const logout = () => {
    localStorage.removeItem("token");
    props.setIsLoggedIn(false);
  }

  const handleSelectLanguageClick = (value) => {
    onLanguageChange(value);
  };


  // Returns nav bar
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">TMA Teams</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">{props.lanContent.NavHome}</Nav.Link>
            <Nav.Link href="/surveys/">{props.lanContent.NavSurveys}</Nav.Link>
            <Nav.Link href="/project/">{props.lanContent.NavProject}</Nav.Link>
            <Nav.Link href="/groups/">{props.lanContent.NavGroups}</Nav.Link>
            {isLoggedIn && <Nav.Link href="/" onClick={() => logout()}>{props.lanContent.NavLogout}</Nav.Link>}
            {!isLoggedIn && <Nav.Link href="/login/">{props.lanContent.NavLogin}</Nav.Link>}
            {!isLoggedIn && <Nav.Link href="/register/">{props.lanContent.NavRegister}</Nav.Link>}
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
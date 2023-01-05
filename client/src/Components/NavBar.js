import React  from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet } from "react-router-dom";
import './style.css';
export default function NavBar (){
  
    return (
      <>
        <Navbar className="NavStyle">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Storexe
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/FileShared">
              Files Shared to
              </Nav.Link>
              <Nav.Link as={Link} to="/MyFiles">
                Files Shared By
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Outlet />
      </>
    );

}

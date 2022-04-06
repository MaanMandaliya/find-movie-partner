import React from "react";
import { Navbar, Container } from "react-bootstrap";

import "./Header.css";

export default function Header(props) {
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        className="CustomNavbar"
      >
        <Container></Container>
      </Navbar>
    </div>
  );
}

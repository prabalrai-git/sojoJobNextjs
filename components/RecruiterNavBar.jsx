"use client";

import Image from "next/image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import styles from "@/styles/global.css";

function RecruiterNavBar() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary tw-px-32 tw-py-3 "
    >
      <Container>
        <Navbar.Brand href="/">
          <Image
            className="tw-object-contain tw-cursor-pointer "
            src={"/logo.png"}
            width={230}
            height={230}
            alt="logo.png"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          </Nav>
          <Nav>
            <Nav.Link href="#deets">
              <Image
                src={"/settings.png"}
                width={30}
                height={30}
                className="tw-mt-2"
                alt="settings"
              />
            </Nav.Link>
            <Nav.Link href="#deets">
              <Image
                src={"/avatar.png"}
                width={40}
                height={40}
                alt="user"
                className=" tw-ml-8"
              />
            </Nav.Link>
            <Nav.Link href="#memes">
              {/* <NavDropdown
                title={
                  <span className="tw-text-primary tw-text-lg tw-mr-4 tw-font-semibold ">
                    Deep Sharma
                  </span>
                }
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
              </NavDropdown> */}
              <DropdownButton
                // id="dropdown-item-button"
                // bsStyle="link"
                // style={{
                //   backgroundColor: "transparent",
                //   color: "red",
                // }}
                // className="tw-text-black hover:tw-bg-red-800"
                title="Deep Sharma"
              >
                <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
                <Dropdown.Item as="button">Action</Dropdown.Item>
                <Dropdown.Item as="button">Another action</Dropdown.Item>
                <Dropdown.Item as="button">Something else</Dropdown.Item>
              </DropdownButton>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default RecruiterNavBar;

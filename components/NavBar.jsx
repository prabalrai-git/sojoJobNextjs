"use client";
import Image from "next/image";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="tw-flex tw-flex-row tw-bg-white tw-justify-between tw-pt-5 tw-sticky tw-top-0 tw-z-50 tw-pb-5"
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
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            {/* <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link> */}
            <ul className="tw-flex tw-flex-row tw-text-lg tw-font-medium tw-items-center xsm:tw-text-sm md:tw-text-lg ">
              <Link className=" tw-no-underline tw-text-black" href="/about">
                <li className="tw-mx-4 md:tw-mx-7 tw-cursor-pointer ">
                  About us
                </li>
              </Link>
              <Link
                className=" tw-no-underline tw-text-black"
                href={"/register/employer"}
              >
                <li className="tw-mx-4 md:tw-mx-7  tw-cursor-pointer">
                  Sign Up
                </li>
              </Link>
              <Link
                className=" tw-no-underline tw-text-white"
                href="/login/employer"
              >
                <li className="tw-mx-4 md:tw-mx-7  tw-bg-primary hover:tw-bg-buttonHover tw-text-white tw-font-normal tw-cursor-pointer tw-px-10 tw-py-3 tw-rounded-lg">
                  Sign In
                </li>
              </Link>
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

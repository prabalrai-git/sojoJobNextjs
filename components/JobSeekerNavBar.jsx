"use client";

import Image from "next/image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import styles from "@/styles/global.css";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "@/styles/navbar.css";
import Axios from "@/api/server";

function JobSeekerNavBar() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [userData, setUserData] = useState();

  useEffect(() => {
    getProfileInfo();
  }, []);
  const getProfileInfo = async () => {
    try {
      const res = await Axios.get(
        `/jobSeeker/getJobSeekerById/${sessionStorage.getItem("jobSeekerId")}`
      );
      setUserData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowDropDown((prev) => !prev);
        }
      }
      // Bind the event listener
      document?.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document?.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const logout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.clear();
      window.location.href = "/";
    }
  };

  return (
    <Navbar
      collapseOnSelect
      // expand="lg"
      className="bg-body-tertiary tw-px-20 tw-py-3 "
    >
      <Container className="tw-max-w-screen-2xl pnavbar">
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
            <Nav.Link className="tw-self-center" href="/about">
              <h2 className="tw-font-medium tw-text-lg tw-text-black hover:tw-underline">
                About Us
              </h2>
            </Nav.Link>
            <Nav.Link href="#deets">
              <Image
                src={
                  userData?.profilePicture
                    ? userData.profilePicture
                    : "/avatar.png"
                }
                width={45}
                height={45}
                alt="user"
                className=" tw-ml-8 tw-rounded-full tw-object-contain"
              />
            </Nav.Link>
            <Nav.Link
              // ref={wrapperRef}
              className="tw-self-center "
              onClick={() => setShowDropDown((prev) => !prev)}
              href="#memes"
            >
              <div className="tw-flex tw-flex-row ">
                <h2 className="tw-text-primary tw-text-lg tw-font-medium tw-mr-4 tw-capitalize">
                  {userData?.name}
                </h2>
                <Image
                  src={"/down.png"}
                  width={15}
                  height={15}
                  alt="arrow-down"
                  className="tw-object-contain"
                />
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      {showDropDown && (
        <div
          ref={wrapperRef}
          className=" tw-drop-shadow-md tw-absolute tw-right-36 tw-top-24 tw-bg-white tw-z-10 tw-rounded-lg tw-pl-6 tw-pr-52 tw-py-6"
        >
          <ul onClick={() => setShowDropDown((prev) => !prev)}>
            <Link href={"/job-seeker/dashboard"}>
              <li className="tw-flex tw-flex-row tw-mb-3">
                <Image
                  src={"/home.png"}
                  width={16}
                  height={16}
                  alt="home"
                  className="tw-object-contain tw-mr-4"
                />
                <p className="tw-text-lg tw-font-medium tw-text-gray-600">
                  Dashboard
                </p>
              </li>
            </Link>
            <Link href={"/job-seeker/profile"}>
              <li className="tw-flex tw-flex-row tw-mb-3">
                <Image
                  src={"/userg.png"}
                  width={16}
                  height={16}
                  alt="home"
                  className="tw-object-contain tw-mr-4"
                />
                <p className="tw-text-lg tw-font-medium tw-text-gray-600">
                  My Profile
                </p>
              </li>
            </Link>
            {/* <Link href={"/job-seeker/resume"}>
              <li className="tw-flex tw-flex-row tw-mb-3">
                <Image
                  src={"/reportg.png"}
                  width={16}
                  height={16}
                  alt="home"
                  className="tw-object-contain tw-mr-4"
                />
                <p className="tw-text-lg tw-font-medium tw-text-gray-600">
                  My Resume
                </p>
              </li>
            </Link> */}
            <Link href={"/job-seeker/settings"}>
              <li className="tw-flex tw-flex-row tw-mb-3">
                <Image
                  src={"/settings.png"}
                  width={16}
                  height={16}
                  alt="home"
                  className="tw-object-contain tw-mr-4"
                />
                <p className="tw-text-lg tw-font-medium tw-text-gray-600">
                  Settings
                </p>
              </li>
            </Link>

            <li className="tw-flex tw-flex-row tw-mb-3">
              <Image
                src={"/logout.png"}
                width={16}
                height={16}
                alt="home"
                className="tw-object-contain tw-mr-4"
              />
              <p
                onClick={() => logout()}
                className="tw-text-lg tw-font-medium tw-text-gray-600 tw-cursor-pointer"
              >
                Logout
              </p>
            </li>
          </ul>
        </div>
      )}
    </Navbar>
  );
}

export default JobSeekerNavBar;

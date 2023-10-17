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
import { useRouter } from "next/navigation";
import Axios from "@/api/server";

function RecruiterNavBar() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [data, setData] = useState();
  useEffect(() => {
    getProfileInformation();
  }, []);

  const getProfileInformation = async () => {
    try {
      if (typeof window !== "undefined") {
        const res = await Axios.get(
          `/jobRecruiter/getJobRecruiterById/${sessionStorage.getItem(
            "employerId"
          )}`
        );

        setData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const router = useRouter();

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
      if (typeof window !== "undefined") {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
        // Unbind the event listener on clean up
        if (typeof window !== "undefined") {
          document.removeEventListener("mousedown", handleClickOutside);
        }
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const logout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.clear();

      global.window.location.href = "/";
    }
    // router.push("/");
  };

  return (
    <Navbar
      collapseOnSelect
      // expand="lg"
      className="bg-body-tertiary tw-px-2 tw-py-3 "
    >
      <Container className="tw-max-w-screen-2xl pnavbar ">
        <Navbar.Brand className=" " href="/">
          <Image
            className="tw-object-contain tw-cursor-pointer tw-w-52 "
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
          <Nav className=" tw-flex tw-flex-row tw-justify-center tw-items-center">
            <Nav.Link href="/employer/profile">
              <Image
                src={"/settings.png"}
                width={30}
                height={30}
                alt="settings"
              />
            </Nav.Link>
            <Nav.Link
              href="#deets"
              onClick={() => setShowDropDown((prev) => !prev)}
            >
              <Image
                src={
                  data?.companyLogoImage ? data.companyLogoImage : "/avatar.png"
                }
                width={40}
                height={40}
                alt="user"
                className=" tw-ml-8 tw-w-10"
              />
            </Nav.Link>
            <Nav.Link
              // ref={wrapperRef}
              className="tw-self-center sm:tw-hidden md:tw-block xsm:tw-hidden"
              onClick={() => setShowDropDown((prev) => !prev)}
              href="#memes"
            >
              <div className="tw-flex tw-flex-row ">
                <h2 className="tw-text-primary tw-text-lg tw-font-medium tw-mr-4">
                  {data?.companyName}
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
          className=" tw-drop-shadow-md tw-absolute md:tw-right-10 tw-top-20 tw-bg-white tw-z-10 tw-rounded-lg tw-pl-6 tw-pr-52 tw-py-6 xsm:tw-right-0 xsm:tw-w-full md:tw-w-4/12 lg:tw-w-3/12"
        >
          <ul onClick={() => setShowDropDown((prev) => !prev)}>
            <Link href={"/employer/dashboard"}>
              <li className="tw-flex tw-flex-row tw-mb-3">
                <Image
                  src={"/home.png"}
                  width={16}
                  height={16}
                  alt="home"
                  className="tw-object-contain tw-mr-4"
                />
                <p className="tw-text-base tw-font-medium tw-text-gray-600">
                  Dashboard
                </p>
              </li>
            </Link>
            <Link href={"/employer/job/list"}>
              <li className="tw-flex tw-flex-row tw-mb-3">
                <Image
                  src={"/reportg.png"}
                  width={16}
                  height={16}
                  alt="home"
                  className="tw-object-contain tw-mr-4"
                />
                <p className="tw-text-base tw-font-medium tw-text-gray-600">
                  Job Applications
                </p>
              </li>
            </Link>

            <li
              onClick={() => logout()}
              className="tw-flex tw-flex-row tw-mb-3 tw-cursor-pointer"
            >
              <Image
                src={"/logout.png"}
                width={16}
                height={16}
                alt="home"
                className="tw-object-contain tw-mr-4"
              />
              <p className="tw-text-base tw-font-medium tw-text-gray-600">
                Logout
              </p>
            </li>
          </ul>
        </div>
      )}
    </Navbar>
  );
}

export default RecruiterNavBar;

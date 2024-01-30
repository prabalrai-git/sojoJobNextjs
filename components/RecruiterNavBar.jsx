"use client";

import Image from "next/image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "@/styles/navbar.css";
import { useRouter } from "next/navigation";
import Axios from "@/api/server";
import { useSelector } from "react-redux";

function RecruiterNavBar() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  const { userDetails } = useSelector((state) => state.userData);

  const router = useRouter();

  function useOutsideAlerter(ref) {
    if (typeof window !== "undefined") {
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

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
          // Unbind the event listener on clean up

          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);
    }
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();

      window.location.href = "/";
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
          <img
            className="tw-object-contain tw-cursor-pointer tw-w-52 "
            src={"/logo.png"}
            width={200}
            height={230}
            alt="logo.png"
            onLoad={() => setIsLogoLoaded(true)}
            style={{ display: isLogoLoaded ? "block" : "none" }}
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
                priority
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
                  userDetails?.companyLogoImage
                    ? userDetails.companyLogoImage
                    : "/avatar.png"
                }
                width={40}
                priority
                height={40}
                alt="user"
                className=" tw-rounded-full tw-ml-8 tw-object-fill tw-w-12 tw-h-12"
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
                  {userDetails?.companyName}
                </h2>
                <Image
                  src={"/down.png"}
                  width={15}
                  priority
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
          className=" tw-drop-shadow-md tw-absolute md:tw-right-10 tw-top-20 tw-bg-white tw-z-10 tw-rounded-lg tw-pl-6 tw-pr-20 tw-py-4 xsm:tw-right-0 xsm:tw-w-full md:tw-w-4/12 lg:tw-w-3/12"
        >
          <ul onClick={() => setShowDropDown((prev) => !prev)}>
            <Link
              className="tw-no-underline tw-flex tw-flex-row tw-my-3  "
              href={"/dashboard/jobs"}
            >
              <Image
                src={"/briefcase.png"}
                width={20}
                priority
                height={20}
                alt="home"
                className="tw-object-contain tw-mr-4"
              />
              <p className="tw-text-base tw-font-medium tw-text-gray-600">
                Public Jobs
              </p>
            </Link>
            <Link
              className="tw-no-underline tw-flex tw-flex-row tw-my-3"
              href={"/employer/dashboard"}
            >
              <Image
                src={"/home.png"}
                width={20}
                height={20}
                priority

                alt="home"
                className="tw-object-contain tw-mr-4"
              />
              <p className="tw-text-base tw-font-medium tw-text-gray-600">
                Dashboard
              </p>
            </Link>
            <Link
              className="tw-no-underline tw-flex tw-flex-row tw-my-3  "
              href={"/employer/job/list"}
            >
              <Image
                src={"/reportg.png"}
                width={20}
                priority
                height={20}
                alt="home"
                className="tw-object-contain tw-mr-4"
              />
              <p className="tw-text-base tw-font-medium tw-text-gray-600">
                Job Applications
              </p>
            </Link>

            <li
              onClick={() => logout()}
              className="tw-flex tw-flex-row tw-my-3 tw-cursor-pointer"
            >
              <Image
                src={"/logout.png"}
                width={20}
                height={20}
                priority

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

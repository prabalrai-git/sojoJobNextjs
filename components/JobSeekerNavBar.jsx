"use client";

import Image from "next/image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "@/styles/navbar.css";
import Axios from "@/api/server";
// import { useRouter } from "next/navigation";
import useSessionStorage from "@/hooks/useSessionStorage";

function JobSeekerNavBar() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [userData, setUserData] = useState();

  const id = useSessionStorage("jobSeekerId");

  useEffect(() => {
    if (id) {
      getProfileInfo();
    }
  }, [id]);

  const getProfileInfo = async () => {
    try {
      const res = await Axios.get(`/jobSeeker/getJobSeekerById/${id}`);
      setUserData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const router = useRouter();

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
      if (typeof window !== "undefined") {
        document.addEventListener("mousedown", handleClickOutside);
      }
      // Bind the event listener
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

      window.location.href = "/";
    }
    // router.push("/");
  };

  return (
    <Navbar
      collapseOnSelect
      // expand="lg"
      className="bg-body-tertiary lg:tw-px-12 tw-py-3 xsm:tw-px-2 "
    >
      <Container className="tw-max-w-screen-2xl pnavbar">
        <Navbar.Brand href="/">
          <Image
            className="tw-object-contain tw-cursor-pointer  "
            src={"/logo.png"}
            width={200}
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
              <h2 className="tw-font-medium tw-text-lg tw-text-black hover:tw-underline xsm:tw-hidden 800:tw-block">
                About Us
              </h2>
            </Nav.Link>
            <Nav.Link
              onClick={() => setShowDropDown((prev) => !prev)}
              href="#deets"
            >
              <Image
                src={
                  userData?.profilePicture
                    ? userData.profilePicture
                    : "/avatar.png"
                }
                width={45}
                height={45}
                alt="user"
                className=" tw-ml-8 tw-rounded-full tw-object-fill tw-w-12 tw-h-12"
              />
            </Nav.Link>
            <Nav.Link
              // ref={wrapperRef}
              className="tw-self-center "
              onClick={() => setShowDropDown((prev) => !prev)}
              href="#memes"
            >
              <div className="800:tw-flex  tw-flex-row xsm:tw-hidden ">
                <h2 className="tw-text-primary tw-text-lg tw-font-medium tw-mr-4 tw-capitalize ">
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
          className=" tw-drop-shadow-md tw-absolute xsm:tw-right-5 md:tw-right-16  tw-top-24 tw-bg-white xsm:tw-w-11/12 md:tw-w-5/12 lg:tw-w-4/12 xl:tw-w-3/12 tw-z-10 tw-rounded-lg tw-pl-6 tw-pr-12 tw-py-6"
        >
          <ul onClick={() => setShowDropDown((prev) => !prev)}>
            <Link className="tw-no-underline" href={"/job-seeker/dashboard"}>
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
            <Link className="tw-no-underline" href={"/job-seeker/profile"}>
              <li className="tw-flex tw-flex-row tw-mb-3">
                <Image
                  src={"/userg.png"}
                  width={16}
                  height={16}
                  alt="home"
                  className="tw-object-contain tw-mr-4 "
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
            {/* <Link href={"/job-seeker/settings"}>
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
            </Link> */}

            <li className="tw-flex tw-flex-row tw-mb-3">
              <Image
                src={"/logout.png"}
                width={16}
                height={16}
                alt="home"
                className="tw-object-contain tw-mr-4 "
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

"use client";
const { default: JobSeekerNavBar } = require("./JobSeekerNavBar");
const { default: NavBar } = require("./NavBar");
const { default: RecruiterNavBar } = require("./RecruiterNavBar");

export const NavBarByUser = () => {
  if (
    global?.window?.sessionStorage &&
    sessionStorage.getItem("userType") === "employer"
  ) {
    return <RecruiterNavBar />;
  } else if (
    global?.window?.sessionStorage &&
    sessionStorage?.getItem("userType") === "job-seeker"
  ) {
    return <JobSeekerNavBar />;
  } else {
    return <NavBar />;
  }
};

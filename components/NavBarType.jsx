"use client";
import JobSeekerNavBar from "./JobSeekerNavBar";
import NavBar from "./NavBar";
import RecruiterNavBar from "./RecruiterNavBar";

export const NavBarByUser = () => {
  if (typeof window !== "undefined") {
    const userType = localStorage.getItem("userType");
    if (userType === "employer") {
      return <RecruiterNavBar />;
    } else if (userType === "job-seeker") {
      return <JobSeekerNavBar />;
    }
    return <NavBar />;
  }
};

const { default: JobSeekerNavBar } = require("./JobSeekerNavBar");
const { default: NavBar } = require("./NavBar");
const { default: RecruiterNavBar } = require("./RecruiterNavBar");

export const NavBarByUser = () => {
  if (localStorage.getItem("userType") === "employer") {
    return <RecruiterNavBar />;
  } else if (localStorage.getItem("userType") === "job-seeker") {
    return <JobSeekerNavBar />;
  } else {
    return <NavBar />;
  }
};

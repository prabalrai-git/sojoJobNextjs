const { default: JobSeekerNavBar } = require("./JobSeekerNavBar");
const { default: NavBar } = require("./NavBar");
const { default: RecruiterNavBar } = require("./RecruiterNavBar");

export const NavBarByUser = () => {
  if (sessionStorage.getItem("userType") === "employer") {
    return <RecruiterNavBar />;
  } else if (sessionStorage.getItem("userType") === "job-seeker") {
    return <JobSeekerNavBar />;
  } else {
    return <NavBar />;
  }
};

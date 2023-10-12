let isAuthenticated = false;

export const checkEmployerAuth = () => {
  if (isAuthenticated === false) {
    const userType = sessionStorage?.getItem("userType");
    const employerId = sessionStorage?.getItem("employerId");
    isAuthenticated = userType === "employer";
  }
  return isAuthenticated;
};

export const checkEmployeeAuth = () => {
  const userType = sessionStorage?.getItem("userType");

  if (userType === "job-seeker") {
    return true;
  } else {
    return false;
  }
};

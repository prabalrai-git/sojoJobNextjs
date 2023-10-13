let isAuthenticated = false;

export const checkEmployerAuth = () => {
  if (isAuthenticated === false) {
    const userType =
      global?.window?.sessionStorage && sessionStorage?.getItem("userType");
    const employerId =
      global?.window?.sessionStorage && sessionStorage?.getItem("employerId");
    isAuthenticated = userType === "employer";
  }
  return isAuthenticated;
};

export const checkEmployeeAuth = () => {
  const userType =
    global?.window?.sessionStorage && sessionStorage?.getItem("userType");

  if (userType === "job-seeker") {
    return true;
  } else {
    return false;
  }
};

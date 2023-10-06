let isAuthenticated = false;

export const checkEmployerAuth = () => {
  if (isAuthenticated === false) {
    const userType = localStorage.getItem("userType");
    const employerId = localStorage.getItem("employerId");
    isAuthenticated = userType === "employer";
  }
  return isAuthenticated;
};

export const checkEmployeeAuth = () => {
  const userType = localStorage.getItem("userType");

  if (userType === "job-seeker") {
    return true;
  } else {
    return false;
  }
};

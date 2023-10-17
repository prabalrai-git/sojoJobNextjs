let isAuthenticated = false;

export const checkEmployerAuth = () => {
  if (isAuthenticated === false) {
    const userType =
      typeof window !== "undefined" && sessionStorage.getItem("userType");
    const employerId =
      typeof window !== "undefined" && sessionStorage?.getItem("employerId");
    isAuthenticated = userType === "employer";
  }
  return isAuthenticated;
};

export const checkEmployeeAuth = () => {
  const userType =
    typeof window !== "undefined" && sessionStorage?.getItem("userType");

  if (userType === "job-seeker") {
    return true;
  } else {
    return false;
  }
};

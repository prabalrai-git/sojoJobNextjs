import RecruiterNavBar from "@/components/RecruiterNavBar";
import React from "react";

function layout({ children }) {
  return (
    <>
      <RecruiterNavBar />
      <div className="tw-bg-employerBg tw-min-h-screen">{children}</div>
    </>
  );
}

export default layout;

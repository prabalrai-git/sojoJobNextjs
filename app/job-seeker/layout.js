import Footer from "@/components/Footer";
import JobSeekerNavBar from "@/components/JobSeekerNavBar";
import React from "react";

function layout({ children }) {
  return (
    <>
      <JobSeekerNavBar />
      <div className="tw-bg-employerBg tw-min-h-screen">{children}</div>
      <Footer />
    </>
  );
}

export default layout;

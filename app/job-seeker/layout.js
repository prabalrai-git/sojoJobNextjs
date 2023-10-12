"use client";
import Footer from "@/components/Footer";
import JobSeekerNavBar from "@/components/JobSeekerNavBar";
import { checkEmployeeAuth } from "@/helpers/checkAuths";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function layout({ children }) {
  const router = useRouter();

  const check = checkEmployeeAuth();
  if (!check) {
    return router.replace("/");
  } else {
    return (
      <>
        <JobSeekerNavBar />
        <div className="tw-bg-employerBg tw-min-h-screen">{children}</div>
        <Footer />
      </>
    );
  }
}

export default layout;

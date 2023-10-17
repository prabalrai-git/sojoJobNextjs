"use client";
import Footer from "@/components/Footer";
import JobSeekerNavBar from "@/components/JobSeekerNavBar";
import { checkEmployeeAuth } from "@/helpers/checkAuths";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Layout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initialize with the correct initial value
  const router = useRouter();

  useEffect(() => {
    const check = checkEmployeeAuth(); // You may have your own logic here
    setIsAuthenticated(check);

    if (!check) {
      router.replace("/"); // Redirect to the homepage if not authenticated
    }
  }, []);

  if (!isAuthenticated) {
    // Render nothing or a loading indicator
    return null;
  }

  return (
    <>
      <JobSeekerNavBar />
      <div className="tw-bg-employerBg tw-min-h-screen">{children}</div>
      <Footer />
    </>
  );
}

export default Layout;

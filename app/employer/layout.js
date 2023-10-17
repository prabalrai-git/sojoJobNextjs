"use client";
import RecruiterNavBar from "@/components/RecruiterNavBar";
import { checkEmployerAuth } from "@/helpers/checkAuths";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function layout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initialize with the correct initial value

  const router = useRouter();

  useEffect(() => {
    const check = checkEmployerAuth(); // You may have your own logic here
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
      <RecruiterNavBar />
      <div className="tw-bg-employerBg tw-min-h-screen">{children}</div>
    </>
  );
}

export default layout;

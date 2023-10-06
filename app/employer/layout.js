"use client";
import RecruiterNavBar from "@/components/RecruiterNavBar";
import { checkEmployerAuth } from "@/helpers/checkAuths";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function layout({ children }) {
  const router = useRouter();

  const check = checkEmployerAuth();
  if (!check) {
    return router.replace("/");
  } else {
    return (
      <>
        <RecruiterNavBar />
        <div className="tw-bg-employerBg tw-min-h-screen">{children}</div>
      </>
    );
  }
}

export default layout;

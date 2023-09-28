"use client";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import RecruiterNavBar from "@/components/RecruiterNavBar";
import React from "react";

function layout({ children }) {
  const NavBarByUser = () => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("userType") === "employer") {
        return <RecruiterNavBar />;
      } else {
        return <NavBar />;
      }
    }
  };
  return (
    <>
      {NavBarByUser()}
      <div
        style={{
          minHeight: `calc(100vh- 108px - 741px)`,
          paddingBottom: 100,
        }}
      >
        {children}
      </div>
      <Footer />
    </>
  );
}

export default layout;

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import React from "react";

function layout({ children }) {
  return (
    <>
      <NavBar />
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

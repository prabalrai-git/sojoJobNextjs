"use client";

import Footer from "@/components/Footer";
import { NavBarByUser } from "@/components/NavBarType";
import React from "react";

function layout({ children }) {
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

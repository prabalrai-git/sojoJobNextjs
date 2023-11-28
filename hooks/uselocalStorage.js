"use client";
import { useState, useEffect } from "react";

const uselocalStorage = (name) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(localStorage.getItem(name));
  }, []);

  return value;
};

export default uselocalStorage;

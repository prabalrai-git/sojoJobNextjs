"use client";
import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./features/userData/userDataSlice";

export const store = configureStore({
  reducer: {
    userData: userDataSlice,
  },
});

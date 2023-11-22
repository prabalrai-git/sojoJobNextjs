"use client";
import { getUserDetails } from "@/features/userData/userDataSlice";
import { store } from "@/store";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

export function Providers({ children }) {
  const [userType, setUserType] = useState();

  useEffect(() => {
    setUserType(sessionStorage.getItem("userType"));
    if (userType) {
      store.dispatch(getUserDetails(userType));
    }
  }, [userType]);

  return <Provider store={store}>{children}</Provider>;
}

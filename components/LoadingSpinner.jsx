import { Spin } from "antd";
import React from "react";

function LoadingSpinner() {
  return (
    <Spin
      className="tw-absolute tw-w-full tw-h-screen tw-m-auto "
      size="large"
    />
  );
}

export default LoadingSpinner;

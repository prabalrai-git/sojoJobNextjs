import ProgressMsg from "@/components/ProgressMsg";
import Image from "next/image";
import React from "react";

function page() {
  return (
    <div className="tw-pt-10 tw-px-36">
      <div className="tw-flex tw-flex-row tw-justify-between">
        <h1 className="tw-text-4xl tw-font-semibold">Welcome </h1>
        <button className="tw-bg-primary tw-rounded-lg tw-px-4 tw-py-3 tw-text-white tw-flex tw-flex-row">
          <Image
            src={"/add.png"}
            width={20}
            height={20}
            alt="add"
            className="tw-self-center tw-mr-3"
          />

          <p className="tw-self-center tw-text-lg">Post a Job</p>
        </button>
      </div>
      <p className="tw-text-lg">
        This is your personalized space where we help you find an ideal match!
      </p>
      <ProgressMsg />
    </div>
  );
}

export default page;

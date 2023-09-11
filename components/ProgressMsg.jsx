"use client";

import Link from "next/link";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ProgressMsg({ completionPercentage }) {
  return (
    <div className="tw-w-full tw-rounded-lg tw-py-5 tw-px-4 tw-bg-progressBg tw-mt-10 tw-flex tw-flex-row tw-justify-between">
      <div className="tw-flex tw-flex-row">
        <div className="tw-h-20 tw-w-20">
          <CircularProgressbar
            className="tw-bg-white tw-rounded-full tw-text-progressLightBg"
            value={completionPercentage && completionPercentage}
            text={`${completionPercentage && completionPercentage}%`}
            styles={buildStyles({
              // Rotation of path and trail, in number of turns (0-1)
              //   rotation: 0.25,

              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: "butt",

              // Text size
              textSize: "30px",

              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,

              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',

              // Colors
              pathColor: `rgba(234, 164, 68, ${completionPercentage / 100})`,
              textColor: "#E58C17",

              trailColor: "#fff",
              backgroundColor: "#EAA444",
            })}
          />
        </div>
        <div className="tw-self-center tw-ml-10">
          <h2 className="tw-text-white tw-font-semibold tw-mb-0 tw-text-lg">
            Your details are missing!
          </h2>
          <h3 className="tw-text-white tw-font-base tw-mb-2 tw-text-lg">
            Post a free job to complete your profile
          </h3>
        </div>
      </div>
      <Link className=" tw-self-center" href={"/employer/job/create"}>
        <button className="tw-bg-progressLightBg tw-rounded-lg tw-h-12 tw-self-center tw-px-4 tw-py-3 tw-text-white ">
          Post a Job
        </button>
      </Link>
    </div>
  );
}

export default ProgressMsg;

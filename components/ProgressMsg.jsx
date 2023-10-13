"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ProgressMsg({ completionPercentage, fromJobSeeker }) {
  return (
    <div
      style={{ backgroundColor: fromJobSeeker ? "#266baf" : "#E58C17" }}
      className="tw-w-full tw-rounded-lg tw-py-5 tw-px-4 tw-mt-10 tw-flex tw-flex-row tw-justify-between"
    >
      <div className="tw-flex tw-flex-row">
        <div className="tw-h-20 tw-w-20">
          {fromJobSeeker ? (
            <Image
              src={"/BlueA.png"}
              width={100}
              height={100}
              alt="profileImg"
              className="tw-bg-white tw-rounded-full tw-p-4"
            />
          ) : (
            <CircularProgressbar
              className="tw-bg-white tw-rounded-full "
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
                textColor: fromJobSeeker ? "#0069d3" : "#E58C17",

                trailColor: "#fff",
                backgroundColor: fromJobSeeker ? "#266baf" : "#EAA444",
              })}
            />
          )}
        </div>
        <div className="tw-self-center tw-ml-10">
          <h2 className="tw-text-white tw-font-semibold tw-mb-0 tw-text-lg">
            Your details are missing!
          </h2>
          <h3 className="tw-text-white tw-font-base tw-mb-2 tw-text-lg">
            {fromJobSeeker
              ? "Just a few more steps and your SojoJob profile is complete! Setup now to enjoy unlimited benefits."
              : "Post a free job to complete your profile"}
          </h3>
        </div>
      </div>
      <Link
        className=" tw-self-center"
        href={fromJobSeeker ? "/job-seeker/profile" : "/employer/job/create"}
      >
        <button
          style={{
            backgroundColor: fromJobSeeker ? "white" : "#EAA444",
            color: fromJobSeeker ? "#0069d3" : "white",
          }}
          className=" tw-rounded-lg tw-h-12 tw-self-center tw-px-4 tw-py-3  "
        >
          {fromJobSeeker ? "Setup Now" : "Post a Job"}
        </button>
      </Link>
    </div>
  );
}

export default ProgressMsg;

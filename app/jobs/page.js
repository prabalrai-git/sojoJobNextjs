import JobCard from "@/components/JobCard";
import { job } from "@/dummyData";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function page() {
  const responsibilities = [
    "Software testing.",
    "Coordinate with the Team leader in implementation.",
    "Collaborate with other team members to solve the issues.",
    "Quickly produce well-organized, optimized, and documented manual.",
    "Installing and configuring different servers (File Server, Database Server, Etc.).",
    "Managing and maintaining the different servers.",
    "Implementation of software.",
    "Work independently when required.",
    "Continuously learn and improve skills.",
    "Have to travel extensively across Nepal for implementation.",
  ];

  const data = [1, 2, 3, 4, 5, 6];

  return (
    <div>
      <div className="tw-w-full tw-relative ">
        <Image
          src={"/singlebg.png"}
          width={300}
          height={50}
          alt="singlebg.png"
          //   style={{ height: "200px", width: "100%" }}
          className="tw-w-full tw-object-cover tw-h-40"
        />
        <Image
          src={"/companyLogo.png"}
          width={115}
          height={115}
          alt="companyLogo"
          className="tw-rounded-full tw-absolute tw-top-24 tw-left-40"
        />
      </div>
      <div className="tw-mx-28 tw-mt-32">
        <div className="tw-flex tw-flex-row tw-justify-between">
          <div>
            <h3>Linux System Engineer</h3>
            <p>Sojojob</p>
          </div>
          <div>
            <button className="tw-bg-primary hover:tw-bg-buttonHover   tw-text-white tw-rounded-lg tw-px-7 tw-py-4">
              Apply now!
            </button>
          </div>
        </div>
        {/*  */}
        <div className="tw-flex tw-flex-row tw-mt-4">
          <div className="tw-flex tw-flex-row tw-mr-7 tw-items-center">
            <Image
              src={"/clock.png"}
              width={20}
              height={20}
              alt="timing"
              className="tw-object-contain tw-mr-3 tw-self-center tw-mb-4"
            />

            <p className="tw-self-center tw-text-gray-600 tw-text-medium">
              Full Time
            </p>
          </div>
          <div className="tw-flex tw-flex-row tw-mr-7 tw-items-center">
            <Image
              src={"/signal-status.png"}
              width={20}
              height={20}
              alt="timing"
              className="tw-object-contain tw-mr-3 tw-self-center tw-mb-4"
            />

            <p className="tw-self-center tw-text-gray-600 tw-text-medium">
              Mid Level
            </p>
          </div>
          <div className="tw-flex tw-flex-row tw-mr-7 tw-items-center">
            <Image
              src={"/money.png"}
              width={20}
              height={20}
              alt="timing"
              className="tw-object-contain tw-mr-3 tw-self-center tw-mb-4"
            />

            <p className="tw-self-center tw-text-gray-600 tw-text-medium">
              Negotiable
            </p>
          </div>
          <div className="tw-flex tw-flex-row tw-mr-7 tw-items-center">
            <Image
              src={"/briefcase.png"}
              width={20}
              height={20}
              alt="timing"
              className="tw-object-contain tw-mr-3 tw-self-center tw-mb-4"
            />

            <p className="tw-self-center tw-text-gray-600 tw-text-medium">
              In Office
            </p>
          </div>
        </div>
        {/*  */}
        <div className="tw-mt-10">
          <h4>Job Description</h4>
          <h3 className="tw-mt-7 tw-underline">Responsibilities</h3>
          <div>
            {responsibilities?.map((item) => {
              return (
                <p className="tw-text-black tw-font-normal tw-mb-1">• {item}</p>
              );
            })}
          </div>
          <h3 className="tw-mt-10 tw-underline">Requirements</h3>
          <div>
            {responsibilities?.map((item) => {
              return (
                <p className="tw-text-black tw-font-normal tw-mb-1">• {item}</p>
              );
            })}
          </div>
        </div>
        {/*  */}
        <div className="tw-mt-32">
          <div className="tw-flex tw-flex-row tw-items-stretch">
            <Image
              className="tw-self-center tw-mb-3"
              src={"/briefcase.png"}
              height={30}
              width={30}
              alt="fire.png"
            />
            <h2 className="tw-self-center tw-ml-3 tw-font-medium tw-text-lg">
              Jobs At Sojojob
            </h2>
          </div>
          <div className="tw-grid tw-grid-cols-3 md:tw-grid-cols-3 sm:tw-grid-cols-1 tw-gap-4 tw-mt-10">
            {data.map((item) => {
              return (
                <Link href="/jobs" className="tw-text-black tw-no-underline">
                  <JobCard key={item} job={job} />
                </Link>
              );
            })}
          </div>
        </div>
        {/*  */}
        <div className="tw-mt-20">
          <div className="tw-flex tw-flex-row tw-items-stretch">
            <Image
              className="tw-self-center tw-mb-3"
              src={"/briefcase.png"}
              height={30}
              width={30}
              alt="fire.png"
            />
            <h2 className="tw-self-center tw-ml-3 tw-font-medium tw-text-lg">
              Other Jobs
            </h2>
          </div>
          <div className="tw-grid tw-grid-cols-3 md:tw-grid-cols-3 sm:tw-grid-cols-1 tw-gap-4 tw-mt-10">
            {data.map((item) => {
              return (
                <Link href="/jobs" className="tw-text-black tw-no-underline">
                  <JobCard key={item} job={job} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

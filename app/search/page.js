"use client";

import JobCard from "@/components/JobCard";
import { job } from "@/dummyData";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Form from "react-bootstrap/Form";
// import "@/styles/global.css";

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
  const data = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];

  return (
    <div className="tw-mx-28 xsm:tw-mx-5 sm:tw-mx-10 md:tw-mx-28 tw-mt-10">
      <div className="tw-flex tw-flex-row xsm:tw-flex-col  sm:tw-flex-col  md:tw-flex-row tw-justify-between">
        <h2 className="tw-font-medium">Search Jobs</h2>
        <div className="tw-flex tw-justify-center tw-mb-10  xsm:tw-w-11/12 sm:tw-w-11/12 md:tw-w-3/12 tw-relative 950:tw-w-5/12 800:tw-w-5/12 lg:tw-w-3/12">
          {/* <Input
          className="tw-bg-textInput tw-w-96 tw-h-15"
          size="large"
          placeholder="Search jobs"
          prefix={<SearchOutlined />}
        /> */}
          <input
            type="text"
            id="fname"
            name="fname"
            style={{ height: "50px" }}
            placeholder="Search Jobs"
            className="tw-bg-textInput tw-w-full tw-rounded-lg tw-pl-10"
          ></input>
          <Image
            src={"/search.png"}
            width={20}
            height={20}
            alt="search.png"
            className="tw-object-contain tw-absolute tw-top-4 tw-left-3 "
          />
        </div>
      </div>
      {/*  */}
      <h5 className="tw-font-medium">Filters:</h5>
      <div className="tw-grid tw-grid-cols-4 tw-gap-4 xsm:tw-grid-cols-1  tw-mt-8 sm:tw-grid-cols-1 md:tw-grid-cols-4">
        <div className="tw-mr-4 tw-w-11/12">
          <Form.Select className="tw-h-12" aria-label="Default select example">
            <option>Categories</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </div>
        <div className="tw-mr-4 tw-w-11/12">
          <Form.Select className="tw-h-12" aria-label="Default select example">
            <option>Education Level</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </div>
        <div className="tw-mr-4 tw-w-11/12">
          <Form.Select className="tw-h-12" aria-label="Default select example">
            <option>Expericence Level</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </div>
      </div>
      {/*  */}
      {/*  */}
      <div className="tw-grid tw-grid-cols-3 tw-mt-10 tw-gap-5 xsm:tw-grid-cols-1 sm:tw-grid-cols-1 md:tw-grid-cols-1 lg:tw-grid-cols-3">
        <div className="xsm:tw-order-2 sm:tw-order-2 md:tw-order-2 lg:tw-order-1 ">
          <h4 className="tw-mt-10 tw-mb-10">23 jobs listed currently</h4>

          <div
            style={{ height: 1100 }}
            className="tw-grid tw-grid-cols-1 tw-gap-4 tw-overflow-y-auto tw-no-scrollbar tw-pr-5 "
          >
            {data.map((item) => {
              return (
                <Link href="/jobs" className="tw-text-black tw-no-underline">
                  <JobCard key={item} job={job} />
                </Link>
              );
            })}
          </div>
        </div>
        <div className=" xsm:tw-order-1 sm:tw-order-1 md:tw-order-1 lg:tw-order-2 tw-col-span-2 tw-border-2  tw-border-cardBorder tw-rounded-lg tw-p-10 tw-py-16 xsm:tw-p-3 sm:tw-p-5 md:tw-p-10">
          <div className="tw-flex tw-flex-row tw-justify-between">
            <div>
              <h3 className="xsm:tw-text-lg sm:tw-text-xl md:tw-text-3xl">
                Linux System Engineer
              </h3>
              <p>Sojojob</p>
            </div>
            <div>
              <button className="tw-bg-primary hover:tw-bg-buttonHover   tw-text-white tw-rounded-lg tw-px-7 tw-py-4">
                Apply now!
              </button>
            </div>
          </div>
          {/*  */}
          <div className="tw-flex tw-flex-row tw-mt-4 tw-flex-wrap">
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
                  <p className="tw-text-black tw-font-normal tw-mb-1">
                    • {item}
                  </p>
                );
              })}
            </div>
            <h3 className="tw-mt-10 tw-underline">Requirements</h3>
            <div>
              {responsibilities?.map((item) => {
                return (
                  <p className="tw-text-black tw-font-normal tw-mb-1">
                    • {item}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

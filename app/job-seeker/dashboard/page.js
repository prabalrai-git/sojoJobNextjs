"use client";

import AppliedJobs from "@/components/AppliedJobs";
import JobCard from "@/components/JobCard";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Axios from "@/api/server";
import Image from "next/image";
import ProgressMsg from "@/components/ProgressMsg";

function page() {
  const [standardJobs, setStandardJobs] = useState(null);
  const [profileCompletion, setProfileCompletion] = useState();

  useEffect(() => {
    getStandardJobs();
    getProfileCompletionPercentage();
  }, []);

  const getStandardJobs = async (req, res) => {
    try {
      const res = await Axios.get("/public/getStandardJobs");
      setStandardJobs(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProfileCompletionPercentage = async () => {
    try {
      const res = await Axios.get(
        `/jobSeeker/getProfileCompletionPercentage/${sessionStorage.getItem(
          "jobSeekerId"
        )}`
      );
      setProfileCompletion(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className=" tw-px-20 tw-pb-12 ">
        <div className="tw-pt-10  tw-pb-4">
          <h1 className="tw-text-3xl tw-mb-4 tw-font-semibold">
            Welcome User!
          </h1>
          <h2 className="tw-text-lg">
            This is your personalized space where we help you find an ideal
            match!
          </h2>
          {profileCompletion?.profileComplete === false && (
            <ProgressMsg
              fromJobSeeker={true}
              completionPercentage={
                profileCompletion?.profileCompletionPercentage
                  ? profileCompletion.profileCompletionPercentage
                  : 0
              }
            />
          )}
          <AppliedJobs />
        </div>
        <div className="tw-flex tw-flex-row">
          <Image
            src={"/fireo.png"}
            width={25}
            height={25}
            alt="fireo"
            className="tw-object-contain tw-mr-3"
          />
          <p className="tw-text-gray-600 tw-font-semibold tw-text-lg tw-self-end">
            Jobs for you
          </p>
        </div>
        <div className="tw-grid  tw-grid-cols-3 tw-gap-4 tw-mt-10 md:tw-grid-cols-1 lg:tw-grid-cols-3 sm:tw-grid-cols-1 xsm:tw-grid-cols-1 800:tw-grid-cols-2 ">
          {standardJobs?.map((item) => {
            return (
              <Link
                href={{
                  pathname: "/jobs",
                  query: { id: item.id }, // the data
                }}
                className="tw-text-black tw-no-underline"
              >
                <JobCard whiteBg={true} key={item} job={item} />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default page;

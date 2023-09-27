"use client";

import MonthlyInfoCard from "@/components/MonthlyInfoCard";
import PostedJobs from "@/components/PostedJobs";
import ProgressMsg from "@/components/ProgressMsg";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import Avatar from "react-avatar";
import Axios from "@/api/server";

function page() {
  const [overViewData, setOverViewData] = useState({
    totalJobsPosted: 0, // Replace with your default value
    totalActiveJobs: 0, // Replace with your default value
    profileViews: 0, // Replace with your default value
  });
  const [sojoRep, setSojoRep] = useState({
    profileImage: "", // Replace with your default value
    email: "", // Replace with your default value
    phone: "", // Replace with your default value
  });

  const getOverViewData = useCallback(async () => {
    try {
      const id = localStorage.getItem("employerId");

      const res = await Axios.get(
        `/jobRecruiter/getMonthlyOverviewDataByRecruiterId/${id}`
      );

      setOverViewData(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(overViewData);

  const getSojoRep = useCallback(async () => {
    try {
      const res = await Axios.get(
        "/sojoJobContactPerson/getSojoJobContactPersonDetails"
      );

      setSojoRep(res.data.data[1]);
    } catch (error) {}
  }, []);
  useEffect(() => {
    getOverViewData();
    getSojoRep();
  }, [getOverViewData, getSojoRep]);

  return (
    <div className="tw-pt-10 tw-px-10 tw-pb-12">
      <div className="tw-flex tw-flex-row tw-justify-between xsm:tw-flex-col  md:tw-flex-row">
        <div className="tw-flex tw-flex-col ">
          <h1 className="tw-text-4xl tw-font-semibold">Welcome </h1>
          <p className="tw-text-lg tw-mt-3">
            This is your personalized space where we help you find an ideal
            match!
          </p>
        </div>
        <Link
          className="md:tw-w-3/12 lg:tw-w-2/12 tw-mt-5"
          href={"/employer/job/create"}
        >
          <button className="tw-bg-primary hover:tw-bg-buttonHover tw-rounded-lg xsm:tw-w-full tw-py-4  tw-text-white tw-flex tw-flex-row tw-items-center tw-justify-center md:tw-w-full ">
            <Image
              src={"/add.png"}
              width={25}
              height={25}
              alt="add"
              className="tw-self-center tw-mr-3"
            />

            <p className="tw-self-center tw-text-base tw-font-bold">
              Post a Job
            </p>
          </button>
        </Link>
      </div>

      {overViewData?.profileComplete === false && (
        <ProgressMsg
          completionPercentage={
            overViewData?.profileCompletionPercentage
              ? overViewData.profileCompletionPercentage
              : 0
          }
        />
      )}
      <div className="tw-mt-10 tw-grid xsm:tw-grid-cols-1 sm:tw-grid-cols-1 md:tw-grid-cols-1 lg:tw-grid-cols-2 xl:tw-grid-cols-9  ">
        <div className="tw-bg-white tw-rounded-lg tw-col-span-6 xl:tw-mr-4 xsm:tw-mr-0  ">
          <div className="tw-px-10 tw-py-6">
            <div className="tw-flex tw-flex-row">
              <Image
                src={"/borderBlack.png"}
                width={10}
                height={10}
                alt="border"
                className="tw-object-fit tw-mr-7"
              />
              <h1 className="tw-text-lg tw-font-semibold tw-self-center">
                Monthly Overview
              </h1>
            </div>
            <div className="tw-grid tw-grid-cols-3 1200:tw-grid-cols-3 sm:tw-grid-cols-1 xsm:tw-grid-cols-1 md:tw-grid-cols-3 xl:tw-grid-cols-3 tw-mt-5 tw-gap-2">
              <MonthlyInfoCard
                title={"Jobs Posted"}
                data={overViewData?.totalJobsPosted}
              />
              <MonthlyInfoCard
                title={"Active Jobs"}
                data={overViewData?.totalActiveJobs}
              />
              <MonthlyInfoCard
                title={"Total Views"}
                data={overViewData?.profileViews}
              />
            </div>
          </div>
        </div>
        <div
          style={{ height: "295px" }}
          className="tw-bg-white tw-rounded-lg tw-col-span-3 tw-grid tw-w-full lg:tw-mt-10 xl:tw-mt-0 xsm:tw-mt-10 "
        >
          <div className="tw-px-10 tw-py-6 ">
            <div className="tw-flex tw-flex-row">
              <Image
                src={"/borderBlack.png"}
                width={10}
                height={10}
                alt="border"
                className="tw-object-fit tw-mr-7"
              />
              <h1 className="tw-text-lg tw-font-semibold tw-self-center">
                Contact Person
              </h1>
            </div>
            <div className="tw-mt-1  tw-flex tw-flex-col tw-items-center tw-h-40 450:tw-flex-row tw-mt-5">
              <div className="">
                <Avatar
                  size="100"
                  src={sojoRep?.profileImage}
                  round={true}
                  className=" tw-border-gray-200 tw-mr-5 "
                  style={{ borderWidth: 0.5 }}
                />
              </div>
              <div className=" tw-grid ">
                <h2 className="tw-font-semibold tw-text-lg">
                  Sojo Representative
                </h2>
                <h2 className="tw-text-lg">{sojoRep?.email}</h2>
                <p className="tw-text-lg">{sojoRep?.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PostedJobs />
    </div>
  );
}

export default page;

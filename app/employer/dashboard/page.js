"use client";

import MonthlyInfoCard from "@/components/MonthlyInfoCard";
import PostedJobs from "@/components/PostedJobs";
import ProgressMsg from "@/components/ProgressMsg";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import Axios from "@/api/server";

function page() {
  const [overViewData, setOverViewData] = useState();
  const [sojoRep, setSojoRep] = useState();

  useEffect(() => {
    getOverViewData();
    getSojoRep();
  }, []);

  const getOverViewData = async () => {
    try {
      const id = localStorage.getItem("id");

      const res = await Axios.get(
        `/jobRecruiter/getMonthlyOverviewDataByRecruiterId/${id}`
      );

      setOverViewData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSojoRep = async () => {
    try {
      const res = await Axios.get(
        "/sojoJobContactPerson/getSojoJobContactPersonDetails"
      );

      setSojoRep(res.data.data[1]);
    } catch (error) {}
  };

  return (
    <div className="tw-pt-10 tw-px-20 tw-pb-12">
      <div className="tw-flex tw-flex-row tw-justify-between">
        <h1 className="tw-text-4xl tw-font-semibold">Welcome </h1>
        <Link href={"/employer/job/create"}>
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
        </Link>
      </div>
      <p className="tw-text-lg">
        This is your personalized space where we help you find an ideal match!
      </p>
      <ProgressMsg
        completionPercentage={overViewData?.profileCompletionPercentage}
      />
      <div className="tw-mt-10 tw-grid xsm:tw-grid-cols-1 sm:tw-grid-cols-1 md:tw-grid-cols-1 lg:tw-grid-cols-1 xl:tw-grid-cols-9 tw-gap-5 ">
        <div className="tw-bg-white tw-rounded-lg tw-col-span-6 ">
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
            <div className="tw-grid tw-grid-cols-3 1200:tw-grid-cols-2 sm:tw-grid-cols-1 xsm:tw-grid-cols-1 md:tw-grid-cols-2 xl:tw-grid-cols-3 tw-mt-5 tw-gap-2">
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
          style={{ height: "290px" }}
          className="tw-bg-white tw-rounded-lg tw-col-span-3 "
        >
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
                Contact Person
              </h1>
            </div>
            <div className="tw-mt-8  tw-flex tw-flex-row tw-items-center tw-h-40">
              <div className="">
                <Avatar
                  size="80"
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

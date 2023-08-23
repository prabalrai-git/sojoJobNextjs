"use client";

import MonthlyInfoCard from "@/components/MonthlyInfoCard";
import PostedJobs from "@/components/PostedJobs";
import ProgressMsg from "@/components/ProgressMsg";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Avatar from "react-avatar";

function page() {
  return (
    <div className="tw-pt-10 tw-px-36 tw-pb-12">
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

          <Link href={"/employer/job/create"}>
            <p className="tw-self-center tw-text-lg">Post a Job</p>
          </Link>
        </button>
      </div>
      <p className="tw-text-lg">
        This is your personalized space where we help you find an ideal match!
      </p>
      <ProgressMsg />
      <div className="tw-mt-10 tw-grid tw-grid-cols-5 tw-gap-6">
        <div className="tw-bg-white tw-rounded-lg tw-col-span-3">
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
            <div className="tw-grid tw-grid-cols-3 tw-mt-5 tw-gap-2">
              <MonthlyInfoCard />
              <MonthlyInfoCard />
              <MonthlyInfoCard />
            </div>
          </div>
        </div>
        <div className="tw-bg-white tw-rounded-lg tw-col-span-2">
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
            <div className="tw-mt-8 tw-grid tw-grid-cols-6">
              <div className="tw-col-span-2">
                <Avatar
                  size="110"
                  src={"/rep.png"}
                  round={true}
                  className=" tw-border-gray-200"
                  style={{ borderWidth: 0.5 }}
                />
              </div>
              <div className="tw-col-span-4 tw-grid tw-gap-1">
                <h2 className="tw-font-semibold tw-text-lg">
                  Sojo Representative
                </h2>
                <h2 className="tw-text-lg">vivek.lama@gmail.com</h2>
                <p className="tw-text-lg">+911 9841 234 567</p>
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

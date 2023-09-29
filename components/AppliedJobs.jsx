"use client";

import { Table } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import JobCard from "./JobCard";
import Axios from "@/api/server";
import { useEffect } from "react";

function AppliedJobs({ fromList }) {
  const [standardJobs, setStandardJobs] = useState(null);

  useEffect(() => {
    getStandardJobs();
  }, []);

  const getStandardJobs = async (req, res) => {
    try {
      const res = await Axios.get("/public/getStandardJobs");
      setStandardJobs(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Employer",
      dataIndex: "employer",
      key: "employer",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Job Type",
      dataIndex: "jobType",
      key: "jobType",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
    },
    {
      title: "Actions",
      dataIndex: "remarks",
      key: "remarks",
    },
  ];
  const jobQuestions = [];

  return (
    <>
      <div className="tw-bg-white tw-rounded-lg tw-w-full tw-mt-10 tw-px-10 tw-py-6 tw-mb-10">
        <div className="tw-flex tw-flex-row tw-justify-between">
          <div className="tw-flex tw-flex-row">
            <Image
              src={"/borderBlack.png"}
              width={10}
              height={10}
              alt="border"
              className="tw-object-fit tw-mr-5"
            />
            <h1 className="tw-text-lg tw-font-semibold tw-self-center">
              Jobs You Applied
            </h1>
          </div>
          {!fromList && (
            <Link className="tw-self-center" href={"/employer/job/list"}>
              <h1 className=" tw-text-primary">SEE ALL</h1>
            </Link>
          )}
        </div>
        {/* <Image
        src={"/files.png"}
        height={145}
        width={145}
        alt="file"
        className="tw-relative tw-right-0 tw-left-0 tw-mx-auto"
      /> */}
        {jobQuestions.length > 0 ? (
          <Table
            className="tw-mt-10"
            columns={columns}
            dataSource={jobQuestions}
            scroll={{ x: 900 }}
          />
        ) : (
          <Image
            src={"/files.png"}
            height={145}
            width={145}
            alt="file"
            className="tw-relative tw-right-0 tw-left-0 tw-mx-auto"
          />
        )}
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
      <div className="tw-grid tw-grid-cols-3 tw-gap-4 tw-mt-10 md:tw-grid-cols-1 lg:tw-grid-cols-3 sm:tw-grid-cols-1 xsm:tw-grid-cols-1 800:tw-grid-cols-2 ">
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
    </>
  );
}

export default AppliedJobs;

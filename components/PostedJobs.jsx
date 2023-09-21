"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Axios from "@/api/server";
import { Space, Table, Tag } from "antd";

function PostedJobs({ fromList }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getAllJobs();
  }, []);

  const getAllJobs = async () => {
    try {
      const res = await Axios.get(
        `/job/getJobsByRecruiterId?recruiterId=${Number(
          localStorage.getItem("employerId")
        )}`
      );
      setJobs(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "Job Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Job Posted",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => text.split("T")[0],
    },
    {
      title: "Status",
      dataIndex: "jobStatus",
      key: "jobStatus",
      render: (text) => {
        if (text.toLowerCase() == "pending") {
          return <p className="tw-text-progressBg">{text}</p>;
        } else if (text.toLowerCase() == "active") {
          return <p className="tw-text-primary">{text}</p>;
        } else if (text.toLowerCase() == "expired") {
          return <p className="tw-text-red">{text}</p>;
        }
      },
    },
    {
      title: "Posting Package",
      dataIndex: "jobPostingPackage",
      key: "jobPostingPackage",
    },
    {
      title: "Applicants",
      dataIndex: "address",
      key: "address",
      render: (text) => <p>No Applicants</p>,
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "x",
      render: () => (
        <div className="tw-flex tw-flex-row tw-gap-4">
          <div className="tw-self-end ">
            <Image
              src={"/view.png"}
              width={23}
              height={23}
              alt="border"
              className="tw-object-fit tw-cursor-pointer "
            />
          </div>
          <div className="tw-self-end ">
            <Image
              src={"/editg.png"}
              width={20}
              height={20}
              alt="border"
              className="tw-object-fit tw-cursor-pointer"
            />
          </div>
          <div className="tw-self-end ">
            <Image
              src={"/trash.png"}
              width={22}
              height={22}
              alt="border"
              className="tw-object-fit tw-cursor-pointer "
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="tw-bg-white tw-rounded-lg tw-w-full tw-mt-10 tw-px-10 tw-py-6 ">
      <div className="tw-flex tw-flex-row tw-justify-between">
        <div className="tw-flex tw-flex-row">
          <Image
            src={"/borderBlack.png"}
            width={10}
            height={10}
            alt="border"
            className="tw-object-fit tw-mr-7"
          />
          <h1 className="tw-text-lg tw-font-semibold tw-self-center">
            Jobs Posted
          </h1>
        </div>
        {!fromList && (
          <Link className="tw-self-center" href={"/employer/job/list"}>
            <h1 className=" tw-text-primary">SEE ALL</h1>
          </Link>
        )}
      </div>
      {jobs ? (
        <Table className="tw-mt-10" columns={columns} dataSource={jobs} />
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
  );
}

export default PostedJobs;

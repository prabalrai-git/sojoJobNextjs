"use client";

import React, { useEffect, useState } from "react";
import Axios from "@/api/server";
import { Popconfirm, Table } from "antd";
import Link from "next/link";
import Image from "next/image";
import { Tooltip as ReactTooltip } from "react-tooltip";

function page({ searchParams }) {
  const [applications, setApplications] = useState();

  useEffect(() => {
    getAllApplicationsForJobId();
  }, []);
  const getAllApplicationsForJobId = async () => {
    try {
      const res = await Axios.get(
        `/application/getApplicationsByJobId/${searchParams?.jobId}`
      );
      setApplications(res.data.data);
      console.log(res.data.data);
    } catch (error) {}
  };

  const columns = [
    {
      title: "Applicant's Name",
      dataIndex: "jobSeekerName",
      key: "jobSeekerName",
      render: (text) => <p className="tw-capitalize">{text}</p>,
    },
    {
      title: "Job Posted",
      dataIndex: "jobPosted",
      key: "jobPosted",
      render: () => {
        return applications && applications[0]?.job.createdAt.split("T")[0];
      },
    },
    {
      title: "Application Received",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => text.split("T")[0],
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        if (text.toLowerCase() == "pending") {
          return <p className="tw-text-progressBg tw-capitalize">{text}</p>;
        } else if (text.toLowerCase() == "active") {
          return <p className="tw-text-primary tw-capitalize">{text}</p>;
        } else if (text.toLowerCase() == "expired") {
          return <p className="tw-text-red tw-capitalize">{text}</p>;
        }
      },
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "x",
      render: (e, a) => (
        <div className="tw-flex tw-flex-row tw-gap-4">
          <div className="tw-self-end " data-tooltip-id="view">
            <ReactTooltip
              id="view"
              place="bottom"
              content="View Applicants CV"
            />
            <Link
              href={{
                pathname: "/employer/jobApplications/cvPreview",
                query: {
                  cvUrl: a.cvfile,
                  id: a.id,
                }, // the data
              }}
            >
              <div className="tw-bg-cardBorder tw-rounded-md tw-py-2 tw-px-5 tw-flex tw-flex-row">
                <Image
                  src={"/eye.png"}
                  width={14}
                  height={12}
                  alt="border"
                  className="tw-object-fit tw-cursor-pointer tw-mr-2 "
                />
                <p className="tw-text-primary tw-font-medium tw-text-xs">
                  Check CV
                </p>
              </div>
            </Link>
          </div>

          <div className="tw-self-end " data-tooltip-id="delete">
            <ReactTooltip
              id="delete"
              place="bottom"
              content="Delete Application"
            />
            <Popconfirm
              title="Delete the Application"
              description="Are you sure you want to delete this Application?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => console.log("hi")}
            >
              <div className="tw-bg-lightRed tw-rounded-md tw-py-2 tw-px-5 tw-flex tw-flex-row tw-cursor">
                <Image
                  src={"/trash.png"}
                  width={14}
                  height={12}
                  alt="border"
                  className="tw-object-fit tw-cursor-pointer tw-mr-2 "
                />
                <p className="tw-text-red tw-font-medium tw-text-xs">
                  Delete Application
                </p>
              </div>
            </Popconfirm>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="tw-pt-10 tw-px-20 tw-pb-12">
      <div className="tw-flex tw-flex-row tw-mb-10">
        <Link href={"/employer/dashboard"}>
          <Image
            src={"/arrow-left.png"}
            width={40}
            height={40}
            alt="back"
            className="tw-mr-5 tw-object-contain"
          />
        </Link>
        <h1 className="tw-text-black tw-font-semibold tw-text-3xl tw-self-center ">
          Applicants for SJ00{applications && applications[0]?.job?.id}{" "}
          {applications && applications[0]?.job?.title}
        </h1>
      </div>
      <Table
        className="tw-mt-10"
        columns={columns}
        dataSource={applications}
        scroll={{ x: 900 }}
      />
    </div>
  );
}

export default page;

"use client";

import { Popconfirm, Table } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Axios from "@/api/server";
import { Tooltip as ReactTooltip } from "react-tooltip";

function AppliedJobs({ fromList }) {
  const [data, setData] = useState();
  const columns = [
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
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
      render: (item) => {
        if (item === "pending") {
          return <p className="tw-capitalize tw-text-progressBg">{item}</p>;
        }
        if (item === "accepted") {
          return <p className="tw-capitalize tw-text-primary">{item}</p>;
        }
        if (item === "rejected") {
          return <p className="tw-capitalize tw-text-red">{item}</p>;
        }
      },
    },
    {
      title: "Job Type",
      dataIndex: "jobType",
      key: "jobType",
      render: (item) => <p className="tw-capitalize">{item}</p>,
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
      render: (item) => item.split("T")[0],
    },
    {
      title: "Actions",
      dataIndex: "remarks",
      key: "remarks",
      render: (e, a) => (
        <div className="tw-flex tw-flex-row tw-gap-4">
          <div className="tw-self-end " data-tooltip-id="view">
            <ReactTooltip id="view" place="bottom" content="View Job Post" />

            <Image
              src={"/view.png"}
              width={23}
              height={23}
              alt="border"
              className="tw-object-fit tw-cursor-pointer "
            />
          </div>

          <div className="tw-self-end " data-tooltip-id="delete">
            <ReactTooltip
              id="delete"
              place="bottom"
              content="Delete Job Application"
            />
            <Popconfirm
              title="Delete the Job Application"
              description="Are you sure to delete this Job Application?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => console.log("yo")}
            >
              <Image
                src={"/trash.png"}
                width={22}
                height={22}
                alt="border"
                className="tw-object-fit tw-cursor-pointer "
              />
            </Popconfirm>
          </div>
        </div>
      ),
    },
  ];

  const getJobsAppliedByApplicant = async () => {
    try {
      const res = await Axios.get(
        `/application/getApplicationsBySeekerId/${sessionStorage?.getItem(
          "jobSeekerId"
        )}`
      );
      const data = res.data.data;
      const structuredData = data.map((item) => {
        return {
          jobTitle: item?.job?.title,
          employer: item?.jobRecruiter?.companyName,
          status: item?.status,
          jobType: item?.job?.jobShift?.title,
          deadline: item?.job?.endDate,
        };
      });
      setData(structuredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJobsAppliedByApplicant();
  }, []);

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
        {data?.length > 0 ? (
          <Table
            className="tw-mt-10"
            columns={columns}
            dataSource={data}
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
    </>
  );
}

export default AppliedJobs;

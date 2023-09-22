"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Axios from "@/api/server";
import { Popconfirm, Space, Table, Tag } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

function PostedJobs({ fromList, jobStatusFilter }) {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(null);
  const [reload, setReload] = useState(false);

  const deleteJobPostById = async (id) => {
    try {
      const res = await Axios.delete(`/job/deleteJobById/${id}`);
      if (res.data.success) {
        setReload((prev) => !prev);

        toast.success("Deleted Successfully!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    if (jobStatusFilter === "Active") {
      const filteredData = jobs?.filter(
        (item) => item.jobStatus.toLowerCase() === jobStatusFilter.toLowerCase()
      );
      return setFilteredJobs(filteredData);
    }
    if (jobStatusFilter === "Pending") {
      const filteredData = jobs?.filter(
        (item) => item.jobStatus.toLowerCase() === jobStatusFilter.toLowerCase()
      );
      return setFilteredJobs(filteredData);
    }
    if (jobStatusFilter === "All") {
      return setFilteredJobs(jobs);
    }
  }, [jobStatusFilter, jobs]);

  useEffect(() => {
    getAllJobs();
  }, [reload]);

  const getAllJobs = async () => {
    try {
      const res = await Axios.get(
        `/job/getJobsByRecruiterId?recruiterId=${Number(
          localStorage.getItem("employerId")
        )}`
      );
      setJobs(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Job Post ID",
      dataIndex: "id",
      key: "id",
      render: (item) => <p>SJ00{item}</p>,
    },
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
      render: (e, a) => (
        <div className="tw-flex tw-flex-row tw-gap-4">
          <div className="tw-self-end " data-tooltip-id="view">
            <ReactTooltip id="view" place="bottom" content="View Job Post" />
            <Link
              href={{
                pathname: "/employer/job/preview",
                query: { id: a.id }, // the data
              }}
            >
              <Image
                src={"/view.png"}
                width={23}
                height={23}
                alt="border"
                className="tw-object-fit tw-cursor-pointer "
              />
            </Link>
          </div>
          <div className="tw-self-end " data-tooltip-id="edit">
            <ReactTooltip id="edit" place="bottom" content="Edit Job Post" />
            <Link
              href={{
                pathname: "/employer/job/edit",
                query: { id: a.id }, // the data
              }}
            >
              <Image
                src={"/editg.png"}
                width={20}
                height={20}
                alt="border"
                className="tw-object-fit tw-cursor-pointer"
              />
            </Link>
          </div>
          <div className="tw-self-end " data-tooltip-id="delete">
            <ReactTooltip
              id="delete"
              place="bottom"
              content="Delete Job Post"
            />
            <Popconfirm
              title="Delete the Job Post"
              description="Are you sure to delete this Job Post?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => deleteJobPostById(a.id)}
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

  return (
    <>
      <ToastContainer />

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
          <Table
            className="tw-mt-10"
            columns={columns}
            dataSource={filteredJobs ? filteredJobs : jobs}
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

export default PostedJobs;

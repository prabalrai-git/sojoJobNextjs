"use client";

import React, { useEffect, useState } from "react";
import Axios from "@/api/server";
import { Popconfirm, Table, Tag, message } from "antd";
import Link from "next/link";
import Image from "next/image";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ImagePreview from "@/components/ImagePreview";
import ApplicantAnswers from "@/components/ApplicantAnswers";
import { useSearchParams } from "next/navigation";

function page() {
  const [applications, setApplications] = useState();
  const [reload, setReload] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answers, setAnswers] = useState();
  const [applicantName, setApplicantName] = useState();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const searchParams = useSearchParams();

  const jobId = searchParams.get("jobId");

  useEffect(() => {
    getAllApplicationsForJobId();
  }, [reload, jobId]);
  const getAllApplicationsForJobId = async () => {
    try {
      const res = await Axios.get(
        `/application/getApplicationsByJobId/${jobId}`
      );
      setApplications(res.data.data);
      // setAnswers(res.data.data);
    } catch (error) {}
  };

  const onFit = async (id) => {
    try {
      const res = await Axios.patch(
        `/application/updateJobApplicationById/${id}`,
        { status: "accepted" }
      );
      if (res.data.success) {
        message.success(res.data.msg);
        setReload((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onUnFit = async (id) => {
    try {
      const res = await Axios.patch(
        `/application/updateJobApplicationById/${id}`,
        { status: "rejected" }
      );
      if (res.data.success) {
        message.success(res.data.msg);
        setReload((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
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
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Pending", value: "pending" },
        { text: "Accepted", value: "accepted" },
        { text: "Rejected", value: "rejected" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (text) => {
        if (text.toLowerCase() == "pending") {
          return <p className="tw-text-progressBg tw-capitalize">{text}</p>;
        } else if (text.toLowerCase() == "accepted") {
          return <p className="tw-text-primary tw-capitalize">{text}</p>;
        } else if (text.toLowerCase() == "rejected") {
          return <p className="tw-text-red tw-capitalize">{text}</p>;
        }
      },
    },
    {
      title: "View CV",
      dataIndex: "viewCV",
      key: "viewCV",
      width: "148px",
      render: (e, a) => {
        return <ImagePreview src={a.cvfile} />;
      },
    },
    {
      title: "View Answers",
      dataIndex: "viewAnswers",
      key: "viewAnswers",
      width: "148px",
      render: (e, a) => {
        if (a.jobAnswers.length > 0) {
          return (
            <Tag
              className="tw-cursor-pointer"
              color="green"
              onClick={() => {
                setAnswers(a.jobAnswers);
                showModal();
                setApplicantName(a.jobSeekerName);
              }}
            >
              View Answers
            </Tag>
          );
        } else {
          return (
            <Tag color="red" className="tw-cursor-not-allowed">
              No any answers
            </Tag>
          );
        }
      },
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "x",
      render: (e, a) => {
        return (
          a.status.toLowerCase() === "pending" && (
            <div className="tw-flex tw-flex-row tw-gap-4">
              <div className="tw-self-end tw-cursor-pointer">
                <Popconfirm
                  title="Applicant Fit"
                  description="Are you sure you want to mark applicant fit?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => onFit(e.id)}
                >
                  <div className="tw-bg-primary hover:tw-bg-buttonHover tw-rounded-md tw-py-2 tw-px-5 tw-flex tw-flex-row tw-cursor">
                    <p className="tw-text-white tw-font-medium tw-text-xs">
                      Applicant Fit
                    </p>
                  </div>
                </Popconfirm>
              </div>
              <div className="tw-self-end tw-cursor-pointer">
                <Popconfirm
                  title="Applicant Un-Fit"
                  description="Are you sure you want to mark the applicant unfit?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => onUnFit(e.id)}
                >
                  <div className="tw-bg-lightRed hover:tw-bg-rose-200 tw-rounded-md tw-py-2 tw-px-5 tw-flex tw-flex-row tw-cursor">
                    <p className="tw-text-red tw-font-medium tw-text-xs">
                      Applicant Unfit
                    </p>
                  </div>
                </Popconfirm>
              </div>
            </div>
          )
        );
      },
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
      <ApplicantAnswers
        data={answers}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        applicantName={applicantName}
      />
    </div>
  );
}

export default page;

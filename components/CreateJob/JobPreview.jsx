"use client";
import Image from "next/image";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import Axios from "@/api/server";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "antd";

function JobPreview({ setStep, data, jobQuestions }) {
  const jobDescription = (
    <div
      dangerouslySetInnerHTML={{
        __html: data.jobDescription,
      }}
    />
  );
  const requirements = (
    <div
      dangerouslySetInnerHTML={{
        __html: data.requirements,
      }}
    />
  );

  const skipped = false;

  const onJobPost = async () => {
    if (typeof window !== undefined) {
      const dataToPost = {
        title: data?.title,
        salary: data?.salary,
        responsibilities: data.requirements,
        requirements: data?.requirements,
        jobLocation: data?.jobLocation,
        jobPostingPackage: data?.jobPostingPackage,
        jobCategoryId: data?.jobCategoryId?.value,
        jobSubCategoryId: data?.jobSubCategoryId?.value,
        jobShiftId: data?.jobShiftId?.value,
        jobSiteId: data?.jobSiteId?.value,
        educationLevelId: data?.educationLevelId?.value,
        experienceLevelId: data?.experienceLevelId?.value,
        jobRecruiterId: Number(sessionStorage.getItem("employerId")),
        startDate: data?.startDate,
        endDate: data?.endDate,
        numberOfVacancies: Number(data?.numberOfVacancies),
        jobDescription: data?.jobDescription,
      };

      try {
        const res = await Axios.post("/job/postJob", dataToPost);
        if (res.data.success) {
          toast.success("Posted Successfully!", {
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
        const jobId = res.data.data.id;
        const addedJobIdJQ = jobQuestions.map((e) => {
          return { ...e, jobId: jobId };
        });

        try {
          addedJobIdJQ.map(async (e) => {
            await Axios.post("job/postJobQuestion", e);
          });
          setTimeout(() => {
            setStep((prev) => prev + 1);
          }, 1500);
        } catch (error) {
          console.log(error);
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
    }
  };
  const columns = [
    {
      title: "Question Type",
      dataIndex: "questionType",
      key: "questionType",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Question",
      dataIndex: "questionText",
      key: "questionText",
    },
    {
      title: "Ideal Answer",
      dataIndex: "requiredAnswer",
      key: "requiredAnswer",
    },
  ];

  return (
    <>
      <ToastContainer />

      <div className="tw-bg-white tw-rounded-lg tw-w-full tw-mt-10 tw-px-10 tw-py-6 ">
        <div className="tw-flex md:tw-flex-row tw-justify-between xsm:tw-flex-col">
          <h1 className="tw-text-black tw-text-2xl tw-font-medium md:tw-self-end xsm:tw-self-start tw-capitalize">
            {data.title}
          </h1>
          <div className="md:tw-self-center xsm:tw-self-start xsm:tw-mt-3 tw-grid tw-gap-4 xsm:tw-w-full md:tw-w-5/12 lg:tw-w-4/12 md:tw-grid-cols-2 sm:tw-grid-cols-1 xsm:tw-grid-cols-1">
            {/* <button
            onClick={() => setStep((prev) => prev - 1)}
            className="tw-text-white tw-text-base tw-font-medium tw-bg-prevBtn tw-px-8 tw-py-3 tw-rounded-lg tw-mr-3 "
          >
            Previous
          </button> */}
            <button className="tw-bg-cardBorder tw-text-primary tw-font-medium  tw-py-3 tw-rounded-lg xsm:tw-flex-1 tw-w-full  tw-text-sm tw-text-center">
              {/* <Image
                src={"/eye.png"}
                width={20}
                height={20}
                alt="view"
                className=" tw-self-center"
              /> */}
              View as public
            </button>
            <button
              onClick={() => {
                onJobPost();
              }}
              className="tw-text-white tw-text-sm tw-font-medium tw-bg-primary tw-py-3 tw-rounded-lg hover:tw-bg-buttonHover tw-w-full "
            >
              Post Job
            </button>
          </div>
        </div>
        {/*  */}
        <h2 className="tw-text-black tw-text-lg tw-mt-7 tw-mb-8 tw-font-light">
          Leapfrog Technology
        </h2>
        {/*  */}
        <div className="tw-flex tw-flex-row tw-mt-4 tw-flex-wrap tw-mb-10 ">
          <div className="tw-flex tw-flex-row tw-mr-7 tw-items-center tw-mb-4   ">
            <Image
              src={"/clock.png"}
              width={20}
              height={20}
              alt="timing"
              className="tw-object-contain tw-mr-3 tw-self-center "
            />

            <p className="tw-self-center tw-capitalize  tw-text-gray-600 tw-text-medium">
              {data.jobShiftId.label}
            </p>
          </div>
          <div className="tw-flex tw-flex-row tw-mr-7 tw-items-center tw-mb-4">
            <Image
              src={"/signal-status.png"}
              width={20}
              height={20}
              alt="timing"
              className="tw-object-contain tw-mr-3 tw-self-center "
            />

            <p className="tw-self-center tw-capitalize   tw-text-gray-600 tw-text-medium">
              {data.experienceLevelId.label}
            </p>
          </div>
          <div className="tw-flex tw-flex-row tw-mr-7 tw-items-center tw-mb-4">
            <Image
              src={"/money.png"}
              width={20}
              height={20}
              alt="timing"
              className="tw-object-contain tw-mr-3 tw-self-center"
            />

            <p className="tw-self-center tw-capitalize   tw-text-gray-600 tw-text-medium">
              {data.salary}
            </p>
          </div>
          <div className="tw-flex tw-flex-row tw-mr-7 tw-items-center tw-mb-4">
            <Image
              src={"/briefcase.png"}
              width={20}
              height={20}
              alt="timing"
              className="tw-object-contain tw-mr-3 tw-self-center"
            />

            <p className="tw-self-center tw-capitalize   tw-text-gray-600 tw-text-medium">
              {data.jobSiteId.label}
            </p>
          </div>
        </div>
        {/*  */}
        <div className="tw-mb-10">
          <h2 className="tw-text-black tw-font-medium tw-mb-4">
            Job Description
          </h2>
          <p
            style={{ lineHeight: 1.5 }}
            className="tw-text-gray-400 tw-text-justify "
          >
            {jobDescription}
          </p>
        </div>
        <div className="tw-mb-10">
          <h2 className="tw-text-black tw-font-medium tw-mb-4">Requirements</h2>
          <p
            style={{ lineHeight: 1.5 }}
            className="tw-text-gray-400 tw-text-justify "
          >
            {requirements}
          </p>
        </div>
        <div className="tw-mb-10">
          <h2 className="tw-text-black tw-font-medium tw-mb-4">
            Responsibilities
          </h2>
          <p
            style={{ lineHeight: 1.5 }}
            className="tw-text-gray-400 tw-text-justify "
          >
            {requirements}
          </p>
        </div>
        {!skipped > 0 && (
          <>
            <p className=" tw-mb-5 tw-font-bold">Questions</p>
            <Table
              columns={columns}
              dataSource={jobQuestions}
              scroll={{ x: 600 }}
            />
          </>
        )}
      </div>
    </>
  );
}

export default JobPreview;

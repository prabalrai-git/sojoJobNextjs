import Image from "next/image";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import Axios from "@/api/server";
import "react-toastify/dist/ReactToastify.css";

function JobPreview({ setStep, data }) {
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

  const onJobPost = async () => {
    const dataToPost = {
      title: data?.title,
      salary: data?.salary,
      responsibilities: data.requirements,
      requirements: data?.requirements,
      jobLocation: data?.jobLocation,
      jobPostingPackage: data?.jobPostingPackage,
      jobCategoryId: data?.jobCategoryId?.value,
      jobShiftId: data?.jobShiftId?.value,
      jobSiteId: data?.jobSiteId?.value,
      educationLevelId: data?.educationLevelId?.value,
      experienceLevelId: data?.experienceLevelId?.value,
      jobRecruiterId: Number(localStorage.getItem("employerId")),
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
      setTimeout(() => {
        setStep((prev) => prev + 1);
      }, 1500);
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

  return (
    <>
      <ToastContainer />

      <div className="tw-bg-white tw-rounded-lg tw-w-full tw-mt-10 tw-px-10 tw-py-6 ">
        <div className="tw-flex tw-flex-row tw-justify-between">
          <h1 className="tw-text-black tw-text-2xl tw-font-medium tw-self-end">
            {data.title}
          </h1>
          <div className="tw-self-center tw-flex tw-flex-row">
            {/* <button
            onClick={() => setStep((prev) => prev - 1)}
            className="tw-text-white tw-text-base tw-font-medium tw-bg-prevBtn tw-px-8 tw-py-3 tw-rounded-lg tw-mr-3 "
          >
            Previous
          </button> */}
            <button className="tw-bg-cardBorder tw-flex tw-flex-row tw-justify-between tw-text-primary tw-font-medium tw-px-8 tw-py-3 tw-rounded-lg tw-mr-3">
              <Image
                src={"/eye.png"}
                width={20}
                height={20}
                alt="view"
                className=" tw-self-center"
              />
              <p className="tw-ml-2 tw-text-base ">View as public</p>
            </button>
            <button
              onClick={() => {
                onJobPost();
              }}
              className="tw-text-white tw-text-base tw-font-medium tw-bg-primary tw-px-8 tw-py-3 tw-rounded-lg "
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
          <div className="tw-flex tw-flex-row tw-mr-7 tw-items-center">
            <Image
              src={"/clock.png"}
              width={20}
              height={20}
              alt="timing"
              className="tw-object-contain tw-mr-3 tw-self-center "
            />

            <p className="tw-self-center  tw-text-gray-600 tw-text-medium">
              {data.jobShiftId.label}
            </p>
          </div>
          <div className="tw-flex tw-flex-row tw-mr-7 tw-items-center">
            <Image
              src={"/signal-status.png"}
              width={20}
              height={20}
              alt="timing"
              className="tw-object-contain tw-mr-3 tw-self-center "
            />

            <p className="tw-self-center  tw-text-gray-600 tw-text-medium">
              {data.experienceLevelId.label}
            </p>
          </div>
          <div className="tw-flex tw-flex-row tw-mr-7 tw-items-center">
            <Image
              src={"/money.png"}
              width={20}
              height={20}
              alt="timing"
              className="tw-object-contain tw-mr-3 tw-self-center"
            />

            <p className="tw-self-center  tw-text-gray-600 tw-text-medium">
              {data.salary}
            </p>
          </div>
          <div className="tw-flex tw-flex-row tw-mr-7 tw-items-center">
            <Image
              src={"/briefcase.png"}
              width={20}
              height={20}
              alt="timing"
              className="tw-object-contain tw-mr-3 tw-self-center"
            />

            <p className="tw-self-center  tw-text-gray-600 tw-text-medium">
              {data.jobSiteId.label}
            </p>
          </div>
        </div>
        {/*  */}
        <div className="tw-mb-10">
          <h2 className="tw-text-black tw-font-medium tw-mb-4">
            Job Description
          </h2>
          <p style={{ lineHeight: 1.5 }} className="tw-text-gray-400 ">
            {jobDescription}
          </p>
        </div>
        <div className="tw-mb-10">
          <h2 className="tw-text-black tw-font-medium tw-mb-4">Requirements</h2>
          <p style={{ lineHeight: 1.5 }} className="tw-text-gray-400 ">
            {requirements}
          </p>
        </div>
        <div className="tw-mb-10">
          <h2 className="tw-text-black tw-font-medium tw-mb-4">
            Responsibilities
          </h2>
          <p style={{ lineHeight: 1.5 }} className="tw-text-gray-400 ">
            {requirements}
          </p>
        </div>
      </div>
    </>
  );
}

export default JobPreview;

"use client";
import { Table, Tag } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/list.module.css";

function JobPreviewList({ data, columns, questions, id, employer }) {
  const [skillsArray, setSkillsArray] = useState();

  useEffect(() => {
    const skillsA = data?.skills?.split("&");
    setSkillsArray(skillsA);
  }, [data]);
  const jobDescription = (
    <div
      className={styles.hero}
      dangerouslySetInnerHTML={{
        __html: data?.jobDescription,
      }}
    />
  );
  const requirements = (
    <div
      className={styles.hero}
      dangerouslySetInnerHTML={{
        __html: data?.requirements,
      }}
    />
  );

  return (
    <>
      <ToastContainer />

      <div className="tw-bg-white tw-rounded-lg tw-w-full tw-mt-10 tw-px-10 tw-py-6 ">
        <div className="tw-flex md:tw-flex-row tw-justify-between xsm:tw-flex-col ">
          <h1 className="tw-text-black tw-text-2xl tw-font-medium md:tw-self-end xsm:tw-self-start tw-capitalize">
            {data?.title}
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
            <Link
              href={{
                pathname: "/employer/job/edit",
                query: { id: id }, // the data
              }}
            >
              <button className="tw-text-white tw-text-sm tw-font-medium tw-bg-primary tw-py-3 tw-rounded-lg hover:tw-bg-buttonHover tw-w-full ">
                Edit Job
              </button>
            </Link>
          </div>
        </div>
        {/*  */}
        <h2 className="tw-text-black tw-text-lg tw-mt-7 tw-mb-8 tw-font-light tw-capitalize">
          {employer?.companyName}
        </h2>
        {/*  */}
        <div className="tw-flex tw-flex-row tw-mt-4 tw-flex-wrap tw-mb-10  ">
          <div className="tw-flex tw-flex-row tw-mr-7 tw-items-center tw-mb-4">
            <Image
              src={"/clock.png"}
              width={20}
              height={20}
              alt="timing"
              className="tw-object-contain tw-mr-3 tw-self-center "
            />

            <p className="tw-self-center  tw-text-gray-600 tw-text-medium tw-capitalize">
              {data?.jobShift?.title}
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

            <p className="tw-self-center  tw-text-gray-600 tw-text-medium tw-capitalize">
              {data?.experienceLevel?.title}
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

            <p className="tw-self-center  tw-text-gray-600 tw-text-medium tw-capitalize">
              {data?.salary}
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

            <p className="tw-self-center  tw-text-gray-600 tw-text-medium tw-capitalize">
              {data?.jobSite?.title}
            </p>
          </div>
        </div>
        {/*  */}
        <div className="tw-my-10 tw-flex tw-flex-row tw-gap-1 tw-items-center tw-flex-wrap">
          <p className="tw-text-xl tw-font-medium">Skills Required:</p>
          {skillsArray?.map((item) => {
            return (
              <Tag className="tw-px-4 tw-py-1 tw-capitalize" color="blue">
                {item}
              </Tag>
            );
          })}
        </div>
        <div className="tw-mb-10">
          <h2 className="tw-text-black tw-font-bold tw-mb-4 tw-text-xl">
            Job Description
          </h2>
          <div className="tw-ml-5">{jobDescription}</div>
        </div>
        {/* <div className="tw-mb-10">
          <h2 className="tw-text-black tw-font-bold tw-mb-4">Requirements</h2>
          <p
            style={{ lineHeight: 1.5 }}
            className="tw-text-gray-400 tw-text-justify "
          >
            {requirements}
          </p>
        </div>
        <div className="tw-mb-10">
          <h2 className="tw-text-black tw-font-bold tw-mb-4">
            Responsibilities
          </h2>
          <p
            style={{ lineHeight: 1.5 }}
            className="tw-text-gray-400 tw-text-justify "
          >
            {requirements}
          </p>
        </div> */}
        {questions?.length > 0 && (
          <>
            <p className=" tw-mb-5 tw-font-bold">Questions</p>
            <Table
              columns={columns}
              dataSource={questions}
              scroll={{ x: 600 }}
            />
          </>
        )}
      </div>
    </>
  );
}

export default JobPreviewList;

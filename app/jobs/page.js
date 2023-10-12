"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Axios from "@/api/server";
import RelatedJobs from "@/components/RelatedJobs";
import OtherJobs from "@/components/OtherJobs";
import SendApplicationModal from "@/components/SendApplicationModal";
import LoadingSpinner from "@/components/LoadingSpinner";

function page({ searchParams }) {
  const [jobDetails, setJobsDetails] = useState();
  const [open, setOpen] = useState(false);
  const [jobQuestions, setJobQuestions] = useState(null);
  const showModal = () => {
    setOpen(true);
  };

  const jobDescription = (
    <div
      dangerouslySetInnerHTML={{
        __html: jobDetails?.jobDescription,
      }}
    />
  );
  const requirements = (
    <div
      dangerouslySetInnerHTML={{
        __html: jobDetails?.requirements,
      }}
    />
  );
  useEffect(() => {
    getJobDetails();
  }, [searchParams.id]);
  const getJobDetails = async () => {
    try {
      const res = await Axios.get(`/job/getJobById/${searchParams.id}`);
      setJobsDetails(res.data.data);
      setJobQuestions(res.data.data?.jobQuestions);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="tw-w-full tw-relative ">
        <Image
          src={"/singlebg.png"}
          width={300}
          height={50}
          alt="singlebg.png"
          //   style={{ height: "200px", width: "100%" }}
          className="tw-w-full tw-object-cover tw-h-40"
        />
        <Image
          src={
            jobDetails?.jobRecruiter?.companyLogoImage
              ? jobDetails.jobRecruiter.companyLogoImage
              : "/companyLogo.png"
          }
          width={115}
          height={115}
          alt="companyLogo"
          className="tw-rounded-full tw-absolute tw-top-24 tw-left-40"
        />
      </div>
      <div className="tw-mx-28 xsm:tw-mx-4 sm:tw-mx-10 md:tw-mx-28 tw-mt-32">
        <div className="tw-flex tw-flex-row tw-justify-between">
          <div>
            <h3 className="xsm:tw-text-lg sm:tw-text-xl md:tw-text-3xl tw-capitalize tw-mb-3 tw-font-semibold ">
              {jobDetails?.title}
            </h3>
            <Link
              href={{
                pathname: "/companyProfile",
                query: { id: jobDetails?.jobRecruiter?.id }, // the data
              }}
            >
              <p className="tw-capitalize tw-text-blue-700 hover:tw-text-primary">
                {jobDetails?.jobRecruiter?.companyName}
              </p>
            </Link>
          </div>
          <div>
            <button
              onClick={() => showModal()}
              className="tw-bg-primary hover:tw-bg-buttonHover   tw-text-white tw-rounded-lg tw-px-7 tw-py-4"
            >
              Apply now!
            </button>
          </div>
        </div>
        {/*  */}
        <div className="tw-flex tw-flex-row tw-mt-4 tw-flex-wrap ">
          <div className="tw-flex tw-flex-row tw-mr-7 tw-items-center">
            <Image
              src={"/clock.png"}
              width={20}
              height={20}
              alt="timing"
              className="tw-object-contain tw-mr-3  tw-self-center "
            />

            <p className="tw-self-center tw-capitalize tw-text-gray-600 tw-text-medium">
              {jobDetails?.jobShift?.title}
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

            <p className="tw-self-center tw-capitalize tw-text-gray-600 tw-text-medium">
              {jobDetails?.experienceLevel?.title}
            </p>
          </div>
          <div className="tw-flex tw-flex-row tw-mr-7 tw-items-center">
            <Image
              src={"/money.png"}
              width={20}
              height={20}
              alt="timing"
              className="tw-object-contain tw-mr-3 tw-self-center "
            />

            <p className="tw-self-center tw-capitalize tw-text-gray-600 tw-text-medium">
              {jobDetails?.salary}
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

            <p className="tw-self-center tw-capitalize tw-text-gray-600 tw-text-medium">
              {jobDetails?.jobSite?.title}
            </p>
          </div>
        </div>
        {/*  */}
        <div className="tw-mt-10">
          <h4 className="tw-font-bold tw-text-2xl">Job Description</h4>
          <h3 className="tw-mt-7 tw-underline tw-font-bold tw-text-3xl tw-mb-4">
            Responsibilities
          </h3>
          <div>{jobDescription}</div>
          <h3 className="tw-mt-10 tw-underline tw-font-bold tw-text-3xl tw-mb-4">
            Requirements
          </h3>
          <div>{requirements}</div>
        </div>
        {/*  */}

        <RelatedJobs
          jobCategory={jobDetails?.jobCategory}
          exludeJobId={jobDetails?.id}
        />
        {/*  */}
        <OtherJobs jobCategory={jobDetails?.jobCategory} />
      </div>
      <SendApplicationModal
        open={open}
        setOpen={setOpen}
        jobRecruiterId={jobDetails?.jobRecruiterId}
        jobId={jobDetails?.id}
        jobQuestions={jobQuestions}
      />
    </div>
  );
}

export default page;

"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Axios from "@/api/server";
import Link from "next/link";
import JobCard from "@/components/JobCard";

function page({ searchParams }) {
  const [company, setCompany] = useState();
  const [companyJobs, setCompanyJobs] = useState();

  useEffect(() => {
    getCompany();
    getCompanyJobs();
  }, [searchParams?.id]);

  const getCompany = async () => {
    try {
      const res = await Axios.get(
        `/jobRecruiter/getJobRecruiterById/${searchParams?.id}`
      );

      setCompany(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCompanyJobs = async () => {
    try {
      const res = await Axios.get(
        `/job/getJobsByRecruiterId?recruiterId=${searchParams?.id}`
      );
      setCompanyJobs(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const companyInfo = (
    <div
      dangerouslySetInnerHTML={{
        __html: company?.companyInfo,
      }}
    />
  );

  return (
    <div className="tw-mx-28 xsm:tw-mx-5 sm:tw-mx-10 md:tw-mx-28 tw-mt-10">
      <div className="tw-bg-primary tw-h-72 tw-w-full tw-rounded tw-relative">
        <div className="tw-bg-white tw-h-32 tw-w-32 tw-rounded-full tw-absolute -tw-bottom-16 tw-left-7 tw-flex tw-justify-center tw-align-middle">
          {company?.companyLogoImage && (
            <Image
              src={company.companyLogoImage}
              width={120}
              height={120}
              alt="companyLogo"
              className="tw-object-contain"
            />
          )}
        </div>
      </div>
      <div className="tw-mt-20 tw-mx-4">
        <p className="tw-font-semibold tw-text-2xl">{company?.companyName}</p>
        <div className="tw-grid xsm:tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-5 xl:tw-grid-cols-6 tw-mt-5">
          <div className="tw-flex tw-flex-row tw-justify-start tw-items-center tw-mb-7">
            <Image
              src={"/nemployees.png"}
              width={30}
              height={30}
              alt="employees"
              className="tw-object-contain  tw-mr-3 tw-self-center"
            />
            <p className=" tw-text-gray-500 tw-self-center tw-my-auto">
              {company?.companySize} employees
            </p>
          </div>
          <div className="tw-flex tw-flex-row tw-justify-start tw-items-center tw-mb-7 ">
            <Image
              src={"/location.png"}
              width={30}
              height={30}
              alt="employees"
              className="tw-object-contain  tw-mr-3 tw-self-center"
            />
            <p className=" tw-text-gray-500 tw-self-center tw-my-auto">
              {company?.companyHeadquarters}
            </p>
          </div>
          <div className="tw-flex tw-flex-row tw-justify-start tw-items-center tw-mb-7 ">
            <Image
              src={"/website.png"}
              width={30}
              height={30}
              alt="employees"
              className="tw-object-contain  tw-mr-3 tw-self-center"
            />
            <p className=" tw-text-gray-500 tw-self-center tw-my-auto">
              {company?.companyWebsiteURL}
            </p>
          </div>
        </div>
        <p className="tw-mt-10 tw-leading-loose tw-text-gray-300 tw-text-justify">
          {companyInfo}
        </p>
      </div>
      {/* jobs at the company section starts */}
      <div className="tw-flex tw-flex-row tw-mt-20 ">
        <Image
          src={"/alljobs.png"}
          width={35}
          height={35}
          alt="alljobs"
          className="tw-object-contain tw-mr-4"
        />
        <p className="tw-my-auto tw-font-medium tw-text-lg">
          Jobs At {company?.companyName}
        </p>
      </div>
      <div className="tw-grid tw-grid-cols-3 tw-gap-4 tw-mt-8 md:tw-grid-cols-1 lg:tw-grid-cols-3 sm:tw-grid-cols-1 xsm:tw-grid-cols-1 800:tw-grid-cols-2 ">
        {companyJobs?.map((item) => {
          return (
            <Link
              href={{
                pathname: "/jobs",
                query: { id: item.id }, // the data
              }}
              className="tw-text-black tw-no-underline"
            >
              <JobCard key={item} job={item} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default page;
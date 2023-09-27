"use client";

import JobCard from "@/components/JobCard";
import { job } from "@/dummyData";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Input, Select } from "antd";
import Axios from "@/api/server";
import "@/styles/individualStyles.css";

const { Search } = Input;
// import "@/styles/global.css";

function page({ searchParams }) {
  const [categoriesList, setCategoriesList] = useState();
  const [educationList, setEductaionList] = useState();
  const [experienceList, setExperienceList] = useState();

  const [searchedJobs, setSearchedJobs] = useState();
  const [toDisplayJob, setToDisplayJob] = useState();

  // form states

  const [category, setCategory] = useState();
  const [education, setEducation] = useState();
  const [experience, setExperience] = useState();

  useEffect(() => {
    getCategoriesList();
    getEducationList();
    getExperienceList();
  }, []);

  useEffect(() => {
    getJobs();
  }, [searchParams.term]);

  useEffect(() => {
    if (searchedJobs) {
      setToDisplayJob(searchedJobs[0]);
    }
  }, [searchedJobs]);

  const jobDescription = (
    <div
      dangerouslySetInnerHTML={{
        __html: toDisplayJob?.jobDescription,
      }}
    />
  );
  const requirements = (
    <div
      dangerouslySetInnerHTML={{
        __html: toDisplayJob?.requirements,
      }}
    />
  );

  const getJobs = async () => {
    try {
      const res = await Axios.get(
        `/public/getJobBySearchTerm/${searchParams.term}`
      );
      setSearchedJobs(res.data.data);
      console.log(res.data.data, "search term jobs");
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoriesList = async () => {
    try {
      const res = await Axios.get("/jobCategories/getAllJobCategories");
      const newData = res.data.data.map((item) => {
        return { label: item.title, value: item.id };
      });
      setCategoriesList(newData);
    } catch (error) {
      console.log(error);
    }
  };
  const getEducationList = async () => {
    try {
      const res = await Axios.get("/educationLevels/getAllEducationLevels");
      const newData = res.data.data.map((item) => {
        return { label: item.title, value: item.id };
      });
      setEductaionList(newData);
    } catch (error) {
      console.log(error);
    }
  };
  const getExperienceList = async () => {
    try {
      const res = await Axios.get("/experienceLevels/getAllExperienceLevels");
      const newData = res.data.data.map((item) => {
        return { label: item.title, value: item.id };
      });
      setExperienceList(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = async (value, _e, info) => {
    try {
      const res = await Axios.get(`/public/getJobBySearchTerm/${value}`);
      setSearchedJobs(res.data.data);
      console.log(res.data.data, "search term jobs");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="tw-mx-28 xsm:tw-mx-5 sm:tw-mx-10 md:tw-mx-28 tw-mt-10">
      <div className="tw-flex tw-flex-row xsm:tw-flex-col  sm:tw-flex-col  md:tw-flex-row tw-justify-between">
        <h2 className="tw-font-medium">Search Jobs</h2>
        <div className="tw-flex tw-justify-center tw-mb-10  xsm:tw-w-full sm:tw-w-full md:tw-w-4/12 tw-relative 950:tw-w-5/12 800:tw-w-5/12 lg:tw-w-3/12  ">
          <Search
            placeholder="Search for jobs.."
            className="tw-bg-grey tw-h-24"
            allowClear
            onSearch={onSearch}
            size="large"
          />
        </div>
      </div>
      {/*  */}
      <h5 className="tw-font-medium">Filters:</h5>
      <div className="tw-grid tw-grid-cols-4 tw-gap-4 xsm:tw-grid-cols-1  tw-mt-4 sm:tw-grid-cols-1 md:tw-grid-cols-1 lg:tw-grid-cols-3 xl:tw-grid-cols-4">
        <div className="tw-mr-4 tw-w-full">
          <Select
            showSearch
            className="tw-h-12 tw-border-2 tw-rounded-lg tw-w-full "
            style={
              {
                // borderColor: "grey",
                // paddingTop: 10,
              }
            }
            placeholder="Filter By Category"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={categoriesList}
            onChange={(e, a) => setCategory(a)}
          />
        </div>
        <div className="tw-mr-4 tw-w-full">
          <Select
            showSearch
            className="tw-h-12 tw-border-2 tw-rounded-lg tw-w-full "
            style={
              {
                // borderColor: "grey",
                // paddingTop: 10,
              }
            }
            placeholder="Filter By Education Level"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={educationList}
            onChange={(e, a) => setEducation(a)}
          />
        </div>
        <div className="tw-mr-4 tw-w-full">
          <Select
            showSearch
            className="tw-h-12 tw-border-2 tw-rounded-lg tw-w-full "
            style={
              {
                // borderColor: "grey",
                // paddingTop: 10,
              }
            }
            placeholder="Filter By Experience Level"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={experienceList}
            onChange={(e, a) => setExperience(a)}
          />
        </div>
        <div className="tw-mr-4 tw-w-full">
          <button
            className="tw-bg-primary hover:tw-bg-buttonHover tw-rounded-lg tw-text-white tw-h-12 tw-text-lg tw-font-light tw-w-6/12"
            onClick={() => console.log("yo")}
          >
            Apply Filter
          </button>{" "}
        </div>
      </div>
      {/*  */}
      {/*  */}
      <div className="tw-grid tw-grid-cols-3 tw-mt-32 tw-gap-5 xsm:tw-grid-cols-1 sm:tw-grid-cols-1 md:tw-grid-cols-1 lg:tw-grid-cols-3">
        <div
          // style={{ marginTop: -109 }}
          className="xsm:tw-order-2 sm:tw-order-2 md:tw-order-2 lg:tw-order-1 lg:-tw-mt-28 md:tw-mt-0  "
        >
          <h4 className="tw-mt-10 tw-mb-10 tw-capitalize">
            {searchedJobs?.length} jobs listed currently
          </h4>

          <div
            // style={{ height: 1100 }}
            className="tw-grid tw-grid-cols-1 tw-gap-4 tw-overflow-y-auto tw-no-scrollbar tw-pr-5 "
          >
            {searchedJobs?.map((item) => {
              return (
                <div onClick={() => setToDisplayJob(item)}>
                  <JobCard key={item} job={item} />
                </div>
              );
            })}
          </div>
        </div>
        <div className=" xsm:tw-order-1 sm:tw-order-1 md:tw-order-1 lg:tw-order-2 tw-col-span-2 tw-border-2  tw-border-cardBorder tw-rounded-lg tw-p-10 tw-py-16 xsm:tw-p-3 sm:tw-p-5 md:tw-p-10 lg:-tw-mt-1">
          <div className="tw-flex tw-flex-row tw-justify-between">
            <div>
              <h3 className="xsm:tw-text-lg sm:tw-text-xl md:tw-text-3xl tw-capitalize">
                {toDisplayJob && toDisplayJob?.title}
              </h3>
              <p className="tw-capitalize">
                {toDisplayJob && toDisplayJob?.jobRecruiter?.companyName}
              </p>
            </div>
            <div>
              <button className="tw-bg-primary hover:tw-bg-buttonHover   tw-text-white tw-rounded-lg tw-px-7 tw-py-4">
                Apply now!
              </button>
            </div>
          </div>
          {/*  */}
          <div className="tw-flex tw-flex-row tw-mt-4 tw-flex-wrap">
            <div className="tw-flex tw-flex-row tw-mr-7 tw-items-center">
              <Image
                src={"/clock.png"}
                width={20}
                height={20}
                alt="timing"
                className="tw-object-contain tw-mr-3 tw-self-center tw-mb-4"
              />

              <p className="tw-self-center tw-text-gray-600 tw-text-medium">
                {toDisplayJob && toDisplayJob?.jobShift?.title}
              </p>
            </div>
            <div className="tw-flex tw-flex-row tw-mr-7 tw-items-center">
              <Image
                src={"/signal-status.png"}
                width={20}
                height={20}
                alt="timing"
                className="tw-object-contain tw-mr-3 tw-self-center tw-mb-4"
              />

              <p className="tw-self-center tw-text-gray-600 tw-text-medium">
                {toDisplayJob && toDisplayJob?.experienceLevel?.title}
              </p>
            </div>
            <div className="tw-flex tw-flex-row tw-mr-7 tw-items-center">
              <Image
                src={"/money.png"}
                width={20}
                height={20}
                alt="timing"
                className="tw-object-contain tw-mr-3 tw-self-center tw-mb-4"
              />

              <p className="tw-self-center tw-text-gray-600 tw-text-medium">
                {toDisplayJob && toDisplayJob?.salary}
              </p>
            </div>
            <div className="tw-flex tw-flex-row tw-mr-7 tw-items-center">
              <Image
                src={"/briefcase.png"}
                width={20}
                height={20}
                alt="timing"
                className="tw-object-contain tw-mr-3 tw-self-center tw-mb-4"
              />

              <p className="tw-self-center tw-text-gray-600 tw-text-medium">
                {toDisplayJob && toDisplayJob?.jobSite?.title}
              </p>
            </div>
          </div>
          {/*  */}
          <div className="tw-mt-10">
            <h4>Job Description</h4>
            <h3 className="tw-mt-7 tw-underline">Responsibilities</h3>
            <div>{jobDescription}</div>
            <h3 className="tw-mt-10 tw-underline">Requirements</h3>
            <div>{requirements}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

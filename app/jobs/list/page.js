"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Axios from "@/api/server";
import Link from "next/link";
import JobCard from "@/components/JobCard";
import { Input, Pagination, Select, Tag } from "antd";
import Image from "next/image";

function page() {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [total, setTotal] = useState();
  const [skillsArray, setSkillsArray] = useState();
  const [toDisplayJob, setToDisplayJob] = useState();
  const [categoriesList, setCategoriesList] = useState();
  const [subCategoryList, setSubCategoryList] = useState();
  const [educationList, setEductaionList] = useState();
  const [experienceList, setExperienceList] = useState();

  const [category, setCategory] = useState(null);
  const [education, setEducation] = useState(null);
  const [experience, setExperience] = useState(null);
  const [subCategory, setSubCategory] = useState(null);

  const { Search } = Input;


  useEffect(() => {
    getCategoriesList();
    getEducationList();
    getExperienceList();
  }, []);

  const getCategoriesList = async () => {
    try {
      const res = await Axios.get("/admin/jobCategories/getAllJobCategories");
      const newData = res.data.data.map((item) => {
        return {
          label: item.title,
          value: item.id,
          subCategories: item.jobSubCategories,
        };
      });
      setCategoriesList(newData);
    } catch (error) {
      console.log(error);
    }
  };
  const getEducationList = async () => {
    try {
      const res = await Axios.get(
        "/admin/educationLevels/getAllEducationLevels"
      );
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
      const res = await Axios.get(
        "/admin/experienceLevels/getAllExperienceLevels"
      );
      const newData = res.data.data.map((item) => {
        return { label: item.title, value: item.id };
      });
      setExperienceList(newData);
    } catch (error) {
      console.log(error);
    }
  };


  const jobDescription = (
    <div
      dangerouslySetInnerHTML={{
        __html: toDisplayJob?.jobDescription,
      }}
    />
  );

  const limit = 7;

  const onChange = (page) => {
    console.log(page);
    setPageNumber(page);
  };

  const searchParams = useSearchParams();

  const jobType = searchParams.get("type");

  useEffect(() => {
    getJobs();
  }, [jobType, pageNumber]);

  const getJobs = async () => {
    try {
      if (jobType.toLowerCase() === "standard") {
        const res = await Axios.get(
          `/public/getStandardJobs?limit=${limit}&page=${pageNumber}`
        );

        setData(res.data.data);
        setToDisplayJob(res.data.data[0]);
        setTotal(Number(res.data.pagination.totalPages) * limit);
        return;
      }
      if (jobType.toLowerCase() === "elite") {
        const res = await Axios.get(
          `/public/getEliteJobs?limit=${limit}&page=${pageNumber}`
        );
        setData(res.data.data);
        setToDisplayJob(res.data.data[0]);

        setTotal(Number(res.data.pagination.totalPages) * limit);

        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="lg:tw-mx-20 md:tw-mx-5 xsm:tw-mx-5">
          <div className="tw-flex tw-flex-row xsm:tw-flex-col  sm:tw-flex-col  md:tw-flex-row tw-justify-between">
        {/* <h2 className="tw-font-medium tw-text-3xl tw-capitalize">Search {jobType} Jobs</h2>
        <div className="tw-flex tw-justify-center   xsm:tw-w-full sm:tw-w-full md:tw-w-4/12 tw-relative 950:tw-w-5/12 800:tw-w-5/12 lg:tw-w-3/12  ">
          <Search
            placeholder="Search for jobs.."
            className="tw-bg-grey tw-h-24"
            allowClear
            onSearch={()=>console.log('yo')}
            size="large"
          />
        </div> */}
      </div>
      {/*  */}
      <h5 className="tw-font-medium tw-text-lg">Filters:</h5>
      <div className="tw-grid tw-grid-cols-4 tw-gap-4 xsm:tw-grid-cols-1  tw-mt-4 sm:tw-grid-cols-1 md:tw-grid-cols-1 lg:tw-grid-cols-3 xl:tw-grid-cols-4">
        <div className="tw-mr-4 tw-w-full">
          <Select
            showSearch
            allowClear
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
            onChange={(e, a) => {
              setCategory(e);
              const subCategory = a?.subCategories?.map((item) => {
                return { value: item.id, label: item.title };
              });
              setSubCategoryList(subCategory);
            }}
          />
        </div>
        <div className="tw-mr-4 tw-w-full">
          <Select
            showSearch
            allowClear
            className="tw-h-12 tw-border-2 tw-rounded-lg tw-w-full "
            style={
              {
                // borderColor: "grey",
                // paddingTop: 10,
              }
            }
            placeholder="Filter By Sub Category"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={subCategoryList}
            onChange={(e, a) => setSubCategory(e)}
          />
        </div>
        <div className="tw-mr-4 tw-w-full">
          <Select
            showSearch
            allowClear
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
            onChange={(e, a) => setEducation(e)}
          />
        </div>

        <div className="tw-mr-4 tw-w-full">
          <Select
            showSearch
            allowClear
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
            onChange={(e, a) => setExperience(e)}
          />
        </div>
        <div className="tw-mr-4 tw-w-full">
          <button
            className="tw-bg-primary hover:tw-bg-buttonHover tw-rounded-lg tw-text-white tw-h-12 tw-text-sm tw-font-semibold tw-w-4/12"
            onClick={() => onFilter()}
          >
            Filter
          </button>{" "}
        </div>
      </div>
      <div>
        <h3 className="tw-capitalize tw-my-10 tw-mt-20 tw-text-2xl tw-font-semibold">
          All {jobType} Jobs
        </h3>
      </div>
      {/* <div className="tw-flex tw-flex-col tw-gap-5">
        {data?.map((item) => {
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
      </div> */}
      <div className="tw-grid tw-grid-cols-3  tw-gap-5 xsm:tw-grid-cols-1 sm:tw-grid-cols-1 md:tw-grid-cols-1 lg:tw-grid-cols-3">
        <div
          // style={{ marginTop: -109 }}
          className="xsm:tw-order-2 sm:tw-order-2 md:tw-order-2 lg:tw-order-1  md:tw-mt-0  "
        >
          {/* <h4 className="tw-mt-10 tw-mb-10 tw-capitalize tw-text-xl tw-font-medium">
            {data?.length} jobs listed currently
          </h4> */}

          <div
            // style={{ height: 1100 }}
            className="tw-grid tw-grid-cols-1 tw-gap-4 tw-overflow-y-auto tw-no-scrollbar tw-pr-5 "
          >
            {data?.map((item) => {
              return (
                <div
                  onClick={() => {
                    setToDisplayJob(item);
                    const skillsA = item.skills?.split("&");
                    setSkillsArray(skillsA);
                  }}
                >
                  <JobCard key={item} job={item} />
                </div>
              );
            })}
          </div>
          <div className="tw-my-10">
            <Pagination
              current={pageNumber}
              onChange={onChange}
              pageSize={limit}
              total={total}
            />
          </div>
        </div>
        {data?.length > 0 && (
          <div className=" xsm:tw-order-1 sm:tw-order-1 md:tw-order-1 lg:tw-order-2 tw-col-span-2 tw-border-2  tw-border-cardBorder tw-rounded-lg tw-p-10 tw-py-16 xsm:tw-p-3 sm:tw-p-5 md:tw-p-10 lg:-tw-mt-1">
            <div className="tw-flex tw-flex-row tw-justify-between">
              <div>
                <h3 className="xsm:tw-text-lg sm:tw-text-xl md:tw-text-3xl tw-capitalize tw-mb-2">
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
            <div className="tw-flex tw-flex-row tw-mt-6 tw-flex-wrap">
              <div className="tw-flex tw-flex-row tw-mr-7 tw-items-center">
                <Image
                  src={"/clock.png"}
                  width={20}
                  height={20}
                  alt="timing"
                  className="tw-object-contain tw-mr-3 tw-self-center "
                />

                <p className="tw-self-center tw-capitalize tw-text-gray-600 tw-text-medium">
                  {toDisplayJob && toDisplayJob?.jobShift?.title}
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
                  {toDisplayJob && toDisplayJob?.experienceLevel?.title}
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
                  {toDisplayJob && toDisplayJob?.salary}
                </p>
              </div>
              <div className="tw-flex tw-flex-row tw-mr-7 tw-items-center">
                <Image
                  src={"/briefcase.png"}
                  width={20}
                  height={20}
                  alt="timing"
                  className="tw-object-contain tw-mr-3 tw-self-center "
                />

                <p className="tw-self-center tw-capitalize tw-text-gray-600 tw-text-medium">
                  {toDisplayJob && toDisplayJob?.jobSite?.title}
                </p>
              </div>
            </div>
            {/*  */}
            <div className="tw-my-8 tw-flex tw-flex-row tw-gap-1 tw-items-center tw-flex-wrap">
              <p className="tw-text-base tw-font-medium tw-mr-3">
                Skills Required:
              </p>
              {skillsArray?.map((item) => {
                return (
                  <Tag className="tw-px-4 tw-py-0 tw-capitalize" color="blue">
                    {item}
                  </Tag>
                );
              })}
            </div>
            <div className="tw-mt-10">
              <h4 className="tw-font-semibold tw-text-xl">Job Description</h4>
              <h3 className="tw-mt-7 tw-underline tw-font-semibold tw-text-xl tw-mb-5">
                Responsibilities
              </h3>
              <div>{jobDescription}</div>
              {/* <h3 className="tw-mt-10 tw-underline tw-font-semibold tw-text-xl tw-mb-5">
                Requirements
              </h3>
              <div>{requirements}</div> */}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default page;

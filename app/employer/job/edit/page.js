"use client";

import { Checkbox, DatePicker, Input, Select } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dayjs from "dayjs";
// import TagsInput from "react-tagsinput";
import "@/styles/global.css";
import Axios from "@/api/server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-tagsinput/react-tagsinput.css";
import JobPackage from "@/components/JobPackage";
import Link from "next/link";
import { useRouter } from "next/navigation";

function page({ searchParams }) {
  //drop-down states

  const [categories, setCategories] = useState();
  const [employmentTypes, setEmploymentTypes] = useState();
  const [experiences, setExperiences] = useState();
  const [workTypes, setWorkTypes] = useState();

  // form-submission states

  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [employmentType, setEmploymentType] = useState();
  const [location, setLocation] = useState();
  const [experience, setExperience] = useState();
  const [salary, setSalary] = useState();
  const [vacancyNumber, setVacancyNumber] = useState();
  const [workType, setWorkType] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [jobDescription, setJobDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [jobPackage, setJobPackage] = useState("");

  const [data, setData] = useState();

  useEffect(() => {
    getJobById();
  }, [searchParams.id]);

  useEffect(() => {
    if (data) {
      setTitle(data?.title);
      setCategory(data?.jobCategoryId);
      setEmploymentType(data?.jobShiftId);
      setLocation(data?.jobLocation);
      setExperience(data?.experienceLevelId);
      setSalary(data?.salary);
      setVacancyNumber(data?.numberOfVacancies);
      setWorkType(data?.jobSiteId);
      setStartDate(data?.startDate);
      setEndDate(data?.endDate);
      setJobDescription(data?.jobDescription);

      setSkills(data?.requirements);
      setJobPackage(data?.jobPostingPackage);
    }
  }, [data]);

  const getJobById = async () => {
    try {
      const res = await Axios.get(`/job//getJobById/${searchParams?.id}`);
      setData(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllEmploymetType();
    getAllExperienceLevels();
    getAllWorkTypes();
  }, []);

  const router = useRouter();

  const onSubmit = async () => {
    const formData = {
      title,
      jobCategoryId: category,
      jobShiftId: employmentType,
      jobLocation: location,
      experienceLevelId: experience,
      salary,
      numberOfVacancies: Number(vacancyNumber),
      responsibilities: skills,
      jobSiteId: workType,
      jobRecruiterId: Number(localStorage.getItem("employerId")),

      startDate,
      endDate,
      jobDescription,
      requirements: skills,
      jobPostingPackage: jobPackage,
    };

    try {
      const res = await Axios.patch(
        `/job/updateJobPost/${searchParams?.id}`,
        formData
      );
      if (res.data.success) {
        toast.success("Edited Successfully!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          router.push("/employer/dashboard");
        }, 2000);
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

  const getAllCategories = async () => {
    try {
      const res = await Axios.get("/jobCategories/getAllJobCategories");
      const data = res.data.data;
      let newData = [];
      for (let i in data) {
        const obj = { value: data[i].id, label: data[i].title };
        newData.push(obj);
      }
      setCategories(newData);
    } catch (error) {}
  };
  const getAllEmploymetType = async () => {
    try {
      const res = await Axios.get("/jobShift/getAllShifts");
      const data = res.data.data;
      let newData = [];
      for (let i in data) {
        const obj = { value: data[i].id, label: data[i].title };
        newData.push(obj);
      }
      setEmploymentTypes(newData);
    } catch (error) {}
  };
  const getAllExperienceLevels = async () => {
    try {
      const res = await Axios.get("/experienceLevels/getAllExperienceLevels");
      const data = res.data.data;
      let newData = [];
      for (let i in data) {
        const obj = { value: data[i].id, label: data[i].title };
        newData.push(obj);
      }
      setExperiences(newData);
    } catch (error) {}
  };
  const getAllWorkTypes = async () => {
    try {
      const res = await Axios.get("/jobSites/getAllJobSites");
      const data = res.data.data;
      let newData = [];
      for (let i in data) {
        const obj = { value: data[i].id, label: data[i].title };
        newData.push(obj);
      }
      setWorkTypes(newData);
    } catch (error) {}
  };

  const dateFormat = "YYYY-MM-DD";

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  today = yyyy + "/" + mm + "/" + dd;

  return (
    <>
      <ToastContainer />

      <div className="tw-pt-10 tw-mx-40 tw-pb-20">
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
          <h1 className="tw-text-black tw-font-semibold tw-text-3xl tw-self-center">
            Edit Job Post
          </h1>
        </div>

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
              <h1 className="tw-text-xl tw-font-semibold tw-self-center">
                Job Post Details
              </h1>
            </div>
          </div>
          <div className="tw-mt-10">
            <Form>
              <Form.Group
                className="mb-4"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="tw-text-gray-600 tw-font-medium">
                  Job's Title
                </Form.Label>
                {/* <Form.Control
              className="tw-border-2 tw-border-gray-300 tw-h-12"
              type="email"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the job title here..."
            /> */}
                <Input
                  className="tw-border-2 tw-border-gray-300 tw-h-12"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter the job title here..."
                  value={title}
                />
              </Form.Group>
              <Form.Group
                className="mb-4 tw-flex tw-flex-col"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="tw-text-gray-600 tw-font-medium">
                  Categories
                </Form.Label>
                <Select
                  showSearch
                  className="tw-h-12 tw-border-2 tw-rounded-lg "
                  style={
                    {
                      // borderColor: "grey",
                      // paddingTop: 10,
                    }
                  }
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={categories}
                  value={category}
                  onChange={(e, a) => setCategory(e)}
                />
              </Form.Group>
              <Form.Group
                className="mb-4 tw-grid tw-grid-cols-3 tw-gap-4"
                controlId="exampleForm.ControlInput1"
              >
                <div className=" tw-flex tw-flex-col">
                  <Form.Label className="tw-text-gray-600 tw-font-medium">
                    Employmnet Type
                  </Form.Label>
                  <Select
                    onChange={(e, a) => setEmploymentType(e)}
                    showSearch
                    className="tw-h-12 tw-border-2  tw-rounded-lg"
                    style={
                      {
                        // borderColor: "grey",
                        // paddingTop: 10,
                      }
                    }
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={employmentTypes}
                    value={employmentType}
                  />
                </div>
                <div>
                  <Form.Label className="tw-text-gray-600 tw-font-medium">
                    Location
                  </Form.Label>
                  <Input
                    className="tw-border-2 tw-border-gray-300 tw-h-12"
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter Job Location"
                    value={location}
                  />
                  {/* <Form.Control
                onChange={(e) => setLocation(e.target.value)}
                className="tw-border-2 tw-border-gray-300 tw-h-12"
                type="email"
                placeholder="Enter Job Location"
              /> */}
                </div>
                <div className=" tw-flex tw-flex-col ">
                  <Form.Label className="tw-text-gray-600 tw-font-medium">
                    Experience
                  </Form.Label>
                  <Select
                    onChange={(e, a) => setExperience(e)}
                    showSearch
                    value={experience}
                    className="tw-h-12 tw-border-2 tw-rounded-lg "
                    style={
                      {
                        // borderColor: "grey",
                        // paddingTop: 10,
                      }
                    }
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={experiences}
                  />
                </div>
              </Form.Group>
              <Form.Group
                className="mb-4 tw-grid tw-grid-cols-3 tw-gap-4"
                controlId="exampleForm.ControlInput1"
              >
                <div>
                  <Form.Label className="tw-text-gray-600 tw-font-medium">
                    Salary
                  </Form.Label>
                  <Input
                    className="tw-border-2 tw-border-gray-300 tw-h-12"
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="NRs.20,000-10,000 monthly"
                    value={salary}
                  />
                  {/* <Form.Control
                onChange={(e) => setSalary(e.target.value)}
                className="tw-border-2 tw-border-gray-300 tw-h-12"
                type="email"
                placeholder="NRs.20,000-10,000 monthly"
                value={salary}
              /> */}
                  <Checkbox
                    className="tw-mt-3"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSalary("Negotiable");
                      } else {
                        setSalary("");
                      }
                    }}
                    checked={salary === "Negotiable"}
                  >
                    Negotiable
                  </Checkbox>
                </div>
                <div>
                  <Form.Label className="tw-text-gray-600 tw-font-medium">
                    No. of Vacancy
                  </Form.Label>
                  <Input
                    className="tw-border-2 tw-border-gray-300 tw-h-12"
                    onChange={(e) => setVacancyNumber(e.target.value)}
                    placeholder="Enter number of vacancy opening"
                    value={vacancyNumber}
                  />
                  {/* <Form.Control
                onChange={(e) => setVacancyNumber(e.target.value)}
                className="tw-border-2 tw-border-gray-300 tw-h-12"
                type="email"
                placeholder="Enter number of vacancy opening"
              /> */}
                </div>
                <div className=" tw-flex tw-flex-col">
                  <Form.Label className="tw-text-gray-600 tw-font-medium">
                    Work Type
                  </Form.Label>
                  <Select
                    onChange={(e, a) => setWorkType(e)}
                    showSearch
                    value={workType}
                    className="tw-h-12 tw-border-2 tw-rounded-lg "
                    style={
                      {
                        // borderColor: "grey",
                        // paddingTop: 10,
                      }
                    }
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={workTypes}
                  />
                </div>
              </Form.Group>
              <Form.Group
                className="mb-4 tw-grid tw-grid-cols-3 tw-gap-4"
                controlId="exampleForm.ControlInput1"
              >
                <div className="tw-flex tw-flex-col">
                  <Form.Label className="tw-text-gray-600 tw-font-medium">
                    Start Date
                  </Form.Label>

                  <DatePicker
                    className="tw-py-3 tw-border-gray-300 tw-border-2"
                    defaultValue={dayjs(today, dateFormat)}
                    format={dateFormat}
                    onChange={(e, a) => setStartDate(a)}
                    value={startDate ? dayjs(startDate, dateFormat) : null}
                  />

                  {/* <Form.Control
                className="tw-border-2 tw-border-gray-300 tw-h-12"
                type="email"
                placeholder="name@example.com"
              /> */}
                </div>
                <div className="tw-flex tw-flex-col">
                  <Form.Label className="tw-text-gray-600 tw-font-medium">
                    End Date
                  </Form.Label>
                  <DatePicker
                    className="tw-py-3 tw-border-gray-300 tw-border-2"
                    defaultValue={dayjs(today, dateFormat)}
                    format={dateFormat}
                    onChange={(e, a) => setEndDate(a)}
                    value={endDate ? dayjs(endDate, dateFormat) : null}
                  />
                </div>
              </Form.Group>
              <Form.Group
                className="mb-4"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="tw-text-gray-600 tw-font-medium">
                  Skills Required
                </Form.Label>
                <ReactQuill
                  className="tw-h-40 tw-mb-20  "
                  theme="snow"
                  value={skills}
                  onChange={(e) => setSkills(e)}
                />
              </Form.Group>
              <Form.Group
                className="mb-4"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="tw-text-gray-600 tw-font-medium">
                  Job Description
                </Form.Label>
                <ReactQuill
                  className="tw-h-40 tw-mb-20  "
                  theme="snow"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e)}
                />
              </Form.Group>
              {/* <Form.Group className="mb-4  " controlId="exampleForm.ControlInput1">
            <Form.Label className="tw-text-gray-600 tw-font-medium">
              Skills Required (Make sure to press enter after writing a skill
              set.)
            </Form.Label>
            <TagsInput value={skills} onChange={(e) => setSkills(e)} />
          </Form.Group> */}
            </Form>
            <div>
              <p className="tw-text-gray-600 tw-font-medium">Package</p>

              <div className="tw-flex tw-flex-row tw-gap-4">
                <JobPackage
                  title={"Elite"}
                  setJobPackage={setJobPackage}
                  jobPackage={jobPackage}
                />
                <JobPackage
                  title={"Standard"}
                  setJobPackage={setJobPackage}
                  jobPackage={jobPackage}
                />
              </div>
            </div>

            <button
              onClick={() => {
                onSubmit();
              }}
              className="tw-bg-primary tw-text-white tw-px-16 tw-mt-10 hover:tw-bg-buttonHover tw-py-3 tw-rounded-lg tw-text-lg"
            >
              Edit Job
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;

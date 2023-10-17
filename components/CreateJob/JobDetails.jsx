import { Checkbox, DatePicker, Input, Select, message } from "antd";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { Form } from "react-bootstrap";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dayjs from "dayjs";
import TagsInput from "react-tagsinput";
import "@/styles/global.css";
import Axios from "@/api/server";

import "react-tagsinput/react-tagsinput.css";
import JobPackage from "../JobPackage";
import moment from "moment";

function JobDetails({ setStep, setData }) {
  const [skills, setSkills] = useState([]);
  const [jobPackage, setJobPackage] = useState("Standard");

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  //drop-down states

  const [categories, setCategories] = useState();
  const [subCategories, setSubCategories] = useState();
  const [employmentTypes, setEmploymentTypes] = useState();
  const [experiences, setExperiences] = useState();
  const [workTypes, setWorkTypes] = useState();

  // form-submission states

  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [employmentType, setEmploymentType] = useState();
  const [location, setLocation] = useState();
  const [experience, setExperience] = useState();
  const [salary, setSalary] = useState();
  const [vacancyNumber, setVacancyNumber] = useState();
  const [workType, setWorkType] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [jobDescription, setJobDescription] = useState("");

  useEffect(() => {
    getAllCategories();
    getAllEmploymetType();
    getAllExperienceLevels();
    getAllWorkTypes();
  }, []);

  const onSubmit = async () => {
    if (
      !title ||
      !category ||
      !employmentType ||
      !location ||
      !experience ||
      !salary ||
      !vacancyNumber ||
      !workType ||
      !startDate ||
      !endDate ||
      !jobDescription ||
      !skills ||
      !jobPackage ||
      !subCategory
    ) {
      return message.error("Please fill out all the fields!");
    }
    const data = {
      title,
      jobCategoryId: category,
      jobSubCategoryId: subCategory,
      jobShiftId: employmentType,
      jobLocation: location,
      experienceLevelId: experience,
      salary,
      numberOfVacancies: vacancyNumber,
      jobSiteId: workType,
      startDate,
      endDate,
      jobDescription,
      requirements: skills,
      jobPostingPackage: jobPackage,
    };
    setData(data);
    setStep((prev) => prev + 1);
  };

  const getAllCategories = async () => {
    try {
      const res = await Axios.get("/admin/jobCategories/getAllJobCategories");
      const data = res.data.data;
      console.log(data);
      let newData = [];
      for (let i in data) {
        const obj = {
          value: data[i].id,
          label: data[i].title,
          subCategories: data[i].jobSubCategories,
        };
        newData.push(obj);
      }
      setCategories(newData);
    } catch (error) {}
  };
  const getAllEmploymetType = async () => {
    try {
      const res = await Axios.get("/admin/jobShift/getAllShifts");
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
      const res = await Axios.get(
        "/admin/experienceLevels/getAllExperienceLevels"
      );
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
      const res = await Axios.get("/admin/jobSites/getAllJobSites");
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
          <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
            <Form.Label className="tw-text-gray-600 tw-font-medium">
              Job's Title
            </Form.Label>
            {/* <Form.Control
              className="tw-border-1 tw-drop-shadow-sm tw-border-gray-300 tw-h-12"
              type="email"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the job title here..."
            /> */}
            <Input
              className="tw-border-1 tw-drop-shadow-sm tw-border-gray-300 tw-h-12"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the job title here..."
            />
          </Form.Group>
          <Form.Group
            className="mb-4 tw-grid tw-grid-cols-2 tw-gap-4"
            controlId="exampleForm.ControlInput1"
          >
            <div>
              <Form.Label className="tw-text-gray-600 tw-font-medium ">
                Categories
              </Form.Label>
              <Select
                showSearch
                className="tw-h-12 tw-w-full tw-border-1 tw-drop-shadow-sm tw-rounded-lg "
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
                onChange={(e, a) => {
                  setCategory(a);
                  const subCategory = a?.subCategories?.map((item) => {
                    return { value: item.id, label: item.title };
                  });
                  setSubCategories(subCategory);
                }}
              />
            </div>
            <div>
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                Sub Categories
              </Form.Label>
              <Select
                showSearch
                className="tw-h-12 tw-w-full tw-border-1 tw-drop-shadow-sm tw-rounded-lg "
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
                options={subCategories}
                onChange={(e, a) => {
                  setSubCategory(a);
                }}
              />
            </div>
          </Form.Group>
          <Form.Group
            className="mb-4 tw-grid lg:tw-grid-cols-3 tw-gap-4 md:tw-grid-cols-2 sm:tw-grid-cols-1"
            controlId="exampleForm.ControlInput1"
          >
            <div className=" tw-grid tw-flex-col tw-flex-wrap">
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                Employmnet Type
              </Form.Label>
              <Select
                onChange={(e, a) => setEmploymentType(a)}
                showSearch
                className="tw-h-12 tw-border-1 tw-drop-shadow-sm  tw-rounded-lg"
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
              />
            </div>
            <div>
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                Location
              </Form.Label>
              <Input
                className="tw-border-1 tw-drop-shadow-sm tw-border-gray-300 tw-h-12"
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter Job Location"
              />
              {/* <Form.Control
                onChange={(e) => setLocation(e.target.value)}
                className="tw-border-1 tw-drop-shadow-sm tw-border-gray-300 tw-h-12"
                type="email"
                placeholder="Enter Job Location"
              /> */}
            </div>
            <div className=" tw-flex tw-flex-col ">
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                Experience
              </Form.Label>
              <Select
                onChange={(e, a) => setExperience(a)}
                showSearch
                className="tw-h-12 tw-border-1 tw-drop-shadow-sm tw-rounded-lg "
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
            className="mb-4 mb-4 tw-grid lg:tw-grid-cols-3 tw-gap-4 md:tw-grid-cols-2 sm:tw-grid-cols-1"
            controlId="exampleForm.ControlInput1"
          >
            <div>
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                Salary
              </Form.Label>
              <Input
                className="tw-border-1 tw-drop-shadow-sm tw-border-gray-300 tw-h-12"
                onChange={(e) => setSalary(e.target.value)}
                placeholder="NRs.20,000-10,000 monthly"
                value={salary}
              />
              {/* <Form.Control
                onChange={(e) => setSalary(e.target.value)}
                className="tw-border-1 tw-drop-shadow-sm tw-border-gray-300 tw-h-12"
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
              >
                Negotiable
              </Checkbox>
            </div>
            <div>
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                No. of Vacancy
              </Form.Label>
              <Input
                className="tw-border-1 tw-drop-shadow-sm tw-border-gray-300 tw-h-12"
                onChange={(e) => setVacancyNumber(e.target.value)}
                placeholder="Enter number of vacancy opening"
                value={vacancyNumber}
              />
              {/* <Form.Control
                onChange={(e) => setVacancyNumber(e.target.value)}
                className="tw-border-1 tw-drop-shadow-sm tw-border-gray-300 tw-h-12"
                type="email"
                placeholder="Enter number of vacancy opening"
              /> */}
            </div>
            <div className=" tw-flex tw-flex-col">
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                Work Type
              </Form.Label>
              <Select
                onChange={(e, a) => setWorkType(a)}
                showSearch
                className="tw-h-12 tw-border-1 tw-drop-shadow-sm tw-rounded-lg "
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
            className="mb-4 tw-grid lg:tw-grid-cols-3 tw-gap-4 sm:tw-grid-cols-1 md:tw-grid-cols-2"
            controlId="exampleForm.ControlInput1"
          >
            <div className="tw-flex tw-flex-col">
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                Start Date
              </Form.Label>

              <DatePicker
                disabledDate={(current) => {
                  let customDate = moment().format("YYYY-MM-DD");
                  return current && current < moment(customDate, "YYYY-MM-DD");
                }}
                className="tw-py-3 tw-border-gray-300 tw-border-1 tw-drop-shadow-sm"
                defaultValue={dayjs(today, dateFormat)}
                format={dateFormat}
                onChange={(e, a) => setStartDate(a)}
                value={startDate ? dayjs(startDate, dateFormat) : null}
              />

              {/* <Form.Control
                className="tw-border-1 tw-drop-shadow-sm tw-border-gray-300 tw-h-12"
                type="email"
                placeholder="name@example.com"
              /> */}
            </div>
            <div className="tw-flex tw-flex-col">
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                End Date
              </Form.Label>
              <DatePicker
                disabledDate={(current) => {
                  let customDate = moment().format("YYYY-MM-DD");
                  return current && current < moment(customDate, "YYYY-MM-DD");
                }}
                className="tw-py-3 tw-border-gray-300 tw-border-1 tw-drop-shadow-sm"
                defaultValue={dayjs(today, dateFormat)}
                format={dateFormat}
                onChange={(e, a) => setEndDate(a)}
                value={endDate ? dayjs(endDate, dateFormat) : null}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
            <Form.Label className="tw-text-gray-600 tw-font-medium">
              Skills Required
            </Form.Label>
            <ReactQuill
              className="tw-mb-5  "
              theme="snow"
              value={skills}
              onChange={(e) => setSkills(e)}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
            <Form.Label className="tw-text-gray-600 tw-font-medium">
              Job Description
            </Form.Label>
            <ReactQuill
              className=" tw-mb-5 "
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

          <div className="tw-grid lg:tw-grid-cols-8 md:tw-grid-cols-4 sm:tw-grid-cols-2 tw-gap-4">
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
          className="tw-bg-primary tw-text-white  xsm:tw-w-full sm:tw-w-4/12 md:tw-w-3/12 lg:tw-w-2/12  tw-mt-10 hover:tw-bg-buttonHover tw-py-3 tw-rounded-lg tw-text-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default JobDetails;

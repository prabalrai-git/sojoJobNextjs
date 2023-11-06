"use client";

import { Checkbox, DatePicker, Input, Select } from "antd";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { Form } from "react-bootstrap";
// import ReactQuill from "react-quill";
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
import useSessionStorage from "@/hooks/useSessionStorage";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import TagsInput from "react-tagsinput";

function page() {
  //drop-down states
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

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
  const [isMounted, setIsMounted] = useState(false);

  const [data, setData] = useState();

  const [question1, setQuestion1] = useState({
    questionNumber: 1,
    questionType: null,
    questionText: null,
    requiredAnswer: null,
    jobId: id,
  });
  const [question2, setQuestion2] = useState({
    questionNumber: 2,
    questionType: null,
    questionText: null,
    requiredAnswer: null,
    jobId: id,
  });
  const [question3, setQuestion3] = useState({
    questionNumber: 3,
    questionType: null,
    questionText: null,
    requiredAnswer: null,
    jobId: id,
  });
  const [questions, setQuestions] = useState([]);
  const [questionsToUpdate, setQuestionsToUpdate] = useState();

  useEffect(() => {
    setQuestionsToUpdate([question1, question2, question3]);
  }, [question1, question2, question3]);

  const questionTypes = [
    { label: "Yes/No", value: "Yes/No" },
    { label: "Range", value: "Range" },
  ];

  const yesno = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];
  const range = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
  ];

  useEffect(() => {
    if (id) {
      getJobById();
      getJobQuestionsByJobId();
    }
  }, [id]);

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
      const skillsArray = data?.skills?.split("&");
      setSkills(skillsArray);
      setJobPackage(data?.jobPostingPackage);
    }
  }, [data]);

  const getJobById = async () => {
    try {
      const res = await Axios.get(`/job/getJobById/${id}`);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getJobQuestionsByJobId = async () => {
    try {
      const res = await Axios.get(`/job/getAllJobQuestionsByJobId/${id}`);
      setQuestions(res.data.data);
      setQuestion1(res.data.data[0]);
      setQuestion2(res.data.data[1]);
      setQuestion3(res.data.data[2]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllEmploymetType();
    getAllExperienceLevels();
    getAllWorkTypes();
    setIsMounted(true);
  }, []);

  const router = useRouter();

  const recruiterId = useSessionStorage("employerId");
  const onSubmit = async () => {
    const skillsString = skills.join("&");
    const formData = {
      title,
      jobCategoryId: category,
      jobShiftId: employmentType,
      jobLocation: location,
      experienceLevelId: experience,
      salary,
      numberOfVacancies: Number(vacancyNumber),
      // responsibilities: skills,
      jobSiteId: workType,
      jobRecruiterId: Number(recruiterId),

      startDate,
      endDate,
      jobDescription,
      // requirements: skills,
      jobPostingPackage: jobPackage,
      skills: skillsString,
    };

    try {
      const res = await Axios.patch(`/job/updateJobPost/${id}`, formData);

      try {
        if (questions) {
          questionsToUpdate?.map(async (e) => {
            await Axios.patch("job/updateJobQuestionById", e);
          });
        }
        toast.success("Edited Successfully!", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          router.push("/employer/dashboard");
        }, 500);
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
      // if (res.data.success) {

      // }
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
      const res = await Axios.get("/admin/jobCategories/getAllJobCategories");
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
    isMounted && (
      <>
        <ToastContainer />

        <div className="tw-pt-10 tw-mx-10 tw-pb-20">
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
                  className="mb-4 tw-grid lg:tw-grid-cols-3 tw-gap-4 md:tw-grid-cols-2 sm:tw-grid-cols-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <div className=" tw-grid tw-flex-col tw-flex-wrap">
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
                  className="mb-4 mb-4 tw-grid lg:tw-grid-cols-3 tw-gap-4 md:tw-grid-cols-2 sm:tw-grid-cols-1"
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
                  className="mb-4 tw-grid lg:tw-grid-cols-3 tw-gap-4 sm:tw-grid-cols-1 md:tw-grid-cols-2"
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
                {/* <Form.Group
                  className="mb-4 tw-mb-10"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="tw-text-gray-600 tw-font-medium">
                    Skills Required
                  </Form.Label>
                  <ReactQuill
                    className="tw-mb-5 "
                    theme="snow"
                    value={skills}
                    onChange={(e) => setSkills(e)}
                    size
                  />
                </Form.Group> */}
                <Form.Group
                  className="mb-4  "
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="tw-text-gray-600 tw-font-medium">
                    Skills Required (Make sure to press enter after writing a
                    skill set.)
                  </Form.Label>
                  <TagsInput
                    value={skills.length > 0 && skills}
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
                    className=" tw-mb-5 "
                    theme="snow"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e)}
                  />
                </Form.Group>
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
              {questions.length > 0 && (
                <>
                  <div className="tw-flex tw-flex-row tw-justify-between tw-mt-10">
                    <div className="tw-flex tw-flex-row">
                      <Image
                        src={"/borderBlack.png"}
                        width={10}
                        height={10}
                        alt="border"
                        className="tw-object-fit tw-mr-7"
                      />
                      <h1 className="tw-text-xl tw-font-semibold tw-self-center">
                        Candidate Questions
                      </h1>
                    </div>
                  </div>
                  <p className="tw-my-8 tw-text-gray-500 tw-font-medium">
                    3 questions to briefly speculate the candidate.
                  </p>
                  <div className="tw-mt-10">
                    <Form>
                      <Form.Group
                        className="mb-4 tw-grid tw-grid-cols-3 tw-gap-4 sm:tw-grid-cols-2 xsm:tw-grid-cols-1 md:tw-grid-cols-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <div>
                          <Form.Label className="tw-text-gray-600 tw-font-medium">
                            Question Type 1
                          </Form.Label>
                          <Select
                            onChange={(e, a) =>
                              setQuestion1((prev) => ({
                                ...prev,
                                questionType: e,
                              }))
                            }
                            showSearch
                            className="tw-h-12 tw-border-2  tw-rounded-lg tw-w-full"
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
                                .localeCompare(
                                  (optionB?.label ?? "").toLowerCase()
                                )
                            }
                            options={questionTypes}
                            value={
                              question1?.questionType
                                ? question1.questionType
                                : questions[0]?.questionType
                            }
                          />
                        </div>
                        <div>
                          <Form.Label className="tw-text-gray-600 tw-font-medium">
                            Question 1
                          </Form.Label>
                          <Input
                            className="tw-border-2 tw-border-gray-300 tw-h-12"
                            onChange={(e) =>
                              setQuestion1((prev) => ({
                                ...prev,
                                questionText: e.target.value,
                              }))
                            }
                            placeholder="Enter Question here"
                            value={
                              question1?.questionText
                                ? question1.questionText
                                : questions[0]?.questionText
                            }
                          />
                        </div>
                        <div>
                          <Form.Label className="tw-text-gray-600 tw-font-medium">
                            Ideal Answer 1
                          </Form.Label>
                          <Select
                            onChange={(e, a) =>
                              setQuestion1((prev) => ({
                                ...prev,
                                requiredAnswer: e,
                              }))
                            }
                            showSearch
                            className="tw-h-12 tw-border-2  tw-rounded-lg tw-w-full"
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
                                .localeCompare(
                                  (optionB?.label ?? "").toLowerCase()
                                )
                            }
                            options={
                              question1?.questionType
                                ? question1?.questionType == "Yes/No"
                                  ? yesno
                                  : range
                                : questions[0]?.questionType == "Yes/No"
                                ? yesno
                                : range
                            }
                            value={
                              question1?.requiredAnswer
                                ? question1?.requiredAnswer
                                : questions[0]?.requiredAnswer
                            }
                          />
                        </div>
                      </Form.Group>
                      <Form.Group
                        className="mb-4 tw-grid tw-grid-cols-3 tw-gap-4 sm:tw-grid-cols-2 xsm:tw-grid-cols-1 md:tw-grid-cols-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <div>
                          <Form.Label className="tw-text-gray-600 tw-font-medium">
                            Question Type 2
                          </Form.Label>
                          <Select
                            onChange={(e, a) =>
                              setQuestion2((prev) => ({
                                ...prev,
                                questionType: e,
                              }))
                            }
                            showSearch
                            className="tw-h-12 tw-border-2  tw-rounded-lg tw-w-full"
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
                                .localeCompare(
                                  (optionB?.label ?? "").toLowerCase()
                                )
                            }
                            options={questionTypes}
                            value={
                              question2?.questionType
                                ? question2.questionType
                                : questions[1]?.questionType
                            }
                          />
                        </div>
                        <div>
                          <Form.Label className="tw-text-gray-600 tw-font-medium">
                            Question 2
                          </Form.Label>
                          <Input
                            className="tw-border-2 tw-border-gray-300 tw-h-12"
                            onChange={(e) =>
                              setQuestion2((prev) => ({
                                ...prev,
                                questionText: e.target.value,
                              }))
                            }
                            placeholder="Enter Question here"
                            value={
                              question2?.questionText
                                ? question2?.questionText
                                : questions[1]?.questionText
                            }
                          />
                        </div>
                        <div>
                          <Form.Label className="tw-text-gray-600 tw-font-medium">
                            Ideal Answer 2
                          </Form.Label>
                          <Select
                            onChange={(e, a) =>
                              setQuestion2((prev) => ({
                                ...prev,
                                requiredAnswer: e,
                              }))
                            }
                            showSearch
                            className="tw-h-12 tw-border-2  tw-rounded-lg tw-w-full"
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
                                .localeCompare(
                                  (optionB?.label ?? "").toLowerCase()
                                )
                            }
                            options={
                              question2?.questionType
                                ? question2?.questionType == "Yes/No"
                                  ? yesno
                                  : range
                                : questions[1]?.questionType == "Yes/No"
                                ? yesno
                                : range
                            }
                            value={
                              question2?.requiredAnswer
                                ? question2.requiredAnswer
                                : questions[1]?.requiredAnswer
                            }
                          />
                        </div>
                      </Form.Group>
                      <Form.Group
                        className="mb-4 tw-grid tw-grid-cols-3 tw-gap-4 sm:tw-grid-cols-2 xsm:tw-grid-cols-1 md:tw-grid-cols-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <div>
                          <Form.Label className="tw-text-gray-600 tw-font-medium">
                            Question Type 3
                          </Form.Label>
                          <Select
                            onChange={(e, a) =>
                              setQuestion3((prev) => ({
                                ...prev,
                                questionType: e,
                              }))
                            }
                            showSearch
                            className="tw-h-12 tw-border-2  tw-rounded-lg tw-w-full"
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
                                .localeCompare(
                                  (optionB?.label ?? "").toLowerCase()
                                )
                            }
                            options={questionTypes}
                            value={
                              question3?.questionType
                                ? question3.questionType
                                : questions[2]?.questionType
                            }
                          />
                        </div>
                        <div>
                          <Form.Label className="tw-text-gray-600 tw-font-medium">
                            Question 3
                          </Form.Label>
                          <Input
                            className="tw-border-2 tw-border-gray-300 tw-h-12"
                            onChange={(e) =>
                              setQuestion3((prev) => ({
                                ...prev,
                                questionText: e.target.value,
                              }))
                            }
                            placeholder="Enter Question here"
                            value={
                              question3?.questionText
                                ? question3.questionText
                                : questions[2]?.questionText
                            }
                          />
                        </div>
                        <div>
                          <Form.Label className="tw-text-gray-600 tw-font-medium">
                            Ideal Answer 3
                          </Form.Label>
                          <Select
                            onChange={(e, a) =>
                              setQuestion3((prev) => ({
                                ...prev,
                                requiredAnswer: e,
                              }))
                            }
                            showSearch
                            className="tw-h-12 tw-border-2  tw-rounded-lg tw-w-full"
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
                                .localeCompare(
                                  (optionB?.label ?? "").toLowerCase()
                                )
                            }
                            options={
                              question3?.questionType
                                ? question3?.questionType == "Yes/No"
                                  ? yesno
                                  : range
                                : questions[2]?.questionType == "Yes/No"
                                ? yesno
                                : range
                            }
                            value={
                              question3?.requiredAnswer
                                ? question3.requiredAnswer
                                : questions[2]?.requiredAnswer
                            }
                          />
                        </div>
                      </Form.Group>
                    </Form>
                    {/* buttons */}
                    {/* <div className="tw-mb-10">
          <button
            onClick={() => setStep((prev) => prev + 1)}
            className="tw-bg-primary tw-text-white tw-px-16 tw-mt-10 hover:tw-bg-buttonHover tw-py-3 tw-rounded-lg tw-text-lg tw-mr-5"
          >
            Next
          </button>
          <button
            onClick={() => setStep((prev) => prev - 1)}
            className="tw-bg-white tw-text-black tw-border-black tw-border tw-px-16 tw-mt-10 hover:tw-border-primary hover:tw-text-primary tw-py-3 tw-rounded-lg tw-text-lg"
          >
            Previous
          </button>
        </div> */}
                  </div>
                </>
              )}

              <button
                onClick={() => {
                  onSubmit();
                }}
                className="tw-bg-primary tw-text-white  xsm:tw-w-full sm:tw-w-4/12 md:tw-w-3/12 lg:tw-w-2/12  tw-mt-10 hover:tw-bg-buttonHover tw-py-3 tw-rounded-lg tw-text-lg"
              >
                Edit Job
              </button>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default page;

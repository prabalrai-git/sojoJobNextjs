"use client";

import { Input, Select } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
function JobQuestions({ setStep, setJobQuestions }) {
  const [question1, setQuestion1] = useState({
    questionNumber: 1,
    questionType: "Number",
    questionText: null,
    requiredAnswer: null,
  });
  const [question2, setQuestion2] = useState({
    questionNumber: 2,
    questionType: "Number",
    questionText: null,
    requiredAnswer: null,
  });
  const [question3, setQuestion3] = useState({
    questionNumber: 3,
    questionType: "Number",
    questionText: null,
    requiredAnswer: null,
  });

  useEffect(() => {
    setJobQuestions([question1, question2, question3]);
  }, [question1, question2, question3]);
  const questionTypes = [
    { label: "Yes/No", value: "Yes/No" },
    { label: "Number", value: "Number" },
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
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    // { label: "10", value: "10" },
  ];

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
            Candidate Questions
          </h1>
        </div>
      </div>
      <p className="tw-my-8 tw-text-gray-500 tw-font-medium">
        Ask upto 3 questions to briefly speculate the candidate.
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
                  setQuestion1((prev) => ({ ...prev, questionType: e }))
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
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={questionTypes}
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
              />
            </div>
            <div>
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                Ideal Answer 1
              </Form.Label>
              {question1?.questionType == "Yes/No" ? (
                <Select
                  onChange={(e, a) =>
                    setQuestion1((prev) => ({ ...prev, requiredAnswer: e }))
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
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={yesno}
                />
              ) : (
                <Input
                  className="tw-border-2 tw-border-gray-300 tw-h-12"
                  onChange={(e) =>
                    setQuestion1((prev) => ({
                      ...prev,
                      requiredAnswer: e.target.value,
                    }))
                  }
                  type="number"
                  placeholder="Enter answer here"
                />
              )}
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
                  setQuestion2((prev) => ({ ...prev, questionType: e }))
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
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={questionTypes}
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
              />
            </div>
            <div>
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                Ideal Answer 2
              </Form.Label>
              {question2?.questionType == "Yes/No" ? (
                <Select
                  onChange={(e, a) =>
                    setQuestion2((prev) => ({ ...prev, requiredAnswer: e }))
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
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={yesno}
                />
              ) : (
                <Input
                  className="tw-border-2 tw-border-gray-300 tw-h-12"
                  onChange={(e) =>
                    setQuestion2((prev) => ({
                      ...prev,
                      requiredAnswer: e.target.value,
                    }))
                  }
                  type="number"
                  placeholder="Enter answer here"
                />
              )}
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
                  setQuestion3((prev) => ({ ...prev, questionType: e }))
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
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={questionTypes}
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
              />
            </div>
            <div>
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                Ideal Answer 3
              </Form.Label>
              {question3?.questionType == "Yes/No" ? (
                <Select
                  onChange={(e, a) =>
                    setQuestion3((prev) => ({ ...prev, requiredAnswer: e }))
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
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={yesno}
                />
              ) : (
                <Input
                  className="tw-border-2 tw-border-gray-300 tw-h-12"
                  onChange={(e) =>
                    setQuestion3((prev) => ({
                      ...prev,
                      requiredAnswer: e.target.value,
                    }))
                  }
                  type="number"
                  placeholder="Enter answer here"
                />
              )}
            </div>
          </Form.Group>
        </Form>
        {/* buttons */}
        <div className="tw-mb-10">
          <button
            onClick={() => setStep((prev) => prev + 1)}
            className="tw-bg-primary tw-text-white  xsm:tw-w-full sm:tw-w-4/12 md:tw-w-3/12 lg:tw-w-2/12  tw-mt-10 hover:tw-bg-buttonHover tw-py-3 tw-rounded-lg tw-text-lg"
          >
            Next
          </button>
          {/* <button
            onClick={() => setStep((prev) => prev - 1)}
            className="tw-bg-white tw-text-black tw-border-black tw-border tw-px-16 tw-mt-10 hover:tw-border-primary hover:tw-text-primary tw-py-3 tw-rounded-lg tw-text-lg"
          >
            Previous
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default JobQuestions;

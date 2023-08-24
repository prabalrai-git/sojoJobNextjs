"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Stepper } from "react-form-stepper";
import Form from "react-bootstrap/Form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function page() {
  const [value, setValue] = useState("");
  const steps = [
    { label: "Job Details" },
    { label: "Job Questions" },
    { label: "Job Preview" },
    { label: "Contact" },
  ];
  const activeStep = 0;
  return (
    <div className="tw-pt-10 tw-mx-40 tw-pb-10">
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
        <h1 className="tw-text-black tw-font-semibold tw-text-xl tw-self-center">
          Create Job Post
        </h1>
      </div>
      <div className=" ">
        <Stepper
          className="tw-text-primary"
          connectorStyleConfig={{ size: 8 }}
          styleConfig={{
            activeBgColor: "#27AF61",
            completedBgColor: "#27AF61",
            inactiveBgColor: "#848484",
            activeTextColor: "white",
            inactiveTextColor: "white",
            fontWeight: "600",
            labelFontSize: "18px",
          }}
          steps={steps}
          activeStep={activeStep}
        />
      </div>
      {/*  */}
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
                Email address
              </Form.Label>
              <Form.Control
                className="tw-border-2 tw-border-gray-300 tw-h-12"
                type="email"
                placeholder="name@example.com"
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                Email address
              </Form.Label>
              <Form.Control
                className="tw-border-2 tw-border-gray-300 tw-h-12"
                type="email"
                placeholder="name@example.com"
              />
            </Form.Group>
            <Form.Group
              className="mb-4 tw-grid tw-grid-cols-3 tw-gap-4"
              controlId="exampleForm.ControlInput1"
            >
              <div>
                <Form.Label className="tw-text-gray-600 tw-font-medium">
                  Email address
                </Form.Label>
                <Form.Control
                  className="tw-border-2 tw-border-gray-300 tw-h-12"
                  type="email"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <Form.Label className="tw-text-gray-600 tw-font-medium">
                  Email address
                </Form.Label>
                <Form.Control
                  className="tw-border-2 tw-border-gray-300 tw-h-12"
                  type="email"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <Form.Label className="tw-text-gray-600 tw-font-medium">
                  Email address
                </Form.Label>
                <Form.Control
                  className="tw-border-2 tw-border-gray-300 tw-h-12"
                  type="email"
                  placeholder="name@example.com"
                />
              </div>
            </Form.Group>
            <Form.Group
              className="mb-4 tw-grid tw-grid-cols-3 tw-gap-4"
              controlId="exampleForm.ControlInput1"
            >
              <div>
                <Form.Label className="tw-text-gray-600 tw-font-medium">
                  Email address
                </Form.Label>
                <Form.Control
                  className="tw-border-2 tw-border-gray-300 tw-h-12"
                  type="email"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <Form.Label className="tw-text-gray-600 tw-font-medium">
                  Email address
                </Form.Label>
                <Form.Control
                  className="tw-border-2 tw-border-gray-300 tw-h-12"
                  type="email"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <Form.Label className="tw-text-gray-600 tw-font-medium">
                  Email address
                </Form.Label>
                <Form.Control
                  className="tw-border-2 tw-border-gray-300 tw-h-12"
                  type="email"
                  placeholder="name@example.com"
                />
              </div>
            </Form.Group>
            <Form.Group
              className="mb-4 tw-grid tw-grid-cols-3 tw-gap-4"
              controlId="exampleForm.ControlInput1"
            >
              <div>
                <Form.Label className="tw-text-gray-600 tw-font-medium">
                  Email address
                </Form.Label>
                <Form.Control
                  className="tw-border-2 tw-border-gray-300 tw-h-12"
                  type="email"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <Form.Label className="tw-text-gray-600 tw-font-medium">
                  Email address
                </Form.Label>
                <Form.Control
                  className="tw-border-2 tw-border-gray-300 tw-h-12"
                  type="email"
                  placeholder="name@example.com"
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                Job Description
              </Form.Label>
              <ReactQuill
                className="tw-h-40 tw-mb-20  "
                theme="snow"
                value={value}
                onChange={setValue}
              />
            </Form.Group>
            <Form.Group
              className="mb-4  "
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                Email address
              </Form.Label>
              <Form.Control
                className="tw-border-2 tw-border-gray-300 tw-h-12"
                type="email"
                placeholder="name@example.com"
              />
            </Form.Group>
          </Form>

          <button className="tw-bg-primary tw-text-white tw-px-16 tw-mt-10 hover:tw-bg-buttonHover tw-py-3 tw-rounded-lg tw-text-lg">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;

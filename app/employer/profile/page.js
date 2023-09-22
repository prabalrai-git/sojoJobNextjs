"use client";

import { DatePicker, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Dropzone, { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dayjs from "dayjs";
import Axios from "@/api/server";

function page() {
  const [value, setValue] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    getProfileInformation();
  }, []);

  const getProfileInformation = async () => {
    try {
      const res = await Axios.get(
        `/jobRecruiter/getJobRecruiterById/${localStorage.getItem(
          "employerId"
        )}`
      );

      console.log(res.data.data);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const dateFormat = "YYYY-MM-DD";
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  today = yyyy + "/" + mm + "/" + dd;

  return (
    <div className="tw-pt-10 tw-mx-40 tw-pb-10">
      <div className="tw-flex tw-flex-row tw-mb-10">
        <Link href={"/employer/dashboard"}>
          <Image
            src={"/arrow-left.png"}
            width={40}
            height={40}
            alt="back"
            className="tw-mr-10 tw-object-contain"
          />
        </Link>
        <h1 className="tw-text-black tw-font-semibold tw-text-xl tw-self-center">
          Profile Setup
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
              Basic Information
            </h1>
          </div>
        </div>
        <div className="tw-mt-10">
          <Form>
            <Form.Group
              className="mb-4 tw-grid tw-grid-cols-5 tw-gap-4"
              controlId="exampleForm.ControlInput1"
            >
              <div className="tw-bg-blue-100 tw-rounded-lg tw-flex tw-justify-center tw-items-center tw-col-span-2">
                <div
                  className="tw-flex tw-flex-col"
                  {...getRootProps({ className: "dropzone" })}
                >
                  <input {...getInputProps()} />
                  <Image
                    src={"/upload.png"}
                    width={65}
                    height={65}
                    alt="upload"
                    className="tw-object-contain tw-mb-8 tw-self-center tw-mx-auto"
                  />
                  <p className="tw-text-black tw-font-bold tw-text-lg tw-mb-4 tw-text-center">
                    Drag and Drop file
                  </p>
                  <p className="tw-text-black tw-font-medium tw-text-lg tw-mb-4 tw-text-center">
                    or
                  </p>
                  <button
                    className="tw-bg-dndBtn hover:tw-bg-dndBtnH tw-text-white tw-font-medium tw-text-center tw-rounded-lg tw-px-8 tw-py-3"
                    type="button"
                    onClick={open}
                  >
                    Browse files
                  </button>
                </div>
                {/* <div>
                  <h4>Files</h4>
                  <ul>{files}</ul>
                </div> */}
              </div>
              <div className="tw-col-span-3 tw-grid tw-gap-8">
                <div>
                  <Form.Label className="tw-text-gray-600 tw-font-medium">
                    Company Name
                  </Form.Label>
                  <Input
                    className="tw-h-12"
                    placeholder="Enter company name"
                    value={data?.companyName}
                  />
                </div>
                <div>
                  <Form.Label className="tw-text-gray-600 tw-font-medium">
                    Company Email
                  </Form.Label>
                  <Input
                    type="email"
                    className="tw-h-12"
                    placeholder="Enter company email"
                    value={data?.companyEmail}
                  />
                </div>
                <div>
                  <Form.Label className="tw-text-gray-600 tw-font-medium">
                    Contact Number
                  </Form.Label>
                  <Input
                    type="number"
                    className="tw-h-12"
                    placeholder="Enter company contact number"
                    value={data?.companyPhone}
                  />
                </div>
                <div>
                  <Form.Label className="tw-text-gray-600 tw-font-medium">
                    Name
                  </Form.Label>
                  <Input className="tw-h-12" placeholder="Enter name" />
                </div>
              </div>
            </Form.Group>
            <Form.Group
              className="mb-4 tw-grid tw-grid-cols-2 tw-gap-4"
              controlId="exampleForm.ControlInput1"
            >
              <div>
                <Form.Label className="tw-text-gray-600 tw-font-medium">
                  Founded Date
                </Form.Label>

                <DatePicker
                  className="tw-py-3 tw-border-gray-300 tw-border-2 tw-w-full"
                  defaultValue={dayjs(today, dateFormat)}
                  format={dateFormat}
                  onChange={(e, a) => console.log(a)}
                  // value={startDate ? dayjs(startDate, dateFormat) : null}
                />
              </div>
              <div>
                <Form.Label className="tw-text-gray-600 tw-font-medium">
                  Headquaters
                </Form.Label>
                <Input
                  className="tw-h-12"
                  placeholder="Enter headquater"
                  value={data?.companyHeadquarters}
                />
              </div>
            </Form.Group>
            <Form.Group
              className="mb-4 tw-grid tw-grid-cols-2 tw-gap-4"
              controlId="exampleForm.ControlInput1"
            >
              <div>
                <Form.Label className="tw-text-gray-600 tw-font-medium">
                  Number of Employees
                </Form.Label>
                <Input
                  className="tw-h-12"
                  type="number"
                  placeholder="Enter number of employees"
                  value={data?.companySize}
                />
              </div>
              <div>
                <Form.Label className="tw-text-gray-600 tw-font-medium">
                  Website Url
                </Form.Label>
                <Input
                  className="tw-h-12"
                  placeholder="Enter website url"
                  value={data?.companyWebsiteURL}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
              <div className="tw-flex tw-flex-row tw-justify-between tw-my-10">
                <div className="tw-flex tw-flex-row">
                  <Image
                    src={"/borderBlack.png"}
                    width={10}
                    height={10}
                    alt="border"
                    className="tw-object-fit tw-mr-7"
                  />
                  <h1 className="tw-text-xl tw-font-semibold tw-self-center">
                    Profile Information
                  </h1>
                </div>
              </div>
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                About Us
              </Form.Label>
              <ReactQuill
                className="tw-h-40 tw-mb-20  "
                theme="snow"
                value={value}
                onChange={setValue}
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

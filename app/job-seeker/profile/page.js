"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Dropzone, { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function page() {
  const [value, setValue] = useState();
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

  return (
    <div className="tw-pt-10 tw-mx-40 tw-pb-10">
      <div className="tw-flex tw-flex-row tw-mb-10">
        <Link href={"/job-seeker/dashboard"}>
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
              </div>

              <div className="tw-flex tw-flex-row tw-mt-10 tw-justify-between">
                <div className="tw-flex tw-flex-row">
                  <Image
                    src={"/borderBlack.png"}
                    width={10}
                    height={10}
                    alt="border"
                    className="tw-object-fit tw-mr-7"
                  />
                  <h1 className="tw-text-xl tw-font-semibold tw-self-center">
                    General Information
                  </h1>
                </div>
              </div>
            </Form.Group>
            <Form.Group
              className="mb-4 tw-grid tw-grid-cols-2 tw-gap-4"
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
            <Form.Group
              className="mb-4 tw-grid tw-grid-cols-2 tw-gap-4"
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
            <Form.Group
              className="mb-4 tw-grid tw-grid-cols-2 tw-gap-4"
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
            <Form.Group
              className="mb-4 tw-grid tw-grid-cols-2 tw-gap-4"
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
                    Summary
                  </h1>
                </div>
              </div>
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                Tell us something about yourself
              </Form.Label>
              <ReactQuill
                className="tw-h-40 tw-mb-20  "
                theme="snow"
                value={value}
                onChange={setValue}
              />
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
                    Work Information
                  </h1>
                </div>
              </div>
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                Create your professional work experience section
              </Form.Label>
              <ReactQuill
                className="tw-h-40 tw-mb-20  "
                theme="snow"
                value={value}
                onChange={setValue}
              />
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
                    Education Background
                  </h1>
                </div>
              </div>
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                Create your education background section
              </Form.Label>
              <ReactQuill
                className="tw-h-40 tw-mb-20  "
                theme="snow"
                value={value}
                onChange={setValue}
              />
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
                    Licenses & Certification
                  </h1>
                </div>
              </div>
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                Create your licenses and certification section
              </Form.Label>
              <ReactQuill
                className="tw-h-40 tw-mb-20  "
                theme="snow"
                value={value}
                onChange={setValue}
              />
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
                    Other Skillset
                  </h1>
                </div>
              </div>
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                Enter any other skillsets that you have
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

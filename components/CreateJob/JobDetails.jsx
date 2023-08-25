import Image from "next/image";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function JobDetails({ setStep }) {
  const [value, setValue] = useState("");

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
          <Form.Group className="mb-4  " controlId="exampleForm.ControlInput1">
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

        <button
          onClick={() => setStep((prev) => prev + 1)}
          className="tw-bg-primary tw-text-white tw-px-16 tw-mt-10 hover:tw-bg-buttonHover tw-py-3 tw-rounded-lg tw-text-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default JobDetails;

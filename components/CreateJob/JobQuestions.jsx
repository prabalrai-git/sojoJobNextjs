import Image from "next/image";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
function JobQuestions({ setStep }) {
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
        </Form>
        {/* buttons */}
        <div>
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
        </div>
      </div>
    </div>
  );
}

export default JobQuestions;

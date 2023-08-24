"use client";

import PostedJobs from "@/components/PostedJobs";
import React from "react";
import Form from "react-bootstrap/Form";

function page() {
  return (
    <div className="tw-pt-20 tw-px-36 tw-pb-16">
      <div className="tw-flex tw-flex-row">
        <div className="tw-mr-5 tw-w-64">
          <Form.Label
            className="tw-text-gray-700 tw-font-medium"
            htmlFor="inputPassword5"
          >
            Search Jobs
          </Form.Label>
          <Form.Control
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            className="tw-h-12 tw-border tw-border-primary tw-w-full"
          />
        </div>
        <div className="tw-w-64">
          <Form.Label
            className="tw-text-gray-700 tw-font-medium"
            htmlFor="inputPassword5"
          >
            Job Status
          </Form.Label>

          <Form.Select
            aria-label="Default select example"
            className="tw-h-12 tw-border tw-border-primary tw-w-full"
          >
            <option className="tw-text-primary">Select</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </div>
      </div>
      <PostedJobs fromList={true} />
    </div>
  );
}

export default page;

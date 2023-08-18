"use client";

import Image from "next/image";
import React from "react";
import Form from "react-bootstrap/Form";

function page() {
  return (
    <div className="tw-mx-28 tw-mt-10">
      <div className="tw-flex tw-flex-row tw-justify-between">
        <h2 className="tw-font-medium">Search Jobs</h2>
        <div className="tw-flex tw-justify-center tw-mb-10 tw-w-3/12 tw-relative">
          {/* <Input
          className="tw-bg-textInput tw-w-96 tw-h-15"
          size="large"
          placeholder="Search jobs"
          prefix={<SearchOutlined />}
        /> */}
          <input
            type="text"
            id="fname"
            name="fname"
            style={{ height: "50px" }}
            placeholder="Search Jobs"
            className="tw-bg-textInput tw-w-full tw-rounded-lg tw-pl-10"
          ></input>
          <Image
            src={"/search.png"}
            width={20}
            height={20}
            alt="search.png"
            className="tw-object-contain tw-absolute tw-top-4 tw-left-3 "
          />
        </div>
      </div>
      {/*  */}
      <h5 className="tw-font-medium">Filters:</h5>
      <div className="tw-flex tw-flex-row tw-mt-8">
        <div className="tw-mr-4 tw-w-3/12">
          <Form.Select className="tw-h-12" aria-label="Default select example">
            <option>Categories</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </div>
        <div className="tw-mr-4 tw-w-3/12">
          <Form.Select className="tw-h-12" aria-label="Default select example">
            <option>Education Level</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </div>
        <div className="tw-mr-4 tw-w-3/12">
          <Form.Select className="tw-h-12" aria-label="Default select example">
            <option>Expericence Level</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </div>
      </div>
    </div>
  );
}

export default page;

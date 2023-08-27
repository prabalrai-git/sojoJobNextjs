"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Table from "react-bootstrap/Table";

function AppliedJobs({ fromList }) {
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
          <h1 className="tw-text-lg tw-font-semibold tw-self-center">
            Jobs Applied
          </h1>
        </div>
        {!fromList && (
          <Link className="tw-self-center" href={"/employer/job/list"}>
            <h1 className=" tw-text-primary">SEE ALL</h1>
          </Link>
        )}
      </div>
      {/* <Image
        src={"/files.png"}
        height={145}
        width={145}
        alt="file"
        className="tw-relative tw-right-0 tw-left-0 tw-mx-auto"
      /> */}
      <Table className="tw-mt-10" responsive="xl">
        <thead>
          <tr>
            {Array.from({ length: 6 }).map((_, index) => (
              <th
                className="tw-text-gray-500 tw-font-normal tw-text-xl tw-pb-5"
                key={index}
              >
                Table heading
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="tw-h-52  tw-items-center">
          <tr className="tw-text-gray-500 tw-font-normal tw-text-xl tw-pb-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <td key={index}>Table cell {index}</td>
            ))}
          </tr>
          <tr className="tw-text-gray-500 tw-font-normal tw-text-xl tw-pb-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <td key={index}>Table cell {index}</td>
            ))}
          </tr>
          <tr className="tw-text-gray-500 tw-font-normal tw-text-xl tw-pb-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <td key={index}>Table cell {index}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default AppliedJobs;

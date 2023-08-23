import Image from "next/image";
import Link from "next/link";
import React from "react";

function PostedJobs({ fromList }) {
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
            Contact Person
          </h1>
        </div>
        {!fromList && (
          <Link href={"/employer/job/list"}>
            <h1 className="tw-self-center tw-text-primary">SEE ALL</h1>
          </Link>
        )}
      </div>
      <Image
        src={"/files.png"}
        height={145}
        width={145}
        alt="file"
        className="tw-relative tw-right-0 tw-left-0 tw-mx-auto"
      />
    </div>
  );
}

export default PostedJobs;

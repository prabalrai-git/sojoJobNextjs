import Image from "next/image";
import React from "react";

function JobPreview({ setStep }) {
  return (
    <div className="tw-bg-white tw-rounded-lg tw-w-full tw-mt-10 tw-px-10 tw-py-6 ">
      <div className="tw-flex tw-flex-row tw-justify-between">
        <h1 className="tw-text-black tw-text-2xl tw-font-medium tw-self-end">
          Senior Software Engineer
        </h1>
        <div className="tw-self-center tw-flex tw-flex-row">
          <button className="tw-bg-cardBorder tw-flex tw-flex-row tw-justify-between tw-text-primary tw-font-medium tw-px-8 tw-py-3 tw-rounded-lg tw-mr-3">
            <Image
              src={"/eye.png"}
              width={20}
              height={20}
              alt="view"
              className=" tw-self-center"
            />
            <p className="tw-ml-2 tw-text-base ">View as public</p>
          </button>
          <button
            onClick={() => setStep((prev) => prev + 1)}
            className="tw-text-white tw-text-base tw-font-medium tw-bg-primary tw-px-8 tw-py-3 tw-rounded-lg "
          >
            Post Job
          </button>
        </div>
      </div>
      {/*  */}
      <h2 className="tw-text-black tw-text-lg tw-mt-7 tw-mb-8 tw-font-light">
        Leapfrog Technology
      </h2>
      {/*  */}
      <div className="tw-flex tw-flex-row tw-mt-4 tw-flex-wrap tw-mb-10 ">
        <div className="tw-flex tw-flex-row tw-mr-7 tw-items-center">
          <Image
            src={"/clock.png"}
            width={20}
            height={20}
            alt="timing"
            className="tw-object-contain tw-mr-3 tw-self-center "
          />

          <p className="tw-self-center  tw-text-gray-600 tw-text-medium">
            Full Time
          </p>
        </div>
        <div className="tw-flex tw-flex-row tw-mr-7 tw-items-center">
          <Image
            src={"/signal-status.png"}
            width={20}
            height={20}
            alt="timing"
            className="tw-object-contain tw-mr-3 tw-self-center "
          />

          <p className="tw-self-center  tw-text-gray-600 tw-text-medium">
            Mid Level
          </p>
        </div>
        <div className="tw-flex tw-flex-row tw-mr-7 tw-items-center">
          <Image
            src={"/money.png"}
            width={20}
            height={20}
            alt="timing"
            className="tw-object-contain tw-mr-3 tw-self-center"
          />

          <p className="tw-self-center  tw-text-gray-600 tw-text-medium">
            Negotiable
          </p>
        </div>
        <div className="tw-flex tw-flex-row tw-mr-7 tw-items-center">
          <Image
            src={"/briefcase.png"}
            width={20}
            height={20}
            alt="timing"
            className="tw-object-contain tw-mr-3 tw-self-center"
          />

          <p className="tw-self-center  tw-text-gray-600 tw-text-medium">
            In Office
          </p>
        </div>
      </div>
      {/*  */}
      <div className="tw-mb-10">
        <h2 className="tw-text-black tw-font-medium tw-mb-4">
          {" "}
          Job Description{" "}
        </h2>
        <p style={{ lineHeight: 1.5 }} className="tw-text-gray-400 ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
          voluptatum nemo in. Nihil unde rem optio consequuntur itaque voluptate
          molestias, quas dolores necessitatibus assumenda, iusto voluptatum
          consequatur doloribus quidem modi blanditiis fugiat officia
          repellendus corrupti pariatur deserunt odio distinctio debitis. Vitae
          ducimus nobis repellat dolorem consequatur quibusdam? Aut, unde. Cum!
        </p>
      </div>
      <div className="tw-mb-10">
        <h2 className="tw-text-black tw-font-medium tw-mb-4">Requirements</h2>
        <p style={{ lineHeight: 1.5 }} className="tw-text-gray-400 ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
          voluptatum nemo in. Nihil unde rem optio consequuntur itaque voluptate
          molestias, quas dolores necessitatibus assumenda, iusto voluptatum
          consequatur doloribus quidem modi blanditiis fugiat officia
          repellendus corrupti pariatur deserunt odio distinctio debitis. Vitae
          ducimus nobis repellat dolorem consequatur quibusdam? Aut, unde. Cum!
        </p>
      </div>
      <div className="tw-mb-10">
        <h2 className="tw-text-black tw-font-medium tw-mb-4">
          Responsibilities
        </h2>
        <p style={{ lineHeight: 1.5 }} className="tw-text-gray-400 ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
          voluptatum nemo in. Nihil unde rem optio consequuntur itaque voluptate
          molestias, quas dolores necessitatibus assumenda, iusto voluptatum
          consequatur doloribus quidem modi blanditiis fugiat officia
          repellendus corrupti pariatur deserunt odio distinctio debitis. Vitae
          ducimus nobis repellat dolorem consequatur quibusdam? Aut, unde. Cum!
        </p>
      </div>
    </div>
  );
}

export default JobPreview;

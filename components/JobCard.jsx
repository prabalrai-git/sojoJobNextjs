import Image from "next/image";
import React from "react";

function JobCard({ job }) {
  return (
    <div className=" tw-flex tw-flex-row tw-border-2  tw-border-cardBorder tw-rounded-lg tw-p-5 tw-pb-0 tw-cursor-pointer hover:tw-shadow tw-shadow-cyan-500/50">
      <div>
        <Image
          className="tw-rounded-full tw-mr-5 tw-h-8 tw-w-8 lg:tw-w-10 lg:tw-h-10"
          src={"/companyLogo.png"}
          width={46}
          height={46}
          alt="companylogo"
        />
      </div>

      <div>
        <p className="tw-font-semibold tw-text-lg tw-mb-2 tw-capitalize">
          {job?.title}
        </p>
        <p className="tw-text-md tw-font-normal tw-mb-3 tw-capitalize">
          {job?.jobRecruiter.companyName}
        </p>
        <div className="tw-flex tw-flex-row tw-flex-wrap -tw-ml-1 ">
          <div className="tw-flex tw-flex-row  tw-mr-3">
            <Image
              src={"/clock.png"}
              width={20}
              height={20}
              alt="job-shift"
              className="tw-mr-2  tw-mb-10 tw-object-contain"
            />
            <p className="tw-text-primary">{job?.jobShift?.title}</p>
          </div>
          <div className="tw-flex tw-flex-row ">
            <Image
              src={"/briefcase.png"}
              width={20}
              height={20}
              alt="job-site"
              className="tw-mr-2 tw-mb-10  tw-object-contain"
            />
            <p className="tw-text-primary">{job?.jobSite?.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;

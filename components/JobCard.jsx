import Image from "next/image";
import React from "react";

function JobCard({ job }) {
  return (
    <div className=" tw-flex tw-flex-row tw-border-2  tw-border-cardBorder tw-rounded-lg tw-p-5 tw-pb-0 tw-cursor-pointer ">
      <div>
        <Image
          className="tw-rounded-full tw-mr-5"
          src={job.companyLogo}
          width={46}
          height={46}
          alt="companylogo"
        />
      </div>
      <div>
        <p className="tw-font-semibold tw-text-lg tw-mb-1">{job?.title}</p>
        <p className="tw-text-lg tw-font-light tw-mb-1">{job?.jobRecruiter}</p>
        <div className="tw-flex tw-flex-row  ">
          <div className="tw-flex tw-flex-row  tw-mr-4">
            <Image
              src={"/clock.png"}
              width={20}
              height={20}
              alt="job-shift"
              className="tw-mr-3  tw-mb-10 tw-object-contain"
            />
            <p className="tw-text-primary">{job?.jobShifts}</p>
          </div>
          <div className="tw-flex tw-flex-row ">
            <Image
              src={"/briefcase.png"}
              width={20}
              height={20}
              alt="job-site"
              className="tw-mr-3 tw-mb-10  tw-object-contain"
            />
            <p className="tw-text-primary">{job?.jobSites}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;

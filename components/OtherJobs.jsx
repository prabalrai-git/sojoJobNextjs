"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import Axios from "@/api/server";

function OtherJobs({ jobCategory }) {
  const [otherJobs, setOtherJobs] = useState();

  useEffect(() => {
    getOtherJobs();
  }, [jobCategory]);

  const getOtherJobs = async () => {
    try {
      const res = await Axios.get(
        `/public/getJobsOtherThanCategoryId/${jobCategory?.id}`
      );
      setOtherJobs(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="tw-mt-20">
      <div className="tw-flex tw-flex-row tw-items-stretch">
        <Image
          className="tw-self-center"
          src={"/briefcase.png"}
          height={30}
          width={30}
          alt="fire.png"
        />
        <h2 className="tw-self-center tw-ml-3 tw-font-medium tw-text-lg tw-capitalize">
          Other Jobs at sojojob
        </h2>
      </div>
      <div className="tw-grid tw-grid-cols-3 tw-gap-4 tw-mt-10 md:tw-grid-cols-1 lg:tw-grid-cols-3 sm:tw-grid-cols-1 xsm:tw-grid-cols-1 800:tw-grid-cols-2 ">
        {otherJobs?.map((item) => {
          return (
            <Link
              href={{
                pathname: "/jobs",
                query: { id: item.id }, // the data
              }}
              className="tw-text-black tw-no-underline"
            >
              <JobCard key={item} job={item} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default OtherJobs;

"use client";

import React, { useEffect, useState } from "react";
import Axios from "@/api/server";
import Image from "next/image";
import Link from "next/link";
import JobPreviewList from "@/components/JobPreviewList";

function page({ searchParams }) {
  const [data, setData] = useState();

  useEffect(() => {
    getJobById();
  }, [searchParams.id]);

  const getJobById = async () => {
    try {
      const res = await Axios.get(`/job//getJobById/${searchParams?.id}`);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="tw-pt-10 tw-mx-40 tw-pb-20">
      <div className="tw-flex tw-flex-row tw-mb-10">
        <Link href={"/employer/dashboard"}>
          <Image
            src={"/arrow-left.png"}
            width={40}
            height={40}
            alt="back"
            className="tw-mr-5 tw-object-contain"
          />
        </Link>
        <h1 className="tw-text-black tw-font-semibold tw-text-3xl tw-self-center">
          SJ00{data?.id} {data?.title}
        </h1>
      </div>
      <JobPreviewList data={data} />
    </div>
  );
}

export default page;

"use client";

import React, { useEffect, useState } from "react";
import Axios from "@/api/server";
import Image from "next/image";
import Link from "next/link";
import JobPreviewList from "@/components/JobPreviewList";
import { useSearchParams } from "next/navigation";

function page() {
  const [data, setData] = useState();
  const [questions, setQuestions] = useState();
  const [employer, setEmployer] = useState();

  const searchParams = useSearchParams;

  const id = searchParams.get("id");

  useEffect(() => {
    getJobById();
    getJobQuestions();
  }, [id]);
  useEffect(() => {
    getEmployerProfile();
  }, []);
  const getJobById = async () => {
    try {
      const res = await Axios.get(`/job/getJobById/${id}`);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getEmployerProfile = async () => {
    try {
      if (typeof window !== "undefined") {
        const res = await Axios.get(
          `/jobRecruiter/getJobRecruiterById/${sessionStorage.getItem(
            "employerId"
          )}`
        );
      }
      // console.log(res.data.data, "emp profile");
      setEmployer(res.data.data);
    } catch (error) {}
  };

  const getJobQuestions = async () => {
    try {
      const res = await Axios.get(`/job/getAllJobQuestionsByJobId/${id}`);
      setQuestions(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "Question Type",
      dataIndex: "questionType",
      key: "questionType",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Question",
      dataIndex: "questionText",
      key: "questionText",
    },
    {
      title: "Ideal Answer",
      dataIndex: "requiredAnswer",
      key: "requiredAnswer",
    },
  ];
  return (
    <div className="tw-pt-10 lg:tw-mx-20 xsm:tw-mx-5 tw-pb-20">
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
        <h1 className="tw-text-black tw-font-semibold tw-text-3xl tw-self-center tw-capitalize">
          SJ00{data?.id} {data?.title}
        </h1>
      </div>
      <JobPreviewList
        data={data}
        columns={columns}
        questions={questions}
        id={id}
        employer={employer}
      />
    </div>
  );
}

export default page;

"use client";
import Contact from "@/components/CreateJob/Contact";
import JobDetails from "@/components/CreateJob/JobDetails";
import JobPreview from "@/components/CreateJob/JobPreview";
import JobQuestions from "@/components/CreateJob/JobQuestions";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
// import "react-quill/dist/quill.snow.css";
import Stepper from "react-stepper-horizontal";

function page() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState();
  const [jobQuestions, setJobQuestions] = useState([]);

  const steps = [
    { title: "Job Details", completed: true, activeStep: true },
    { title: "Job Questions", completed: true, activeStep: true },
    { title: "Job Preview", completed: false, activeStep: true },
    { title: "Contact", completed: false, activeStep: true },
  ];
  const activeStep = step;

  let content;

  if (step === 0) {
    content = <JobDetails setStep={setStep} setData={setData} />;
  } else if (step === 1) {
    content = (
      <JobQuestions setStep={setStep} setJobQuestions={setJobQuestions} />
    );
  } else if (step === 2) {
    content = (
      <JobPreview setStep={setStep} data={data} jobQuestions={jobQuestions} />
    );
  } else if (step == 3) {
    content = <Contact setStep={setStep} />;
  }

  return (
    <div className="tw-pt-10 tw-mx-10 xsm:tw-mx-2 450:tw-mx-8 tw-pb-20">
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
        <h1 className="tw-text-black tw-font-semibold tw-text-xl tw-self-center">
          Create Job Post
        </h1>
      </div>
      <div className=" ">
        <Stepper
          steps={steps}
          activeStep={activeStep}
          activeColor={"#27AE61"}
          completeColor={"#27AE61"}
          activeTitleColor={"#27AE61"}
          completeTitleColor={"#27AE61"}
          defaultTitleColor={"#777777"}
          size={35}
          circleTop={20}
          defaultBorderWidth={20}
          defaultBarColor={"#777777"}
          completeBarColor={"#188e49"}
          barStyle={{ height: 20 }}
        />
      </div>
      {/*  */}
      {content}
    </div>
  );
}

export default page;

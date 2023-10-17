"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Axios from "@/api/server";

function page() {
  const [userData, setUserData] = useState();

  useEffect(() => {
    getProfileInfo();
  }, []);
  const getProfileInfo = async () => {
    try {
      if (typeof window !== "undefined") {
        const res = await Axios.get(
          `/jobSeeker/getJobSeekerById/${sessionStorage.getItem("jobSeekerId")}`
        );
        setUserData(res.data.data);
      }
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const pdfRef = useRef();
  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");

      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      doc.save("resume.pdf");
    });
  };

  const workExperience = (
    <div
      dangerouslySetInnerHTML={{
        __html: userData?.workExperience,
      }}
    />
  );
  const educationBackground = (
    <div
      dangerouslySetInnerHTML={{
        __html: userData?.educationBackground,
      }}
    />
  );
  const licensesAndCertification = (
    <div
      dangerouslySetInnerHTML={{
        __html: userData?.licensesAndCertification,
      }}
    />
  );
  const otherSkillSets = (
    <div
      dangerouslySetInnerHTML={{
        __html: userData?.otherSkillSets,
      }}
    />
  );

  return (
    <div className="tw-pt-10 tw-mx-16 tw-pb-10">
      <div className="tw-flex tw-flex-row tw-justify-between tw-mb-10">
        <div className="tw-flex tw-flex-row">
          <Link href={"/job-seeker/dashboard"}>
            <Image
              src={"/arrow-left.png"}
              width={40}
              height={40}
              alt="back"
              className="tw-mr-10 tw-object-contain"
            />
          </Link>
          <h1 className="tw-text-black tw-font-semibold tw-text-xl tw-self-center">
            My Resume
          </h1>
        </div>
        <div className="tw-flex tw-flex-row">
          <Link href={"/job-seeker/profile"}>
            <button className="tw-flex tw-flex-row tw-text-primary tw-bg-cardBorder tw-rounded-lg tw-px-5 tw-h-12  tw-self-center tw-py-3 tw-mr-4">
              <Image
                className="tw-self-center tw-mr-4"
                src={"/editg.png"}
                width={16}
                height={16}
                alt="download"
              />
              <p>Edit my CV</p>
            </button>
          </Link>
          <button
            onClick={() => downloadPDF()}
            className="tw-flex tw-flex-row tw-text-white tw-bg-primary tw-rounded-lg tw-px-5 tw-h-12 hover:tw-bg-buttonHover tw-self-center tw-py-3"
          >
            <Image
              className="tw-self-center tw-mr-4"
              src={"/downPdf.png"}
              width={16}
              height={16}
              alt="download"
            />
            <p>Download PDF</p>
          </button>
        </div>
      </div>
      <div
        className="tw-bg-white tw-rounded-lg tw-w-full tw-mt-10 tw-px-20 tw-py-20 "
        ref={pdfRef}
      >
        <div className="tw-grid tw-grid-cols-5 tw-gap-28">
          <div className="tw-col-span-3">
            <div className="tw-mb-40">
              <h1 className="tw-text-black tw-font-medium tw-text-3xl tw-mb-2 tw-capitalize">
                {userData?.name}
              </h1>
              {/* <p className="tw-text-primary tw-font-medium tw-text-sm">
                Senior Software Engineer
              </p> */}
            </div>
            {/*  */}
            <div>
              <p className="tw-text-primary tw-font-medium tw-text-sm tw-mb-5">
                Work Experience
              </p>
              <p className=" tw-leading-loose">{workExperience}</p>
            </div>
          </div>
          <div className="tw-col-span-2">
            <div style={{ marginBottom: 122 }}>
              <p className="tw-text-gray-500 tw-font-medium tw-text-sm tw-mb-3 tw-underline">
                {userData?.email}
              </p>
              <p className="tw-text-gray-500 tw-font-medium tw-text-sm tw-mb-5">
                +977 {userData?.contactNumber}
              </p>
              {/* <p className="tw-text-gray-500 tw-font-medium tw-text-sm tw-mb-5">
                www.johndough.com
              </p> */}
            </div>
            {/*  */}
            <div className="tw-mb-14">
              <p className="tw-text-primary tw-font-medium tw-text-sm tw-mb-5 ">
                Education Background
              </p>
              <p className=" tw-leading-loose">{educationBackground}</p>
            </div>
            <div>
              <p className="tw-text-primary tw-font-medium tw-text-sm tw-mb-5">
                Licenses & Certification
              </p>
              <p className=" tw-leading-loose">{licensesAndCertification}</p>
            </div>
          </div>
        </div>
        {/* final full grid for skillsets */}
        <div className="tw-w-full tw-mt-10">
          <p className="tw-text-primary tw-font-medium tw-text-sm tw-mb-5">
            Other Skillsets
          </p>
          <p className="tw-mt-5 tw-text-xl tw-mb-2 tw-font-light">
            <p className=" tw-leading-loose">{otherSkillSets}</p>
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;

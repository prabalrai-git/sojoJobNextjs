"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Dropzone, { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function page() {
  const [value, setValue] = useState();
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const workExperience = {
    title: "Senior Software Engineer",
    company: "F1 Soft International",
    years: "2017-2022",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  };
  const education = {
    id: 1,
    title: "Msc.IT",
    college: "Tribhuvan University",
    years: "2017-2022",
  };
  const licenses = {
    id: 1,
    title: "VAPT Certified Administrator | VAPT",
    years: "2017 - 2022",
  };
  const workER = [1, 2, 3, 4];
  const rep = [1, 2, 3];

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

  return (
    <div className="tw-pt-10 tw-mx-40 tw-pb-10">
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
              <h1 className="tw-text-black tw-font-medium tw-text-3xl tw-mb-2">
                John Dough
              </h1>
              <p className="tw-text-primary tw-font-medium tw-text-sm">
                Senior Software Engineer
              </p>
            </div>
            {/*  */}
            <div>
              <p className="tw-text-primary tw-font-medium tw-text-sm">
                Work Experience
              </p>
              {workER?.map((item) => {
                return (
                  <>
                    <div className="tw-mt-8">
                      <h2 className="tw-text-xl tw-mb-2">
                        {workExperience.title} | {workExperience.company}
                      </h2>
                      <p className="tw-text-gray-400 tw-mb-2">
                        {workExperience.years}
                      </p>
                      <p style={{ lineHeight: 2 }} className="tw-text-gray-500">
                        {workExperience.desc}
                      </p>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="tw-col-span-2">
            <div style={{ marginBottom: 122 }}>
              <p className="tw-text-gray-500 tw-font-medium tw-text-sm tw-mb-5 tw-underline">
                johndough@gmail.com
              </p>
              <p className="tw-text-gray-500 tw-font-medium tw-text-sm tw-mb-5">
                00977 9851123456
              </p>
              <p className="tw-text-gray-500 tw-font-medium tw-text-sm tw-mb-5">
                www.johndough.com
              </p>
            </div>
            {/*  */}
            <div className="tw-mb-14">
              <p className="tw-text-primary tw-font-medium tw-text-sm">
                Education Background
              </p>
              {rep?.map((item) => {
                return (
                  <>
                    <div className="tw-mt-8">
                      <h2 className="tw-text-xl tw-mb-2">
                        {education.title} | {education.college}
                      </h2>
                      <p className="tw-text-gray-400 tw-mb-2">
                        {education.years}
                      </p>
                    </div>
                  </>
                );
              })}
            </div>
            <div>
              <p className="tw-text-primary tw-font-medium tw-text-sm">
                Licenses & Certification
              </p>
              {rep?.map((item) => {
                return (
                  <>
                    <div className="tw-mt-8">
                      <h2 className="tw-text-xl tw-mb-2">{licenses.title}</h2>
                      <p className="tw-text-gray-400 tw-mb-2">
                        {licenses.years}
                      </p>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        {/* final full grid for skillsets */}
        <div className="tw-w-full tw-mt-10">
          <p className="tw-text-primary tw-font-medium tw-text-sm">
            Other Skillsets
          </p>
          <p className="tw-mt-5 tw-text-xl tw-mb-2 tw-font-light">
            Ruby on rails, SQL, Python, Django, Ruby on rails, SQL, Python,
            Django, Ruby on rails, SQL, Python, Django, Ruby on rails, SQL,
            Python, Django
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;

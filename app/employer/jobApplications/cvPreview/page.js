"use client";
import { Image } from "antd";
import React, { useState } from "react";
import { Document, Page } from "react-pdf";

function page({ searchParams }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="tw-pt-10 tw-px-20 tw-pb-12">
      <div className="tw-flex tw-flex-row tw-justify-between">
        <div
          onClick={() => history.back()}
          className="tw-flex tw-flex-row tw-mb-10 tw-cursor-pointer"
        >
          <img
            src={"/arrow-left.png"}
            width={40}
            height={40}
            alt="back"
            className="tw-mr-5 tw-object-contain"
          />

          <h1 className="tw-text-black tw-font-semibold tw-text-3xl tw-self-center ">
            Job Application
          </h1>
        </div>
        <div>
          <button className="tw-bg-primary hover:tw-bg-buttonHover tw-mr-5 tw-text-sm tw-text-white tw-rounded-lg tw-px-6 tw-py-2">
            Applicant Fit
          </button>
          <button className="tw-bg-lightRed tw-drop-shadow-sm hover:tw-drop-shadow tw-mr-5 tw-text-red tw-rounded-lg tw-px-6 tw-py-2 tw-text-sm">
            Application Unfit
          </button>
        </div>
      </div>
      {/* <ReactPDF
        file={{
          url: "http://www.example.com/sample.pdf",
        }}
      /> */}
      {/* <div>
        <Document
          file={
            "file:///Users/mac/Downloads/Resume-Template-Modern-Amazon-Associate-scaled.pdf"
          }
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div> */}
      <div className="tw-grid tw-place-items-center ">
        <Image
          src={searchParams.cvUrl}
          className="tw-w-full tw-mt-20 tw-object-contain"
          alt="Image"
        />
      </div>
    </div>
  );
}

export default page;

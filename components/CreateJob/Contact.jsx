"use client";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import Avatar from "react-avatar";
import Axios from "@/api/server";

function Contact() {
  const [sojoRep, setSojoRep] = useState({
    profileImage: "", // Replace with your default value
    email: "", // Replace with your default value
    phone: "", // Replace with your default value
  });

  useEffect(() => {
    getSojoRep();
  }, []);

  const getSojoRep = useCallback(async () => {
    try {
      const res = await Axios.get(
        "/admin/sojoJobContactPerson/getSojoJobContactPersonDetails"
      );
      setSojoRep(res.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="tw-bg-white tw-rounded-lg tw-w-full tw-mt-10 tw-px-10 tw-py-6 ">
      <h1 className="tw-font-medium tw-text-2xl tw-mt-6 tw-mb-6">
        Almost there!
      </h1>
      <p className="tw-text-gray-500">
        Your job post has been submitted. Our team will review and verify before
        posting it for the public.
        <br /> If you have any concerns regarding this, please contact use
        through the details provided below.
      </p>
      <div className="tw-mt-8  tw-flex tw-flex-row tw-items-center tw-h-40">
        <div className="">
          <Avatar
            size="80"
            src={sojoRep.profileImage}
            round={true}
            className=" tw-border-gray-200 tw-mr-5 "
            style={{ borderWidth: 0.5 }}
          />
        </div>
        <div className=" tw-grid ">
          <h2 className="tw-font-semibold tw-text-lg">Sojo Representative</h2>
          <h2 className="tw-text-lg">{sojoRep.email}</h2>
          <p className="tw-text-lg">+977 {sojoRep.phone}</p>
        </div>
      </div>
      <Link href={"/employer/dashboard"}>
        <button className="tw-bg-primary tw-text-white  xsm:tw-w-full sm:tw-w-4/12 md:tw-w-3/12 lg:tw-w-2/12  tw-mt-10 hover:tw-bg-buttonHover tw-py-3 tw-rounded-lg tw-text-lg">
          Done
        </button>
      </Link>
    </div>
  );
}

export default Contact;

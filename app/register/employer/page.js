"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Axios from "@/api/server";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function page() {
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [name, setName] = useState("");
  const [mPin, setMPin] = useState("");
  const [confirmMPin, setConfirmMPin] = useState("");

  const router = useRouter();

  const onSignUp = async () => {
    const data = {
      companyName,
      companyEmail,
      companyPhone: contactNo,
      name,
      mPin,
    };

    try {
      const res = await Axios.post(
        "/jobRecruiter/createJobRecruiterProfile",
        data
      );
      if (res.data.success) {
        toast.success("Profile created!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        setTimeout(() => {
          router.push("/login/employer");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <ToastContainer />

      <div
        style={{ height: "120vh" }}
        className="tw-ml-20 xsm:tw-ml-0 md:tw-ml-5 lg:tw-ml-20 tw-grid tw-grid-cols-2 xsm:tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 "
      >
        <div className="tw-px-5 ">
          <div className="tw-flex tw-flex-row tw-justify-between tw-mt-20  xsm:tw-mr-0 xl:tw-mr-16  ">
            <Link href={"/"} className="tw-no-underline tw-text-black">
              <div className="tw-flex tw-flex-row tw-self-center">
                <div className="mt-1">
                  <Image
                    src={"/arrow.png"}
                    width={20}
                    height={20}
                    //   style={{ height: "20px" }}
                    alt="back"
                    className="tw-object-contain tw-mr-3 "
                  />
                </div>

                <p className=""> Go back to Homepage</p>
              </div>
            </Link>
            <Link className="tw-no-underline" href={"/login/employer"}>
              <p className="tw-text-primary tw-font-medium xsm:tw-hidden sm:tw-block">
                Already have an account?
              </p>
            </Link>
          </div>
          <h1 className="tw-my-10 tw-mt-20 tw-text-3xl">Sign Up to Sojojob</h1>
          <p className="tw-mb-5 tw-font-medium tw-text-gray-800">You are a</p>
          <div className="tw-grid xsm:tw-grid-cols-2 tw-gap-10 xsm:tw-pr-0 xl:tw-grid-cols-3">
            <Link href={"/register/job-seeker"} className="tw-no-underline">
              <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-p-5 tw-rounded-lg  tw-border-2 tw-border-chooseBg">
                <Image
                  src={"/user.png"}
                  width={50}
                  height={50}
                  alt="person.png"
                  className="tw-object-contain tw-mt-5"
                />
                <p className="tw-font-medium tw-mt-2 tw-text-black tw-no-underline">
                  Job Seeker
                </p>
              </div>
            </Link>
            <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-p-5 tw-rounded-lg  tw-bg-chooseBg tw-border-2 tw-border-primary">
              <Image
                src={"/businessman.png"}
                width={50}
                height={50}
                alt="person.png"
                className="tw-object-contain tw-mt-5"
              />
              <p className="tw-font-medium tw-mt-2">Job Provider</p>
            </div>
          </div>
          {/* start of form */}
          <div className="mb-3 xsm:tw-mr-0 xl:tw-mr-16  tw-mt-10">
            <label
              htmlFor="companyName"
              className="form-label tw-text-grey-800 tw-font-medium"
            >
              Company Name
            </label>
            <input
              type="text"
              className="form-control tw-mb-10 tw-h-12 tw-drop-shadow-md"
              id="companyName"
              placeholder="Enter your company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <label
              htmlFor="companyEmail"
              className="form-label tw-text-grey-800 tw-font-medium"
            >
              Company Email
            </label>
            <input
              type="email"
              className="form-control tw-mb-10 tw-h-12 tw-drop-shadow-md"
              id="companyEmail"
              placeholder="Enter your company email"
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
            />
            <label
              htmlFor="contactNo"
              className="form-label tw-text-grey-800 tw-font-medium"
            >
              Contact No
            </label>
            <input
              type="number"
              className="form-control tw-mb-10 tw-h-12 tw-drop-shadow-md"
              id="contactNo"
              placeholder="Enter your company number"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
            />
            <label
              htmlFor="name"
              className="form-label tw-text-grey-800 tw-font-medium"
            >
              Name
            </label>
            <input
              type="text"
              className="form-control tw-mb-10 tw-h-12 tw-drop-shadow-md"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label
              htmlFor="mPin"
              className="form-label tw-text-grey-800 tw-font-medium"
            >
              M-Pin
            </label>
            <input
              type="password"
              id="mPin"
              className="form-control tw-h-12 tw-mb-5 tw-drop-shadow-md "
              aria-describedby="passwordHelpBlock"
              value={mPin}
              onChange={(e) => setMPin(e.target.value)}
            ></input>
            <label
              htmlFor="confirmMPin"
              className="form-label tw-text-grey-800 tw-font-medium tw-mb-2 "
            >
              Confirm M-pin
            </label>
            <input
              type="password"
              id="confirmMPin"
              className="form-control tw-h-12 tw-drop-shadow-md "
              aria-describedby="passwordHelpBlock"
              value={confirmMPin}
              onChange={(e) => setConfirmMPin(e.target.value)}
            ></input>
          </div>
          {/* end of form */}
          <div className="tw-flex tw-justify-end xsm:tw-mr-0 xl:tw-mr-16 "></div>
          <Link href={"/employer/dashboard"}></Link>
          <button
            className="tw-bg-primary hover:tw-bg-buttonHover tw-rounded-lg tw-mt-5 tw-text-white tw-py-4 tw-text-lg tw-font-medium tw-px-28"
            onClick={() => onSignUp()}
          >
            Sign Up
          </button>

          <Link className="tw-no-underline" href={"/login/employer"}>
            <p className="tw-mt-5 tw-text-primary tw-font-medium tw-cursor-pointer tw-mb-20">
              Already have an account?
            </p>
          </Link>
        </div>

        {/*  */}
        <div className="tw-relative xsm:tw-hidden md:tw-block ">
          <div
            style={{ height: "100%" }}
            className="tw-w-full z-10 tw-bg-overlayLogin tw-absolute tw-top-0"
          ></div>

          <Image
            src={"/images/auth_bg.png"}
            width={400}
            height={300}
            alt="auth.png"
            style={{ height: "100%" }}
            className="tw-w-full tw-object-fill"
          />

          <Image
            src={"/images/auth_banner.png"}
            width={500}
            height={500}
            alt="auth.png"
            style={{
              left: 0,
              right: 0,
              bottom: "55%",
              // margin: "auto",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            className="object-contain tw-absolute "
          />
          <h2
            style={{
              left: 0,
              right: 0,
              marginLeft: "auto",
              marginRight: "auto",
              bottom: "47%",
            }}
            className="object-contain tw-absolute tw-text-center text-white "
          >
            100+ Successful Stories <br /> Create from Sojojob
          </h2>
        </div>
      </div>
    </>
  );
}

export default page;

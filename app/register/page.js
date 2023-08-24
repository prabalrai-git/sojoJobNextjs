"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function page() {
  const router = useRouter();

  return (
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
          <Link className="tw-no-underline" href={"/login"}>
            <p className="tw-text-primary tw-font-medium xsm:tw-hidden sm:tw-block">
              Already have an account?
            </p>
          </Link>
        </div>
        <h1 className="tw-my-10 tw-mt-20 tw-text-3xl">Sign Up to Sojojob</h1>
        <p className="tw-mb-5 tw-font-medium tw-text-gray-800">You are a</p>
        <div className="tw-grid xsm:tw-grid-cols-2 tw-gap-10 xsm:tw-pr-0 xl:tw-grid-cols-3">
          <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-p-5 tw-rounded-lg  tw-bg-chooseBg tw-border-2 tw-border-primary">
            <Image
              src={"/user.png"}
              width={50}
              height={50}
              alt="person.png"
              className="tw-object-contain"
            />
            <p className="tw-font-medium tw-mt-2">Job Seeker</p>
          </div>
          <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-p-5 tw-rounded-lg  tw-bg-chooseBg tw-border-2 tw-border-primary">
            <Image
              src={"/businessman.png"}
              width={50}
              height={50}
              alt="person.png"
              className="tw-object-contain"
            />
            <p className="tw-font-medium tw-mt-2">Job Seeker</p>
          </div>
        </div>
        {/* start of form */}
        <div class="mb-3 xsm:tw-mr-0 xl:tw-mr-16  tw-mt-10">
          <label
            for="exampleFormControlInput1"
            class="form-label tw-text-grey-800 tw-font-medium"
          >
            Email address
          </label>
          <input
            type="email"
            class="form-control tw-mb-10 tw-h-12 tw-drop-shadow-md"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
          <label
            for="exampleFormControlInput1"
            class="form-label tw-text-grey-800 tw-font-medium"
          >
            Email address
          </label>
          <input
            type="email"
            class="form-control tw-mb-10 tw-h-12 tw-drop-shadow-md"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
          <label
            for="exampleFormControlInput1"
            class="form-label tw-text-grey-800 tw-font-medium"
          >
            Email address
          </label>
          <input
            type="email"
            class="form-control tw-mb-10 tw-h-12 tw-drop-shadow-md"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
          <label
            for="exampleFormControlInput1"
            class="form-label tw-text-grey-800 tw-font-medium"
          >
            Email address
          </label>
          <input
            type="email"
            class="form-control tw-mb-10 tw-h-12 tw-drop-shadow-md"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
          <label
            for="exampleFormControlInput1"
            class="form-label tw-text-grey-800 tw-font-medium"
          >
            Email address
          </label>
          <input
            type="email"
            class="form-control tw-mb-10 tw-h-12 tw-drop-shadow-md"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
          <label
            for="inputPassword5"
            class="form-label tw-text-grey-800 tw-font-medium"
            className=" tw-mb-2 "
          >
            M-pin
          </label>
          <input
            type="password"
            id="inputPassword5"
            class="form-control tw-h-12 tw-drop-shadow-md "
            aria-describedby="passwordHelpBlock"
          ></input>
        </div>
        {/* end of form */}
        <div className="tw-flex tw-justify-end xsm:tw-mr-0 xl:tw-mr-16 "></div>
        <Link href={"/employer/dashboard"}>
          <button className="tw-bg-primary hover:tw-bg-buttonHover tw-rounded-lg tw-mt-5 tw-text-white tw-py-3 tw-px-28">
            Sign In
          </button>
        </Link>
        <Link className="tw-no-underline" href={"/login"}>
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
  );
}

export default page;

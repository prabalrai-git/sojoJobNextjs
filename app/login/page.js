"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function page() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div
      style={{ height: "120vh" }}
      className="tw-ml-20 tw-grid tw-grid-cols-2 "
    >
      <div className="tw-px-5">
        <div className="tw-flex tw-flex-row tw-justify-between tw-mt-20  tw-mr-32   ">
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
            <button onClick={() => goBack()}>
              <p className=""> Go back to Homepage</p>
            </button>
          </div>
          <p className="tw-text-primary tw-font-medium">
            New to SojoJob ? Sign up here
          </p>
        </div>
        <h1 className="tw-my-10 tw-mt-20 tw-text-3xl">Sign in to Sojojob</h1>
        <p className="tw-mb-5 tw-font-medium tw-text-gray-800">You are a</p>
        <div className="tw-grid tw-grid-cols-3 tw-gap-10 tw-pr-10">
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
        <div class="mb-3 tw-mr-32 tw-mt-10">
          <label for="exampleFormControlInput1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
          <label
            for="inputPassword5"
            class="form-label"
            className="tw-mt-10 tw-mb-2"
          >
            M-pin
          </label>
          <input
            type="password"
            id="inputPassword5"
            class="form-control"
            aria-describedby="passwordHelpBlock"
          ></input>
        </div>
        {/* end of form */}
        <div className="tw-flex tw-justify-end tw-mr-32 ">
          <p className="tw-text-primary tw-align-bottom tw-mt-3 tw-font-medium tw-cursor-pointer">
            Forgot Password?
          </p>
        </div>
        <button className="tw-bg-primary hover:tw-bg-buttonHover tw-rounded-lg tw-mt-5 tw-text-white tw-py-3 tw-px-28">
          Sign In
        </button>
        <p className="tw-mt-5 tw-text-primary tw-font-medium tw-cursor-pointer">
          Don't have an account?
        </p>
      </div>
      <div className="tw-relative">
        <div
          style={{ height: "120vh" }}
          className="tw-w-full z-10 tw-bg-overlayLogin tw-absolute tw-top-0"
        ></div>

        <Image
          src={"/images/auth_bg.png"}
          width={300}
          height={300}
          alt="auth.png"
          style={{ height: "120vh" }}
          className="tw-w-full object-cover"
        />

        <Image
          src={"/images/auth_banner.png"}
          width={300}
          height={300}
          alt="auth.png"
          style={{ top: "20%", left: "14%" }}
          className="tw-w-9/12 object-contain tw-absolute "
        />
        <h2
          style={{ bottom: "15%", left: "25%" }}
          className="object-contain tw-absolute tw-text-center text-white "
        >
          100+ Successful Stories <br /> Create from Sojojob
        </h2>
      </div>
    </div>
  );
}

export default page;

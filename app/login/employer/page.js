"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Axios from "@/api/server";
import "react-toastify/dist/ReactToastify.css";

function page() {
  const router = useRouter();

  const [email, setEmail] = useState();

  const [mPin, setMPin] = useState();

  const onSignIn = async () => {
    const data = {
      email,
      mPin,
    };

    try {
      const res = await Axios.post("/auth/login", data);

      // return console.log(res.data.data, "he ha");

      localStorage.setItem("id", res.data.data.id);
      localStorage.setItem("tokenSojoJob", res.data.data.token);
      localStorage.setItem("employerId", res.data.data.employerId);
      if (res.data.success) {
        toast.success("Login Successful!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        setTimeout(() => {
          router.push("/employer/dashboard");
        }, 2000);
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
            <Link className="tw-no-underline" href={"/register/employer"}>
              <p className="tw-text-primary tw-font-medium xsm:tw-hidden sm:tw-block">
                New to SojoJob ? Sign up here
              </p>
            </Link>
          </div>
          <h1 className="tw-my-10 tw-mt-20 tw-text-3xl">Sign in to Sojojob</h1>
          <p className="tw-mb-5 tw-font-medium tw-text-gray-800">You are a</p>
          <div className="tw-grid xsm:tw-grid-cols-2 tw-gap-10 xsm:tw-pr-0 xl:tw-grid-cols-3">
            <Link href={"/login/job-seeker"} className="tw-no-underline">
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
              for="email"
              className="form-label tw-text-grey-800 tw-font-medium"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control tw-mb-10 tw-h-12 tw-drop-shadow-md"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              for="inputPassword5"
              className="form-label tw-text-grey-800 tw-font-medium tw-mb-2 "
            >
              M-pin
            </label>
            <input
              type="password"
              id="mPin"
              className="form-control tw-h-12 tw-drop-shadow-md "
              aria-describedby="passwordHelpBlock"
              value={mPin}
              onChange={(e) => setMPin(e.target.value)}
            ></input>
          </div>
          {/* end of form */}
          <div className="tw-flex tw-justify-end xsm:tw-mr-0 xl:tw-mr-16 ">
            <p className="tw-text-primary tw-align-bottom tw-mt-3 tw-font-medium tw-cursor-pointer">
              Forgot Password?
            </p>
          </div>
          <button
            className="tw-bg-primary hover:tw-bg-buttonHover tw-rounded-lg tw-mt-5 tw-text-white tw-py-4 tw-text-lg tw-font-medium tw-px-28"
            onClick={() => onSignIn()}
          >
            Sign In
          </button>
          <Link className="tw-no-underline" href={"/register/employer"}>
            <p className="tw-mt-5 tw-text-primary tw-font-medium tw-cursor-pointer">
              Don't have an account?
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
            width={600}
            height={300}
            alt="auth.png"
            style={{ height: "100%" }}
            className="tw-w-full tw-object-scale-fill"
          />

          <Image
            src={"/images/auth_banner.png"}
            width={500}
            height={500}
            alt="auth.png"
            style={{
              left: 0,
              right: 0,
              bottom: "35%",
              // margin: "auto",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            className="tw-object-contain tw-absolute "
          />
          <h2
            style={{
              left: 0,
              right: 0,
              marginLeft: "auto",
              marginRight: "auto",
              bottom: "23%",
            }}
            className="object-contain tw-absolute tw-text-center text-white "
          >
            100+ Successful Stories <br /> Create from Sojojob
          </h2>
        </div>
        {/* <div className="tw-relative xsm:tw-hidden md:tw-block ">
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
          width={400}
          height={400}
          alt="auth.png"
          style={{
            left: 0,
            right: 0,
            bottom: "35%",
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
            bottom: "22%",
          }}
          className="object-contain tw-absolute tw-text-center text-white "
        >
          100+ Successful Stories <br /> Create from Sojojob
        </h2>
      </div> */}
      </div>
    </>
  );
}

export default page;

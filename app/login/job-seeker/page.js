"use client";

import { Button, Form, Input, Spin } from "antd";
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
  const [loading, setLoading] = useState(false);

  const onFinish = async () => {
    const data = {
      email,
      mPin,
    };

    try {
      setLoading(true);
      const res = await Axios.post("/auth/login", data);

      // return console.log(res.data.data, "he ha");

      if (typeof window !== "undefined") {
        sessionStorage.clear();
        sessionStorage.setItem("id", res.data.data.id);
        sessionStorage.setItem("tokenSojoJob", res.data.data.token);
        sessionStorage.setItem("jobSeekerId", res.data.data.jobSeekerId);
        sessionStorage.setItem("userType", res.data.data.userType);
      }
      if (res.data.success) {
        toast.success("Login Successful!", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setLoading(false);

        setTimeout(() => {
          router.push("/job-seeker/dashboard");
        }, 500);
      }
    } catch (error) {
      console.log(error.response);
      setLoading(false);

      toast.error(error.response?.data?.msg, {
        position: "top-right",
        autoClose: 2000,
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
            <Link className="tw-no-underline" href={"/register/job-seeker"}>
              <p className="tw-text-primary tw-font-sm xsm:tw-hidden sm:tw-block hover:tw-text-buttonHover">
                New to SojoJob ? Sign up here
              </p>
            </Link>
          </div>
          <h1 className="tw-my-10 tw-mt-20 tw-text-3xl">Sign in to Sojojob</h1>
          <p className="tw-mb-5 tw-font-medium tw-text-gray-800">You are a</p>
          <div className="tw-grid xsm:tw-grid-cols-2 tw-gap-10 xsm:tw-pr-0 xl:tw-grid-cols-3">
            <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-p-5 tw-rounded-lg  tw-bg-chooseBg tw-border-2 tw-border-primary">
              <Image
                src={"/user.png"}
                width={50}
                height={50}
                alt="person.png"
                className="tw-object-contain tw-mt-5"
              />
              <p className="tw-font-medium tw-mt-2">Job Seeker</p>
            </div>
            <Link
              href={"/login/employer"}
              className="tw-text-black tw-no-underline"
            >
              <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-p-5 tw-rounded-lg  tw-border-2 tw-border-chooseBg">
                <Image
                  src={"/businessman.png"}
                  width={50}
                  height={50}
                  alt="person.png"
                  className="tw-object-contain tw-mt-5"
                />
                <p className="tw-font-medium tw-mt-2">Job Provider</p>
              </div>
            </Link>
          </div>
          {/* start of form */}
          <div class="mb-3 xsm:tw-mr-0 xl:tw-mr-16  tw-mt-10">
            <Form
              requiredMark={false}
              onFinish={onFinish}
              autoComplete="on"
              layout="vertical"
            >
              <Form.Item
                name="emailAddress"
                label=" Email address"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  type="email"
                  className="tw-h-12 tw-drop-shadow-sm"
                  id="emailAddress"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="mPin"
                label="M-pin"
                rules={[
                  {
                    required: true,
                    message: "Please input your mPin!",
                  },
                ]}
              >
                <Input.Password
                  type="password"
                  id="mPin"
                  className="tw-h-12 tw-drop-shadow-sm"
                  aria-describedby="passwordHelpBlock"
                  placeholder="Enter your m-pin"
                  value={mPin}
                  onChange={(e) => setMPin(e.target.value)}
                ></Input.Password>
              </Form.Item>
              <div className="tw-flex tw-justify-end xsm:tw-mr-0 xl:tw-mr-0 ">
                <p className="tw-text-primary tw-align-bottom tw-mt-3 tw-font-base tw-cursor-pointer hover:tw-text-buttonHover">
                  Forgot Password?
                </p>
              </div>
              <Form.Item>
                <Button
                  disabled={loading}
                  loading={loading}
                  htmlType="submit"
                  className="tw-bg-primary hover:tw-bg-buttonHover tw-rounded-lg tw-mt-5 tw-text-white tw-py-3 tw-text-lg tw-font-medium tw-px-20 tw-h-12 tw-flex tw-justify-center tw-items-center"
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>
          {/* end of form */}

          <Link className="tw-no-underline" href={"/register/job-seeker"}>
            <p className="tw-mt-5 tw-text-primary tw-font-sm tw-cursor-pointer hover:tw-text-buttonHover">
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

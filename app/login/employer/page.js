"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Axios from "@/api/server";
import "react-toastify/dist/ReactToastify.css";
import { Input, Form, Button } from "antd";
import { useDispatch } from "react-redux";
import { getUserDetails } from "@/features/userData/userDataSlice";

function page() {
  const router = useRouter();

  const [email, setEmail] = useState();

  const [mPin, setMPin] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onFinish = async () => {
    const data = {
      email,
      mPin,
      userType: "employer",
    };

    try {
      setLoading(true);
      const res = await Axios.post("/auth/login", data);
      if (typeof window !== "undefined") {
        localStorage.clear();

        // return console.log(res.data.data, "he ha");

        localStorage.setItem("id", res.data.data.id);

        localStorage.setItem("tokenSojoJob", res.data.data.token);

        localStorage.setItem("employerId", res.data.data.employerId);

        localStorage.setItem("userType", res.data.data.userType);
        dispatch(getUserDetails("employer"));
      }
      if (res.data.success) {
        setLoading(false);
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

        setTimeout(() => {
          router.push("/employer/dashboard");
        }, 500);
      }
    } catch (error) {
      setLoading(false);

      console.log(error);
      toast.error(error?.response?.data?.msg, {
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
            <Link className="tw-no-underline" href={"/register/employer"}>
              <p className="tw-text-primary tw-font-base xsm:tw-hidden sm:tw-block hover:tw-text-buttonHover">
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
              <div
                onClick={() => router.push("/forgotPassword")}
                className="tw-flex tw-justify-end xsm:tw-mr-0 xl:tw-mr-0 "
              >
                <p className="tw-text-primary tw-align-bottom tw-mt-3 tw-font-base tw-cursor-pointer hover:tw-text-buttonHover">
                  Forgot M-Pin?
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
          <Link className="tw-no-underline" href={"/register/employer"}>
            <p className="tw-mt-5 tw-text-primary tw-font-base tw-cursor-pointer hover:tw-text-buttonHover">
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
            className="tw-w-full tw-object-cover"
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
            className="object-contain tw-absolute tw-text-center text-white tw-text-3xl tw-font-semibold  "
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

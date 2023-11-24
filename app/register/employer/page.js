"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Axios from "@/api/server";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, Input } from "antd";

function page() {
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [name, setName] = useState("");
  const [mPin, setMPin] = useState("");
  const [confirmMPin, setConfirmMPin] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onFinish = async () => {
    const data = {
      companyName,
      companyEmail,
      companyPhone: contactNo,
      name,
      mPin,
    };
    try {
      setLoading(true);
      const res = await Axios.post(
        "/jobRecruiter/createJobRecruiterProfile",
        data
      );
      if (res.data.success) {
        toast.success("Profile created! Please check email to verify account", {
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
          setLoading(false);
          router.push("/login/employer");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);

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
              <p className="tw-text-primary tw-font-base xsm:tw-hidden sm:tw-block hover:tw-text-buttonHover">
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
            <Form
              requiredMark={false}
              onFinish={onFinish}
              autoComplete="on"
              layout="vertical"
            >
              <Form.Item
                name="companyName"
                label="Company Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your company name!",
                  },
                ]}
              >
                <Input
                  type="text"
                  className="tw-h-12 tw-drop-shadow-sm"
                  // id="companyName"
                  placeholder="Enter your company's name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="companyEmail"
                label="Company Email"
                rules={[
                  {
                    required: true,
                    message: "Please input your company email!",
                  },
                ]}
              >
                <Input
                  type="email"
                  className="tw-h-12 tw-drop-shadow-sm"
                  placeholder="Enter your company's email"
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="contactNo"
                label="Contact No"
                rules={[
                  {
                    required: true,
                    message: "Please input your company number!",
                  },
                ]}
              >
                <Input
                  type="number"
                  className=" tw-h-12 tw-drop-shadow-sm"
                  id="contactNo"
                  placeholder="Enter your company number"
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="name"
                label="Contact Person Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your company name!",
                  },
                ]}
              >
                <Input
                  type="text"
                  className="tw-h-12 tw-drop-shadow-sm"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="mPin"
                label="M-pin"
                hasFeedback
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
                  className=" tw-h-12  tw-drop-shadow-sm "
                  aria-describedby="passwordHelpBlock"
                  value={mPin}
                  onChange={(e) => setMPin(e.target.value)}
                ></Input.Password>
              </Form.Item>

              <Form.Item
                name="confirmMPin"
                label="Confirm M-pin"
                dependencies={["mPin"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your M-pin!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("mPin") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new M-pin that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  type="password"
                  id="confirmMPin"
                  className="tw-h-12 tw-drop-shadow-sm "
                  aria-describedby="passwordHelpBlock"
                  value={confirmMPin}
                  onChange={(e) => setConfirmMPin(e.target.value)}
                ></Input.Password>
              </Form.Item>

              <Form.Item>
                <Button
                  disabled={loading}
                  loading={loading}
                  htmlType="submit"
                  className="tw-bg-primary hover:tw-bg-buttonHover tw-rounded-lg tw-mt-5 tw-text-white tw-py-3 tw-text-lg tw-font-medium tw-px-20 tw-h-12 tw-flex tw-justify-center tw-items-center"
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* end of form */}

          <Link className="tw-no-underline" href={"/login/employer"}>
            <p className="tw-mt-5 tw-text-primary tw-font-base tw-cursor-pointer tw-mb-20 hover:tw-text-buttonHover">
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
            className="object-contain tw-absolute tw-text-center text-white tw-text-3xl tw-font-semibold  "
          >
            100+ Successful Stories <br /> Create from Sojojob
          </h2>
        </div>
      </div>
    </>
  );
}

export default page;

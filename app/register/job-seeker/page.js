"use client";

import { Button, Form, Input, Select } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import Axios from "@/api/server";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function page() {
  const router = useRouter();

  const [data, setData] = useState({
    name: null,
    contactNumber: null,
    email: null,
    jobStatus: null,
    mPin: null,
  });
  const [loading, setLoading] = useState(false);
  // const [jobCategories, setJobsCategories] = useState();

  // useEffect(() => {
  //   getAllCategories();
  // }, []);

  // const getAllCategories = async () => {
  //   try {
  //     const res = await Axios.get("/jobCategories/getAllJobCategories");
  //     const data = res.data.data;
  //     let newData = [];
  //     for (let i in data) {
  //       const obj = { value: data[i].id, label: data[i].title };
  //       newData.push(obj);
  //     }
  //     setJobsCategories(newData);
  //   } catch (error) {}
  // };
  const statusOptions = [
    {
      value: "I'm a fresher",
      label: "I'm a fresher",
    },
    {
      value: "I have 1 to 4 years of experience",
      label: "I have 1 to 4 years of experience",
    },
    {
      value: "I have 4 to 8 years of experience",
      label: "I have 4 to 8 years of experience",
    },
    {
      value: "I have 8 to 10 years of experience",
      label: "I have 8 to 10 years of experience",
    },
    {
      value: "I have more than 10 years of experience",
      label: "I have more than 10 years of experience",
    },
  ];

  const onSearch = (value) => {
    console.log("search:", value);
  };
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await Axios.post("/jobSeeker/createJobSeekerProfile", data);
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
          router.push("/login/job-seeker");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);

      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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
            <Link className="tw-no-underline" href={"/login/job-seeker"}>
              <p className="tw-text-primary tw-font-sm xsm:tw-hidden sm:tw-block hover:tw-text-buttonHover">
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
                className="tw-object-contain tw-mt-5"
              />
              <p className="tw-font-medium tw-mt-2">Job Seeker</p>
            </div>
            <Link
              href={"/register/employer"}
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
              name="basic"
              layout="vertical"
              className="tw-text-lg"
              requiredMark={false}
              labelCol={{
                span: 12,
              }}
              wrapperCol={{
                span: 24,
              }}
              style={{
                maxWidth: 800,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Name"
                name="Name"
                rules={[
                  {
                    required: true,
                    message: "Please input your Name!",
                  },
                ]}
              >
                <Input
                  onChange={(e, a) => {
                    setData((prev) => {
                      return { ...prev, name: e.target.value };
                    });
                  }}
                  className="tw-h-12 tw-drop-shadow-sm"
                />
              </Form.Item>
              <Form.Item
                label="Contact Number"
                name="contactNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your Contact Number!",
                  },
                ]}
              >
                <Input
                  type="number"
                  onChange={(e, a) => {
                    setData((prev) => {
                      return { ...prev, contactNumber: e.target.value };
                    });
                  }}
                  className="tw-h-12 tw-drop-shadow-sm"
                />
              </Form.Item>
              <Form.Item
                label="Email Address"
                name="emailAddress"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email Address!",
                  },
                ]}
              >
                <Input
                  onChange={(e, a) => {
                    setData((prev) => {
                      return { ...prev, email: e.target.value };
                    });
                  }}
                  className="tw-h-12 tw-drop-shadow-sm"
                />
              </Form.Item>
              <Form.Item label="Job Status" name="jobStatus">
                <Select
                  className="tw-w-full tw-h-12 tw-drop-shadow-sm tw-rounded-lg"
                  showSearch
                  placeholder="Select Jobs Status"
                  allowClear
                  optionFilterProp="children"
                  onChange={(e, a) => {
                    setData((prev) => {
                      return { ...prev, jobStatus: e };
                    });
                  }}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={statusOptions}
                />
              </Form.Item>
              {/* <Form.Item
                className="tw-w-full"
                label="Category"
                name="jobCategoryId"
              >
                <Select
                  className="tw-w-full tw-h-12 tw-border-2 tw-mb-4 tw-rounded-lg"
                  showSearch
                  placeholder="Select Jobs Status"
                  allowClear
                  optionFilterProp="children"
                  onChange={(e, a) => {
                    setData((prev) => {
                      return { ...prev, jobStatus: e };
                    });
                  }}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={jobCategories}
                />
              </Form.Item> */}
              <Form.Item
                label="M-pin"
                hasFeedback
                name="mPin"
                rules={[
                  {
                    required: true,
                    message: "Please input your M-pin!",
                  },
                ]}
              >
                <Input.Password
                  onChange={(e, a) => {
                    setData((prev) => {
                      return { ...prev, mPin: e.target.value };
                    });
                  }}
                  className="tw-h-12 tw-drop-shadow-sm"
                />
              </Form.Item>
              <Form.Item
                label="Confirm M-pin"
                name="comfirmM-pin"
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
                <Input.Password className="tw-h-12 " />
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

          <Link className="tw-no-underline" href={"/login/job-seeker"}>
            <p className="tw-mt-5 tw-text-primary tw-font-sm tw-cursor-pointer tw-mb-20 hover:tw-text-buttonHover">
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

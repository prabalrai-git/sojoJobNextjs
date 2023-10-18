"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Axios from "@/api/server";
import "react-toastify/dist/ReactToastify.css";
import { Input, Form, Button } from "antd";

function page() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [mPin, setMPin] = useState();

  const searchParams = useSearchParams();

  const onFinish = async () => {
    const data = {
      userId: searchParams.get("userId"),
      token: searchParams.get("token"),
      mPin,
    };
    // return console.log(data);
    try {
      setLoading(true);
      const res = await Axios.post("/auth/resetPassword", data);

      if (res.data.success) {
        setLoading(false);
        toast.success("M-pin changed successfuly!", {
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
          router.push(
            searchParams.get("userType") === "employer"
              ? "/login/employer"
              : "/login/job-seeker"
          );
        }, 1500);
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
        style={{ height: "100vh" }}
        className="tw-ml-20 xsm:tw-ml-0 md:tw-ml-5 lg:tw-ml-20 tw-grid tw-grid-cols-2 xsm:tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-2 "
      >
        <div className="tw-px-5 ">
          <div className="tw-flex tw-flex-row tw-justify-between tw-mt-20  xsm:tw-mr-0 xl:tw-mr-16 tw-items-center  ">
            <Link href={"/"} className="tw-no-underline tw-text-black">
              <div className="tw-flex tw-flex-row tw-items-center tw-justify-center">
                <Image
                  src={"/arrow.png"}
                  width={30}
                  height={30}
                  //   style={{ height: "20px" }}
                  alt="back"
                  className="tw-object-contain tw-mr-5 tw-self-center  "
                />
                <div className="tw-flex tw-justify-center tw-items-center  ">
                  <p className="tw-text-xl tw-mt-3 ">Cancel</p>
                </div>
              </div>
            </Link>
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
                name="mPin"
                label="New M-pin"
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
                label="Confirm New M-pin"
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
                  Continue
                </Button>
              </Form.Item>
            </Form>
          </div>
          {/* end of form */}
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
            style={{ height: "100vh" }}
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
              bottom: "20%",
            }}
            className="object-contain tw-absolute tw-text-center text-white tw-text-3xl tw-font-semibold "
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

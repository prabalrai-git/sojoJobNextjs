"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Axios from "@/api/server";
import "react-toastify/dist/ReactToastify.css";
import { Input, Form, Button, notification } from "antd";
import { useRouter } from "next/navigation";

function page() {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState();

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "M-pin Reset Link Sent",
      description:
        "M-pin reset link has been sent to the email you provided. Please check you email.",
    });
  };

  const router = useRouter();

  const onFinish = async () => {
    const data = { email };

    try {
      setLoading(true);
      const res = await Axios.post("/auth/requestPasswordReset", data);
      if (res.data.success) {
        setLoading(false);
        openNotificationWithIcon("info");
        setTimeout(() => {
          router.push("/");
        }, 4000);
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
      {contextHolder}
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
                  <p className="tw-text-xl  ">Cancel</p>
                </div>
              </div>
            </Link>
          </div>

          {/* start of form */}

          <p className="tw-mt-16 tw-text-gray-500">
            Please, enter your email and we will send your M-Pin reset link.
          </p>
          <div className="mb-3 xsm:tw-mr-0 xl:tw-mr-16  tw-mt-10">
            <Form
              requiredMark={false}
              onFinish={onFinish}
              autoComplete="on"
              layout="vertical"
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  id="mPin"
                  className=" tw-h-12  tw-drop-shadow-sm "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
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
      </div>
    </>
  );
}

export default page;

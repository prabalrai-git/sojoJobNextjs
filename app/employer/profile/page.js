"use client";

import { Button, DatePicker, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dayjs from "dayjs";
import Axios from "@/api/server";
import ImgCrop from "antd-img-crop";
import { UploadOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

function page() {
  const [data, setData] = useState();

  // form states
  const [logoDisplayImage, setLogoDisplayImage] = useState();
  const [companyName, setCompanyName] = useState();
  const [companyEmail, setCompanyEmail] = useState();
  const [companyPhone, setCompanyPhone] = useState();
  const [companySize, setCompanySize] = useState();
  const [companyFoundedDate, setCompanyFoundedDate] = useState();
  const [companyHeadquarters, setCompanyHeadquarters] = useState();
  const [companyWebsiteURL, setCompanyWebsiteURL] = useState();
  const [companyInfo, setCompanyInfo] = useState();
  const [name, setName] = useState();
  const [companyLogoImage, setCompanyLogoImage] = useState();

  const { Dragger } = Upload;

  const router = useRouter();

  const onSubmit = async () => {
    const formData = new FormData();

    formData.append("companyName", companyName);
    formData.append("companyEmail", companyEmail);
    formData.append("companyFoundedDate", companyFoundedDate);
    formData.append("companyHeadquarters", companyHeadquarters);
    formData.append("companyInfo", companyInfo);
    formData.append("companyLogoImage", companyLogoImage);
    formData.append("companyPhone", companyPhone);
    formData.append("companySize", companySize);
    formData.append("companyWebsiteURL", companyWebsiteURL);
    formData.append("name", name);
    try {
      const res = await Axios.patch(
        `/jobRecruiter/updateJobRecruiterProfileById/${localStorage.getItem(
          "employerId"
        )}`,
        formData
      );
      if (res.data.success) {
        toast.success("Profile Updated Successfully!", {
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

  useEffect(() => {
    if (data) {
      setCompanyName(data?.companyName);
      setCompanyEmail(data?.companyEmail);
      setCompanyPhone(data?.companyPhone);
      setCompanySize(data?.companySize);
      setCompanyFoundedDate(data?.companyFoundedDate);
      setCompanyHeadquarters(data?.companyHeadquarters);
      setCompanyWebsiteURL(data?.companyWebsiteURL);
      setCompanyInfo(data?.companyInfo);
      setName(data?.name);
      setLogoDisplayImage(data?.companyLogoImage);
    }
  }, [data]);

  useEffect(() => {
    getProfileInformation();
  }, []);

  const getProfileInformation = async () => {
    try {
      const res = await Axios.get(
        `/jobRecruiter/getJobRecruiterById/${localStorage.getItem(
          "employerId"
        )}`
      );

      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const props = {
    name: "file",
    multiple: false,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {
      const { status } = info.file;

      setCompanyLogoImage(info.file.originFileObj);
      const img = URL.createObjectURL(info.file.originFileObj);
      setLogoDisplayImage(img);

      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);

        setLogoDisplayImage(img);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const dateFormat = "YYYY-MM-DD";
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  today = yyyy + "/" + mm + "/" + dd;

  return (
    <>
      <ToastContainer />

      <div className="tw-pt-10 xsm:tw-mx-4 450:tw-mx-16 tw-pb-10">
        <div className="tw-flex tw-flex-row tw-mb-10">
          <Link href={"/employer/dashboard"}>
            <Image
              src={"/arrow-left.png"}
              width={40}
              height={40}
              alt="back"
              className="tw-mr-10 tw-object-contain"
            />
          </Link>
          <h1 className="tw-text-black tw-font-semibold tw-text-xl tw-self-center">
            Profile Setup
          </h1>
        </div>
        <div className="tw-bg-white tw-rounded-lg tw-w-full tw-mt-10 tw-px-10 tw-py-6 ">
          <div className="tw-flex tw-flex-row tw-justify-between">
            <div className="tw-flex tw-flex-row">
              <Image
                src={"/borderBlack.png"}
                width={10}
                height={10}
                alt="border"
                className="tw-object-fit tw-mr-7"
              />
              <h1 className="tw-text-xl tw-font-semibold tw-self-center">
                Basic Information
              </h1>
            </div>
          </div>
          <div className="tw-mt-10">
            <Form>
              <Form.Group
                className="mb-4 tw-grid lg:tw-grid-cols-5 tw-gap-4 xsm:tw-grid-cols-1 md:tw-grid-cols-1"
                controlId="exampleForm.ControlInput1"
              >
                <div className="tw-bg-blue-100 tw-rounded-lg tw-flex tw-justify-center tw-items-center tw-col-span-2 tw-relative">
                  <Dragger {...props} className="tw-w-full tw-h-full">
                    {logoDisplayImage ? (
                      <>
                        <img
                          src={logoDisplayImage}
                          className="tw-w-full tw-h-full tw-object-cover"
                          alt="img"
                        />
                      </>
                    ) : (
                      <>
                        <p className="ant-upload-drag-icon">
                          <UploadOutlined />
                        </p>
                        <p className="ant-upload-text">
                          Drag and Drop to Upload Company Logo
                        </p>
                        <p>Or</p>
                        <button
                          className="tw-text-white tw-bg-dndBtn tw-px-5 tw-py-3 tw-rounded-lg hover:tw-bg-dndBtnH tw-mt-5"
                          onClick={(e) => e.preventDefault()}
                        >
                          Browse File
                        </button>
                      </>
                    )}
                  </Dragger>
                  {/* </ImgCrop> */}
                </div>
                <div className="tw-col-span-3 tw-grid tw-gap-8">
                  <div>
                    <Form.Label className="tw-text-gray-600 tw-font-medium">
                      Company Name
                    </Form.Label>
                    <Input
                      className="tw-h-12"
                      placeholder="Enter company name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Form.Label className="tw-text-gray-600 tw-font-medium">
                      Company Email
                    </Form.Label>
                    <Input
                      type="email"
                      className="tw-h-12"
                      placeholder="Enter company email"
                      value={companyEmail}
                      onChange={(e) => setCompanyEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <Form.Label className="tw-text-gray-600 tw-font-medium">
                      Contact Number
                    </Form.Label>
                    <Input
                      type="number"
                      className="tw-h-12"
                      placeholder="Enter company contact number"
                      value={companyPhone}
                      onChange={(e) => setCompanyPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <Form.Label className="tw-text-gray-600 tw-font-medium">
                      Name
                    </Form.Label>
                    <Input
                      className="tw-h-12"
                      placeholder="Enter name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                </div>
              </Form.Group>
              <Form.Group
                className="mb-4 tw-grid xsm:tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4"
                controlId="exampleForm.ControlInput1"
              >
                <div>
                  <Form.Label className="tw-text-gray-600 tw-font-medium">
                    Founded Date
                  </Form.Label>

                  <DatePicker
                    className="tw-py-3 tw-border-gray-300 tw-border-2 tw-w-full"
                    // defaultValue={dayjs(today, dateFormat)}
                    format={dateFormat}
                    onChange={(e, a) => setCompanyFoundedDate(a)}
                    value={
                      companyFoundedDate
                        ? dayjs(companyFoundedDate, dateFormat)
                        : null
                    }
                  />
                </div>
                <div>
                  <Form.Label className="tw-text-gray-600 tw-font-medium">
                    Headquaters
                  </Form.Label>
                  <Input
                    className="tw-h-12"
                    placeholder="Enter headquater"
                    onChange={(e) => setCompanyHeadquarters(e.target.value)}
                    value={companyHeadquarters}
                  />
                </div>
              </Form.Group>
              <Form.Group
                className="mb-4 tw-grid tw-grid-cols-2 tw-gap-4 xsm:tw-grid-cols-1 md:tw-grid-cols-2"
                controlId="exampleForm.ControlInput1"
              >
                <div>
                  <Form.Label className="tw-text-gray-600 tw-font-medium">
                    Number of Employees
                  </Form.Label>
                  <Input
                    className="tw-h-12"
                    type="number"
                    placeholder="Enter number of employees"
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                  />
                </div>
                <div>
                  <Form.Label className="tw-text-gray-600 tw-font-medium">
                    Website Url
                  </Form.Label>
                  <Input
                    className="tw-h-12"
                    placeholder="Enter website url"
                    value={companyWebsiteURL}
                    onChange={(e) => setCompanyWebsiteURL(e.target.value)}
                  />
                </div>
              </Form.Group>
              <Form.Group
                className="mb-4"
                controlId="exampleForm.ControlInput1"
              >
                <div className="tw-flex tw-flex-row tw-justify-between tw-my-10">
                  <div className="tw-flex tw-flex-row">
                    <Image
                      src={"/borderBlack.png"}
                      width={10}
                      height={10}
                      alt="border"
                      className="tw-object-fit tw-mr-7"
                    />
                    <h1 className="tw-text-xl tw-font-semibold tw-self-center">
                      Profile Information
                    </h1>
                  </div>
                </div>
                <Form.Label className="tw-text-gray-600 tw-font-medium">
                  About Us
                </Form.Label>
                <ReactQuill
                  className="tw-h-40 tw-mb-20  "
                  theme="snow"
                  value={companyInfo}
                  onChange={setCompanyInfo}
                />
              </Form.Group>
            </Form>

            <button
              onClick={() => onSubmit()}
              className="tw-bg-primary tw-text-white  xsm:tw-w-full sm:tw-w-4/12 md:tw-w-3/12 lg:tw-w-2/12  tw-mt-10 hover:tw-bg-buttonHover tw-py-3 tw-rounded-lg tw-text-lg"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;

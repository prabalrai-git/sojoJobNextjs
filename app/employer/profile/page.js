"use client";

import { DatePicker, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { Form } from "react-bootstrap";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dayjs from "dayjs";
import Axios from "@/api/server";
import { UploadOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import uselocalStorage from "@/hooks/uselocalStorage";
import dynamic from "next/dynamic";
import ImgCrop from "antd-img-crop";
import "@/styles/individualStyles.css";

function page() {
  const [data, setData] = useState();
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

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

  const employerId = uselocalStorage("employerId");

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
        `/jobRecruiter/updateJobRecruiterProfileById/${employerId}`,
        formData
      );

      if (res.data.success) {
        toast.success("Profile Updated Successfully!", {
          position: "top-right",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          router.push("/employer/dashboard");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
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
    if (employerId) {
      getProfileInformation();
    }
  }, [employerId]);

  const getProfileInformation = async () => {
    try {
      const res = await Axios.get(
        `/jobRecruiter/getJobRecruiterById/${employerId}`
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
                className="tw-mb-12 tw-grid lg:tw-grid-cols-5 tw-gap-4 xsm:tw-grid-cols-1 md:tw-grid-cols-1"
                controlId="exampleForm.ControlInput1"
              >
                <div className="tw-bg-blue-100 tw-rounded-lg tw-flex tw-justify-center tw-items-center tw-col-span-2 tw-relative">
                  <ImgCrop
                    rotationSlider
                    aspectSlider
                    quality={1}
                    aspect={3 / 3}
                    minZoom={0}
                    cropShape=""
                  >
                    <Dragger
                      {...props}
                      className="tw-w-full tw-h-full tw-relative "
                    >
                      {logoDisplayImage ? (
                        <>
                          <div className="tw-h-full tw-rounded-lg hover:tw-bg-blackt tw-cursor-pointer tw-z-40 tw-w-full tw-absolute tw-top-0 tw-text-transparent hover:tw-text-white tw-flex tw-justify-center tw-items-center ">
                            <h6 className="">Change Image</h6>
                          </div>
                          <img
                            src={logoDisplayImage}
                            className="tw-absolute tw-top-0 tw-bottom-0 tw-left-0 tw-right-0 tw-max-h-full tw-w-full tw-object-fill tw-rounded-lg "
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
                  </ImgCrop>
                </div>
                {/* <div className="tw-bg-blue-100 tw-rounded-lg tw-flex tw-justify-center tw-items-center tw-col-span-2 tw-relative tw-w-full">
                  <ImgCrop
                    rotationSlider
                    aspectSlider
                    quality={1}
                    aspect={3 / 3}
                    minZoom={0}
                    cropShape=""
                  >
                    <Upload
                      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                      listType="picture-card"
                      fileList={companyLogoImage}
                      onRemove={() => setCompanyLogoImage()}
                      onChange={onChange}
                      onPreview={onPreview}
                      className=" "
                    >
                      {(companyLogoImage?.length < 1 && (
                        <div className="tw-flex tw-justify-center tw-flex-col">
                          <Image
                            src="/upload.png"
                            width={70}
                            height={70}
                            alt="home-banner"
                            className=" tw-object-contain tw-self-center"
                          />
                          <h6 className="tw-mt-5">
                            Drag and Dop file <br />
                            <br />
                            or
                          </h6>
                          <div className="tw-bg-dndBtn tw-cursor-pointer tw-text-white tw-rounded-lg tw-px-14 tw-py-3">
                            Browse Files
                          </div>
                        </div>
                      )) ||
                        (!companyLogoImage && (
                          <div className="tw-flex tw-justify-center tw-flex-col">
                            <Image
                              src="/upload.png"
                              width={70}
                              height={70}
                              alt="home-banner"
                              className=" tw-object-contain tw-self-center"
                            />
                            <h6 className="tw-mt-5">
                              Drag and Dop file <br />
                              <br />
                              or
                            </h6>
                            <div className="tw-bg-dndBtn tw-cursor-pointer tw-text-white tw-rounded-lg tw-px-14 tw-py-3">
                              Browse Files
                            </div>
                          </div>
                        ))}
                    </Upload>
                  </ImgCrop>
                </div> */}
                <div className="tw-col-span-3 tw-grid tw-gap-8">
                  <div>
                    <Form.Label className="tw-text-gray-600 tw-font-medium tw-mt-5">
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

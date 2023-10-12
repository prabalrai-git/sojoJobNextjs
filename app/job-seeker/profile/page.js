"use client";

import { Button, DatePicker, Input, Upload, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Dropzone, { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dayjs from "dayjs";
import Axios from "@/api/server";
import { useRouter } from "next/navigation";
import { UploadOutlined } from "@ant-design/icons";

function page() {
  const [value, setValue] = useState();
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
  });
  const [data, setData] = useState({
    name: null,
    email: null,
    contactNumber: null,
    currentAddress: null,
    permanentAddress: null,
    gender: null,
    dateOfBirth: null,
    cvfile: null,
    profilePicture: null,
  });
  const [logoDisplayImage, setLogoDisplayImage] = useState();
  const [cvDisplayUrl, setCVDisplayUrl] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProfileInfo();
  }, []);

  const router = useRouter();

  const dateFormat = "YYYY-MM-DD";
  const { Dragger } = Upload;
  const props = {
    name: "file",
    multiple: false,
    // action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {
      const { status } = info.file;

      setData((prev) => {
        return {
          ...prev,
          profilePicture: info.file.originFileObj,
        };
      });
      const img = URL.createObjectURL(info.file.originFileObj);
      setLogoDisplayImage(img);
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const getProfileInfo = async () => {
    try {
      const res = await Axios.get(
        `/jobSeeker/getJobSeekerById/${sessionStorage.getItem("jobSeekerId")}`
      );
      const data = res.data.data;
      setData({
        name: data?.name,
        email: data?.email,
        contactNumber: data?.contactNumber,
        currentAddress: data?.currentAddress,
        permanentAddress: data?.permanentAddress,
        gender: data?.gender,
        dateOfBirth: data?.dateOfBirth,
        profilePicture: data?.profilePicture,
        cvfile: data?.applicantCV?.cvUrl,
      });
      setLogoDisplayImage(data.profilePicture);
      setCVDisplayUrl([
        {
          url: data?.applicantCV?.cvUrl,
          uid: 1,
          name: data?.applicantCV?.cvUrl,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async () => {
    // return console.log(data);
    const formData = new FormData();

    const cvformData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("contactNumber", data.contactNumber);
    formData.append("currentAddress", data.currentAddress);
    formData.append("permanentAddress", data.permanentAddress);
    formData.append("gender", data.gender);
    formData.append(
      "dateOfBirth",
      data?.dateOfBirth ? data.dateOfBirth : new Date()
    );
    // formData.append("files", data.cvfile);

    formData.append("profilePicture", data.profilePicture);
    cvformData.append("cvFile", data.cvfile);
    try {
      setLoading(true);
      const res = await Axios.patch(
        `/jobSeeker/updateJobSeekerProfileById/${sessionStorage.getItem(
          "jobSeekerId"
        )}`,
        formData
      );

      await Axios.post(
        `/jobSeeker/postOrUpdateJobSeekerCVByJobSeekerId/${sessionStorage.getItem(
          "jobSeekerId"
        )}`,
        cvformData
      );
      if (res.data.success) {
        message.success("Profile Updated Successfully");
        setLoading(false);

        setTimeout(() => {
          router.push("/job-seeker/dashboard");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);

      message.error(error.response.msg);
    }
  };
  const propsCV = {
    beforeUpload: (file) => {
      // return console.log(file);
      // const isPDF = file.type === "application/pdf";
      // if (!isPDF) {
      //   return message.error(`${file.name} is not a pdf file`);
      // }
      setData((prev) => {
        return { ...prev, cvfile: file };
      });
      setCVDisplayUrl([
        {
          uid: file.uid,
          name: file.name,
        },
      ]);
      return false;
    },
  };
  return (
    <div className="tw-pt-10 tw-mx-40 tw-pb-10">
      <div className="tw-flex tw-flex-row tw-mb-10">
        <Link href={"/job-seeker/dashboard"}>
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
              className="mb-4 tw-grid tw-grid-cols-5 tw-gap-4"
              controlId="exampleForm.ControlInput1"
            >
              <div className="tw-bg-blue-100 tw-rounded-lg tw-flex tw-justify-center tw-items-center tw-col-span-2 ">
                <Dragger {...props} className="tw-w-full tw-h-full tw-relative">
                  {logoDisplayImage ? (
                    <>
                      <img
                        src={logoDisplayImage}
                        className="tw-absolute tw-top-0 tw-bottom-0 tw-left-0 tw-right-0 tw-max-h-full tw-w-full tw-object-cover"
                        alt="img"
                      />
                    </>
                  ) : (
                    <>
                      <p className="ant-upload-drag-icon">
                        <UploadOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Drag and Drop to Upload Profile Image
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
                    Name
                  </Form.Label>
                  <Input
                    className="tw-h-12 "
                    value={data.name}
                    onChange={(e) =>
                      setData((prev) => {
                        return { ...prev, name: e.target.value };
                      })
                    }
                  />
                </div>
                <div>
                  <Form.Label className="tw-text-gray-600 tw-font-medium">
                    Email
                  </Form.Label>
                  <Input
                    disabled={true}
                    className="tw-h-12 "
                    value={data.email}
                    onChange={(e) =>
                      setData((prev) => {
                        return { ...prev, email: e.target.value };
                      })
                    }
                  />
                </div>
                <div>
                  <Form.Label className="tw-text-gray-600 tw-font-medium">
                    Contact Number
                  </Form.Label>
                  <Input
                    className="tw-h-12 "
                    value={data.contactNumber}
                    onChange={(e) =>
                      setData((prev) => {
                        return { ...prev, contactNumber: e.target.value };
                      })
                    }
                  />
                </div>
              </div>

              <div className="tw-flex tw-flex-row tw-mt-10 tw-justify-between">
                <div className="tw-flex tw-flex-row">
                  <Image
                    src={"/borderBlack.png"}
                    width={10}
                    height={10}
                    alt="border"
                    className="tw-object-fit tw-mr-7"
                  />
                  <h1 className="tw-text-xl tw-font-semibold tw-self-center">
                    General Information
                  </h1>
                </div>
              </div>
            </Form.Group>
            <Form.Group
              className="mb-4 tw-grid tw-grid-cols-2 tw-gap-4"
              controlId="exampleForm.ControlInput1"
            >
              <div className="tw-flex tw-flex-col">
                <Form.Label className="tw-text-gray-600 tw-font-medium">
                  Upload CV
                </Form.Label>
                <Upload
                  className="tw-width-full"
                  {...propsCV}
                  fileList={cvDisplayUrl && cvDisplayUrl}
                  // action="/upload.do"
                  // listType="picture-card"
                >
                  <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
              </div>
              <div>
                <Form.Label className="tw-text-gray-600 tw-font-medium">
                  Current Address
                </Form.Label>
                <Input
                  className="tw-h-12 "
                  value={data.currentAddress}
                  onChange={(e) =>
                    setData((prev) => {
                      return { ...prev, currentAddress: e.target.value };
                    })
                  }
                />
              </div>
            </Form.Group>
            <Form.Group
              className="mb-4 tw-grid tw-grid-cols-2 tw-gap-4"
              controlId="exampleForm.ControlInput1"
            >
              <div>
                <Form.Label className="tw-text-gray-600 tw-font-medium">
                  Permanent address
                </Form.Label>
                <Input
                  className="tw-h-12 "
                  value={data.permanentAddress}
                  onChange={(e) =>
                    setData((prev) => {
                      return { ...prev, permanentAddress: e.target.value };
                    })
                  }
                />
              </div>
              <div>
                <Form.Label className="tw-text-gray-600 tw-font-medium">
                  Gender
                </Form.Label>
                <Input
                  className="tw-h-12 "
                  value={data.gender}
                  onChange={(e) =>
                    setData((prev) => {
                      return { ...prev, gender: e.target.value };
                    })
                  }
                />
              </div>
            </Form.Group>
            <Form.Group
              className="mb-4 tw-grid tw-grid-cols-2 tw-gap-4"
              controlId="exampleForm.ControlInput1"
            >
              <div>
                <Form.Label className="tw-text-gray-600 tw-font-medium">
                  Date Of Birth
                </Form.Label>
                <DatePicker
                  className="tw-py-3 tw-border-gray-300 tw-border-2 tw-w-full"
                  // defaultValue={dayjs(today, dateFormat)}
                  format={dateFormat}
                  onChange={(e, a) =>
                    setData((prev) => {
                      return { ...prev, dateOfBirth: a };
                    })
                  }
                  value={
                    data.dateOfBirth
                      ? dayjs(data.dateOfBirth, dateFormat)
                      : null
                  }
                />
              </div>
            </Form.Group>

            {/* <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
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
                    Summary
                  </h1>
                </div>
              </div>
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                Tell us something about yourself
              </Form.Label>
              <ReactQuill
                className="tw-h-40 tw-mb-20  "
                theme="snow"
                value={data.}
                onChange={(e) =>
                  setData((prev) => {
                    return { ...prev, gender: e.target.value };
                  })
                }              />
            </Form.Group> */}
            {/* <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
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
                    Work Experience
                  </h1>
                </div>
              </div>
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                Create your professional work experience section
              </Form.Label>
              <ReactQuill
                className="tw-h-40 tw-mb-20  "
                theme="snow"
                value={data.workExperience}
                onChange={(e) =>
                  setData((prev) => {
                    return { ...prev, workExperience: e };
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
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
                    Education Background
                  </h1>
                </div>
              </div>
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                Create your education background section
              </Form.Label>
              <ReactQuill
                className="tw-h-40 tw-mb-20  "
                theme="snow"
                value={data.educationBackground}
                onChange={(e) =>
                  setData((prev) => {
                    return { ...prev, educationBackground: e };
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
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
                    Licenses & Certification
                  </h1>
                </div>
              </div>
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                Create your licenses and certification section
              </Form.Label>
              <ReactQuill
                className="tw-h-40 tw-mb-20  "
                theme="snow"
                value={data.licensesAndCertification}
                onChange={(e) =>
                  setData((prev) => {
                    return {
                      ...prev,
                      licensesAndCertification: e,
                    };
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
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
                    Other Skillset
                  </h1>
                </div>
              </div>
              <Form.Label className="tw-text-gray-600 tw-font-medium">
                Enter any other skillsets that you have
              </Form.Label>
              <ReactQuill
                className="tw-h-40 tw-mb-20  "
                theme="snow"
                value={data.otherSkillSets}
                onChange={(e) =>
                  setData((prev) => {
                    return { ...prev, otherSkillSets: e };
                  })
                }
              />
            </Form.Group> */}
          </Form>

          <Button
            loading={loading}
            disabled={loading}
            onClick={() => updateProfile()}
            className="tw-bg-primary tw-text-white tw-px-12 tw-mt-10 hover:tw-bg-buttonHover tw-py-6 tw-rounded-lg tw-text-lg tw-h-13 tw-text-center tw-flex tw-justify-center tw-items-center"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default page;

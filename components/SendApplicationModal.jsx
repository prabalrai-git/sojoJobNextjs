"use client";
import React, { useEffect, useState } from "react";
import {
  Divider,
  Modal,
  Button,
  Form,
  Input,
  Upload,
  message,
  Select,
  Tag,
  Spin,
} from "antd";
import Axios from "@/api/server";
import { UploadOutlined } from "@ant-design/icons";
import Link from "next/link";

function SendApplicationModal({
  open,
  setOpen,
  jobRecruiterId,
  jobId,
  jobQuestions,
}) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [fullname, setFullName] = useState();
  const [file, setFile] = useState();
  const [jobSeekerId, setJobSeekerId] = useState(
    typeof window !== "undefined" && sessionStorage.getItem("jobSeekerId")
  );
  const [loggedInUserData, setLoggedInUserData] = useState();
  const [cvDisplayUrl, setCVDisplayUrl] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [cvEmpty, setCVEmpty] = useState(false);
  const clearAllStates = () => {
    setEmail(); //clear all states
    setFullName();
    setFile();
    setCVDisplayUrl();
  };
  useEffect(() => {
    if (jobSeekerId) {
      getLoggedInJobSeekerData();
    }
  }, [jobSeekerId]);

  useEffect(() => {
    if (cvEmpty) {
      setTimeout(() => {
        setCVEmpty(false);
      }, 2000);
    }
  }, [cvEmpty]);
  const [form] = Form.useForm();

  const getLoggedInJobSeekerData = async () => {
    try {
      const res = await Axios.get(`/jobSeeker/getJobSeekerById/${jobSeekerId}`);
      setLoggedInUserData(res.data.data);
      setCVDisplayUrl([
        {
          url: res.data.data?.applicantCV?.cvUrl,
          uid: 1,
          name: res.data.data?.applicantCV?.cvUrl,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const props = {
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
  };
  const propsCV = {
    beforeUpload: (file) => {
      // return console.log(file);
      // const isPDF = file.type === "application/pdf";
      // if (!isPDF) {
      //   return message.error(`${file.name} is not a pdf file`);
      // }
      setFile(file);

      setCVDisplayUrl([
        {
          uid: file.uid,
          name: file.name,
        },
      ]);
      return false;
    },
  };

  const onSubmit = async () => {
    // return console.log(answers);
    if (!file) {
      return setCVEmpty(true);
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("jobSeekerName", fullname);
    formData.append("jobSeekerEmail", email);
    formData.append("jobRecruiterId", jobRecruiterId);
    formData.append("jobId", jobId);
    formData.append("cvfile", file);
    try {
      const data = await Axios.post(
        "/application/createNewApplication",
        formData
      );

      const jobApplicationId = data.data.data.id;
      // console.log(data.data, "yo pani ho");
      const nAnswers = answers.map((item) => {
        return { jobApplicationId: jobApplicationId, ...item };
      });
      try {
        nAnswers.map(async (item) => {
          // return console.log(item, "yo ho hai");
          await Axios.post("/job/postJobAnswers", item);
        });
        handleCancel();
        message.success("Application sent successfully!");
        clearAllStates();
        form.resetFields();
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.response.data);
      handleCancel();
      clearAllStates();
      form.resetFields();

      message.info(error.response.data.msg);
      setLoading(false);
    }
  };
  const onSubmitLoggedInJobSeeker = async () => {
    if (!loggedInUserData?.applicantCV?.cvUrl) {
      return setCVEmpty(true);
    }
    const data = {
      jobSeekerName: loggedInUserData?.name,
      jobSeekerEmail: loggedInUserData?.email,
      jobRecruiterId: jobRecruiterId,
      jobId: jobId,
      jobSeekerId: jobSeekerId,
      cvfile: loggedInUserData?.applicantCV?.cvUrl,
    };
    try {
      await Axios.post("/application/createNewApplication", data);
      handleCancel();
      clearAllStates();
      form.resetFields();
      message.success("Application sent successfully!");
    } catch (error) {
      console.log(error.response.data);
      handleCancel();
      clearAllStates();
      form.resetFields();

      message.info(error.response.data.msg);
    }
  };

  const generateFormForJobQuestions = () => {
    return jobQuestions?.map((item) => {
      const handleInputChange = (e) => {
        // Find the index of the existing answer for this question
        const answerIndex = answers.findIndex(
          (answer) => answer.jobQuestionId === item.id
        );

        if (answerIndex !== -1) {
          // If an answer for this question exists, update it
          setAnswers((prev) => [
            ...prev.slice(0, answerIndex), // Keep the previous answers before the current one
            {
              answer:
                item.questionType.toLowerCase() === "number"
                  ? e.target.value
                  : e,
              jobQuestionId: item.id,
            }, // Update the current answer
            ...prev.slice(answerIndex + 1), // Keep the answers after the current one
          ]);
        } else {
          // If no answer for this question exists, add a new answer
          setAnswers((prev) => [
            {
              answer:
                item.questionType.toLowerCase() === "number"
                  ? e.target.value
                  : e,
              jobQuestionId: item.id,
            },
            ...prev,
          ]);
        }
      };

      return (
        <>
          <Form.Item
            name={item.id}
            rules={[
              {
                required: true,
                message: "Please input your answer!",
              },
            ]}
            label={item.questionText}
          >
            {item.questionType.toLowerCase() === "number" ? (
              <Input
                className="tw-h-10"
                type="number"
                onChange={(e) => handleInputChange(e)}
              />
            ) : (
              <Select
                className="tw-h-10"
                onChange={(e) => handleInputChange(e)}
                options={[
                  {
                    value: "yes",
                    label: "Yes",
                  },
                  {
                    value: "no",
                    label: "No",
                  },
                ]}
              />
            )}
          </Form.Item>
        </>
      );
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      open={open}
      width={700}
      className="tw-mb-40"
      title={
        <>
          <p className="tw-text-2xl">Apply Job</p>
          <Divider />
        </>
      }
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Spin size="large" spinning={loading}>
        <Form
          form={form}
          layout={"vertical"}
          onFinish={() => {
            jobSeekerId ? onSubmitLoggedInJobSeeker() : onSubmit();
          }}
          onFinishFailed={onFinishFailed}
          // style={{
          //   maxWidth: formLayout === "inline" ? "none" : 600,
          // }}
        >
          <div className="tw-grid md:tw-grid-cols-2 tw-gap-3 xsm:tw-grid-cols-1">
            <Form.Item
              rules={[
                {
                  required: jobSeekerId ? false : true,
                  message: "Please input your email!",
                },
              ]}
              label="Email"
              name="email"
            >
              <Input
                disabled={jobSeekerId ? true : false}
                onChange={(e) => setEmail(e.target.value)}
                defaultValue={loggedInUserData?.email && loggedInUserData.email}
                className="tw-h-10"
                placeholder="Enter your email.."
                value={email}
              />
            </Form.Item>
            <Form.Item
              name="fullname"
              rules={[
                {
                  required: jobSeekerId ? false : true,
                  message: "Please input your full name!",
                },
              ]}
              label="Full Name"
            >
              <Input
                disabled={jobSeekerId ? true : false}
                onChange={(e) => setFullName(e.target.value)}
                defaultValue={loggedInUserData?.name && loggedInUserData.name}
                className="tw-h-10"
                placeholder="Enter your full name.."
                value={fullname}
              />
            </Form.Item>
          </div>
          <Form.Item
            label="Upload CV"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              className="tw-width-full"
              {...propsCV}
              fileList={cvDisplayUrl && cvDisplayUrl}
              // action="/upload.do"
              // listType="picture-card"
            >
              <Button
                disabled={jobSeekerId ? true : false}
                icon={<UploadOutlined />}
              >
                Select File
              </Button>
            </Upload>
            {loggedInUserData &&
              (!cvDisplayUrl || !cvDisplayUrl[0] || !cvDisplayUrl[0]?.url) && (
                <Link
                  className="tw-text-rose-400 hover:tw-text-red"
                  href={"/job-seeker/profile"}
                >
                  Please upload the CV to complete your profile!
                </Link>
              )}
            {cvEmpty && (
              <p className="tw-text-red tw-mt-3">Please upload the CV!</p>
            )}
          </Form.Item>
          {jobQuestions && (
            <>
              {/* <p className="tw-font-medium tw-text-lg tw-mb-5">
             he following questions as well
            </p> */}
              <Divider orientation="left" orientationMargin="0">
                Please answer the questions below
              </Divider>
              {generateFormForJobQuestions()}
            </>
          )}
          <Form.Item>
            <button
              disabled={loading}
              htmlType="submit"
              className="tw-bg-primary tw-w-full tw-text-white tw-rounded-lg tw-py-2 tw-text-md tw-font-normal hover:tw-bg-buttonHover"
            >
              Send Application
            </button>
          </Form.Item>

          {/* <Upload {...props} action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Select
              </div>
            </div>
          </Upload> */}
        </Form>
      </Spin>
    </Modal>
  );
}

export default SendApplicationModal;

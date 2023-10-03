import React, { useEffect, useState } from "react";
import {
  Divider,
  Modal,
  Button,
  Form,
  Input,
  Radio,
  Upload,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Axios from "@/api/server";
import { UploadOutlined } from "@ant-design/icons";

function SendApplicationModal({ open, setOpen, jobRecruiterId, jobId }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [fullname, setFullName] = useState();
  const [file, setFile] = useState();
  const [jobSeekerId, setJobSeekerId] = useState(
    localStorage.getItem("jobSeekerId")
  );
  const [loggedInUserData, setLoggedInUserData] = useState();
  const [cvDisplayUrl, setCVDisplayUrl] = useState([]);

  const clearAllStates = () => {
    setEmail(""); //clear all states
    setFullName();
    setFile();
    setCVDisplayUrl();
  };

  useEffect(() => {
    if (jobSeekerId) {
      getLoggedInJobSeekerData();
    }
  }, [jobSeekerId]);

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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
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
    const formData = new FormData();
    formData.append("jobSeekerName", fullname);
    formData.append("jobSeekerEmail", email);
    formData.append("jobRecruiterId", jobRecruiterId);
    formData.append("jobId", jobId);
    formData.append("cvfile", file);
    try {
      await Axios.post("/application/createNewApplication", formData);
      handleCancel();
      message.success("Application sent successfully!");
      clearAllStates();
    } catch (error) {
      console.log(error.response.data);
      handleCancel();
      clearAllStates();

      message.info(error.response.data.msg);
    }
  };
  const onSubmitLoggedInJobSeeker = async () => {
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
      message.success("Application sent successfully!");
    } catch (error) {
      console.log(error.response.data);
      handleCancel();
      clearAllStates();

      message.info(error.response.data.msg);
    }
  };

  return (
    <Modal
      open={open}
      title={
        <>
          <p className="tw-text-2xl">Apply Job</p>
          <Divider />
        </>
      }
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <button
          onClick={() => {
            jobSeekerId ? onSubmitLoggedInJobSeeker() : onSubmit();
          }}
          className="tw-bg-primary tw-w-full tw-text-white tw-rounded-lg tw-py-2 tw-text-md tw-font-normal hover:tw-bg-buttonHover"
        >
          Send Application
        </button>,
      ]}
    >
      <Form
        layout={"vertical"}
        // style={{
        //   maxWidth: formLayout === "inline" ? "none" : 600,
        // }}
      >
        <Form.Item label="Email">
          <Input
            disabled={jobSeekerId ? true : false}
            onChange={(e) => setEmail(e.target.value)}
            className="tw-h-10"
            placeholder="Enter your email.."
            value={loggedInUserData?.email && loggedInUserData.email}
          />
        </Form.Item>
        <Form.Item label="Full Name">
          <Input
            disabled={jobSeekerId ? true : false}
            onChange={(e) => setFullName(e.target.value)}
            className="tw-h-10"
            placeholder="Enter your full name.."
            value={loggedInUserData?.name && loggedInUserData.name}
          />
        </Form.Item>
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
    </Modal>
  );
}

export default SendApplicationModal;

import React, { useState } from "react";
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

function SendApplicationModal({ open, setOpen, jobRecruiterId, jobId }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [fullname, setFullName] = useState();
  const [file, setFile] = useState();

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
    } catch (error) {
      console.log(error);
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
            onSubmit();
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
            onChange={(e) => setEmail(e.target.value)}
            className="tw-h-10"
            placeholder="Enter your email.."
          />
        </Form.Item>
        <Form.Item label="Full Name">
          <Input
            onChange={(e) => setFullName(e.target.value)}
            className="tw-h-10"
            placeholder="Enter your full name.."
          />
        </Form.Item>
        <Form.Item
          label="Upload CV"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload {...props} action="/upload.do" listType="picture-card">
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
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default SendApplicationModal;

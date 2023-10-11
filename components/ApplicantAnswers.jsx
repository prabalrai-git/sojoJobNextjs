import React, { useState } from "react";
import { Button, Modal, Space, Table, Tag } from "antd";
const ApplicantAnswers = ({
  isModalOpen,
  setIsModalOpen,
  data,
  applicantName,
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  let sn = 1;
  const columns = [
    {
      title: "SN",
      dataIndex: "sn",
      render: () => sn++,
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      render: (e, a) => <a>{a.jobQuestion.questionText}</a>,
    },
    {
      title: "Answer Provided",
      dataIndex: "answer",
      key: "answer",
    },
    {
      title: "Required Answer",
      dataIndex: "requiredAnswer",
      key: "requiredAnswer",
      render: (e, a) => <a>{a.jobQuestion.requiredAnswer}</a>,
    },
  ];
  return (
    <>
      <Modal
        onCancel={() => handleCancel()}
        title={`${applicantName}'s Answers`}
        open={isModalOpen}
        footer={null}
        width={800}
      >
        <Table columns={columns} dataSource={data} />
      </Modal>
    </>
  );
};
export default ApplicantAnswers;

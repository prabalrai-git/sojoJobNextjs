import React from "react";

function JobPackage({ title, setJobPackage, jobPackage }) {
  return (
    <div
      onClick={() => setJobPackage(title)}
      style={{
        backgroundColor: jobPackage === title ? "#D3EFDF" : "white",
        borderWidth: 3,
        borderColor: jobPackage === title ? "#26af61" : "#D3EFDF",
        cursor: "pointer",
      }}
      className="tw-border-primary tw-rounded-md tw-flex tw-justify-center tw-align-middle tw-mt-5 tw-p-6 tw-px-12 "
    >
      {title}
    </div>
  );
}

export default JobPackage;

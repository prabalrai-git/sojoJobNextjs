import Image from "next/image";
import React from "react";

function EmployersCard({ item }) {
  return (
    <div className="tw-mx-3">
      <div
        style={{
          backgroundColor: item.themeColor,
          borderColor: item.themeColor,
        }}
        className=" tw-cursor-pointer  tw-border-2 tw-rounded-t-lg tw-h-28 tw-relative "
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50px",
            bottom: "-50px",
            left: 0,
            right: 0,
            marginLeft: "auto",
            marginRight: "auto",
          }}
          className="tw-bg-white tw-flex tw-justify-center tw-items-center tw-z-2 tw-absolute "
        >
          <Image
            src={item.logo}
            width={90}
            height={90}
            alt="company"
            className="tw-object-contain  "
          />
        </div>
      </div>
      <div className="tw-border-cardBorder tw-border-2 tw-h-36 tw-rounded-b-lg tw-items-center tw-flex tw-justify-center">
        <div className="tw-mt-6">
          <p className="tw-font-medium tw-text-lg tw-text-center">
            {item.title}
          </p>
          <p className="tw-mt-1 tw-text-primary tw-text-center tw-font-light">
            {item.address}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmployersCard;

import Image from "next/image";
import React from "react";

function EmployersCard() {
  return (
    <div>
      <div className="tw-cursor-pointer tw-bg-ingTheme tw-border-2 tw-rounded-t-lg tw-border-ingTheme tw-h-28 tw-relative ">
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50px",
            bottom: "-50px",
            left: "60px",
          }}
          className="tw-bg-white tw-flex tw-justify-center tw-items-center tw-z-2 tw-absolute "
        >
          <Image
            src={"/images/clients/9.png"}
            width={90}
            height={90}
            alt="company"
            className="tw-object-contain  "
          />
        </div>
      </div>
      <div className="tw-border-cardBorder tw-border-2 tw-h-36 tw-rounded-b-lg tw-items-center tw-flex tw-justify-center">
        <div className="tw-mt-6">
          <p className="tw-font-semibold tw-text-lg tw-text-center">E-sewa</p>
          <p className="tw-mt-1 tw-text-primary tw-text-center">Jawlakhel</p>
        </div>
      </div>
    </div>
  );
}

export default EmployersCard;

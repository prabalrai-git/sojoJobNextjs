import Image from "next/image";
import React from "react";

function MonthlyInfoCard({ title, data }) {
  return (
    <div className="tw-bg-monthlyCard tw-rounded-lg tw-pb-10">
      <div className="tw-px-5 tw-py-5 tw-grid tw-grid-cols-8 ">
        <div className="tw-col-span-2 ">
          <Image src={"/file.png"} width={20} height={20} alt="file" />
        </div>
        <div className="tw-col-span-6  ">
          <div className="tw-grid tw-grid-cols-1 tw-gap-3">
            <h2 className="tw-text-gray-500 tw-text-lg">{title}</h2>
            <h1 className="tw-text-6xl tw-text-black">{data}</h1>
            {/* <p className="tw-text-gray-400">{data}%</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonthlyInfoCard;

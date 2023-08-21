import Image from "next/image";
import React from "react";

function ReviewCard({ item }) {
  return (
    <div
      className="tw-rounded-b-xl"
      style={{ height: "540px", backgroundColor: "white" }}
    >
      <div className="tw-relative">
        <Image
          src={item?.src}
          width={300}
          height={10}
          alt="review"
          className="tw-w-full tw-object-cover tw-h-60"
        />

        <Image
          src={item?.logo}
          width={70}
          height={70}
          alt="logo"
          style={{ position: "absolute", bottom: "-13%", left: "5%" }}
          className="tw-rounded-full tw-bg-white tw-p-2  "
        />
      </div>
      <div className="tw-bg-white tw-pt-10 tw-px-5 tw-rounded-b-xl">
        <div>
          <h6 className="tw-font-lg tw-font-medium tw-my-3">"{item.title}"</h6>
          <p>{item?.desc}</p>
          <h6 className="tw-font-lg tw-font-medium tw-my-3">- {item.person}</h6>
          <p>{item?.desg}</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;

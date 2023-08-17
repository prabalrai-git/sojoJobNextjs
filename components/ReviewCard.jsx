import Image from "next/image";
import React from "react";

function ReviewCard({ item }) {
  return (
    <div
      className="tw-rounded-b-xl"
      style={{ height: "500px", backgroundColor: "white" }}
    >
      <div className="h">
        <Image
          src={item?.src}
          width={200}
          height={100}
          alt="review"
          className="tw-w-full tw-object-contain"
        />
      </div>
      <div className="tw-bg-white tw-pt-5 tw-px-5 tw-rounded-b-xl">
        <div>
          <h2 className="tw-font-lg tw-font-medium tw-my-3">"{item.title}"</h2>
          <p>{item?.desc}</p>
          <p className="tw-font-lg tw-font-medium tw-my-3">- {item.person}</p>
          <p>{item?.desg}</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;

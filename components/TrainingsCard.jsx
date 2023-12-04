import { Image, Space } from "antd";
import React from "react";

function TrainingsCard({ item }) {
  return (
    <div
      className="tw-rounded-b-xl tw-pb-16 tw-mx-5"
      style={{ backgroundColor: "white" }}
    >
      <div className="tw-relative">
        <Image
          src={item?.src}
          alt="review"
          className="tw-w-full tw-object-fill "
          preview={{
            toolbarRender: (
              _,
              {
                transform: { scale },
                actions: {
                  onFlipY,
                  onFlipX,
                  onRotateLeft,
                  onRotateRight,
                  onZoomOut,
                  onZoomIn,
                },
              }
            ) => <Space size={12} className="toolbar-wrapper"></Space>,
          }}
        ></Image>
      </div>
      <div className="tw-bg-white  tw-px-5 tw-rounded-b-xl xsm:tw-h-64 450:tw-h-52 800:tw-h-52 xl:tw-h-56 lg:tw-h-72 md:tw-h-48 sm:tw-h-52 tw-relative">
        <div>
          <h6 className="tw-text-lg tw-font-medium tw-my-3 ">{item.title}</h6>
          <p className="tw-text-justify tw-text-base tw-absolute tw-top-20 lg:tw-top-24 xsm:tw-top-24 sm:tw-top-16 450:tw-top-16 tw-right-4 tw-left-4 ">
            {item?.desc}
          </p>
          <div className="tw-absolute -tw-bottom-10">
            <p className="tw-mt-5 tw-font-bold tw-text-md">Contact us:</p>
            <a
              href="tel:+9779702615753"
              className="tw-flex tw-flex-row tw-mt-2 tw-no-underline "
            >
              <img
                src={"/telephone.png"}
                className="tw-object-contain tw-mr-4 "
                width={20}
                height={20}
              />
              <p className="tw-text-sm">+977 9702615753</p>
            </a>
            <a
              className="tw-flex tw-flex-row tw-mt-2"
              href="mailto:hello@sojojob.com"
            >
              <img
                src={"/gmail.png"}
                className="tw-object-contain tw-mr-4"
                width={20}
                height={20}
              />
              <p className="tw-text-sm">hello@sojojob.com</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainingsCard;

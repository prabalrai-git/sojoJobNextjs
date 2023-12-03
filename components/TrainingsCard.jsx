import Image from "next/image";
import React from "react";

function TrainingsCard({ item }) {
  return (
    <div
      className="tw-rounded-b-xl tw-pb-10"
      style={{ backgroundColor: "white" }}
    >
      <div className="tw-relative">
        <Image
          src={item?.src}
          width={270}
          height={200}
          alt="review"
          className="tw-w-full tw-object-contain "
        />
      </div>
      <div className="tw-bg-white  tw-px-5 tw-rounded-b-xl">
        <div>
          <h6 className="tw-text-xl tw-font-medium tw-my-3 ">{item.title}</h6>
          <p className="tw-text-justify tw-text-base ">{item?.desc}</p>
          <div>
            <p className="tw-mt-5 tw-font-bold">Contact us:</p>
            <a
              href="tel:+9779702615753"
              className="tw-flex tw-flex-row tw-mt-2 tw-no-underline "
            >
              <Image
                src={"/telephone.png"}
                className="tw-object-contain tw-mr-4 "
                width={20}
                height={20}
              />
              <p>+977 9702615753</p>
            </a>
            <a
              className="tw-flex tw-flex-row tw-mt-2"
              href="mailto:hello@sojojob.com"
            >
              <Image
                src={"/gmail.png"}
                className="tw-object-contain tw-mr-4"
                width={20}
                height={20}
              />
              <p>hello@sojojob.com</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainingsCard;

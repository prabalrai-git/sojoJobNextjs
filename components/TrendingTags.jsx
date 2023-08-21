import React from "react";

function TrendingTags({ item }) {
  return (
    <div className="tw-bg-cardBorder tw-rounded-full tw-px-4 tw-flex tw-justify-center tw-mx-1 tw-h-7 tw-items-center tw-cursor-pointer">
      <p className="tw-text-primary tw-font-normal tw-text-center tw-self-center text-center tw-mt-3 tw-text-sm ">
        {item.title}
      </p>
    </div>
  );
}

export default TrendingTags;

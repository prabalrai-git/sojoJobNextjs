import React from "react";

function TrendingTags({ item }) {
  return (
    <div className="tw-bg-cardBorder tw-rounded-xl tw-px-4 tw-flex tw-justify-center tw-mx-1  tw-items-center tw-cursor-pointer">
      <p className="tw-text-primary tw-my-auto tw-font-normal tw-text-center tw-self-center text-center tw-text-xs tw-capitalize tw-py-1 ">
        {item.title.split(" ")[0]}
      </p>
    </div>
  );
}

export default TrendingTags;

"use client";
import { useRouter } from "next/navigation";
import React from "react";

function TrendingTags({ item }) {
  const router = useRouter();

  return (
    <div
      data-toggle="tooltip"
      onClick={() =>
        router.push(
          `/search?categoryId=${item.jobCategory.id}&categoryTitle=${item.jobCategory.title}`
        )
      }
      title={item.jobCategory.title}
      className="tw-bg-cardBorder tw-rounded-xl tw-px-4 tw-flex tw-justify-center tw-mx-1  tw-items-center tw-cursor-pointer"
    >
      <p className="tw-text-primary tw-my-auto tw-font-normal tw-text-center tw-self-center text-center tw-text-xs tw-capitalize tw-py-1 ">
        {item.jobCategory.title.length > 16
          ? item.jobCategory.title.slice(0, 12) + "..."
          : item.jobCategory.title}
      </p>
    </div>
  );
}

export default TrendingTags;

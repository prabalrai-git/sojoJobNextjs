import AppliedJobs from "@/components/AppliedJobs";
import React from "react";

function page() {
  return (
    <div className="tw-pt-10 tw-px-20 tw-pb-12">
      <h2 className="tw-text-lg">
        This is your personalized space where we help you find an ideal match!
      </h2>
      <AppliedJobs />
    </div>
  );
}

export default page;

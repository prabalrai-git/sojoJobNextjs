import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <div className="tw-bg-footerBackground tw-py-20 tw-grid lg:tw-grid-cols-3 md:tw-grid-cols-2 xl:tw-grid-cols-3 sm:tw-grid-cols-2 xsm:tw-grid-cols-1 tw-text-white tw-text-2xl tw-font-medium tw-flex-wrap tw-pb-40 tw-w-full tw-px-32 xsm:tw-px-5 sm:tw-px-10 md:tw-px-32 lg:tw-px-32 xl:tw-px-32">
      <div>
        <h4 className="tw-pb-7 ">Job Seekers</h4>
        <div className="tw-text-lg tw-font-normal">
          <p className="tw-pb-1">Register to SojoJob</p>
          <p className="tw-pb-1">Login to SojoJob Account</p>
          <p className="tw-pb-1">About Us</p>
        </div>
      </div>
      <div>
        <h4 className="tw-pb-7">Job Providers</h4>
        <div className="tw-text-lg tw-font-normal">
          <p className="tw-pb-1">Register to SojoJob</p>
          <p className="tw-pb-1">Login to SojoJob Account</p>
          <p className="tw-pb-1">About Us</p>
        </div>
      </div>
      <div className="tw-w-full">
        <Image
          className="tw-pb-7"
          src={"/logo.png"}
          width={300}
          height={300}
          alt="logo.png"
        />
        <p className="tw-text-lg tw-font-normal tw-leading-9">
          Sojojob Enables employers just like you to register, post and fulfill
          their requirements and uses simplified shortlisting process to hire
          the best in a few clicks with technology-guided tools. Customized
          platform provided to job seekers, on the other hand, lets them
          register, search, apply and get jobs for free within a few clicks as
          well.
        </p>
        <div className="tw-flex tw-flex-row tw-w-3/12 md:tw-w-3/12 sm:tw-w-5/12 800:tw-w-4/12 xsm:tw-w-5/12 tw-justify-between tw-mt-6">
          <Image
            src={"/facebook.png"}
            width={24}
            height={24}
            alt="facebook.png"
            className="tw-cursor-pointer"
          />
          <Image
            src={"/instagram.png"}
            width={24}
            height={24}
            alt="instagram.png"
            className="tw-cursor-pointer"
          />
          <Image
            src={"/linkedin.png"}
            width={24}
            height={24}
            alt="linkedin.png"
            className="tw-cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;

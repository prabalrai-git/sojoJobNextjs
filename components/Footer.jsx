import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <div className="tw-bg-footerBackground tw-py-20 tw-flex tw-flex-row tw-justify-around tw-text-white tw-text-2xl tw-font-medium tw-flex-wrap tw-pb-40">
      <div>
        <h2 className="tw-pb-7">Job Seekers</h2>
        <ul className="tw-text-lg tw-font-normal">
          <li className="tw-pb-5">Register to SojoJob</li>
          <li className="tw-pb-5">Login to SojoJob Account</li>
          <li className="tw-pb-5">About Us</li>
        </ul>
      </div>
      <div>
        <h2 className="tw-pb-7">Job Providers</h2>
        <ul className="tw-text-lg tw-font-normal">
          <li className="tw-pb-5">Register to SojoJob</li>
          <li className="tw-pb-5">Login to SojoJob Account</li>
          <li className="tw-pb-5">About Us</li>
        </ul>
      </div>
      <div className="tw-w-3/12">
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
        <div className="tw-flex tw-flex-row tw-w-3/12 tw-justify-between tw-mt-6">
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

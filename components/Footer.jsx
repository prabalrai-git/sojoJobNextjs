import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="tw-bg-footerBackground tw-py-20 tw-grid lg:tw-grid-cols-3 md:tw-grid-cols-2 xl:tw-grid-cols-3 sm:tw-grid-cols-2 xsm:tw-grid-cols-1 tw-text-white tw-text-2xl tw-font-medium tw-flex-wrap tw-pb-40 tw-w-full tw-px-32 xsm:tw-px-5 sm:tw-px-10 md:tw-px-32 lg:tw-px-32 xl:tw-px-32">
      <div>
        <h4 className="tw-pb-7 ">Job Seekers</h4>
        <div className="tw-text-lg tw-font-normal">
          <Link
            href={"/register/job-seeker"}
            className="tw-text-white tw-no-underline"
          >
            <p className=" tw-cursor-pointer hover:tw-text-primary ">
              Register to SojoJob
            </p>
          </Link>
          <Link
            href={"/login/job-seeker"}
            className="tw-text-white tw-no-underline"
          >
            <p className=" tw-cursor-pointer hover:tw-text-primary">
              Login to SojoJob Account
            </p>
          </Link>
          <Link href={"/home"} className="tw-text-white tw-no-underline">
            <p className=" tw-cursor-pointer hover:tw-text-primary">Home</p>
          </Link>
        </div>
      </div>
      <div className="xsm:tw-mt-12  sm:tw-mt-0 ">
        <h4 className="tw-pb-7">Job Providers</h4>
        <div className="tw-text-lg tw-font-normal">
          <Link
            href={"/register/employer"}
            className="tw-text-white tw-no-underline"
          >
            <p className=" tw-cursor-pointer hover:tw-text-primary">
              Register to SojoJob
            </p>
          </Link>
          <Link
            href={"/login/employer"}
            className="tw-text-white tw-no-underline"
          >
            <p className=" tw-cursor-pointer hover:tw-text-primary">
              Login to SojoJob Account
            </p>
          </Link>
          <Link href={"/home"} className="tw-text-white tw-no-underline">
            <p className=" tw-cursor-pointer hover:tw-text-primary">Home</p>
          </Link>{" "}
        </div>
      </div>
      <div className="tw-w-full xsm:tw-mt-12  md:tw-mt-12 lg:tw-mt-0 xsm:tw-col-span-full lg:tw-col-span-1">
        <Image
          className="tw-pb-7"
          src={"/logo.png"}
          width={300}
          height={300}
          alt="logo.png"
          style={{ marginLeft: -21 }}
        />
        <p className="tw-text-lg tw-font-normal tw-leading-9">
          Sojojob enables employers just like you to register, post and fulfill
          their requirements and uses simplified shortlisting process to hire
          the best in a few clicks with technology-guided tools. Customized
          platform provided to job seekers, on the other hand, lets them
          register, search, apply and get jobs for free within a few clicks as
          well.
        </p>
        <div className="tw-flex tw-flex-row  tw-gap-4 tw-mt-6">
          <p className="tw-text-white tw-font-light tw-text-lg">
            Connect with us on:
          </p>
          <Image
            src={"/facebook.png"}
            width={20}
            height={20}
            alt="facebook.png"
            className="tw-cursor-pointer tw-object-contain"
          />
          <Image
            src={"/instagram.png"}
            width={20}
            height={20}
            alt="instagram.png"
            className="tw-cursor-pointer tw-object-contain"
          />
          <Image
            src={"/linkedin.png"}
            width={20}
            height={20}
            alt="linkedin.png"
            className="tw-cursor-pointer tw-object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;

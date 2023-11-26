"use client";

import Footer from "@/components/Footer";
import { NavBarByUser } from "@/components/NavBarType";
import ReviewCard from "@/components/ReviewCard";
import Image from "next/image";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function page() {
  const sendEmail = async () => {};

  const data = [
    { id: 1, src: "/lepfrognew.png" },
    { id: 2, src: "/images/clients/2.png" },
    { id: 3, src: "/logo-n.png" },
    { id: 4, src: "/images/clients/4.png" },
    { id: 6, src: "/images/clients/6.png" },
    { id: 7, src: "/imegroup.png" },
    { id: 8, src: "/uxcam.png" },
    { id: 9, src: "/images/clients/9.png" },
    { id: 10, src: "/kfclogo.png" },
    // { id: 10, src: "/cotiviti.png" },
  ];

  const review = [
    {
      id: 1,
      src: "/images/c1.png",
      logo: "/images/cl1.png",
      title: "Speed and Accuracy",
      person: "Ms.Sephika Shakya",
      desc: "The most important that we liked about sojojob is its speed and accuracy, you can try it yourself.",
      desg: "HR Assistant, Info Developers",
    },
    {
      id: 2,
      src: "/images/c2.png",
      logo: "/images/cl2.png",
      title: "Prompt Response",
      person: "Ms.Smriti",
      desc: "Sojojob's prompt response and follow up excites us the most and which has also helped us in hiring candidate faster",
      desg: "Senior HR, Foodmandu",
    },
    {
      id: 3,
      src: "/images/c3.png",
      logo: "/images/cl3.png",
      title: "Easy to work with ",
      person: "Ms. Sushma Dhakal",
      desc: "Overall process and team are both easy to work with",
      desg: "HR Officer, Bottle Tech",
    },
  ];

  return (
    <>
      {NavBarByUser()}
      <div className="tw-mb-20">
        <div className="tw-grid tw-grid-cols-2 tw-mx-23 tw-py-20 tw-gap-10 sm:tw-gap-2 xsm:tw-gap-2 md:tw-grid-cols-2 lg:tw-grid-cols-2  sm:tw-py-5 xsm:tw-py-5 sm:tw-grid-cols-1 xsm:tw-grid-cols-1 xsm:tw-mx-3 tw-text-justify sm:tw-mx-10 md:tw-mx-20 tw-my-14 ">
          <h1
            style={{ lineHeight: "70px" }}
            className="tw-font-medium md:tw-text-4xl tw-text-center sm:tw-text-3xl xsm:tw-text-2xl tw-mb-7 "
          >
            We help employers and employees find their
            <span className="tw-text-primary"> ideal</span> match
          </h1>
          <p className="tw-mx-20 md:tw-mx-5 lg:tw-mx-16 xl:tw-mx-16 sm:tw-mx-0 xsm:tw-mx-0 tw-text-lg">
            For the past few years, we have been successful in helping both
            employers and jobseekers find their ideal match, with over 100+
            successful stories. We offer employers the opportunity to promote
            their brand and gain optimum results.
          </p>
        </div>
        <div className="tw-mb-10">
          <Image
            src="/images/home-banner.png"
            width={300}
            height={200}
            quality={100}
            alt="home-banner"
            className="tw-w-full tw-object-contain tw-h-30 xsm:tw-h-full"
          />
        </div>
        <div>
          <h1 className=" tw-text-center tw-font-medium xsm:tw-text-2xl sm:tw-text-3xl md:tw-text-4xl">
            Some of our clients
          </h1>
          <div className="tw-flex tw-flex-row  tw-flex-wrap tw-items-center tw-justify-center  tw-mx-40 tw-mt-5 xsm:tw-mx-5 md:tw-mx-40 tw-mb-10 tw-gap-7">
            {data.map((item) => {
              return (
                <Image
                  key={item.id}
                  src={item.src}
                  width={150}
                  height={100}
                  className="tw-object-contain xsm:tw-w-16 md:tw-w-36 "
                  alt={item.id}
                />
              );
            })}
          </div>
        </div>
        <div className="tw-bg-aboutGrey">
          <div className="tw-mx-20 xsm:tw-mx-4 sm:tw-mx-10 md:tw-mx-32">
            <h1 className="xsm:tw-text-2xl sm:tw-text-3xl md:tw-text-4xl tw-text-center tw-font-medium tw-pt-14">
              What our clients say
            </h1>
            <p className="tw-py-10 tw-text-justify">
              We are more than just a job site. From the web, to mobile, to
              social media tools and apps, we service companies of all sizes to
              find the right fit using most advanced technology. Providing
              recruitment solutions to employers finding, fostering and
              preparing the right candidates in every possible ways with an
              effective tracking system and a dedicated team of customer service
              to both; the employers and the job seekers, has always been our
              primary goal.
            </p>
          </div>
          <div className="tw-mt-5 tw-grid tw-grid-cols-3 tw-gap-5 tw-pb-20 xsm:tw-grid-cols-1 xsm:tw-mx-5 sm:tw-mx-5  lg:tw-mx-20 sm:tw-grid-cols-2 md:tw-grid-cols-3">
            {review?.map((item) => {
              return <ReviewCard item={item} />;
            })}
          </div>
        </div>
        <div className="tw-mx-32 xsm:tw-mx-5 sm:tw-mx-16 md:tw-mx-32 tw-grid tw-grid-cols-2 sm:tw-grid-cols-1 xsm:tw-grid-cols-1 md:tw-grid-cols-1 950:tw-grid-cols-1 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-gap-10 tw-pt-20 ">
          <div className="">
            <h1 className="xsm:tw-text-2xl sm:tw-text-3xl md:tw-text-4xl tw-font-medium tw-mb-5">
              Connect with us
            </h1>
            <p className=" tw-pr-10 tw-leading-relaxed tw-font-normal tw-text-lg tw-text-justify">
              Sojojob is a platform that enables employers to easily and quickly
              post their job requirements, shortlist the best candidates, and
              hire them with a few clicks. Job seekers can also benefit from
              this platform, as they can register, search, apply, and get jobs
              for free in just a few clicks. With technology-guided tools and a
              simplified shortlisting process, Sojojob is the perfect solution
              for employers and job seekers alike.
            </p>
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                size="lg"
                className="tw-text-base tw-font-medium tw-h-12 shadow-sm shadow-black "
                type="email"
                placeholder="Enter Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className="tw-text-base tw-font-medium tw-h-12 shadow-sm shadow-black"
                size="lg"
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                className="tw-text-base tw-font-medium tw-h-12 shadow-sm shadow-black"
                size="lg"
                type="email"
                placeholder="Enter phone"
              />
            </Form.Group>

            <Button
              onClick={sendEmail}
              type="submit"
              className="tw-bg-primary hover:tw-bg-buttonHover tw-border-transparent px-4 py-2"
            >
              Call me Back
            </Button>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default page;

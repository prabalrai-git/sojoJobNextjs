"use client";

import ReviewCard from "@/components/ReviewCard";
import Image from "next/image";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function page() {
  const data = [
    { id: 1, src: "/images/clients/1.png" },
    { id: 2, src: "/images/clients/2.png" },
    { id: 3, src: "/images/clients/3.png" },
    { id: 4, src: "/images/clients/4.png" },
    { id: 5, src: "/images/clients/5.png" },
    { id: 6, src: "/images/clients/6.png" },
    { id: 7, src: "/images/clients/7.png" },
    { id: 8, src: "/images/clients/8.png" },
    { id: 9, src: "/images/clients/9.png" },
  ];

  const review = [
    {
      id: 1,
      src: "/images/c1.png",
      title: "Speed and Accuracy",
      person: "Ms.Sephika Shakya",
      desc: "The most important that we liked about sojojob is its speed and accuracy, you can try it yourself.",
      desg: "HR Assistant, Info Developers",
    },
    {
      id: 2,
      src: "/images/c2.png",
      title: "Prompt Response",
      person: "Ms.Smriti",
      desc: "Sojojob's prompt response and follow up excites us the most and which has also helped us in hiring candidate faster",
      desg: "Senior HR, Foodmandu",
    },
    {
      id: 3,
      src: "/images/c3.png",
      title: "Easy to work with ",
      person: "Ms. Sushma Dhakal",
      desc: "Overall process and team are both easy to work with",
      desg: "HR Officer, Bottle Tech",
    },
  ];

  return (
    <div className="">
      <div className="tw-grid tw-grid-cols-2 tw-mx-23 tw-py-20 tw-gap-10 tw-px-20">
        <h1
          style={{ lineHeight: "60px" }}
          className="tw-font-medium tw-text-4xl tw-text-center "
        >
          We help employers and employees find their{" "}
          <span className="tw-text-primary">ideal</span> match
        </h1>
        <p className="tw-mx-20 tw-text-lg">
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
          height={100}
          quality={100}
          alt="home-banner"
          className="tw-w-full tw-object-contain tw-h-30"
        />
      </div>
      <div>
        <h1
          style={{ fontSize: "40px" }}
          className=" tw-text-center tw-font-medium"
        >
          Some of our clients
        </h1>
        <div className="tw-flex tw-flex-row  tw-flex-wrap tw-items-center tw-justify-center  tw-mx-40 tw-mt-10 tw-mb-20">
          {data.map((item) => {
            return (
              <Image
                key={item.id}
                src={item.src}
                width={item.id == 5 ? 50 : 140}
                height={item.id == 5 ? 50 : 140}
                className="tw-object-contain tw-mx-5"
                alt={item.id}
              />
            );
          })}
        </div>
      </div>
      <div className="tw-bg-aboutGrey">
        <div className="tw-mx-20">
          <h1 className="tw-text-3xl tw-text-center tw-font-medium tw-pt-14">
            What our clients say
          </h1>
          <p className="tw-py-10">
            We are more than just a job site. From the web, to mobile, to social
            media tools and apps, we service companies of all sizes to find the
            right fit using most advanced technology. Providing recruitment
            solutions to employers finding, fostering and preparing the right
            candidates in every possible ways with an effective tracking system
            and a dedicated team of customer service to both; the employers and
            the job seekers, has always been our primary goal.
          </p>
        </div>
        <div className="tw-mt-5 tw-mx-20 tw-grid tw-grid-cols-3 tw-gap-5 tw-pb-20">
          {review?.map((item) => {
            return <ReviewCard item={item} />;
          })}
        </div>
      </div>
      <div className="tw-mx-32 tw-grid tw-grid-cols-2 tw-gap-32 tw-pt-20">
        <div className="">
          <h1 className="tw-text-3xl tw-font-medium tw-mb-5">
            Connect with us
          </h1>
          <p className="tw-text-base tw-pr-6" style={{ lineHeight: "55px" }}>
            Sojojob is a platform that enables employers to easily and quickly
            post their job requirements, shortlist the best candidates, and hire
            them with a few clicks. Job seekers can also benefit from this
            platform, as they can register, search, apply, and get jobs for free
            in just a few clicks. With technology-guided tools and a simplified
            shortlisting process, Sojojob is the perfect solution for employers
            and job seekers alike.
          </p>
        </div>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              size="lg"
              className="tw-text-lg"
              type="email"
              placeholder="Enter Name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className="tw-text-lg"
              size="lg"
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              className="tw-text-lg"
              size="lg"
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Button
            type="submit"
            className="tw-bg-primary hover:tw-bg-buttonHover tw-border-transparent px-4 py-3"
          >
            Call Be Back
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default page;

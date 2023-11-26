"use client";

import Footer from "@/components/Footer";
import { NavBarByUser } from "@/components/NavBarType";
import ReviewCard from "@/components/ReviewCard";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import emailjs from "@emailjs/browser";
import { review, someOfOurClients } from "@/staticData";
import { message } from "antd";

function page() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [disabled, setDisabled] = useState(false);

  const formRef = useRef(null);

  console.log(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,

    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    "hi what is up"
  );

  const sendEmail = async (e) => {
    e.preventDefault();
    setDisabled(true);
    if (!name || !email || !phone) {
      setDisabled(false);
      return message.info("Please enter value in all the fields.");
    }

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "Sojo Job",
      message: `Please, call be back. \n Name: ${name} \n Email:${email} \n Phone:+977 ${phone}`,
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          setName("");
          setEmail("");
          setPhone("");
          setDisabled(false);

          message.success("Email Sent! We will contact you shortly.");
        },
        (error) => {
          console.log(error.text);
          setDisabled(false);
          message.error(error.text);
        }
      );
  };

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
            {someOfOurClients.map((item) => {
              return (
                <Image
                  key={item.id}
                  src={item.src}
                  width={150}
                  height={100}
                  className="tw-object-fill xsm:tw-w-16 md:tw-w-36 "
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
          <Form ref={formRef}>
            <Form.Group className="mb-3" controlId="formBasicEmail1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                className="tw-text-base tw-font-medium tw-h-12 shadow-sm shadow-black "
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail2">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className="tw-text-base tw-font-medium tw-h-12 shadow-sm shadow-black"
                size="lg"
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail3">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                className="tw-text-base tw-font-medium tw-h-12 shadow-sm shadow-black"
                size="lg"
                type="number"
                placeholder="Enter phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </Form.Group>

            <Button
              disabled={disabled}
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

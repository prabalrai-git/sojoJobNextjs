"use client";

import Footer from "@/components/Footer";
import { NavBarByUser } from "@/components/NavBarType";
import ReviewCard from "@/components/ReviewCard";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import emailjs from "@emailjs/browser";
import { review, review2, someOfOurClients, trainings } from "@/staticData";
import { message } from "antd";
import TrainingsCard from "@/components/TrainingsCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function page() {
  const [name, setName] = useState();
  const [reason, setReason] = useState();
  const [phone, setPhone] = useState();
  const [disabled, setDisabled] = useState(false);

  const formRef = useRef(null);

  const sendEmail = async (e) => {
    e.preventDefault();

    setDisabled(true);

    if (!name || !reason || !phone) {
      setDisabled(false);
      const missingFields = [];

      if (!name) {
        missingFields.push("name");
      }

      if (!reason) {
        missingFields.push("reason");
      }

      if (!phone) { 
        missingFields.push("phone number");
      }
      let missingFieldsMessage;

      if (missingFields.length === 1) {
        missingFieldsMessage = `Please enter the ${missingFields[0]}.`;
      } else if (missingFields.length > 1) {
        const lastField = missingFields.pop();
        missingFieldsMessage = `Please enter ${missingFields.join(
          ", "
        )} and ${lastField}.`;
      }

      return message.info(missingFieldsMessage);
    }

    const templateParams = {
      from_name: name,
      from_email: "hello@sojojob.com",
      to_name: "Sojo Job",
      message: `Please, call be back. \n Name: ${name} \n Reason:${reason} \n Phone:+977 ${phone}`,
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
          setReason("");
          setPhone("");
          setDisabled(false);

          message.success("Email Received! We will contact you shortly.");
        },
        (error) => {
          console.log(error.text);
          setDisabled(false);
          message.error(error.text);
        }
      );
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
      slidesToSlide: 2,
    },
    bigDesktop: {
      breakpoint: { max: 3000, min: 2000 },
      items: 3,
      slidesToSlide: 2,
    },
    desktop: {
      breakpoint: { max: 2000, min: 1324 },
      items: 3,
      slidesToSlide: 2,
    },
    smallDesktop: {
      breakpoint: { max: 1324, min: 1024 },
      items: 3,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 864 },
      items: 2,
      slidesToSlide: 2,
    },
    smallTablet: {
      breakpoint: { max: 864, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      {NavBarByUser()}
      <div className="tw-mb-20">
        <div className="tw-grid tw-grid-cols-2 tw-mx-23 tw-py-20 tw-gap-10 sm:tw-gap-2 xsm:tw-gap-2 md:tw-grid-cols-2 lg:tw-grid-cols-2  sm:tw-py-5 xsm:tw-py-5 sm:tw-grid-cols-1 xsm:tw-grid-cols-1 xsm:tw-mx-3 tw-text-justify sm:tw-mx-10 md:tw-mx-20 tw-my-14 ">
          <h1
            style={{ lineHeight: "70px" }}
            className="tw-font-medium md:tw-text-3xl tw-text-center sm:tw-text-3xl xsm:tw-text-2xl tw-mb-7 "
          >
            <span className="tw-text-primary">Connecting</span> employers,
            employees, and <span className="tw-text-primary">training</span>
            <br />
            them for success.
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
            src="/hero.jpeg"
            width={300}
            height={300}
            quality={100}
            priority
            layout="responsive"
            alt="home-banner"
            className="tw-w-full tw-object-contain tw-h-full xsm:tw-h-5/6"
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
        {/* <div className="tw-bg-aboutGrey">
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
              return <TrainingsCard item={item} />;
            })}
          </div>
        </div> */}
        <div className="tw-bg-aboutGrey">
          <div className="tw-mx-20 xsm:tw-mx-4 sm:tw-mx-10 md:tw-mx-32">
            <h1 className="xsm:tw-text-2xl sm:tw-text-3xl md:tw-text-4xl tw-text-center tw-font-medium tw-pt-14">
              Our Courses
            </h1>
            <p className="tw-py-10 tw-text-justify">
              We're not just a job site – we're here for you! Whether it's on
              the web, your phone, or social media, we use fancy tech to help
              all kinds of companies find the right people. Our main goal is to
              make sure employers and job seekers are happy. We don't just find
              jobs – we also offer awesome training to help you succeed
            </p>
          </div>
          {/* <div className="tw-mt-5 tw-grid tw-grid-cols-3 tw-gap-10 tw-pb-20 xsm:tw-grid-cols-1 xsm:tw-mx-5 sm:tw-mx-5  lg:tw-mx-20 sm:tw-grid-cols-2 md:tw-grid-cols-3">
            {trainings?.map((item) => {
              return <TrainingsCard item={item} />;
            })}
          </div> */}
          <div className="tw-mt-5 tw-pb-20  xsm:tw-mx-0 sm:tw-mx-5  lg:tw-mx-20">
            <Carousel
              renderButtonGroupOutside={false}
              autoPlay={true}
              swipeable={true}
              draggable={true}
              showDots={false}
              arrows
              infinite={true}
              // partialVisible={false}
              // removeArrowOnDeviceType={[
              //   "tablet",
              //   "mobile",
              //   "desktop",
              //   "smallDesktop",
              //   "bigDesktop",
              //   "smallTablet",
              // ]}
              responsive={responsive}
            >
              {trainings?.map((item) => {
                return <TrainingsCard item={item} />;
              })}
            </Carousel>
            {/* {trainings?.map((item) => {
              return <TrainingsCard item={item} />;
            })} */}
          </div>{" "}
        </div>
        {/* <div
          className="tw-bg-aboutGrey"
          style={{
            backgroundImage: "url('/mini.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="tw-mx-20 xsm:tw-mx-4 sm:tw-mx-10 md:tw-mx-32">
            <h1 className="xsm:tw-text-2xl sm:tw-text-3xl md:tw-text-4xl tw-text-center tw-font-medium tw-pt-14 tw-text-white">
              Our Training Courses
            </h1>
            <p className="tw-py-10 tw-text-justify tw-text-white">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <div className="tw-mt-5 tw-grid tw-grid-cols-3 tw-gap-5 tw-pb-20 xsm:tw-grid-cols-1 xsm:tw-mx-5 sm:tw-mx-5  lg:tw-mx-20 sm:tw-grid-cols-2 md:tw-grid-cols-3">
            {review2?.map((item) => {
              return <ReviewCard item={item} />;
            })}
          </div>
        </div> */}
        <div className="tw-mx-32 xsm:tw-mx-5 sm:tw-mx-16 md:tw-mx-32 tw-grid tw-grid-cols-2 sm:tw-grid-cols-1 xsm:tw-grid-cols-1 md:tw-grid-cols-1 950:tw-grid-cols-1 lg:tw-grid-cols-2 xl:tw-grid-cols-2 tw-gap-10 tw-pt-20 ">
          <div className="">
            <h1 className="xsm:tw-text-2xl sm:tw-text-3xl md:tw-text-4xl tw-font-medium tw-mb-5">
              Connect with us
            </h1>
            <p className=" tw-pr-10 tw-leading-relaxed tw-font-normal tw-text-lg tw-text-justify">
              Explore job opportunities effortlessly with Sojojob ! Employers,
              streamline your hiring process by posting jobs and selecting top
              candidates with just a few clicks. Job seekers, register, search,
              and apply for free, and don't miss our professional training
              services to boost your skills. To get started, please provide your
              name, email, and contact number in the form . We'll give you a
              call back to guide you through the next steps.
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
              <Form.Label>What can we help you with today?</Form.Label>
              {/* <Form.Control
                className="tw-text-base tw-font-medium tw-h-12 shadow-sm shadow-black"
                size="lg"
                type="email"
                placeholder="Enter email"
                
              /> */}
              <Form.Select
                value={reason}
                className="tw-text-base tw-font-medium tw-h-12 shadow-sm shadow-black"
                onChange={(e) => setReason(e.target.value)}
                aria-label="Default select example"
              >
                <option>Options</option>
                <option value="I am looking for job.">
                  I am looking for job.
                </option>
                <option value="I am looking to post jobs.">
                  I am looking to post jobs.
                </option>
                <option value="I am looking for training courses.">
                  I am looking for training courses.
                </option>
                <option value="Others">Others</option>
              </Form.Select>
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

"use client";

import Image from "next/image";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { job } from "@/dummyData";
import JobCard from "@/components/JobCard";
import EmployersCard from "@/components/EmployersCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import TrendingTags from "@/components/TrendingTags";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import NavBar1 from "@/components/NavBar";

export default function Home() {
  const data = [1, 2, 3, 4, 5, 5, 5, 5, 6, 6, 6];
  const data1 = [1, 1, 1, 1, 1];

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const tags = [
    { id: 0, title: "Architecture" },
    { id: 1, title: "Construction" },
    { id: 2, title: "logistics" },
    { id: 3, title: "Commercial" },
    { id: 4, title: "Architecture" },
  ];

  return (
    <>
      <NavBar />
      <main
        className="tw-px-10  sm:tw-px-4 xsm:tw-px-4 md:tw-px-5 lg:tw-px-28 xl:tw-px-28"
        style={{
          minHeight: `calc(100vh- 108px - 741px)`,
          paddingBottom: 100,
        }}
      >
        <h1 className="tw-text-center tw-mt-28 tw-text-5xl lg:tw-text-4xl md:tw-text-4xl sm:tw-text-4xl xl:tw-text-5xl xsm:tw-text-4xl tw-font-medium">
          Hire an Expert or Be <span className="tw-text-primary">Hired</span> as
          One
        </h1>
        <content className="tw-flex tw-flex-col tw-items-center sm:tw-w-full ">
          <div className="tw-flex tw-mt-14 tw-mb-7 tw-relative lg:tw-w-6/12 tw-w-full  ">
            {/* <Input
          className="tw-bg-textInput tw-w-96 tw-h-15"
          size="large"
          placeholder="Search jobs"
          prefix={<SearchOutlined />}
        /> */}
            <input
              type="text"
              id="fname"
              name="fname"
              style={{ height: "50px" }}
              placeholder="Search Jobs"
              className="tw-bg-textInput tw-w-full tw-rounded-lg tw-pl-10"
            ></input>
            <Image
              src={"/search.png"}
              width={20}
              height={20}
              alt="search.png"
              className="tw-object-contain tw-absolute tw-top-4 tw-left-3 "
            />
            <button className="tw-bg-primary tw-py-2 tw-px-5 tw-ml-4 tw-rounded-lg tw-text-white tw-font-medium hover:tw-bg-buttonHover ">
              <Link href="/search" className="tw-text-white tw-no-underline">
                Search
              </Link>
            </button>
          </div>
          <div className=" tw-font-medium tw-text-left lg:tw-w-6/12 tw-w-full  tw-flex tw-flex-row ">
            <span className="lg:tw-w-3/12 tw-w-2/12">Trending tags:</span>
            <span className="tw-flex tw-flex-row tw-overflow-x-hidden ">
              {tags.map((item) => {
                return <TrendingTags key={item.id} item={item} />;
              })}
            </span>
          </div>
        </content>

        <div className="tw-mt-20 ">
          <div className="tw-flex tw-flex-row tw-items-stretch">
            <Image
              className="tw-self-center"
              src={"/fire.png"}
              height={30}
              width={30}
              alt="fire.png"
            />
            <h2 className="tw-self-center tw-ml-3 tw-font-medium tw-text-lg">
              Elite Jobs
            </h2>
          </div>
          <div className="tw-grid tw-grid-cols-3 tw-gap-4 tw-mt-10 md:tw-grid-cols-1 lg:tw-grid-cols-3 sm:tw-grid-cols-1 xsm:tw-grid-cols-1 800:tw-grid-cols-2 ">
            {data.map((item) => {
              return (
                <Link href="/jobs" className="tw-text-black tw-no-underline">
                  <JobCard key={item} job={job} />
                </Link>
              );
            })}
          </div>
        </div>
        {/* employers caroulsel starts */}
        <div className="tw-mt-20">
          <div className="tw-flex tw-flex-row ">
            <Image
              src={"/employment-man.png"}
              width={25}
              height={25}
              alt="recruiters"
              className="tw-object-contain tw-mr-3 tw-self-center"
            />
            <p className="tw-font-semibold tw-text-black tw-text-lg tw-self-center">
              Top Employers Currently
            </p>
          </div>
          <div className="tw-mt-10 tw-grid tw-grid-cols-5 tw-gap-6 tw-mx-5">
            {data1.map((item) => {
              return <EmployersCard />;
            })}
          </div>
          {/* <Carousel
          swipeable={true}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          <div>
            <EmployersCard />
          </div>
          <div>
            <EmployersCard />
          </div>
          <div>
            <EmployersCard />
          </div>
          <div>
            <EmployersCard />
          </div>
          <div>
            <EmployersCard />
          </div>
        </Carousel> */}
        </div>
        {/* end of employers carousel */}
        {/* start of standard jobs */}
        <div className="tw-mt-20">
          <div className="tw-flex tw-flex-row ">
            <Image
              src={"/report.png"}
              width={25}
              height={25}
              alt="recruiters"
              className="tw-object-contain tw-mr-3 tw-self-center"
            />
            <p className="tw-font-semibold tw-text-black tw-text-lg tw-self-center">
              Standard Jobs
            </p>
          </div>
          <div className="tw-grid tw-grid-cols-3 tw-gap-4 tw-mt-10 md:tw-grid-cols-1 lg:tw-grid-cols-3 sm:tw-grid-cols-1 xsm:tw-grid-cols-1 800:tw-grid-cols-2 ">
            {data.map((item) => {
              return <JobCard key={item} job={job} />;
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

"use client";

import Image from "next/image";

import JobCard from "@/components/JobCard";
import EmployersCard from "@/components/EmployersCard";
import Link from "next/link";
import Footer from "@/components/Footer";
import Carousel from "react-multi-carousel";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Axios from "@/api/server";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import "@/styles/individualStyles.css";
import TrendingTagsComponent from "@/components/TrendingTagsComponent";
import { NavBarByUser } from "@/components/NavBarType";
export default function Home() {
  const [eliteJobs, setEliteJobs] = useState(null);
  const [standardJobs, setStandardJobs] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  useEffect(() => {
    getEliteJobs();
    getStandardJobs();
  }, []);

  const getEliteJobs = async (req, res) => {
    try {
      const res = await Axios.get("/public/getEliteJobs?limit=16");
      setEliteJobs(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStandardJobs = async (req, res) => {
    try {
      const res = await Axios.get("/public/getStandardJobs?limit=16");
      setStandardJobs(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
      slidesToSlide: 2,
    },
    bigDesktop: {
      breakpoint: { max: 3000, min: 2000 },
      items: 5,
      slidesToSlide: 2,
    },
    desktop: {
      breakpoint: { max: 2000, min: 1324 },
      items: 5,
      slidesToSlide: 2,
    },
    smallDesktop: {
      breakpoint: { max: 1324, min: 1024 },
      items: 4,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 864 },
      items: 3,
      slidesToSlide: 2,
    },
    smallTablet: {
      breakpoint: { max: 864, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const employers = [
    {
      id: 1,
      title: "Leapfrog",
      address: "Charkhal",
      themeColor: "#27AF61",
      logo: "/leapfroglogo.png",
    },
    {
      id: 2,
      title: "Deerhold Ltd",
      address: "Kupondole",
      themeColor: "#e96b30",
      logo: "/dearhold.png",
    },
    {
      id: 3,
      title: "COTIVITI",
      address: "Bhaktapur",
      themeColor: "#30006e",
      logo: "/cotiviti.png",
    },
    {
      id: 4,
      title: "UXcam",
      address: "Lalitpur",
      themeColor: "#5e97ff",
      logo: "/ux.png",
    },
    {
      id: 5,
      title: "Khalti",
      address: "Baneshwor",
      themeColor: "#5c2d91",
      logo: "/khalti.png",
    },
  ];

  const searchJobs = () => {
    router.push(`/search?term=${searchTerm}`);
  };

  // const NavBarByUser = () => {
  //   if (sessionStorage.getItem("userType") === "employer") {
  //     return <RecruiterNavBar />;
  //   } else if (sessionStorage.getItem("userType") === "job-seeker") {
  //     return <JobSeekerNavBar />;
  //   } else {
  //     return <NavBar />;
  //   }
  // };

  return (
    <>
      <ToastContainer />
      {NavBarByUser()}

      <main
        className="tw-px-5  sm:tw-px-4 xsm:tw-px-4 md:tw-px-5 lg:tw-px-14 xl:tw-px-14"
        style={{
          minHeight: `calc(100vh- 108px - 741px)`,
          paddingBottom: 100,
        }}
      >
        <h1 className="tw-text-center tw-mt-12 tw-text-5xl lg:tw-text-4xl md:tw-text-4xl sm:tw-text-3xl xsm:tw-text-2xl xl:tw-text-5xl tw-font-medium ">
          Hire an Expert or Be <span className="tw-text-primary">Hired</span> as
          One
        </h1>
        <content className="tw-flex tw-flex-col tw-items-center sm:tw-w-full ">
          <div className="tw-flex xsm:tw-flex-col sm:tw-flex-row tw-mt-14 tw-mb-7 tw-relative lg:tw-w-6/12 tw-w-full tw-gap-4  ">
            <Input
              placeholder="Search Jobs"
              onChange={(e) => setSearchTerm(e.target.value)}
              onPressEnter={searchJobs}
              className="tw-h-12 tw-bg-searchGrey "
              size="large"
              prefix={
                <SearchOutlined style={{ fontSize: 20, color: "grey" }} />
              }
            />

            <Link
              href={{
                pathname: "/search",
                query: { term: searchTerm }, // the data
              }}
              className="tw-bg-primary tw-rounded-lg tw-text-white tw-font-medium hover:tw-bg-buttonHover tw-flex tw-no-underline tw-items-center"
            >
              <button className="tw-bg-primary tw-px-5 tw-mx-auto tw-rounded-lg tw-font-medium hover:tw-bg-buttonHover tw-flex tw-no-underline tw-text-center tw-py-2 ">
                Search
              </button>
            </Link>
          </div>

          <TrendingTagsComponent />
        </content>

        <div className="tw-mt-20 ">
          <div className="tw-flex tw-flex-row tw-justify-between">
            <div className="tw-flex tw-flex-row tw-items-stretch">
              <Image
                className="tw-self-center"
                src={"/fire.png"}
                height={30}
                width={30}
                alt="fire.png"
              />
              <h2 className="tw-self-center tw-m-0 tw-ml-3 tw-font-medium tw-text-lg">
                Elite Jobs
              </h2>
            </div>
            <Link
              className="tw-font-semibold tw-text-primary tw-no-underline"
              href={{ pathname: "/jobs/list", query: { type: "elite" } }}
            >
              <p>SEE ALL</p>
            </Link>{" "}
          </div>
          <div className="tw-grid tw-grid-cols-3 tw-gap-4 tw-mt-10 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4 950:twpgrid-cols-3 sm:tw-grid-cols-2 xsm:tw-grid-cols-1 800:tw-grid-cols-2 ">
            {eliteJobs?.map((item) => {
              return (
                <Link
                  href={{
                    pathname: "/jobs",
                    query: { id: item.id }, // the data
                  }}
                  className="tw-text-black tw-no-underline"
                >
                  <JobCard key={item} job={item} />
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
            <p className="tw-font-semibold tw-m-0 tw-text-black tw-text-lg tw-self-center">
              Top Employers Currently
            </p>
          </div>
          <div className="tw-mt-10 ">
            {/* {data1.map((item) => {
              return <EmployersCard />;
            })} */}
            <Carousel
              autoPlay={true}
              swipeable={true}
              draggable={true}
              showDots={false}
              infinite={true}
              partialVisible={false}
              removeArrowOnDeviceType={[
                "tablet",
                "mobile",
                "desktop",
                "smallDesktop",
                "bigDesktop",
                "smallTablet",
              ]}
              responsive={responsive}
            >
              {employers.map((item) => {
                return <EmployersCard key={item.id} item={item} />;
              })}
            </Carousel>
          </div>
          {/*  */}
          {/*  */}
        </div>
        {/* end of employers carousel */}
        {/* start of standard jobs */}
        <div className="tw-mt-20">
          <div className="tw-flex tw-flex-row tw-justify-between">
            <div className="tw-flex tw-flex-row ">
              <Image
                src={"/report.png"}
                width={25}
                height={25}
                alt="recruiters"
                className="tw-object-contain tw-mr-3 tw-self-center"
              />
              <p className="tw-font-semibold tw-m-0 tw-text-black tw-text-lg tw-self-center">
                Standard Jobs
              </p>
            </div>
            <Link
              className="tw-font-semibold tw-text-primary tw-no-underline"
              href={{ pathname: "/jobs/list", query: { type: "standard" } }}
            >
              <p>SEE ALL</p>
            </Link>
          </div>
          <div className="tw-grid tw-grid-cols-3 tw-gap-4 tw-mt-10 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4 950:twpgrid-cols-3 sm:tw-grid-cols-2 xsm:tw-grid-cols-1 800:tw-grid-cols-2 ">
            {standardJobs?.map((item) => {
              return (
                <Link
                  href={{
                    pathname: "/jobs",
                    query: { id: item.id }, // the data
                  }}
                  className="tw-text-black tw-no-underline"
                >
                  <JobCard key={item} job={item} />
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

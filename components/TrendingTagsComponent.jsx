"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import React, { useEffect, useState } from "react";
import TrendingTags from "./TrendingTags";
import Axios from "@/api/server";

function TrendingTagsComponent() {
  const [categories, setCategories] = useState();

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    try {
      const res = await Axios.get("/public/getTrendingTags");

      setCategories(res.data.trendingTags);
    } catch (error) {
      console.log(error);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1380,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          // autoplay: true,
          // speed: 2000,
          // autoplaySpeed: 2000,
          // cssEase: "linear",
        },
      },
    ],
  };
  return (
    <div className=" tw-font-medium tw-text-left xsm:tw-w-full sm:tw-w-full lg:tw-w-6/12 xl:tw-w-6/12 ">
      {/* <span className="tw-flex tw-flex-row tw-overflow-x-hidden ">
      <span className="tw-w-32">Trending tags:</span>
      {tags.map((item) => {
        return <TrendingTags key={item.id} item={item} />;
      })}
    </span> */}
      <div className="tw-grid tw-grid-cols-12 tw-gap-1">
        <p
          style={{ fontSize: "15px" }}
          className=" xsm:tw-hidden md:tw-block tw-col-span-2 tw-text-gray-400 tw-font-normal "
        >
          Trending Tags:
        </p>
        <div className=" xsm:tw-col-span-full md:tw-col-span-10">
          <Slider {...settings}>
            {categories?.map((item) => {
              return <TrendingTags key={item.id} item={item} />;
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default TrendingTagsComponent;

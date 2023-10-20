"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import React, { useEffect, useState } from "react";
import Image from "next/image";

function OurPartnersCarousel() {
  const data = [
    { id: 1, src: "/images/clients/1.png" },
    { id: 2, src: "/images/clients/2.png" },
    { id: 3, src: "/images/clients/3.png" },
    { id: 4, src: "/images/clients/4.png" },
    { id: 6, src: "/images/clients/6.png" },
    { id: 7, src: "/images/clients/7.png" },
    { id: 9, src: "/images/clients/9.png" },
    { id: 8, src: "/images/clients/8.png" },
    { id: 10, src: "/cotiviti.png" },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
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
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
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
          slidesToScroll: 1,
          initialSlide: 1,
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
    <div className=" tw-font-medium tw-text-left xsm:tw-w-full  ">
      {/* <span className="tw-flex tw-flex-row tw-overflow-x-hidden ">
      <span className="tw-w-32">Trending tags:</span>
      {tags.map((item) => {
        return <TrendingTags key={item.id} item={item} />;
      })}
    </span> */}
      <div className="tw-grid tw-grid-cols-12 tw-gap-5">
        <div className=" xsm:tw-col-span-full tw-mx-48 tw-items-center tw-justify-center">
          <Slider {...settings}>
            {data.map((item) => {
              return (
                <img
                  key={item.id}
                  src={item.src}
                  className="tw-object-contain tw-self-center tw-h-auto "
                  alt={item.id}
                />
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default OurPartnersCarousel;

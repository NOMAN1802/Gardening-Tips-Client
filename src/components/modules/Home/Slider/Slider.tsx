"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const slides = [
  {
    id: 1,
    title: "Indoor Gardening",
    label:"Indoor",
    description: "Small indoor spaces with ample sunlight.",
    img: "https://images.pexels.com/photos/5561354/pexels-photo-5561354.jpeg?auto=compress&cs=tinysrgb&w=800",
    bg: "bg-gradient-to-r from-red-200 to-default-50",
  },
  {
    id: 2,
    title: "Landscaping Gardening",
    label:"Landscaping",
    description: "Dry regions with water conservation goals",
    img: "https://images.pexels.com/photos/1865735/pexels-photo-1865735.jpeg?auto=compress&cs=tinysrgb&w=800",
    bg: "bg-gradient-to-r from-red-200 to-default-50",
  },
  {
    id: 3,
    title: "Vegetables Gardening",
    label:"Vegetables",
    description: "Gardeners with poor soil  limited space.",
    img: "https://images.pexels.com/photos/5503112/pexels-photo-5503112.jpeg?auto=compress&cs=tinysrgb&w=800",
    bg: "bg-gradient-to-r from-red-200 to-default-50",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || undefined;

  const handleCategoryChange = (label: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    updatedSearchParams.set("category", label);

    router.push(`/post-category?${updatedSearchParams.toString()}`);
  };

  return (
    <div className="h-[70vh] overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`}
          >
            {/* TEXT CONTAINER */}
            <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">
                {slide.description}
              </h2>
              <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
                {slide.title}
              </h1>

              
              
                <button onClick={() => handleCategoryChange(slide.label)} className="rounded-md bg-black text-white py-3 px-4 ">
                  Explore Now
                </button>
             
            </div>
            {/* IMAGE CONTAINER */}
            <div className="h-1/2 xl:w-1/2 xl:h-full relative">
              <Image
                fill
                alt=""
                className="object-cover"
                sizes="100%"
                src={slide.img}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute m-auto left-1/2 bottom-32 flex gap-4">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;

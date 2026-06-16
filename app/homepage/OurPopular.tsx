"use client";

import { useRef } from "react";
import BackgroundVideo from "next-video/background-video";
import { motion, useInView } from "framer-motion";
import { sales } from "../components/Export";
import Image from "next/image";
import pef from "../../public/body.png";
import GlowSlider from "../components/SliderSec";
import ImageCarousel from "../components/ImageCarousel";

const OurPopular = () => {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <div className="px-4 lg:px-20 h-auto bg-[#fafaf8]">
      <div className="flex flex-col gap-4 w-85 lg:w-120">
        <h1 className="text-5xl text-[#231f20]">Our Popular Collection</h1>
        <p
          className="leading-relaxed text-[#6b6b6b]"
          style={{ fontSize: "1.125rem", lineHeight: "1.8" }}
        >
          Explore our diverse range of perfumes, each thoughtfully designed to
          cater to your needs and style preferences.
        </p>
      </div>
      <div>
        <div className="mt-16 lg:mt-30 lg:flex ">
          <motion.div
            className="h-158 w-full lg:w-90 overflow-hidden rounded-sm"
            initial={{ opacity: 0, marginLeft: -100 }}
            animate={isInView ? { opacity: 1, marginLeft: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            ref={ref}
          >
            <BackgroundVideo
              src="https://res.cloudinary.com/dbc4muo4t/video/upload/v1773791519/0317_3_sqxh4x.mp4"
              autoPlay
              muted
              playsInline
              height={630}
              className="h-full w-full object-cover"
            />
            <motion.button
              className="bg-[#fafaf8] px-6 py-2 -mt-34 ml-2 absolute rounded-sm"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut", delay: 1 }}
              ref={ref}
            >
              Discover More
            </motion.button>
          </motion.div>
          <div className="px-4 lg:px-0 lg:pl-20 pt-10">
            <div className="overflow-hidden overflow-x-auto max-sm:-ml-4 max-sm:w-100 max-sm:pb-4">
              <div className="flex gap-4 max-sm:w-120">
                {sales.map((item) => (
                  <button
                    key={item?.title}
                    onClick={() => item.title}
                    className={`bg-[#ebebe9] px-4 py-4 md:px-6 md:py-2 lg:py-4 rounded-sm hover:bg-[#231f20] hover:text-white cursor-pointer duration-300`}
                  >
                    {item?.title}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-5 mt-24">
              <div className="w-50 h-80 hover:scale-110 duration-300">
                <div className="rounded-sm bg-green-300 h-full overflow-hidden">
                  <Image src={pef} alt="" className="h-full" />
                </div>
                <div className="absolute -mt-80 pt-2 text-[#231f20] p-2">
                  <h1 className="text-xl">Matcha 101</h1>
                  <p>Pefume</p>
                </div>
              </div>
              <div className="w-50 h-80 hover:scale-110 duration-300">
                <div className="rounded-sm bg-green-300 h-full overflow-hidden">
                  <Image src={pef} alt="" className="h-full" />
                </div>
                <div className="absolute -mt-80 pt-2 text-[#231f20] p-2">
                  <h1 className="text-xl">Matcha 101</h1>
                  <p>Pefume</p>
                </div>
              </div>
              <div className="w-50 h-80 hover:scale-110 duration-300">
                <div className="rounded-sm bg-green-300 h-full overflow-hidden">
                  <Image src={pef} alt="" className="h-full" />
                </div>
                <div className="absolute -mt-80 pt-2 text-[#231f20] p-2">
                  <h1 className="text-xl">Matcha 101</h1>
                  <p>Pefume</p>
                </div>
              </div>
            </div>
          </div>
          <div className="inset-0 bg-black/30" />
        </div>
        <ImageCarousel />
      </div>
      
    </div>
  );
};

export default OurPopular;

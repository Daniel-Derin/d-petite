"use client";

import React, { useRef } from "react";
import Image from "next/image";
import pink from "../../public/pink.jpg";
import cream from "../../public/cream.png";
import cream2 from "../../public/cream2.png";
import cream4 from "../../public/cream4.png";
import { motion, AnimatePresence, useInView } from "framer-motion";

import { PiFlowerLotusThin } from "react-icons/pi";

const YourDaily = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="lg:px-20 px-6 pt-30">
      <div className="w-full text-center justify-center lg:px-20">
        <div className="">
          <h1 className="lg:text-6xl text-3xl text-[#292727e0]">
            Your Daily Skincare Esssentials{" "}
            <span className="text-[#29272786]">Gentle Care.</span>Visible{" "}
            <span className="text-[#29272786]">Results</span>
          </h1>

          <h1 className="lg:px-40 pt-4 lg:pt-10 text-[#29272786]">
            Reveal refreshed glowing skin with our top purifying and hydrating
            treatments,designed for daily beauty.
          </h1>
        </div>
      </div>
      <p className="pt-10 text-2xl text-[#292727e0]">Featured Products</p>
      <motion.div
        className="grid lg:grid-cols-3 mt-6 w-full gap-6"
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.18,
              delayChildren: 0.1,
            },
          },
        }}
      >
        <motion.div
          className="group relative h-90 hover:shadow-lg rounded-lg  hover:scale-110 duration-300 overflow-hidden"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5 },
            },
          }}
        >
          <Image src={pink} alt="" className="w-full h-100" />
          <div className="w-full p-4 h-full -mt-99">
            <Image
              src={cream}
              alt=""
              className="w-30 h-30 object-cover rounded-lg"
            />
            <h1 className="pt-4 text-[#292727e0] text-2xl ">
              Undereye <br /> Corrector
            </h1>
            <p className="w-70 lg:w-60 pt-2 text-[#29272786]">
              Brightens darks circlesand smooths fine lines for a fresh look
            </p>
            <button className="mt-4 px-6 py-3 rounded-full bg-black text-white hover:text-black hover:bg-white cursor-pointer duration-300">
              Shop Now
            </button>
          </div>
        </motion.div>
        <motion.div
          className="group relative h-90 hover:shadow-lg rounded-lg  hover:scale-110 duration-300 overflow-hidden bg-purple-100"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5 },
            },
          }}
        >
          <div className="w-full p-4 h-full">
            <Image
              src={cream2}
              alt=""
              className="w-30 h-30 object-cover rounded-lg"
            />
            <h1 className="pt-4 text-[#292727e0] text-2xl ">
              Exfoliation <br /> Gel
            </h1>
            <p className="w-60 pt-2 text-[#29272786]">
              Gently removes dead skin, fades spots, and smooths texture
            </p>
            <button className="mt-4 px-6 py-3 rounded-full bg-black text-white hover:text-black hover:bg-white cursor-pointer duration-300">
              Shop Now
            </button>
          </div>
        </motion.div>
        <motion.div
          className="group relative h-90 hover:shadow-lg rounded-lg  hover:scale-110 duration-300 overflow-hidden bg-blue-200"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5 },
            },
          }}
        >
          <div className="w-full h-full ">
            <div className="w-full h-full relative mb-0">
              <Image src={cream4} alt="" className="w-full relative lg:mt-5" />
            </div>
            <div className="w-90 h-30 -mt-90 p-4 object-cover rounded-lg relative z-10">
              <button className="flex pl-4 pr-2 py-1 bg-white rounded-full pt-2">
                Skin Health{" "}
                <div className="w-8 h-8 bg-blue-100 rounded-full ml-2 -mt-1">
                  <PiFlowerLotusThin className="mx-auto text-xl mt-1.5" />
                </div>
              </button>
            </div>
            <h1 className="pt-34 lg:pt-30 pl-4 text-white text-3xl relative z-10">
              Confidence starts with skincare
            </h1>
          </div>
        </motion.div>
        <p className=" text-[#29272786]">
          Result may vary. Consistent use helps improve skin texture, hydration
          and tone
        </p>
      </motion.div>
    </div>
  );
};

export default YourDaily;

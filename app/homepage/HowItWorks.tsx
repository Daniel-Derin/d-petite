"use client";

import React, { useRef } from "react";
import Image from "next/image";
import pink from "../../public/pink.jpg";
import cream from "../../public/cream.png";
import cream2 from "../../public/cream2.png";
import cream4 from "../../public/cream4.png";
import { motion, AnimatePresence, useInView } from "framer-motion";

import { PiFlowerLotusThin } from "react-icons/pi";

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="lg:px-20 px-6 pt-30">
      <div className="w-full text-center justify-center lg:px-20">
        <div className="">
          <h1 className="lg:text-6xl text-3xl text-[#292727e0]">
            How it Works: Just 3 <br />
            <span className="text-[#29272786]">Simple Steps</span>
          </h1>
        </div>
      </div>
      <motion.div
        className="grid lg:grid-cols-3 mt-16 w-full gap-6"
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
          className="group relative md:h-110 hover:shadow-lg rounded-lg text-center justify-center overflow-hidden bg-[#e8e8e8]"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5 },
            },
          }}
        >
          <div className="w-full p-10 lg:p-16 h-full">
            <Image
              src={cream}
              alt=""
              className="w-30 h-30 mx-auto object-cover rounded-full"
            />
            <h1 className="pt-10 text-[#292727e0] text-2xl ">
              Choose Your Product
            </h1>
            <p className="pt-2 text-[#29272786]">
              Browse our collection and pick what fits your skin, hair, or wellness needs.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="group relative md:h-110 hover:shadow-lg rounded-lg text-center justify-center overflow-hidden bg-[#e8e8e8]"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5 },
            },
          }}
        >
          <div className="w-full p-10 lg:p-16 h-full">
            <Image
              src={cream2}
              alt=""
              className="w-30 h-30 object-cover rounded-full mx-auto"
            />
            <h1 className="pt-10 text-[#292727e0] text-2xl ">
              Place Your <br /> Order
            </h1>
            <p className="pt-2 text-[#29272786]">
              Fast and secure checkout, no subscription or hidden fees.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="group relative md:h-110 hover:shadow-lg rounded-lg text-center justify-center overflow-hidden bg-[#e8e8e8]"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5 },
            },
          }}
        >
          <div className="w-full h-full p-10 lg:p-16">
            <div className="w-full h-full">
              <Image
                src={cream4}
                alt=""
                className="w-30 h-30 object-cover rounded-full mx-auto"
              />
              <h1 className="pt-10 text-[#292727e0] text-2xl ">
                Get It <br /> Delivered
              </h1>
              <p className="pt-2 text-[#29272786]">
                Gently removes dead skin, fades spots, and smooths texture
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HowItWorks;

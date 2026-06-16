"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const Boost = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const ref1 = useRef(null);
  const isInView1 = useInView(ref, { once: true, amount: 0.3 });
  const ref2 = useRef(null);
  const isInView2 = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }, // triggers when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  return (
    <div
      className={`flex flex-col items-center justify-center transition-colors duration-500 ease-in-out h-auto p-20 mt-20 ${
        inView ? "bg-[#e0f0e0]" : "bg-transparent scale-50"
      }`}
      ref={sectionRef}
    >
      <motion.div
        ref={ref1}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 1 }}
        className="text-center lg:text-6xl text-3xl"
      >
        <h1 className="text-[#292727e0]">Boost Your Confidence with</h1>
        <h1 className=" text-[#a8c4a8]">Activator Shampoo</h1>
      </motion.div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: -50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
        <Image
          src="/shampoo.png"
          alt=""
          width={800}
          height={400}
          className="object-cover max-sm:h-90"
        />
        </motion.div>
      </motion.div>
      <motion.div
        ref={ref2}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 1 }}
        className="text-[#292727e0] text-center"
      >
        <p>
          This formula revitalizes your hair for a fuller, healtheir look.{" "}
          <br />
          Say goodbye to dullness and hello to vibrant, shiny locks!
        </p>
      </motion.div>
    </div>
  );
};

export default Boost;

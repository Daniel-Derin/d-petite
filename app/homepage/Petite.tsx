"use client";

import { useEffect, useRef, useState } from "react";
import GlowSlider from "../components/SliderSec";
import CardSlider from "../components/CardSlider";

const Petite = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

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
    <div className="mt-30">
    <div
      className={`flex items-center justify-center transition-colors duration-500 ease-in-out ${
        inView ? "bg-[#f5e9aac2]" : "bg-transparent scale-50"
      }`}
      ref={sectionRef}
    >
      <div className="pb-30 max-sm:pb-10 mt-10">
        <div className="pt-20 max-sm:pt-0 px-4 lg:px-20">
          <h1 className="lg:text-5xl text-3xl text-[#292727e0] lg:w-1/2">
            <span className="text-[#29272786]">
              D-PETITE AURA is your partner
            </span>{" "}
            in glow, strength and confidence
          </h1>
        </div>
        <GlowSlider />
        <CardSlider />
      </div>
    </div>
    </div>
  );
};

export default Petite;

//[#f5e9aac2]

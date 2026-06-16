"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const slides = [
  {
    id: 1,
    src: "/back.png",
    title: "Timeless Elegance",
    description: "Discover the essence of modern sophistication with our premium collection.",
  },
  {
    id: 2,
    src: "/body.png",
    title: "Natural Radiance",
    description: "Elevate your daily routine with pure ingredients inspired by nature.",
  },
  {
    id: 3,
    src: "/over.png",
    title: "Modern Confidence",
    description: "Formulations perfected for your everyday confidence and strength.",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

export default function ImageCarousel() {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = Math.abs(page % slides.length);

  const paginate = useCallback((newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  }, [page]);

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [paginate]);

  return (
    <div className="relative h-[450px] md:h-[650px] w-full overflow-hidden rounded-3xl bg-neutral-100 shadow-2xl">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0"
        >
          <div className="relative h-full w-full">
            <Image
              src={slides[imageIndex].src}
              alt={slides[imageIndex].title}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl md:text-7xl font-semibold tracking-tight leading-tight"
              >
                {slides[imageIndex].title}
              </motion.h2>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="mt-6 max-w-2xl text-lg md:text-xl text-white/90 font-light"
              >
                {slides[imageIndex].description}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-6 z-10 pointer-events-none">
        <button
          onClick={() => paginate(-1)}
          className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-lg text-white border border-white/20 hover:bg-white/30 transition-all duration-300 active:scale-95"
        >
          <IoChevronBackOutline size={28} />
        </button>
        <button
          onClick={() => paginate(1)}
          className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-lg text-white border border-white/20 hover:bg-white/30 transition-all duration-300 active:scale-95"
        >
          <IoChevronForwardOutline size={28} />
        </button>
      </div>

      {/* Pagination Indicators */}
      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-4 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
            className={`h-2 transition-all duration-500 rounded-full ${
              i === imageIndex ? "w-12 bg-white" : "w-3 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
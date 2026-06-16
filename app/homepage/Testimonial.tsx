"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface TestimonialData {
  id: number;
  name: string;
  comment: string;
  image: string;
  rating: number;
}

const Testimonial = () => {
  // Testimonials data - all in one component
  const testimonials: TestimonialData[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      comment:
        "The quality of products is absolutely amazing! I've been a loyal customer for over a year now and I'm constantly impressed with the selection and service.",
      image: "/image1.png",
      rating: 5,
    },
    {
      id: 2,
      name: "Emily Chen",
      comment:
        "Best shopping experience ever! The customer service team was so helpful and my order arrived even faster than expected. Highly recommended!",
      image: "/image2.png",
      rating: 5,
    },
    {
      id: 3,
      name: "Jessica Williams",
      comment:
        "I love everything about this brand. The attention to detail is incredible and the products exceeded my expectations. Will definitely be ordering again!",
      image: "/image 10.png",
      rating: 5,
    },
    {
      id: 4,
      name: "Michael Brown",
      comment:
        "Fantastic experience from start to finish. The website is easy to navigate and the checkout process is seamless. Great value for money!",
      image: "/cream.png",
      rating: 4,
    },
    {
      id: 5,
      name: "Amanda Davis",
      comment:
        "I'm so impressed with the variety and quality. The packaging is beautiful and the product quality is top-notch. This is now my favorite store!",
      image: "/shampoo.png",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [windowWidth, setWindowWidth] = useState(0);

  // Detect screen size and adjust items per view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      
      if (width < 768) {
        setItemsPerView(1); // Mobile
      } else if (width < 1024) {
        setItemsPerView(2); // Tablet
      } else {
        setItemsPerView(3); // Desktop
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev >= testimonials.length - itemsPerView ? 0 : prev + 1
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(timer);
  }, [testimonials.length, itemsPerView]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, testimonials.length - itemsPerView) : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= testimonials.length - itemsPerView ? 0 : prev + 1
    );
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  return (
    <div className="mt-20 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl text-center mb-16 text-[#292727e0]">
          Visible Results,<span className="text-gray-400"> Real People</span>
        </h2>

        <div className="relative">
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 lg:px-12">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-[#e8e8e8] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 justify-center"
              >
                {/* Header with image and name */}
                <div className=" items-center justify-center gap-4 mb-6">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="rounded-full object-cover border-2 border-white shadow-md"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg text-[#292727e0]">
                      {testimonial.name}
                    </h3>
                    {/* Stars */}
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < testimonial.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Comment */}
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                  "{testimonial.comment}"
                </p>
              </motion.div>
            ))}
          </div>

          {/* Left Navigation Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-500 z-10"
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </motion.button>

          {/* Right Navigation Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-500 z-10"
            aria-label="Next testimonials"
          >
            <ChevronRight size={24} className="text-gray-700" />
          </motion.button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({
            length: Math.max(1, testimonials.length - itemsPerView + 1),
          }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-purple-600 w-8"
                  : "bg-gray-300 w-2 hover:bg-gray-400"
              }`}
              aria-label={`Go to group ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
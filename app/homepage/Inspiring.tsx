"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";
import { PiFlowerLotusThin } from "react-icons/pi";

export default function Inspiring() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const x = useMotionValue(20); // start at 20 for smooth loop

  // Track container width (for pixel-perfect handle)
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Auto slide animation (20 → 80 → 20 smooth loop)
  useEffect(() => {
    if (isInteracting) return;

    const controls = animate(x, [20, 80, 20], {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    });

    return () => controls.stop();
  }, [isInteracting]);

  const handleMove = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    let percent = ((clientX - rect.left) / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));

    x.set(percent);
  };

  // Convert % → px (KEY FIX 🔥)
  const handleX = useTransform(x, (v) => (v / 100) * containerWidth);

  // 3D Tilt Effect
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleTilt = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const midX = rect.left + rect.width / 2;
    const midY = rect.top + rect.height / 2;

    const percentX = (e.clientX - midX) / rect.width;
    const percentY = (e.clientY - midY) / rect.height;

    rotateY.set(percentX * 10);
    rotateX.set(-percentY * 10);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

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

  const ref = useRef(null);

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`py-24 bg- flex justify-center transition-colors duration-500 ease-in-out ${
        inView ? "bg-[#F4F1FC]" : "bg-transparent scale-50"
      }`}
    >
      <div className="max-w-6xl w-full rounded-3xl lg:p-px">
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl lg:p-10 max-sm:p-4 shadow-[0_0_60px_rgba(255,255,255,0.05)]">
          <h2 className="text-center max-sm:text-3xl text-5xl lg:px-20 lg:font-semibold text-[#292727e0] mb-16">
            Inspiring transformations{" "}
            <span className="text-[#29272786]">from real people like you</span>
          </h2>

          <div className="grid md:grid-cols-2 md:gap-12 gap-4 items-center">
            {/* LEFT */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 1 }}
              className="bg-[#D6D1F2] max-sm:h-125 h-115 rounded-2xl p-8 lg:px-20 text-center"
            >
              <motion.h3
                ref={containerRef}
                style={{ rotateX, rotateY }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-[#292727e0] leading-2 lg:leading-1 text-2xl pt-4"
              >
                Anna, 29 years
              </motion.h3>

              <p className="text-[#292727e0] mt-2 text-2xl leading-6 lg:leading-5">
                Visible acne removal in few dayss
              </p>

              <p className="text-gray-500 mt-4 text-sm leading-relaxed">
                “I struggled with acne and early signs of aging on my face.
                After using the product consistently, I finally saw real
                cleansing and smooth results.”
              </p>

              <div className="mt-8 space-y-3 p-4 rounded-2xl bg-white">
                <h1 className="text-[#292727e0] text-lg font-semibold">
                  Anna also has problems with:
                </h1>
                {["Neck Firming", "Hair Growth", "Pigmentation"].map((item) => (
                  <div
                    key={item}
                    className="flex bg-gradient-to-r from-[#D6D1F2] via-#E6E2F8 to-[#BEB7E6] bg-[#D6D1F2] backdrop-blur-lg border border-white/10 rounded-xl px-4  hover:bg-white/20 transition py-1.5 text-left"
                  >
                    <PiFlowerLotusThin className="bg-white h-8 w-8 rounded-full p-2 text-black" />
                    <span className="text-sm text-[#292727e0] font-semibold ml-4 pt-1">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 1, delay: 0.3 }}
              ref={containerRef}
              style={{ rotateX, rotateY }}
              onMouseMove={(e: React.MouseEvent) => {
                handleTilt(e);
                if (e.buttons === 1) {
                  setIsInteracting(true);
                  handleMove(e.clientX);
                }
              }}
              onMouseEnter={() => setIsInteracting(true)}
              onMouseLeave={() => {
                setIsInteracting(false);
                resetTilt();
              }}
              onTouchMove={(e: React.TouchEvent) => {
                setIsInteracting(true);
                handleMove(e.touches[0].clientX);
              }}
              className="relative w-full h-80 md:h-115 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing"
            >
              {/* Glow */}
              <motion.div
                ref={containerRef}
                style={{ rotateX, rotateY }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute inset-0 bg-purple-100 pointer-events-none"
              />

              {/* AFTER */}
              <img
                src="/after.png"
                className="absolute w-full h-full object-cover bg-[#BEB7E6]"
              />

              {/* BEFORE */}
              <motion.div
                className="absolute top-0 left-0 h-full "
                style={{ width: useTransform(x, (v) => `${v}%`) }}
              >
                <img
                  src="/before.png"
                  className="w-full h-full object-cover bg-[#BEB7E6]"
                />
              </motion.div>

              {/* Divider */}
              <motion.div
                className="absolute top-0 h-full w-0.5 bg-white"
                style={{ left: useTransform(x, (v) => `${v}%`) }}
              />

              {/* ✅ FIXED HANDLE */}
              <motion.div
                drag="x"
                dragConstraints={containerRef}
                dragElastic={0}
                onDrag={(event: any, info: any) => {
                  setIsInteracting(true);
                  handleMove(info.point.x);
                }}
                className="absolute top-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-black font-bold"
                style={{
                  left: handleX, // 🔥 pixel-perfect sync
                  translateX: "-50%",
                  translateY: "-50%",
                }}
              >
                ⇆
              </motion.div>

              {/* Badge */}
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-xl text-white text-sm">
                <p className="text-xs text-gray-300">Your improvements</p>
                <p className="text-center font-semibold text-lg">75%</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

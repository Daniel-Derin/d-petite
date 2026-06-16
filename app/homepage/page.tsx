
import Hero from "./Hero";
import { AboutSection } from "./About";
import { PhilosophySection } from "./Phisology";
import { Footer } from "../components/Footer";
import ProductGrid from "./ProductGrid";
import Navbar from "../components/Navbar";
import NewArrival from "./NewArrival";
import OurPopular from "./OurPopular";
import YourDaily from "./YourDaily";
import GlowSlider from "../components/SliderSec";
import Petite from "./Petite";
import Inspiring from "./Inspiring";
import Lister from "./Lister";
import HowItWorks from "./HowItWorks";
import Boost from "./Boost";

const Homepage = async () => {
  return (
    <div className="h-auto overflow-hidden bg-[#fafaf8] ">
      <Navbar />
      <Hero />
      <YourDaily />
      <Petite />
      <Inspiring />
      <Lister />
      <HowItWorks />
      <Boost />
      <AboutSection />
      <PhilosophySection />
      <Footer />
    </div>
  );
};

export default Homepage;

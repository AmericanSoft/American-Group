import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import BrandsSlider from "../components/BrandsSlider";
import TestimonialsSlider from "../components/TestimonialsSlider";
import HeroSplit from "../components/HeroSplit";
import LogoMarquee from "../components/LogoMarquee";
import Politics from "../components/Politics";

export default function HomeAr() {
  return (
    <>
    <Hero/>
    <LogoMarquee/>
    <About/>
    <BrandsSlider/>
    <HeroSplit/>
    <TestimonialsSlider />
    <Politics />
    </>
  );
}

import Hero from "../components/Hero";
import About from "../components/About";
import BrandsSlider from "../components/BrandsSlider";
import TestimonialsSlider from "../components/TestimonialsSlider";
import HeroSplit from "../components/HeroSplit";
import LogoMarquee from "../components/LogoMarquee";
import Politics from "../components/Politics";

export default function HomeEn() {
  return (
    <>
    <Hero lang="en" />
    <LogoMarquee lang="en" />
    <About lang="en"/>
    <BrandsSlider lang="en"/>
    <HeroSplit lang="en"/>
    <TestimonialsSlider lang="en" />
    <Politics lang="en" />
    </>
  );
}

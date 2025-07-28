import AboutUs from "@/components/section/about-us";
import Testimonials from "@/components/section/testimonials";
import FeaturedYacth from "@/components/section/featured-yacth";
import Hero from "@/components/section/hero";
import Services from "@/components/section/services";
import WhyChooseUs from "@/components/section/why-choose-us";
import Gallery from "@/components/section/gallery";

export default function Home() {
  return (
    <div>
      <Hero />
      <AboutUs />
      <FeaturedYacth />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <Gallery />
    </div>
  );
}

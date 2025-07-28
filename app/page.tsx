import AboutUs from "@/components/section/about-us";
import FeaturedYacth from "@/components/section/featured-yacth";
import Hero from "@/components/section/hero";
import Services from "@/components/section/services";

export default function Home() {
  return (
    <div>
      <Hero />
      <AboutUs />
      <FeaturedYacth />
      <Services />
    </div>
  );
}

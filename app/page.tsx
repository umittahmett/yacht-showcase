import AboutUs from "@/components/section/about-us";
import Testimonials from "@/components/section/testimonials";
import FeaturedYacth from "@/components/section/featured-yacth";
import Hero from "@/components/section/hero";
import Services from "@/components/section/services";
import WhyChooseUs from "@/components/section/why-choose-us";
import Gallery from "@/components/section/gallery";
import HighLightVideo from "@/components/section/highlight-video";

export default function Home() {
  return (
    <div>
      <Hero />
      <AboutUs />
      <HighLightVideo
        videoSrc="https://videocdn.cdnpk.net/videos/4d934a6b-a041-5eff-bc92-0d570ee79007/horizontal/previews/clear/large.mp4?token=exp=1753799429~hmac=d30056bca597d0dba13e3675e031807ba707f2b55267322391cb80cf8c792183"
        thumbnailSrc="/assets/images/backgrounds/yacht.png"
        thumbnailAlt="Denizde bir hafta"
      />
      <FeaturedYacth />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <Gallery />
    </div>
  );
}

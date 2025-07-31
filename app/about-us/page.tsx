
import AboutUs from '@/components/section/about-us'
import Faq from '@/components/section/faq'
import Hero from '@/components/section/hero'
import HighLightVideo from '@/components/section/highlight-video'
import HowItWorks from '@/components/section/how-it-works'
import MissionVision from '@/components/section/mission-vision'
import React from 'react'

const AboutUsPage = () => {
  return (
    <div>
      <Hero
        pages={[{ title: "About Us", href: "/about" }]}
        title="About Us"
      />
      <AboutUs />
      <HighLightVideo
        videoSrc="https://videocdn.cdnpk.net/videos/4d934a6b-a041-5eff-bc92-0d570ee79007/horizontal/previews/clear/large.mp4?token=exp=1753799429~hmac=d30056bca597d0dba13e3675e031807ba707f2b55267322391cb80cf8c792183"
        thumbnailSrc="/assets/images/backgrounds/yacht.png"
        thumbnailAlt="Denizde bir hafta"
      />
      <HowItWorks />
      <MissionVision />
      <Faq />
    </div>
  );
}

export default AboutUsPage;
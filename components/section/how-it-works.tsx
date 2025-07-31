import React from 'react'
import ContentCard from '../shared/content-card';

const howItWorksData = [
  {
    indicator: "01",
    title: "Browse Our Fleet",
    content: "Explore our extensive collection of luxury yachts, each carefully selected for comfort, style, and performance. From intimate vessels perfect for romantic getaways to spacious yachts ideal for family adventures, we have the perfect boat for every occasion and preference.",
    reverse: false
  },
  {
    indicator: "02", 
    title: "Choose Your Destination",
    content: "Select from our curated list of breathtaking destinations and itineraries. Whether you dream of cruising the crystal-clear waters of the Mediterranean, exploring tropical Caribbean islands, or navigating the stunning coastlines of the Pacific Northwest, we'll help you plan the perfect voyage.",
    reverse: true
  },
  {
    indicator: "03",
    title: "Enjoy Your Voyage", 
    content: "Embark on your luxury yacht experience with our professional crew ensuring every detail is perfect. Relax and create unforgettable memories as you sail through pristine waters, visit exclusive destinations, and enjoy world-class service throughout your journey.",
    reverse: false
  }
];

const HowItWorks = () => {
  return (
    <section>
      <div className="text-center lg:max-w-xl mx-auto">
        <div className="section-upper-title">
          <span>How It Works</span>
        </div>
        <h2 className="section-title">
          Your Yachting Experience, Step by Step
        </h2>
      </div>

      <div className="container space-y-12 mt-8 sm:mt-12 lg:mt-16">
        {howItWorksData.map((step, index) => (
          <ContentCard
            key={index}
            indicator={step.indicator}
            title={step.title}
            content={step.content}
            reverse={step.reverse}
          />
        ))}
      </div>
    </section>
  );
}

export default HowItWorks
import React from 'react'
import InfoBlock from '../shared/info-block';import { Anchor, Ship } from 'lucide-react';
import Image from 'next/image';
import Boat from "@assets/images/dummy-product.jpg";


const MissionVision = () => {
  return (
    <section className='bg-main-background'>
      <div className="container grid lg:grid-cols-11 gap-8 sm:gap-12 lg:gap-20 items-center">
        <Image
          src={Boat}
          alt="Boat"
          className="aspect-[3/2] lg:aspect-[10/12] w-full object-cover rounded-[20px] lg:col-span-5"
        />
        <div className="lg:col-span-6">
          <div className="section-upper-title">
            <span>Our Vision</span>
          </div>
          <h2 className="section-title">
            Our Vision: Navigating Tomorrow&apos;s Waters
          </h2>
          <p className="section-content">
            Id dignissim ac ultrices sed imperdiet id. Odio velit morbi cum a
            magna euismod. Commodo amet mauris quis at.
          </p>

          <div className="mt-6 sm:mt-8 lg:mt-10 space-y-3 sm:space-y-4 lg:space-y-5">
            <InfoBlock
              iconSize="lg"
              variant='horizontal'
              indicator={<Anchor />}
              title="Our Vision"
              content="Purus quis semper elementum viverra tellus. Urna arcu pulvinar est sodales. Faucibus pulvinar."
            />
            <InfoBlock
              iconSize="lg"
              variant='horizontal'
              indicator={<Ship />}
              title="Our Mission"
              content="Purus quis semper elementum viverra tellus. Urna arcu pulvinar est sodales. Faucibus pulvinar."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MissionVision
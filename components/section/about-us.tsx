import React from 'react'
import DummyPartner from '@assets/images/logos/dummy-logo.svg'
import Image, { StaticImageData } from 'next/image';

const AboutUs = () => {
  const partners: StaticImageData[] = [
    DummyPartner,
    DummyPartner,
    DummyPartner,
    DummyPartner,
    DummyPartner,
  ];
  return (
    <section className="flex flex-col lg:flex-row container justify-between items-end gap-8 sm:gap-12 lg:gap-20">
      <div className="lg:max-w-2xl">
        <div>
          <span className="section-upper-title">About us</span>
        </div>
        <h2 className="section-title">
          Yachtera: Your Trusted Sailing Partner
        </h2>
        <p className="section-content">
          Vitae nulla feugiat cursus id senectus cursus tristique lacinia
          ornare. Integer dui pretium et faucibus egestas. Adipiscing egestas
          non aenean mauris donec in adipiscing id tempor.
        </p>
      </div>

      <div className="flex flex-wrap gap-8 sm:gap-10 lg:gap-12 lg:max-w-xl">
        {partners.map((partner, index) => (
          <Image
            key={index}
            className="h-16 w-fit grayscale-100"
            height={64}
            src={DummyPartner}
            alt="Dummy Partner"
          />
        ))}
      </div>
    </section>
  );
}

export default AboutUs
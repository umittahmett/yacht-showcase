import { InfoBlockProps } from "@/types";
import InfoBlock from "../shared/info-block";
import { Wrench, Anchor, Compass, Waves } from 'lucide-react';
import Image from "next/image";
import Boat from '@assets/images/dummy-product.jpg'

const Services = () => {
  const informations: InfoBlockProps[] = [
    {
      indicator: <Wrench />,
      title: 'Maintenance & Repairs',
      content: 'Comprehensive maintenance and repair services to keep your yacht in top condition.',
      link: '/',
    },
    {
      indicator: <Anchor />,
      title: 'Docking & Mooring',
      content: 'Secure and convenient docking and mooring solutions at premium locations.',
      link: '/',
    },
    {
      indicator: <Compass />,
      title: 'Navigation Assistance',
      content: 'Expert navigation support for safe and enjoyable journeys on the water.',
      link: '/',
    },
    {
      indicator: <Waves />,
      title: 'Water Activities',
      content: 'A variety of water sports and activities for all ages and skill levels.',
      link: '/',
    },
  ];

  return (
    <section className="bg-main-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <div className="section-upper-title">
            <span>Our Services</span>
          </div>
          <h2 className="section-title">
            Your Gateway to Exceptional Boating Experiences
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mt-8 sm:mt-12 lg:mt-16">
          <div className="relative flex mr-16 sm:mr-20">
            <div className="w-full">
              <Image
                src={Boat}
                alt="Boat"
                className="aspect-[4/3] lg:aspect-[12/13] rounded-[20px] object-cover"
              />
            </div>

            <div className="rounded-[20px] absolute top-0 right-0 translate-y-1/3 translate-x-1/2 w-32 sm:w-40 h-40 sm:h-52 overflow-hidden">
              <div className="bg-primary-500 p-3 sm:p-4 lg:p-5 !pb-0 text-center">
                <div className="translate-y-[9px]">
                  <span className="text-dynamic-2xl text-white font-[Unna]">
                    1,200+
                  </span>
                  <div className="text-sm text-accent-500">
                    <span>Happy Clients</span>
                  </div>
                </div>
              </div>
              <div>
                <Image
                  src={Boat}
                  alt="Boat"
                  className="w-full h-full object-bottom"
                />
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-4 h-fit sm:gap-x-5 lg:gap-x-6 gap-y-6 sm:gap-y-7 lg:gap-y-[34px]">
            {informations.map((info, idx) => (
              <InfoBlock key={idx} {...info} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services
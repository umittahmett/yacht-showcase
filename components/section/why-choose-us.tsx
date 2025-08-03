import { InfoBlockProps, StatProps } from "@/types";
import InfoBlock from "../shared/info-block";
import Image from "next/image";
import Boat from '@assets/images/dummy-product.jpg'
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Stat from "../shared/stat";

const WhyChooseUs = () => {
    const informations: InfoBlockProps[] = [
      {
        indicator: "01",
        title: "Luxurious Fleet",
        content: "Comprehensive maintenance and repair services to keep your yacht in top condition.",
      },
      {
        indicator: "02",
        title: "Experienced Team",
        content: "Purus quis semper elementum viverra tellus. Urna arcu pulvinar est sodales. Faucibus pulvinar.",
      },
    ];
    const stats: StatProps[] = [
      {
        value: 25,
        suffix: "+",
        content: "Total Yacht Fleet",
      },
      {
        value: 60,
        suffix: "+",
        content: "Exclusive Destinations",
      },
      {
        value: 32,
        suffix: "+",
        content: "Years of Experience",
      },
    ];
  
  return (
    <section>
      <div className="container">
        <div className="grid lg:grid-cols-11 gap-8 sm:gap-12 lg:gap-20">
          <div className="lg:col-span-6">
            <div className="mb-8 sm:mb-12 lg:mb-16">
              <div className="section-upper-title">
                <span>Why Choose Us</span>
              </div>
              <h2 className="section-title">Top Reasons to Choose Yachtera</h2>
              <p className="section-content">
                Id dignissim ac ultrices sed imperdiet id. Odio velit morbi cum
                a magna euismod. Commodo amet mauris quis at.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-4 h-fit sm:gap-x-5 lg:gap-x-6 gap-y-6 sm:gap-y-7 lg:gap-y-[34px]">
              {informations.map((info, idx) => (
                <InfoBlock key={idx} {...info} />
              ))}
            </div>
          </div>

          <Image
            src={Boat}
            alt="Boat"
            className="lg:col-span-5 aspect-[4/3] lg:aspect-square rounded-[20px] object-cover"
          />
        </div>

        <div className="mt-8 sm:mt-12 lg:mt-16 flex flex-col lg:flex-row lg:justify-between items-center gap-8 sm:gap-12 lg:gap-20 xl:gap-28">
          <div className="lg:max-w-md py-6 sm:py-8 lg:py-10 px-8 sm:px-10 lg:px-12 bg-primary-500 rounded-[20px] text-center space-y-3 lg:space-y-4 w-full">
            <p className="text-dynamic-2xl leading-1.4 text-white">
              <span className="text-border-100">Embark on Your</span> Dream
              Voyage <span className="text-border-100">Today!</span>
            </p>
            <Button radius="full" size="lg" asChild className="w-full">
              <Link href="/">Book Now!</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center items-start gap-y-4 gap-x-8 sm:gap-x-12 lg:gap-x-16">
            {stats.map((stat: StatProps, idx: number) => (
              <Stat key={idx} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs
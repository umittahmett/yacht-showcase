import Image from 'next/image'
import React from 'react'
import Boat from '@assets/images/dummy-product.jpg'
import { Crop, Smile, Users } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const Yacth = () => {
  return (
    <article className=" rounded-[20px] duration-200 bg-main-background border border-transparent hover:border-border-100">
      <Image
        src={Boat}
        alt="Lorem Boat"
        className="aspect-[3/2] object-cover w-full rounded-[20px]"
      />
      <div className="p-5 sm:p-6 lg:p-[30px] pt-4 lg:pt-5 space-y-3 lg:space-y-4">
        <div className="flex items-center justify-between gap-2.5">
          <h3 className="text-dynamic-2xl text-primary leading-1.4">
            Aqua Horizon
          </h3>
          <div className="text-orange text-sm leading-1.6">
            <span>4.5/5</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-y border-border-100 gap-2.5 py-1.5">
          <div className="flex items-center gap-0.5">
            <Crop className="text-secondary" />
            <span className="text-text-color leading-1.4 text-sm">85” ft</span>
          </div>
          <div className="flex items-center gap-0.5">
            <Users className="text-secondary" />
            <span className="text-text-color leading-1.4 text-sm">
              10 Guest
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            <Smile className="text-secondary" />
            <span className="text-text-color leading-1.4 text-sm">3 Crew</span>
          </div>
        </div>

        <p className="text-text-color leading-1.6">
          Vitae nulla feugiat cursus id senectus cursus tristique lacinia
          ornare.
        </p>

        <div className="flex items-center justify-between gap-2.5">
          <span className="font-[Unna] text-dynamic-2xl text-primary">
            $280/day
          </span>
          <Button variant="secondary" size="lg" radius="md" asChild>
            <Link href={"/"}>Book Now</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

export default Yacth
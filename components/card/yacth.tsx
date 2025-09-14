import Image from 'next/image'
import React from 'react'
import Boat from '@assets/images/dummy-product.jpg'
import { Crop, Smile, Users } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

interface YacthProps {
  id?: number | string;
  image?: string;
  name?: string;
  capacityText?: string;
  personnelText?: string;
  widthText?: string;
  about?: string;
  dailyPrice?: number | string
}

const Yacth = ({
  id = 1,
  image,
  name,
  capacityText,
  personnelText,
  widthText,
  about,
  dailyPrice,
}: YacthProps) => {
  const imageSrc = image ?? Boat;
  return (
    <article className=" rounded-[20px] duration-200 bg-main-background">
      <Link href={`/products/${id}`}>
        <Image
          src={imageSrc}
          alt={name ?? ""}
          width={800}
          height={534}
          className="aspect-[3/2] object-cover w-full rounded-[20px]"
        />
      </Link>
      <div className="p-5 sm:p-6 lg:p-[30px] pt-4 lg:pt-5 space-y-3 lg:space-y-4">
        <div className="flex items-center justify-between gap-2.5">
          <h3 className="text-dynamic-2xl text-primary-500 leading-1.4">
            {name}
          </h3>
          <div className="text-orange-500 text-sm leading-1.6">
            <span>4.5/5</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-y border-border-100 gap-2.5 py-1.5">
          <div className="flex items-center gap-1.5">
            <Crop className="text-secondary-500" />
            <span className="text-text-color leading-1.4 text-sm">
              {widthText}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="text-secondary-500" />
            <span className="text-text-color leading-1.4 text-sm">
              {capacityText}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Smile className="text-secondary-500" />
            <span className="text-text-color leading-1.4 text-sm">
              {personnelText}
            </span>
          </div>
        </div>

        <p className="text-text-color leading-1.6">{about}</p>

        <div className="flex items-center justify-between gap-2.5">
          {dailyPrice !== undefined && dailyPrice !== null ? (
            <span className="font-[Unna] text-dynamic-2xl text-primary-500">
              ${typeof dailyPrice === 'number' ? dailyPrice : dailyPrice}/day
            </span>
          ) : (
            <span className="font-[Unna] text-dynamic-2xl text-primary-500">—</span>
          )}
          <Button variant="secondary" asChild>
            <Link href={"/"}>Book Now</Link>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default Yacth
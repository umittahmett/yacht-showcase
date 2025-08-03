import React from 'react'
import Boat from "@assets/images/dummy-product.jpg";
import Image from 'next/image';
import { ContentCardProps } from '@/types';
import clsx from 'clsx';

const ContentCard: React.FC<ContentCardProps> = ({title, indicator, content, reverse}) => {
  return (
    <div
      className={clsx(
        "flex flex-col md:flex-row gap-6 md:gap-14 lg:gap-20 items-center",
        reverse && "md:flex-row-reverse"
      )}
    >
      <Image
        src={Boat}
        alt="Boat"
        className="aspect-[6/4] md:max-w-[400px] xl:max-w-[500px] w-full object-cover rounded-[20px]"
      />

      <div
        className={clsx(
          "w-full flex-col lg:flex-row",
          indicator && "flex items-start gap-4 sm:gap-6 lg:gap-10"
        )}
      >
        {indicator && (
          <div
            className={
              "size-10 sm:size-11 lg:size-12 bg-secondary-500 rounded-[10px] flex items-center justify-center leading-1.6 text-white shrink-0 "
            }
          >
            {indicator}
          </div>
        )}

        <div className="space-y-4 sm:space-y-5 lg:space-y-6">
          <h3 className="text-dynamic-2xl leading-1.4 text-primary-500">{title}</h3>
          <p className="text-text-color leading-1.6">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default ContentCard
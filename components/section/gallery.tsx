import Link from "next/link";
import { Button } from "../ui/button";
import Image, { StaticImageData } from "next/image";
import BoatImage from '@assets/images/dummy-product.jpg'
import clsx from "clsx";

const Gallery = () => {
  const galleyImages: string[] | StaticImageData[] = [
    BoatImage,
    BoatImage,
    BoatImage,
    BoatImage,
    BoatImage,
  ];

  return (
    <section>
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 lg:gap-10 mb-8 sm:mb-12 lg:mb-16">
          <h2 className="section-title max-w-xl">
            Sail through Our Fresh Gallery Updates
          </h2>
          <Button size="lg" asChild>
            <Link href={"/"}>Instagram</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
          {galleyImages.map((image, idx) => (
            <div
              key={idx}
              className={clsx(
                "rounded-[20px] group overflow-hidden object-cover aspect-square",
                idx <= 1 || idx % 5 == 0 || idx % 6 == 0
                  ? "md:col-span-3 md:aspect-[11/7]"
                  : "md:col-span-2"
              )}
            >
              <Image
                key={idx}
                src={image}
                alt="Gallrery Image"
                className="size-full object-cover group-hover:scale-105 duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery
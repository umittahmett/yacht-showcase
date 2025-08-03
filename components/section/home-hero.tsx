import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import Boat from '@assets/images/dummy-product.jpg'
import { ArrowUpRight, MapPin } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const HomeHero = () => {
  return (
    <section className="bg-secondary-500 lg:py-32 xl:py-[150px] !mt-0">
      <div className="flex flex-col lg:flex-row justify-between container gap-8 sm:gap-16 lg:gap-20">
        <div className="max-w-[520px]">
          <div className="section-upper-title title-light">
            <span>Yacht Club & Boat Rental</span>
          </div>
          <h1 className="py-1 section-title title-light title-xl font-[Unna]">
            Discover the Freedom of the Open Sea
          </h1>
          <p className="section-content content-light">
            Vitae nulla feugiat cursus id senectus cursus tristique lacinia
            ornare. Integer dui pretium et faucibus egestas. Adipiscing egestas
            non aenean mauris donec in adipiscing id tempor.
          </p>
          <Button
            radius="full"
            className="mt-4 sm:mt-5 lg:mt-6"
            asChild
            size="lg"
          >
            <Link href="/">Discover More</Link>
          </Button>
        </div>

        <div className="lg:max-w-[368px] grid sm:grid-cols-2 lg:flex lg:flex-col gap-6 sm:gap-7 lg:gap-9">
          {/* Featured Boat */}
          <article className="relative rounded-[20px] overflow-hidden text-white">
            <Image
              src={Boat}
              alt="Featured Boat"
              className="aspect-[12/7] object-cover size-full"
            />
            <div className="absolute inset-0 bg-black/30 px-[34px] py-[30px] flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2.5">
                <span className="text-xs rounded-full px-5 py-2.5 leading-1.3 bg-orange-500">
                  30% Off
                </span>
                <div className="text-sm leading-1.6">4.5/5</div>
              </div>

              <div className="flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-1 text-sm leading-1.4">
                  <MapPin />
                  Caracas, Venezuela
                </div>

                <Button variant="white" asChild size="iconSmall">
                  <Link href="/">
                    <ArrowUpRight />
                  </Link>
                </Button>
              </div>
            </div>
          </article>

          <div className="bg-white rounded-[20px] py-4 sm:py-5 lg:py-6 px-5 sm:px-6 lg:px-[34px]">
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 sm:gap-x-4 lg:gap-x-5">
              <div className="col-span-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="City, Country, etc"
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  placeholder="Capacity"
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  placeholder="Capacity"
                  className="w-full"
                />
              </div>
            </div>

            <Button className="w-full mt-3 sm:mt-4 lg:mt-5" variant="secondary">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHero
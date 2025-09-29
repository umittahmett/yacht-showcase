import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';
import ProductCard from '../card/product-card';

const FeaturedYacth = () => {
  return (
    <section>
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 lg:gap-10">
          <h2 className="section-title">Featured Yacth</h2>
          <Button radius="full" size="lg" asChild>
            <Link href={"/"}>See All</Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mt-8 sm:mt-12 lg:mt-16">
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </section>
  );
}

export default FeaturedYacth
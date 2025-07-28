import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';
import Yacth from '../card/yacth';

const FeaturedYacth = () => {
  return (
    <section>
      <div className="container">
        <div className="flex items-center justify-between gap-8 sm:gap-16 lg:gap-20">
          <h2 className="section-title">Featured Yacth</h2>
          <Button size="lg" asChild>
            <Link href={"/"}>See All</Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mt-8 sm:mt-12 lg:mt-16">
          <Yacth />
          <Yacth />
          <Yacth />
        </div>
      </div>
    </section>
  );
}

export default FeaturedYacth
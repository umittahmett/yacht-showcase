'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { ClientCommentProps } from '@/types';
import DummyUserMale from '@assets/images/dummy-user-male.jpeg'
import DummyUserFemale from '@assets/images/dummy-user-female.jpeg'

const Testimonials = () => {
  const testimonials: ClientCommentProps[] = [
    {
      text: "Absolutely incredible experience! The yacht was immaculate and the crew was professional. We had the most amazing week at sea. Highly recommend for anyone looking for luxury and adventure.",
      author: {
        picture: DummyUserFemale, 
        name: "Sarah Johnson",
        title: "Marketing Director",
      },
      point: 5,
    },
    {
      text: "The service exceeded all our expectations. From the moment we boarded until we disembarked, everything was perfect. The attention to detail was remarkable.",
      author: {
        picture: DummyUserMale, 
        name: "Michael Chen",
        title: "Tech Entrepreneur",
      },
      point: 5,
    },
    {
      text: "A truly unforgettable journey. The yacht was beautiful, the destinations were stunning, and the crew made us feel like royalty. Worth every penny!",
      author: {
        picture: DummyUserFemale, 
        name: "Emma Rodriguez",
        title: "Travel Blogger",
      },
      point: 5,
    },
    {
      text: "Professional, luxurious, and absolutely breathtaking. The yacht was spotless and the crew was incredibly attentive. We'll definitely be booking again.",
      author: {
        picture: DummyUserMale, 
        name: "David Thompson",
        title: "Investment Banker",
      },
      point: 5,
    },
    {
      text: "The perfect blend of adventure and luxury. The yacht had everything we needed and more. The crew was friendly and knowledgeable about the best spots.",
      author: {
        picture: DummyUserFemale, 
        name: "Lisa Wang",
        title: "Interior Designer",
      },
      point: 5,
    },
  ]; 

  return (
    <section className="bg-main-background">
      <div className="container">
        <div className='section-upper-title'><span>Testimonials</span></div>
        <h2 className="section-title mb-8 sm:mb-12 lg:mb-16">
          Our Happy Clients
        </h2>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 32,
              },
            }}
          >
            {testimonials.map((comment: ClientCommentProps, idx: number) => (
              <SwiperSlide className="!h-auto" key={idx}>
                <div className="flex flex-col gap-10 sm:gap-11 lg:gap-12 w-full p-10 sm:p-11 lg:p-12 bg-secondary rounded-[20px] h-full text-white">
                  <p className="text-dynamic-xl leading-1.15 my-auto">
                    &quot;{comment.text}&quot;
                  </p>

                  <div className="flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-3">
                      <Image
                        width={60}
                        height={60}
                        src={comment.author.picture}
                        alt={comment.author.name}
                        className="size-10 sm:size-12 object-contain rounded-full lg:size-[60px]"
                      />
                      <div>
                        <div className="text-dynamic-2xl font-[Unna]">
                          <span>{comment.author.name}</span>
                        </div>
                        <div className="text-xs leading-1.3 mt-0.5">
                          <span>{comment.author.title}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm leading-1.6">
                      <span>{comment.point}/5</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <div className="swiper-pagination mt-10 gap-3 !relative"></div>
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default Testimonials
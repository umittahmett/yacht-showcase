'use client'

import { useState } from 'react';
import type { CSSProperties } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';
import { DetailedProduct, ProductFeatureGroup } from '@/types/product';
import MDEditor from '@uiw/react-md-editor';
import Share from '@/components/ui/share';
import type { Swiper as SwiperClass } from 'swiper/types';
import { CheckCircle, XCircle } from 'lucide-react';

// Feature Display Components
const FeatureCard: React.FC<{ feature: ProductFeatureGroup }> = ({ feature }) => {
  const isBaseInformation = feature.name === 'base_informations';
  const isBooleanFeature = feature.fields.some(field => field.value === 'true' || field.value === 'false');

  if (isBaseInformation) {
    return (
      <div className="space-y-10">
        <div className="space-y-10">
          {feature.fields.map((field, index) => (
            <div key={index} className="">
              <h4 className="section-title title-sm">
                {field.field_title}
              </h4>
              <div className="section-content prose max-w-full mt-0">
                <MDEditor.Markdown source={field.value} className="!bg-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // For non-base information features, display all fields in a grid
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-200/80 pb-2">
        {feature.title}
      </h3>
      
      {/* Display all fields in a grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {feature.fields.map((field) => {
          const isTrue = field.value === 'true';
          const isFalse = field.value === 'false';
          
          if (isTrue || isFalse) {
            return (
              <div 
                key={field.id} 
                className={`flex items-center gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-100`}
              >
                <span className="font-medium text-gray-700 flex-1">
                  {field.field_title}
                </span>
                <div className={`flex items-center ${isTrue ? 'text-green-600' : 'text-gray-400'}`}>
                  {isTrue ? (
                    <CheckCircle className='size-5 text-green-600'/>
                  ) : (
                    <XCircle className='size-5 text-red-600'/>
                  )}
                </div>
              </div>
            );
          }
          
          // For non-boolean fields
          return (
            <div key={field.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
              <span className="font-medium text-gray-700">{field.field_title}</span>
              <span className="text-gray-900 font-semibold">{field.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

};

type SwiperCSSVars = CSSProperties & {
  ['--swiper-navigation-color']?: string;
  ['--swiper-pagination-color']?: string;
};

const ProductDetails: React.FC<{ product: DetailedProduct }> = ({ product }) => {

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className='container py-10'>
      <div className="flex items-center justify-between">
        <h1 className='section-title mb-4'>{product.title}</h1>
        <Share />
      </div>

      <div className='rounded-2xl overflow-clip space-y-0.5 mb-10'>
        <Swiper
          style={
            {
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': '#fff',
            } as SwiperCSSVars
          }
          loop={true}
          spaceBetween={0}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 bg-gray-200 p-2.5 aspect-video"
        >
          {product.images.map((image: string, index: number) => (
            <SwiperSlide key={index}>
              <Image className='h-full w-fit mx-auto object-contain' src={image} alt={`image-${index}`} width={1280} height={600} />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={2}
          loop={true}
          slidesPerView='auto'
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper *:cursor-pointer *:aspect-square *:!w-fit *:!size-20 md:*:!size-32"
        >
          {product.images.map((image: string, index: number) => (
            <SwiperSlide key={index}>
              <Image className='aspect-square object-cover size-full' src={image} alt={`image-${index}`} width={250} height={250} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Product Features Display */}
      <div className="space-y-10">
        {product.features.map((feature, index) => (
          <FeatureCard key={`${feature.name}-${index}`} feature={feature} />
        ))}

        {/* Pricing Display */}
        <div>
          <h4 className="section-title title-sm mb-2.5">Pricing</h4>
          <div className='grid md:grid-cols-3 gap-6 md:gap-4'>
            {product.pricing.map((p, index) => (
              <div key={index}>
                <h3 className="section-title title-sm text-dynamic-xl mb-2.5">{p.field_title}</h3>
                <div className='bg-white rounded-xl shadow-sm border border-gray-200/80 divide-y divide-gray-200/80 *:p-4'>
                  {
                    p.fields.map((field, fieldIndex) => (
                      <div
                        key={fieldIndex}
                        className="flex items-center justify-between"
                      >
                        <span className="font-medium text-gray-800">{field.field_title}:</span>
                        <span className="font-semibold text-gray-900 text-dynamic-lg">
                          ${field.value}
                        </span>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

'use client'

import { useState } from 'react';
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
                {field.title}
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

  if (isBooleanFeature) {
    const trueFeatures = feature.fields.filter(field => field.value === 'true');
    const falseFeatures = feature.fields.filter(field => field.value === 'false');

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-200/80 pb-2">
          {feature.title}
        </h3>
        
        {trueFeatures.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-green-700 mb-3 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Available Features
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {trueFeatures.map((field) => (
                <div key={field.id} className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">{field.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {falseFeatures.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
              Not Available
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {falseFeatures.map((field) => (
                <div key={field.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg opacity-60">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-500">{field.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default layout for other feature types
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200/80 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-200/80 pb-2">
        {feature.title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {feature.fields.map((field) => (
          <div key={field.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-700">{field.title}</span>
            <span className="text-gray-900 font-semibold">{field.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductDetails: React.FC<{ product: DetailedProduct }> = ({ product }) => {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className='container py-10'>
      <div className="flex items-center justify-between">
        <h1 className='section-title mb-4'>{product.title}</h1>
        <Share />
      </div>

      <div className='rounded-2xl overflow-clip space-y-0.5 mb-10'>
        <Swiper
          style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          }}
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
                <h3 className="section-title title-sm text-dynamic-xl mb-2.5">{p.title}</h3>
                <div className='bg-white rounded-xl shadow-sm border border-gray-200/80 divide-y divide-gray-200/80 *:p-4'>
                  {
                    p.fields.map((field, fieldIndex) => (
                      <div
                        key={fieldIndex}
                        className="flex items-center justify-between"
                      >
                        <span className="font-medium text-gray-800">{field.title}:</span>
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

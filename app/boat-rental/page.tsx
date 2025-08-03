'use client'

import ContactForm from '@/components/form/contact-form'
import Faq from '@/components/section/faq'
import Hero from '@/components/section/hero'
import OurOffice from '@/components/section/our-office'
import BoatFilters from '@/components/boat-filters'
import BoatSearch from '@/components/boat-search'
import React from 'react'
import Yacth from '@/components/card/yacth'

const BoatRentalPage = () => {
  
  const handleFiltersChange = (filters: any) => {
    console.log('Filters changed:', filters);
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  return (
    <div>
      <Hero
        pages={[{ title: "Yacht Rental", href: "/boat-rental" }]}
        title="Boat Rental"
      />
      
      <div className='container flex flex-col lg:flex-row gap-6 lg:gap-10 py-8'>
        <div className='w-full md:w-64 xl:w-80 lg:flex-shrink-0'>
          <div className="sticky top-4">
            <BoatFilters onFiltersChange={handleFiltersChange} />
          </div>
        </div>

        <div className='w-full lg:flex-1'>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-text-color">Available Boats</h2>
              <div className="text-sm text-muted-foreground">
                Showing all boats
              </div>
            </div>
            
            <BoatSearch onSearch={handleSearch} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <Yacth key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoatRentalPage
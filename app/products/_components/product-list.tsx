"use client";

// hooks
import React, { useEffect, useState } from "react";

// components
import BoatFilters from "@/components/boat-filters";
import Yacth from "@/components/card/yacth";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Icons
import { Search } from 'lucide-react';
import { useDebounce } from 'use-debounce';

const ProductsPage:React.FC<{products: any[], filters: any}> = ({products, filters}) => {
  
  const [filteredItems, setFilteredItems] = useState<any[]>(products || []);
  const [keyword, setKeyword] = useState<string>('')
  const [debouncedKeyword] = useDebounce(keyword, 300);


  const applyFilters = (newFilters: Record<string, string[]> | Record<string, string>) => {
    if ( Object.keys(newFilters).length === 0) {
      setFilteredItems(products);
      return;
    }

    setFilteredItems(products.filter((product: any) => {
      return Object.entries(newFilters).every(([key, value]) => {
        if (key == 'price-range') {
          const [min, max] = value;
          return product.daily_price >= parseFloat(min) && product.daily_price <= parseFloat(max);
        }
        else if (key == 'keyword') {
          return product.name.toLowerCase().includes(value.toLowerCase()) || product.about?.toLowerCase().includes(value.toLowerCase()) || product.crew?.toLowerCase().includes(value.toLowerCase());
        }
        else {
          if (!value || value.length === 0) return true;
          
          return value.some((range: string) => {
            const [min, max] = range.split('-').map(parseFloat);
            const itemValue = parseFloat(product[key]);
            return itemValue >= min && itemValue <= max;
          });
        }
      })
    }));
  };

  return (
    <div>
      <div className="container flex flex-col lg:flex-row gap-6 lg:gap-10 py-8">
        <div className="hidden lg:block w-full lg:w-64 xl:w-80 lg:flex-shrink-0">
          <div className="sticky top-4 w-full">
            {filters && filters.length > 0 && <BoatFilters onFiltersChange={(f) => applyFilters(f)} initialFilters={filters} keyword={debouncedKeyword} setKeyword={setKeyword} />}
          </div>
        </div>

        <div className="w-full lg:flex-1">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-text-color">
                Available Boats
              </h2>
              <div className="text-sm text-muted-foreground">
                {filteredItems?.length ?? 0} results
              </div>
            </div>

            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search boats by name, type, or features..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="pl-10 h-12 sm:h-14 lg:h-[60px] w-full"
                />
              </div>
              <Button type="submit" size="lg">
                Search
              </Button>
            </div>

            <div className="lg:hidden">
              {filters && filters.length > 0 && <BoatFilters onFiltersChange={(f) => applyFilters(f)} initialFilters={filters} keyword={debouncedKeyword} setKeyword={setKeyword} />}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredItems.length > 0 ? filteredItems.map((p: any, index: number) => (
                <Yacth
                  key={`${p.id}-${index}`}
                  id={p.id}
                  image={p.image}
                  name={p.name}
                  capacityText={p.capacity ? `${p.capacity} Guest` : undefined}
                  personnelText={
                    p.personnel ? `${p.personnel} Personnel` : undefined
                  }
                  widthText={p.width ? `${p.width} ft` : undefined}
                  about={p.about}
                  dailyPrice={p.daily_price}
                />
              )): <div>No results found</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ProductsPage;
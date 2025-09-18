"use client";

import React, { useEffect, useState } from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetClose, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { FilterIcon, Trash2 } from 'lucide-react';
import { FilterItem } from '@/types';
import { DualRangeSlider } from './ui/dual-range-slider';
import { useDebounce } from 'use-debounce';
import { Input } from './ui/input';

interface BoatFiltersProps {
  onFiltersChange?: (filters: Record<string, any>) => void;
  className?: string;
  initialFilters?: FilterItem[];
}

const FilterContent = ({ filters, priceRange, setPriceRange, maxPrice, appliedFilters, handleFilterChange, clearAllFilters }: {
  filters: FilterItem[];
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  maxPrice: number;
  appliedFilters: Record<string, any>;
  handleFilterChange: (filterId: string, value: string, checked: boolean) => void;
  clearAllFilters?: () => void;
}) => (
    <div className="p-4 pt-0 h-[calc(100vh-40px)] pb-20 overflow-y-auto">
      <div className="items-center justify-between hidden lg:flex">
        <h3 className="text-xl font-semibold text-text-color">
          Filters
        </h3>
        {(Object.keys(appliedFilters).length > 0 || priceRange[0] !== 0 || priceRange[1] !== maxPrice) && (
          <Button variant="outline" size='sm' onClick={() => clearAllFilters?.() }>
            <Trash2 className="w-4 h-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={filters?.map((filter) => filter.id) ?? []}
      >
        {filters?.map((filterItem, index) => (
          <AccordionItem
            key={index}
            value={filterItem.id}
            className="border-b border-gray-300"
          >
            <AccordionTrigger className="text-left">
              <div className="flex items-center justify-between w-full">
                <span>{filterItem.label}</span>
                {appliedFilters[filterItem.id]?.length > 0 && (
                  <span className="ml-2 text-xs bg-accent-500 text-white px-2 py-1 rounded-full">
                    {appliedFilters[filterItem.id]?.length}
                  </span>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="*:py-1.5 pt-2 relative">
                {filterItem.type === 'range' && typeof filterItem.items === 'object' && 'min' in filterItem.items ? (
                  <div className="space-y-4 py-2">
                    <div className="flex gap-1 items-center">
                      <Input
                        className='w-full'
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange?.[1] ?? 0])} 
                        value={priceRange?.[0] ?? 0}
                      />
                      <div>-</div>
                      <Input
                        className='w-full'
                        onChange={(e) => setPriceRange([priceRange?.[0] ?? 0, Number(e.target.value)])} 
                        value={priceRange?.[1] ?? 0}
                      />
                    </div>
                    <div className="relative px-2">
                      <DualRangeSlider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        min={0}
                        max={maxPrice}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                ) : ( 
                  Array.isArray(filterItem.items) && filterItem.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        className='max-lg:size-5 !cursor-pointer'
                        id={item.id}
                        checked={appliedFilters[filterItem.id]?.includes(item.value as string) || false}
                        onCheckedChange={(checked) =>
                          handleFilterChange(
                            filterItem.id,
                            item.value as string,
                            checked as boolean
                          )
                        }
                      />
                      <label
                        htmlFor={item.id}
                        className="text-base text-gray-700 lg:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {item.label}
                      </label>
                    </div>
                  ))
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
);

export default function BoatFilters({ onFiltersChange, className, initialFilters }: BoatFiltersProps) {
  const [filters] = useState<FilterItem[]>(initialFilters as FilterItem[] );
  const maxPrice = (filters?.find(f => f.id === 'price-range')?.items as { max: number })?.max || 1000000;
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [debouncedValue] = useDebounce(priceRange, 300);
  const [appliedFilters, setAppliedFilters] = useState<Record<string, any>>({});

  const clearAllFilters = () => {
    setAppliedFilters({});
    setPriceRange([0, maxPrice]);
    onFiltersChange?.({});
  };

  // Handle filter changes for checkboxes
  const handleFilterChange = (filterId: string, value: string, checked: boolean) => {
    setAppliedFilters(prev => {
      const currentValues = prev[filterId] || [];
      let newValues;
      
      if (checked) {
        newValues = [...currentValues, value];
      } else {
        newValues = currentValues.filter((v: string) => v !== value);
      }
      
      if (newValues.length === 0) {
        const rest = { ...prev };
        delete rest[filterId];
        return rest;
      }

      return {
        ...prev,
        [filterId]: newValues
      };
    });
  };
  
  const handlePriceRangeChange = (newRange: number[]) => {
    setPriceRange(newRange);
  };

  useEffect(() => {
    const finalFilters = {
      ...appliedFilters,
      'price-range': debouncedValue
    };
    onFiltersChange?.(finalFilters);
  }, [appliedFilters, debouncedValue]);

  return (
    <div>
      {/* Desktop View */}
      <div className={`hidden lg:block ${className}`}>
        <FilterContent 
          filters={filters}
          priceRange={priceRange}
          setPriceRange={handlePriceRangeChange}
          maxPrice={maxPrice}
          appliedFilters={appliedFilters}
          handleFilterChange={handleFilterChange} 
          clearAllFilters={clearAllFilters}
        />
      </div>

      {/* Mobile View */}
      <div className="lg:hidden flex justify-end w-full">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-fit">
              <FilterIcon className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-white text-black w-full gap-0">
            <SheetHeader className='border-b'>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <FilterContent 
              filters={filters}
              priceRange={priceRange}
              setPriceRange={handlePriceRangeChange}
              maxPrice={maxPrice}
              appliedFilters={appliedFilters}
              handleFilterChange={handleFilterChange} 
              clearAllFilters={clearAllFilters}
            />

          <SheetClose className='absolute bottom-4 right-4 z-50'>
            <Button>Apply</Button>
          </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
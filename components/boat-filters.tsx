"use client";

import React, { useState } from 'react';
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
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { boatFilters, type BoatFilters, initialBoatFilters } from '@/lib/data/boat-filters';
import { X, Filter } from 'lucide-react';

interface BoatFiltersProps {
  onFiltersChange?: (filters: BoatFilters) => void;
  className?: string;
}

export default function BoatFilters({ onFiltersChange, className }: BoatFiltersProps) {
  const [filters, setFilters] = useState<BoatFilters>(initialBoatFilters);

  const handleFilterChange = (category: keyof BoatFilters, value: string, checked: boolean) => {
    const newFilters = { ...filters };
    
    if (checked) {
      newFilters[category] = [...newFilters[category], value];
    } else {
      newFilters[category] = newFilters[category].filter(item => item !== value);
    }
    
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearAllFilters = () => {
    setFilters(initialBoatFilters);
    onFiltersChange?.(initialBoatFilters);
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).reduce((total, category) => total + category.length, 0);
  };

  const FilterContent = () => (
    <div className="space-y-4 overflow-y-auto p-4 pt-0">
      <div className="flex items-center justify-between">
        <h3 className="hidden lg:block text-lg font-semibold text-text-color">
          Filters
        </h3>
        {getActiveFiltersCount() > 0 && (
          <Button onClick={clearAllFilters}>
            <X className="w-4 h-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <Accordion
        defaultValue={boatFilters.map((filter) => filter.id)}
        type="multiple"
        className="w-full"
      >
        {boatFilters.map((category) => (
          <AccordionItem
            key={category.id}
            value={category.id}
            className="border-b border-gray-300"
          >
            <AccordionTrigger className="text-left">
              <div className="flex items-center justify-between w-full">
                <span>{category.title}</span>
                {filters[category.id as keyof BoatFilters]?.length > 0 && (
                  <span className="ml-2 text-xs bg-accent text-white px-2 py-1 rounded-full">
                    {filters[category.id as keyof BoatFilters].length}
                  </span>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                {category.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      className='max-lg:size-5'
                      id={option.id}
                      checked={filters[
                        category.id as keyof BoatFilters
                      ]?.includes(option.value as string)}
                      onCheckedChange={(checked) =>
                        handleFilterChange(
                          category.id as keyof BoatFilters,
                          option.value as string,
                          checked as boolean
                        )
                      }
                    />
                    <label
                      htmlFor={option.id}
                      className="text-base lg:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );

  return (
    <>
      {/* Desktop View */}
      <div className={`hidden lg:block ${className}`}>
        <FilterContent />
      </div>

      {/* Mobile View */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              radius="md"
              className="w-full justify-start"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {getActiveFiltersCount() > 0 && (
                <span className="ml-2 text-xs bg-accent text-white py-1 rounded-full">
                  {getActiveFiltersCount()}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-white text-black w-full">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <FilterContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
} 
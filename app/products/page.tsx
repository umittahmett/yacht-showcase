"use client";

// hooks
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// components
import BoatFilters from "@/components/boat-filters";
import BoatSearch from "@/components/boat-search";
import Yacth from "@/components/card/yacth";
import ProductsPageSkeleton from "@/components/skeleton/products-page-skeleton";

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [filters, setFilters] = useState<any[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const getProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products${searchParams.get('q') ? `?q=${searchParams.get('q')}` : ''}`, { signal: controller.signal });
        const { data, filters } = await res.json();
        setItems(data);
        setFilteredItems(data);
        setFilters(filters);
      } catch (e: any) {
        if (e.name !== 'AbortError') {
          console.log("Error fetching products: ", e);
        }
      }
    };
    
    getProducts()
    return () => controller.abort()
  }, [searchParams]);

  const applyFilters = (newFilters: Record<string, string[]>) => {
    if ( Object.keys(newFilters).length === 0) {
      setFilteredItems(items);
      return;
    }

    setFilteredItems(items.filter((item) => {
      return Object.entries(newFilters).every(([key, value]) => {
        if (key == 'price-range') {
          const [min, max] = value;
          return item.daily_price >= parseFloat(min) && item.daily_price <= parseFloat(max);
        }
        else {
          if (!value || value.length === 0) return true;
          
          return value.some((range: string) => {
            const [min, max] = range.split('-').map(parseFloat);
            const itemValue = parseFloat(item[key]);
            return itemValue >= min && itemValue <= max;
          });
        }
      })
    }));
  };

  const handleSearch = (query: string) => {
    router.replace(`/products?q=${query}`);
  };

  if (!items || items.length === 0) {
    return <ProductsPageSkeleton />
  }

  return (
    <div>
      <div className="container flex flex-col lg:flex-row gap-6 lg:gap-10 py-8">
        <div className="hidden lg:block w-full lg:w-64 xl:w-80 lg:flex-shrink-0">
          <div className="sticky top-4 w-full">
            {filters && filters.length > 0 && <BoatFilters onFiltersChange={(f) => applyFilters(f)} initialFilters={filters} />}
          </div>
        </div>

        <div className="w-full lg:flex-1">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-text-color">
                Available Boats
              </h2>
              <div className="text-sm text-muted-foreground">
                {items?.length ?? 0} results
              </div>
            </div>

            <BoatSearch onSearch={handleSearch} initialQuery={searchParams.get('q') ?? ''} />

            <div className="lg:hidden">
              {filters && filters.length > 0 && <BoatFilters onFiltersChange={(f) => applyFilters(f)} initialFilters={filters} />}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredItems?.map((p) => (
                <Yacth
                  key={p.id}
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ProductsPage;

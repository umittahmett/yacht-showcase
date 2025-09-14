"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface BoatSearchProps {
  onSearch?: (query: string) => void;
  className?: string;
  initialQuery?: string;
}

export default function   BoatSearch({ onSearch, className, initialQuery }: BoatSearchProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery ?? '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className={`flex gap-4 ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search boats by name, type, or features..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 sm:h-14 lg:h-[60px] w-full"
        />
      </div>
      <Button type="submit" size="lg">
        Search
      </Button>
    </form>
  );
} 
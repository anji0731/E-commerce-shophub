'use client';

import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilterOptions {
  priceRange: [number, number];
  brands: string[];
  ratings: number[];
  sortBy: 'price-low' | 'price-high' | 'popularity' | 'newest' | 'rating';
}

interface ProductFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  availableBrands: string[];
  maxPrice: number;
}

export function ProductFilters({ onFilterChange, availableBrands, maxPrice }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'popularity' | 'newest' | 'rating'>(
    'popularity'
  );
  const [expandedSection, setExpandedSection] = useState<string | null>('price');
  const [isOpen, setIsOpen] = useState(false);

  const handlePriceChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
    updateFilters({ priceRange: newRange, brands: selectedBrands, ratings: selectedRatings, sortBy });
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(newBrands);
    updateFilters({ priceRange, brands: newBrands, ratings: selectedRatings, sortBy });
  };

  const handleRatingChange = (rating: number) => {
    const newRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter((r) => r !== rating)
      : [...selectedRatings, rating];
    setSelectedRatings(newRatings);
    updateFilters({ priceRange, brands: selectedBrands, ratings: newRatings, sortBy });
  };

  const handleSortChange = (newSort: typeof sortBy) => {
    setSortBy(newSort);
    updateFilters({ priceRange, brands: selectedBrands, ratings: selectedRatings, sortBy: newSort });
  };

  const updateFilters = (filters: FilterOptions) => {
    onFilterChange(filters);
  };

  const hasActiveFilters = selectedBrands.length > 0 || selectedRatings.length > 0 || 
    priceRange[0] !== 0 || priceRange[1] !== maxPrice;

  const resetFilters = () => {
    setPriceRange([0, maxPrice]);
    setSelectedBrands([]);
    setSelectedRatings([]);
    setSortBy('popularity');
    updateFilters({ priceRange: [0, maxPrice], brands: [], ratings: [], sortBy: 'popularity' });
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-secondary hover:bg-secondary text-foreground font-medium"
        >
          {isOpen ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      {/* Filters Container */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block space-y-6`}>
        {/* Sort By */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedSection(expandedSection === 'sort' ? null : 'sort')}>
            <h3 className="font-semibold text-foreground">Sort By</h3>
            <ChevronDown
              className={`w-5 h-5 text-muted-foreground transition-transform ${
                expandedSection === 'sort' ? 'rotate-180' : ''
              }`}
            />
          </div>
          {expandedSection === 'sort' && (
            <div className="mt-4 space-y-2">
              {[
                { value: 'popularity', label: 'Most Popular' },
                { value: 'price-low', label: 'Price: Low to High' },
                { value: 'price-high', label: 'Price: High to Low' },
                { value: 'newest', label: 'Newest' },
                { value: 'rating', label: 'Highest Rated' },
              ].map(({ value, label }) => (
                <label key={value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sort"
                    value={value}
                    checked={sortBy === value}
                    onChange={() => handleSortChange(value as typeof sortBy)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-foreground">{label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setExpandedSection(expandedSection === 'price' ? null : 'price')}
          >
            <h3 className="font-semibold text-foreground">Price Range</h3>
            <ChevronDown
              className={`w-5 h-5 text-muted-foreground transition-transform ${
                expandedSection === 'price' ? 'rotate-180' : ''
              }`}
            />
          </div>
          {expandedSection === 'price' && (
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2 text-sm">
                <span className="text-muted-foreground">
                  ${priceRange[0]} - ${priceRange[1]}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Brands */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setExpandedSection(expandedSection === 'brands' ? null : 'brands')}
          >
            <h3 className="font-semibold text-foreground">Brand</h3>
            <ChevronDown
              className={`w-5 h-5 text-muted-foreground transition-transform ${
                expandedSection === 'brands' ? 'rotate-180' : ''
              }`}
            />
          </div>
          {expandedSection === 'brands' && (
            <div className="mt-4 space-y-2">
              {availableBrands.map((brand) => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-foreground">{brand}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Ratings */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setExpandedSection(expandedSection === 'rating' ? null : 'rating')}
          >
            <h3 className="font-semibold text-foreground">Customer Rating</h3>
            <ChevronDown
              className={`w-5 h-5 text-muted-foreground transition-transform ${
                expandedSection === 'rating' ? 'rotate-180' : ''
              }`}
            />
          </div>
          {expandedSection === 'rating' && (
            <div className="mt-4 space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(rating)}
                    onChange={() => handleRatingChange(rating)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-foreground">
                    {rating}★ & above
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Reset Filters */}
        {hasActiveFilters && (
          <Button
            onClick={resetFilters}
            className="w-full bg-secondary hover:bg-secondary text-foreground font-medium"
          >
            Reset Filters
          </Button>
        )}
      </div>
    </>
  );
}

'use client';

import { useState, useMemo } from 'react';
import { Suspense } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';
import { products } from '@/lib/data';
import { Filters, Product } from '@/lib/types';
import { Grid3x3, Loader2 } from 'lucide-react';

function ProductsContent({ searchParams }: { searchParams: { category?: string; search?: string } }) {
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 500],
    brands: [],
    ratings: [],
    sortBy: 'popularity',
  });

  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  // Get unique brands
  const availableBrands = Array.from(new Set(products.map((p) => p.brand)));
  const maxPrice = Math.max(...products.map((p) => p.price));

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    const category = searchParams.category;
    if (category) {
      result = result.filter((p) => p.category === category);
    }

    // Filter by search
    const search = searchParams.search;
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.brand.toLowerCase().includes(searchLower)
      );
    }

    // Filter by price range
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Filter by brands
    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }

    // Filter by ratings
    if (filters.ratings.length > 0) {
      result = result.filter((p) => filters.ratings.some((r) => p.rating >= r));
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.reverse();
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
      default:
        result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [filters, searchParams.category, searchParams.search]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
        <a href="/" className="hover:text-primary transition">
          Home
        </a>
        <span>/</span>
        <span className="text-foreground font-medium">
          {searchParams.category || 'All Products'}
        </span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          {searchParams.category ? `${searchParams.category} Products` : 'All Products'}
        </h1>
        <p className="text-muted-foreground">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <aside className="md:col-span-1">
          <ProductFilters
            onFilterChange={setFilters}
            availableBrands={availableBrands}
            maxPrice={maxPrice}
          />
        </aside>

        {/* Products Grid */}
        <main className="md:col-span-3">
          {filteredProducts.length > 0 ? (
            <>
              {/* View Type Toggle */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setViewType('grid')}
                  className={`px-4 py-2 rounded-l-lg border border-border ${
                    viewType === 'grid'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-foreground hover:bg-secondary'
                  }`}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
              </div>

              {/* Products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="mb-4 text-6xl opacity-50">🔍</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">No Products Found</h2>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search terms to find what you're looking for.
              </p>
              <a
                href="/products"
                className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition"
              >
                View All Products
              </a>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  return (
    <Suspense fallback={<ProductsLoadingFallback />}>
      <ProductsContent searchParams={searchParams} />
    </Suspense>
  );
}

function ProductsLoadingFallback() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex items-center justify-center min-h-96">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Loading products...</p>
      </div>
    </div>
  );
}

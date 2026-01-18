'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@/lib/types';
import { useApp } from '@/lib/context';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  showBadge?: boolean;
}

export function ProductCard({ product, showBadge = false }: ProductCardProps) {
  const { addToCart, isInWishlist, addToWishlist, removeFromWishlist } = useApp();
  const [quantity, setQuantity] = useState(1);
  const isFavorite = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  const handleWishlist = () => {
    if (isFavorite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <div className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden bg-secondary h-48 sm:h-56">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {discount > 0 && (
              <div className="bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded">
                {discount}% OFF
              </div>
            )}
            {showBadge && (
              <div className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
                Deal
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleWishlist();
            }}
            className="absolute top-3 left-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite
                  ? 'fill-destructive text-destructive'
                  : 'text-muted-foreground hover:text-destructive'
              }`}
            />
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Brand */}
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
          {product.brand}
        </p>

        {/* Product Name */}
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Stock Status */}
        <p
          className={`text-xs font-medium mb-3 ${
            product.inStock ? 'text-green-600' : 'text-destructive'
          }`}
        >
          {product.inStock ? '✓ In Stock' : 'Out of Stock'}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <select
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="px-2 py-1 border border-border rounded text-sm bg-background text-foreground"
            disabled={!product.inStock}
          >
            {[1, 2, 3, 4, 5].map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 rounded flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

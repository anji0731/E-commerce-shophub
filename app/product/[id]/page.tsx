'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/context';
import { products } from '@/lib/data';
import { Star, Heart, ShoppingCart, ChevronLeft, Share2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { addToCart, isInWishlist, addToWishlist, removeFromWishlist } = useApp();
  const isFavorite = isInWishlist(product?.id || '');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 text-center">
        <div className="mb-4 text-6xl opacity-50">🔍</div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/products" className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition">
          Back to Products
        </Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
    setQuantity(1);
  };

  const handleWishlist = () => {
    if (isFavorite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const imageUrls = product.images || [product.image];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary transition">
            Products
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-secondary rounded-lg overflow-hidden h-96 flex items-center justify-center">
              {!imageError ? (
                <img
                  src={imageUrls[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  <div className="text-6xl mb-2">📦</div>
                  <p>Image not available</p>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {imageUrls.length > 1 && (
              <div className="flex gap-2">
                {imageUrls.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                      idx === selectedImage
                        ? 'border-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img src={img || "/placeholder.svg"} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div>
            {/* Brand */}
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              {product.brand}
            </p>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
              </div>
              <span className="text-foreground font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6 p-4 bg-secondary rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="bg-destructive text-destructive-foreground text-sm font-bold px-3 py-1 rounded">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-sm text-green-600 font-medium">
                  You save ${(product.originalPrice - product.price).toFixed(2)}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-foreground mb-6 leading-relaxed text-lg">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className={`mb-6 p-3 rounded-lg font-medium flex items-center gap-2 ${
              product.inStock
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {product.inStock ? (
                <>
                  <Check className="w-5 h-5" />
                  In Stock - Free shipping on orders over $50
                </>
              ) : (
                <>
                  <span>Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="mb-6 flex items-center gap-4">
              <label className="font-medium text-foreground">Quantity:</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                disabled={!product.inStock}
                className="px-4 py-2 border border-border rounded-lg bg-background text-foreground font-medium"
              >
                {Array(10)
                  .fill(0)
                  .map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition text-lg ${
                  isAddedToCart
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                }`}
              >
                {isAddedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </Button>
              <button
                onClick={handleWishlist}
                className="px-6 py-3 border-2 border-border rounded-lg hover:border-primary transition text-foreground hover:text-primary font-medium"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isFavorite ? 'fill-destructive text-destructive' : ''
                  }`}
                />
              </button>
              <button className="px-6 py-3 border-2 border-border rounded-lg hover:border-primary transition text-foreground hover:text-primary font-medium">
                <Share2 className="w-6 h-6" />
              </button>
            </div>

            {/* Additional Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>✓ 30-day return policy</p>
              <p>✓ Secure checkout with SSL encryption</p>
              <p>✓ 24/7 customer support</p>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {product.specifications && (
          <div className="mb-16 border-t border-border pt-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="bg-card border border-border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground font-medium mb-1">{key}</p>
                  <p className="text-foreground font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-border pt-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { HeroCarousel } from '@/components/HeroCarousel';
import { categories, products } from '@/lib/data';

export default function Home() {
  const featuredProducts = products.slice(0, 6);
  const dealsOfTheDay = products.filter((p) => p.originalPrice).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-balance">
              Discover Premium Products
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-md">
              Shop from thousands of amazing products across electronics, fashion, home, and more. Premium quality guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg py-3 px-8 flex items-center gap-2 justify-center">
                  Start Shopping
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/products">
                <Button className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold rounded-lg py-3 px-8">
                  Explore Deals
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image Carousel */}
          <HeroCarousel />
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.name}`}
              className="group"
            >
              <div className="bg-card hover:bg-secondary rounded-lg p-6 text-center transition-all duration-300 transform group-hover:scale-105 border border-border">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 bg-secondary/30 rounded-xl margin-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">Featured Products</h2>
          <Link href="/products">
            <Button className="hidden sm:inline-flex bg-transparent" variant="outline">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Deals of the Day */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="mb-8">
          <div className="inline-block bg-accent text-accent-foreground text-sm font-bold px-4 py-2 rounded-full mb-4">
            Limited Time Offers
          </div>
          <h2 className="text-3xl font-bold text-foreground">Deals of the Day</h2>
          <p className="text-muted-foreground mt-2">Grab these amazing deals before they're gone</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealsOfTheDay.map((product) => (
            <ProductCard key={product.id} product={product} showBadge />
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-primary text-primary-foreground py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">10M+</div>
            <p className="text-primary-foreground/90">Happy Customers</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">50K+</div>
            <p className="text-primary-foreground/90">Products</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">24/7</div>
            <p className="text-primary-foreground/90">Customer Support</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">100%</div>
            <p className="text-primary-foreground/90">Secure Checkout</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12 text-center border border-primary/20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Find Your Next Favorite Product?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join millions of customers shopping on ShopHub. Free shipping on orders over $50, easy returns, and best prices guaranteed.
          </p>
          <Link href="/products">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg py-3 px-8">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

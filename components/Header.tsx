'use client';

import React from "react"

import Link from 'next/link';
import { useState } from 'react';
import { useApp } from '@/lib/context';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Search, Menu, X, User } from 'lucide-react';

export function Header() {
  const { cart, wishlist, isLoggedIn, logout, searchProducts } = useApp();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    searchProducts(e.target.value);
  };

  const cartCount = cart.length;
  const wishlistCount = wishlist.length;

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      {/* Main Header */}
      <div className="bg-primary text-primary-foreground py-3 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/ShopHub.png"
              alt="ShopHub Logo"
              className="w-8 h-8  object-contain"
            />
            <span className="font-bold text-lg hidden sm:inline">ShopHub</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 mx-6">
            <div className="w-full max-w-md relative">
              <input
                type="text"
                placeholder="Search products, brands, and more..."
                className="w-full px-4 py-2 rounded-lg bg-primary-foreground text-foreground placeholder:text-muted-foreground outline-none"
                value={searchQuery}
                onChange={handleSearch}
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link href="/profile" className="hover:text-accent transition">
                  <User className="w-5 h-5" />
                </Link>
                <button
                  onClick={logout}
                  className="text-sm font-medium hover:text-accent transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-accent transition">
                  Login
                </Link>
                <Link href="/signup" className="hover:text-accent transition">
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 py-3 bg-secondary">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-lg bg-background text-foreground outline-none border border-border"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Secondary Header */}
      <div className="hidden md:block bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <nav className="flex items-center gap-8">
            <Link
              href="/products"
              className="text-sm font-medium text-foreground hover:text-primary transition"
            >
              All Products
            </Link>
            <Link
              href="/products?category=Electronics"
              className="text-sm font-medium text-foreground hover:text-primary transition"
            >
              Electronics
            </Link>
            <Link
              href="/products?category=Fashion"
              className="text-sm font-medium text-foreground hover:text-primary transition"
            >
              Fashion
            </Link>
            <Link
              href="/products?category=Home & Kitchen"
              className="text-sm font-medium text-foreground hover:text-primary transition"
            >
              Home
            </Link>
          </nav>

          {/* Cart & Wishlist Icons */}
          <div className="flex items-center gap-6">
            <Link href="/wishlist" className="relative group">
              <Heart className="w-5 h-5 text-foreground group-hover:text-primary transition" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative group">
              <ShoppingCart className="w-5 h-5 text-foreground group-hover:text-primary transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="flex flex-col gap-3 p-4">
            <Link
              href="/products"
              className="px-4 py-2 hover:bg-secondary rounded-lg transition"
            >
              All Products
            </Link>
            <Link
              href="/cart"
              className="px-4 py-2 flex items-center gap-2 hover:bg-secondary rounded-lg transition"
            >
              <ShoppingCart className="w-4 h-4" />
              Cart {cartCount > 0 && `(${cartCount})`}
            </Link>
            <Link
              href="/wishlist"
              className="px-4 py-2 flex items-center gap-2 hover:bg-secondary rounded-lg transition"
            >
              <Heart className="w-4 h-4" />
              Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
            </Link>
            {isLoggedIn ? (
              <>
                <Link href="/profile" className="px-4 py-2 hover:bg-secondary rounded-lg transition">
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 text-left hover:bg-secondary rounded-lg transition text-destructive"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 hover:bg-secondary rounded-lg transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 hover:bg-secondary rounded-lg transition text-primary font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

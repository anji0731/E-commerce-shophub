'use client';

import React from "react"
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { Truck, Package, CheckCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Loading from './loading';

export default function TrackOrderPage() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || '';
  const [searchOrderId, setSearchOrderId] = useState(initialOrderId);
  const [isSearching, setIsSearching] = useState(false);
  const [orderFound, setOrderFound] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchOrderId.trim()) {
      setIsSearching(true);
      setTimeout(() => {
        setIsSearching(false);
        setOrderFound(true);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">Track Order</span>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Track Your Order</h1>
          <p className="text-muted-foreground">Enter your order ID to see the current status</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-12">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchOrderId}
                onChange={(e) => setSearchOrderId(e.target.value)}
                placeholder="Enter your order ID (e.g., ORD001)"
                className="w-full pl-12 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
              />
            </div>
            <Button
              type="submit"
              disabled={isSearching}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 rounded-lg transition"
            >
              {isSearching ? 'Searching...' : 'Track'}
            </Button>
          </div>
        </form>

        {/* Results */}
        {orderFound && (
          <div className="bg-card border border-border rounded-lg p-8 space-y-8">
            {/* Order Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                <p className="text-lg font-bold text-foreground">{searchOrderId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                <p className="text-lg font-bold text-foreground">Jan 15, 2024</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                <p className="text-lg font-bold text-foreground">Jan 20, 2024</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="border-t border-border pt-8">
              <h2 className="text-xl font-bold text-foreground mb-6">Order Timeline</h2>
              <div className="space-y-6">
                {/* Confirmed */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white mb-2">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div className="w-0.5 h-12 bg-green-600 mb-2"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Order Confirmed</p>
                    <p className="text-sm text-muted-foreground">January 15, 2024 at 10:30 AM</p>
                    <p className="text-sm text-foreground mt-1">Your order has been received and confirmed.</p>
                  </div>
                </div>

                {/* Processing */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white mb-2">
                      <Package className="w-6 h-6" />
                    </div>
                    <div className="w-0.5 h-12 bg-green-600 mb-2"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Processing</p>
                    <p className="text-sm text-muted-foreground">January 16, 2024 at 2:15 PM</p>
                    <p className="text-sm text-foreground mt-1">Your order is being prepared for shipment.</p>
                  </div>
                </div>

                {/* Shipped */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white mb-2">
                      <Truck className="w-6 h-6" />
                    </div>
                    <div className="w-0.5 h-12 bg-gray-300 mb-2"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">In Transit</p>
                    <p className="text-sm text-muted-foreground">Expected January 19, 2024</p>
                    <p className="text-sm text-foreground mt-1">Your order is on its way and will arrive soon.</p>
                  </div>
                </div>

                {/* Delivery */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 mb-2">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Delivered</p>
                    <p className="text-sm text-muted-foreground">Expected January 20, 2024</p>
                    <p className="text-sm text-foreground mt-1">Your order will be delivered on this date.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracking Info */}
            <div className="border-t border-border pt-8 bg-secondary rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Tracking Number</p>
              <p className="text-lg font-bold text-foreground font-mono">TRK123456789</p>
              <a
                href="#"
                className="text-sm text-primary font-medium hover:text-primary/80 transition block mt-3"
              >
                View detailed tracking →
              </a>
            </div>
          </div>
        )}

        {/* Info Box */}
        {!orderFound && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-sm text-blue-800">
              Don't have your order ID? You can find it in your confirmation email or in your account under "Orders".
            </p>
            <Link href="/profile" className="text-sm text-primary font-medium hover:text-primary/80 transition block mt-3">
              Go to My Account →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

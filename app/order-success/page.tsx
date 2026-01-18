'use client';

import Link from 'next/link';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OrderSuccessPage() {
  const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-100 rounded-full blur-lg opacity-50"></div>
            <CheckCircle className="w-20 h-20 text-green-600 relative" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your purchase. We're processing your order.
        </p>

        {/* Order Details */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Order Number</p>
            <p className="text-lg font-bold text-foreground">{orderId}</p>
          </div>
          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
            <p className="text-lg font-bold text-foreground">
              {estimatedDelivery.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-4">
            <Package className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div className="text-left">
              <p className="font-semibold text-foreground">Order Confirmed</p>
              <p className="text-sm text-muted-foreground">We've received your order</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Truck className="w-6 h-6 text-muted-foreground flex-shrink-0 mt-1" />
            <div className="text-left">
              <p className="font-semibold text-foreground">In Transit</p>
              <p className="text-sm text-muted-foreground">Coming soon</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Home className="w-6 h-6 text-muted-foreground flex-shrink-0 mt-1" />
            <div className="text-left">
              <p className="font-semibold text-foreground">Delivered</p>
              <p className="text-sm text-muted-foreground">Arriving by {estimatedDelivery.toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground mb-4">
            A confirmation email has been sent to your email address.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/products">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/profile">
              <Button className="w-full bg-secondary hover:bg-secondary text-foreground font-semibold">
                View My Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

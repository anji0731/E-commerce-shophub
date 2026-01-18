'use client';

import Link from 'next/link';
import { useApp } from '@/lib/context';
import { Package, Clock, CheckCircle, Truck } from 'lucide-react';

export default function OrdersPage() {
  const { isLoggedIn, user } = useApp();

  // Mock orders data
  const mockOrders = [
    {
      id: 'ORD001',
      date: '2024-01-15',
      total: 299.99,
      status: 'delivered',
      items: 3,
    },
    {
      id: 'ORD002',
      date: '2024-01-10',
      total: 159.99,
      status: 'shipped',
      items: 2,
    },
    {
      id: 'ORD003',
      date: '2024-01-05',
      total: 449.99,
      status: 'processing',
      items: 5,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Login Required</h1>
          <p className="text-muted-foreground mb-8">Please login to view your orders.</p>
          <Link href="/login" className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/profile" className="hover:text-primary transition">
            Profile
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">Orders</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">My Orders</h1>

        {mockOrders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-foreground mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-8">Start shopping to place your first order.</p>
            <Link href="/products" className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <Link key={order.id} href={`/orders/${order.id}`}>
                <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition cursor-pointer">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Order ID</p>
                      <p className="text-lg font-semibold text-foreground">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="text-lg font-semibold text-foreground">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Items</p>
                      <p className="text-lg font-semibold text-foreground">{order.items} items</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-lg font-semibold text-primary">${order.total.toFixed(2)}</p>
                    </div>
                    <div className="flex items-end justify-between md:justify-end">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span
                          className={`font-semibold ${
                            order.status === 'delivered'
                              ? 'text-green-600'
                              : order.status === 'shipped'
                              ? 'text-blue-600'
                              : 'text-yellow-600'
                          }`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

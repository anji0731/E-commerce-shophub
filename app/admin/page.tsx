'use client';

import Link from 'next/link';
import { useState } from 'react';
import { products } from '@/lib/data';
import { Edit2, Trash2, Plus, BarChart3, ShoppingCart, Users, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const [showProductForm, setShowProductForm] = useState(false);

  const mockOrders = [
    { id: 'ORD001', customer: 'John Doe', total: 299.99, status: 'shipped' },
    { id: 'ORD002', customer: 'Jane Smith', total: 159.99, status: 'processing' },
    { id: 'ORD003', customer: 'Bob Johnson', total: 449.99, status: 'delivered' },
  ];

  const stats = [
    { label: 'Total Products', value: products.length, icon: ShoppingCart },
    { label: 'Total Orders', value: '156', icon: Truck },
    { label: 'Total Revenue', value: '$12,450', icon: BarChart3 },
    { label: 'Total Customers', value: '1,234', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Admin Dashboard</h1>
          <Link href="/">
            <Button className="bg-secondary hover:bg-secondary text-foreground font-semibold">
              Back to Store
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products Management */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Product Management</h2>
                <Button
                  onClick={() => setShowProductForm(!showProductForm)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </Button>
              </div>

              {showProductForm && (
                <div className="bg-secondary rounded-lg p-4 mb-6 space-y-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                  <textarea
                    placeholder="Description"
                    rows={3}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground resize-none"
                  />
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                      Save Product
                    </Button>
                    <Button
                      onClick={() => setShowProductForm(false)}
                      className="flex-1 bg-secondary hover:bg-secondary text-foreground font-semibold"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Products Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Product</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Price</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Stock</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.slice(0, 5).map((product) => (
                      <tr key={product.id} className="border-b border-border hover:bg-secondary transition">
                        <td className="py-3 px-4">
                          <p className="font-medium text-foreground line-clamp-1">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.brand}</p>
                        </td>
                        <td className="py-3 px-4 text-foreground">${product.price.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-destructive'}`}>
                            {product.inStock ? 'In Stock' : 'Out'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="p-1 hover:bg-secondary rounded transition text-primary">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="p-1 hover:bg-secondary rounded transition text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Recent Orders</h2>
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div key={order.id} className="p-3 bg-secondary rounded-lg">
                  <p className="font-semibold text-foreground text-sm">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.customer}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium text-primary">${order.total.toFixed(2)}</span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        order.status === 'shipped'
                          ? 'bg-blue-100 text-blue-700'
                          : order.status === 'delivered'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

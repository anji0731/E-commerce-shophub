'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, MapPin, LogOut, Edit2, Heart, ShoppingBag, Settings } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useApp();

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Login Required</h1>
          <p className="text-muted-foreground mb-8">Please login to view your profile.</p>
          <Link href="/login">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">Profile</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">My Profile</h1>
          <Button
            onClick={handleLogout}
            className="bg-destructive hover:bg-destructive/90 text-white font-semibold flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="md:col-span-2 space-y-6">
            {/* User Details Card */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Account Information</h2>
                <button className="p-2 hover:bg-secondary rounded-lg transition">
                  <Edit2 className="w-5 h-5 text-primary" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-lg text-foreground font-medium">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <p className="text-lg text-foreground font-medium">{user.email}</p>
                </div>
                {user.phone && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone
                    </label>
                    <p className="text-lg text-foreground font-medium">{user.phone}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping Addresses */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <MapPin className="w-6 h-6" />
                  Shipping Addresses
                </h2>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition">
                  Add Address
                </button>
              </div>

              {user.addresses.length > 0 ? (
                <div className="space-y-4">
                  {user.addresses.map((addr) => (
                    <div key={addr.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-foreground">
                            {addr.street}, {addr.city}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {addr.state} {addr.zipCode}, {addr.country}
                          </p>
                        </div>
                        {addr.isDefault && (
                          <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button className="text-sm text-primary hover:text-primary/80 font-medium">Edit</button>
                        <span className="text-muted-foreground">•</span>
                        <button className="text-sm text-destructive hover:text-destructive/80 font-medium">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No addresses saved yet.</p>
              )}
            </div>
          </div>

          {/* Quick Links Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h3 className="font-bold text-foreground text-lg mb-4">Quick Links</h3>

              <Link href="/cart" className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg transition">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">My Cart</span>
              </Link>

              <Link href="/wishlist" className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg transition">
                <Heart className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">My Wishlist</span>
              </Link>

              <Link href="/orders" className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg transition">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">Orders</span>
              </Link>

              <button className="w-full flex items-center gap-3 p-3 hover:bg-secondary rounded-lg transition text-left">
                <Settings className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from "react"

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Lock } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, isLoggedIn, clearCart } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      return;
    }

    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      router.push('/order-success');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add items before checking out.</p>
          <Link href="/products">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <Lock className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Login Required</h1>
          <p className="text-muted-foreground mb-8">Please login to proceed with checkout.</p>
          <Link href="/login">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full mb-3">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-secondary hover:bg-secondary text-foreground font-semibold w-full">
              Create Account
            </Button>
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
          <Link href="/cart" className="hover:text-primary transition">
            Cart
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">Checkout</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2">
            <div className="space-y-8">
              {/* Shipping Address */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="col-span-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="col-span-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                  />
                  <input
                    type="text"
                    name="street"
                    placeholder="Street Address"
                    required
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="col-span-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="col-span-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP Code"
                      required
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="col-span-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                    />
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="col-span-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground outline-none focus:border-primary"
                    >
                      <option>USA</option>
                      <option>Canada</option>
                      <option>UK</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">Payment Method</h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span className="text-foreground font-medium">Credit / Debit Card</span>
                  </label>

                  {formData.paymentMethod === 'card' && (
                    <div className="mt-4 p-4 bg-secondary rounded-lg space-y-4">
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number (16 digits)"
                        required
                        pattern="\d{16}"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="cardExpiry"
                          placeholder="MM/YY"
                          pattern="\d{2}/\d{2}"
                          required
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          className="col-span-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                        />
                        <input
                          type="text"
                          name="cardCVC"
                          placeholder="CVC (3 digits)"
                          pattern="\d{3}"
                          required
                          value={formData.cardCVC}
                          onChange={handleInputChange}
                          className="col-span-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  )}

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span className="text-foreground font-medium">PayPal</span>
                  </label>
                </div>
              </div>
            </div>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24 space-y-4">
              <h2 className="text-xl font-bold text-foreground">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 max-h-64 overflow-y-auto border-b border-border pb-4">
                {cart.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm text-foreground">
                    <span className="line-clamp-2">{item.product.name}</span>
                    <span className="font-medium flex-shrink-0 ml-2">
                      x{item.quantity} ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 border-b border-border pb-4">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600 font-medium">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold text-foreground">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isProcessing}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg py-3 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Place Order
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Your payment information is secure and encrypted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

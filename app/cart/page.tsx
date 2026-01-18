'use client';

import Link from 'next/link';
import { useApp } from '@/lib/context';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal } = useApp();

  const subtotal = getCartTotal();
  const shipping = cart.length > 0 ? (subtotal > 50 ? 0 : 10) : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">Shopping Cart</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          // Empty Cart
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Add some amazing products to get started!
            </p>
            <Link href="/products">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg py-3 px-8 flex items-center gap-2 justify-center mx-auto">
                Continue Shopping
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        ) : (
          // Cart with items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="bg-card border border-border rounded-lg p-4 flex flex-col sm:flex-row gap-4"
                  >
                    {/* Product Image */}
                    <Link href={`/product/${item.productId}`}>
                      <div className="w-24 h-24 bg-secondary rounded-lg overflow-hidden flex-shrink-0 hover:opacity-80 transition">
                        <img
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1">
                      <Link
                        href={`/product/${item.productId}`}
                        className="font-semibold text-foreground hover:text-primary transition mb-2 block"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.product.brand}
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-primary">
                          ${item.product.price.toFixed(2)}
                        </span>
                        {item.product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${item.product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity and Remove */}
                    <div className="flex flex-col items-end justify-between sm:items-start">
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-destructive hover:text-destructive/80 transition p-2 -m-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          onClick={() =>
                            updateCartQuantity(item.productId, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="p-2 hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateCartQuantity(item.productId, item.quantity + 1)
                          }
                          disabled={item.quantity >= 10}
                          className="p-2 hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <span className="font-bold text-foreground mt-4">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/products" className="inline-block mt-6">
                <Button className="bg-secondary hover:bg-secondary text-foreground font-medium">
                  ← Continue Shopping
                </Button>
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24 space-y-4">
                <h2 className="text-xl font-bold text-foreground">Order Summary</h2>

                <div className="space-y-3 border-t border-border pt-4">
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

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-lg font-bold text-foreground mb-4">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {shipping > 0 && (
                  <p className="text-sm text-muted-foreground text-center bg-secondary p-3 rounded">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}

                <Link href="/checkout">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg py-3">
                    Proceed to Checkout
                  </Button>
                </Link>

                <p className="text-xs text-muted-foreground text-center">
                  Secure checkout with SSL encryption
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

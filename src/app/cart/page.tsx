'use client';

import { Plus, Minus, Trash2, ChevronRight, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function Cart() {
  const { items, removeItem, updateQuantity, totalItems, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="brutal-border p-12 md:p-16 bg-[var(--bg)] max-w-lg w-full">
          <ShoppingCart className="h-16 w-16 mx-auto mb-6 opacity-30" />
          <h2 className="font-display font-black text-4xl uppercase tracking-tighter mb-4">Cart is Empty</h2>
          <p className="font-mono text-sm opacity-70 mb-8">Looks like you haven&apos;t added anything yet.</p>
          <Button asChild className="brutal-btn rounded-none px-8 py-6 text-lg">
            <Link href="/shop">Browse Products</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16 min-h-[70vh]">
      <div className="flex flex-col md:flex-row items-baseline justify-between mb-8 border-b-3 border-[var(--border)] pb-4">
        <h2 className="font-display font-black text-5xl uppercase tracking-tighter">Your Cart</h2>
        <span className="font-bold font-mono text-lg opacity-80 mt-4 md:mt-0">{totalItems} ITEM{totalItems !== 1 ? 'S' : ''}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="brutal-card p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start group">
              <div className="w-full sm:w-32 h-32 brutal-border flex-shrink-0 bg-white dark:bg-zinc-900 p-2 relative overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-screen scale-105 group-hover:scale-110 transition-transform" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between h-full w-full">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">{item.category}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-50">• {item.brand}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg uppercase leading-tight mt-1 group-hover:text-primary transition-colors">{item.name}</h3>
                    <p className="text-sm opacity-70 font-mono mt-1">{item.specs}</p>
                  </div>
                  <div className="font-display font-black text-xl whitespace-nowrap">
                    ₱{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
                
                <div className="flex items-center gap-6 mt-6 sm:mt-auto pt-4 border-t-2 border-[var(--border)] border-dashed">
                  <div className="flex items-center brutal-border h-10 w-fit select-none bg-[var(--bg)]">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-full px-3 hover:bg-[var(--text)] hover:text-[var(--bg)] transition-colors flex items-center justify-center border-r border-[var(--border)]"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-display font-bold px-4 text-lg">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-full px-3 hover:bg-[var(--text)] hover:text-[var(--bg)] transition-colors flex items-center justify-center border-l border-[var(--border)]"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-2 text-sm font-bold uppercase hover:text-[#FF3B30] transition-colors ml-auto group/trash"
                  >
                    <Trash2 className="h-4 w-4 group-hover/trash:-translate-y-1 transition-transform" />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="brutal-card p-6 md:p-8 sticky top-28 bg-[var(--bg)]">
            <h3 className="font-display font-black text-2xl uppercase tracking-tighter mb-6 border-b-3 border-[var(--border)] pb-4">Order Summary</h3>
            
            <div className="space-y-4 font-medium opacity-90 mb-6">
              <div className="flex justify-between items-center">
                <span className="uppercase text-sm">Subtotal ({totalItems} items)</span>
                <span className="font-mono">₱{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="uppercase text-sm">Shipping</span>
                <span className="font-mono">Calculated at checkout</span>
              </div>
              <div className="flex justify-between items-center text-primary">
                <span className="uppercase text-sm">Discount</span>
                <span className="font-mono">₱0</span>
              </div>
            </div>

            <div className="flex justify-between items-end border-t-3 border-[var(--border)] pt-6 mb-8">
              <span className="font-display font-bold uppercase text-xl">Total</span>
              <span className="font-display font-black text-3xl">₱{subtotal.toLocaleString()}</span>
            </div>

            <Button className="brutal-btn w-full h-14 text-lg mb-4 flex items-center justify-center gap-2 group rounded-none">
              <span>Secure Checkout</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button asChild variant="outline" className="brutal-btn-ghost w-full h-12 rounded-none mb-4">
              <Link href="/shop">Continue Shopping</Link>
            </Button>

            <p className="font-mono text-xs text-center opacity-60">Taxes and shipping calculated at checkout.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

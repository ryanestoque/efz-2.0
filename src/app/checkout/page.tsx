'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowLeft, MapPin, CreditCard, Banknote, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, subtotal, totalItems, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    paymentMethod: 'cod',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error('Your cart is empty.');
      return;
    }

    setLoading(true);
    // Simulate payment/order processing
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);

    // Create the order object
    const newOrder = {
      id: `EFZ-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing' as const,
      total: subtotal, // skipping shipping logic for demo
      items: items.map(i => ({ name: i.name, qty: i.quantity, price: i.price })),
    };

    addOrder(newOrder);
    clearCart();
    toast.success('Order placed successfully!');
    
    // Redirect to profile orders page
    router.push('/profile?tab=orders');
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  if (items.length === 0 && !loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="brutal-border p-12 md:p-16 bg-[var(--bg)] max-w-lg w-full">
          <ShieldCheck className="h-16 w-16 mx-auto mb-6 opacity-30 text-primary" />
          <h2 className="font-display font-black text-4xl uppercase tracking-tighter mb-4">Nothing to Checkout</h2>
          <p className="font-mono text-sm opacity-70 mb-8">Your cart is currently empty.</p>
          <Button asChild className="brutal-btn rounded-none px-8 py-6 text-lg h-auto">
            <Link href="/shop">Back to Shop</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] pb-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-8 pb-4">
        <Link href="/cart" className="inline-flex items-center gap-2 font-display font-bold uppercase text-sm hover:text-primary transition-colors group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Cart
        </Link>
      </div>

      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="mb-8 border-b-3 border-[var(--border)] pb-4">
          <h1 className="font-display font-black text-5xl uppercase tracking-tighter">Secure Checkout</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left Column - Details */}
          <div className="flex-1 space-y-8 w-full">
            {/* Contact & Shipping */}
            <div className="brutal-border brutal-shadow bg-[var(--bg)]">
              <div className="bg-[var(--text)] text-[var(--bg)] px-6 py-4 border-b-3 border-[var(--border)] flex items-center gap-3">
                <MapPin className="h-5 w-5" />
                <h2 className="font-display font-black text-xl uppercase tracking-tight">Shipping Information</h2>
              </div>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="font-display font-bold text-xs uppercase tracking-widest opacity-60">Full Name *</label>
                    <input type="text" name="name" required value={form.name} onChange={handleInput} className="brutal-input w-full" placeholder="Juan dela Cruz" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-display font-bold text-xs uppercase tracking-widest opacity-60">Email Address *</label>
                    <input type="email" name="email" required value={form.email} onChange={handleInput} className="brutal-input w-full" placeholder="juan@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-display font-bold text-xs uppercase tracking-widest opacity-60">Phone Number *</label>
                  <input type="tel" name="phone" required value={form.phone} onChange={handleInput} className="brutal-input w-full" placeholder="09XX XXX XXXX" />
                </div>
                <div className="space-y-2">
                  <label className="font-display font-bold text-xs uppercase tracking-widest opacity-60">Complete Address *</label>
                  <input type="text" name="address" required value={form.address} onChange={handleInput} className="brutal-input w-full" placeholder="House/Unit/Flr #, Bldg Name, Blk or Lot #, Barangay, City/Province" />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="brutal-border brutal-shadow bg-[var(--bg)]">
              <div className="bg-[var(--text)] text-[var(--bg)] px-6 py-4 border-b-3 border-[var(--border)] flex items-center gap-3">
                <CreditCard className="h-5 w-5" />
                <h2 className="font-display font-black text-xl uppercase tracking-tight">Payment Method</h2>
              </div>
              <div className="p-6 space-y-4">
                <label className="flex items-center gap-4 p-4 brutal-border cursor-pointer hover:bg-primary/5 transition-colors group">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="cod" 
                    checked={form.paymentMethod === 'cod'} 
                    onChange={handleInput} 
                    className="w-5 h-5 accent-primary" 
                  />
                  <div className="flex-1">
                    <p className="font-display font-bold uppercase text-sm">Cash on Delivery</p>
                    <p className="font-mono text-xs opacity-60 mt-1">Pay when your order arrives.</p>
                  </div>
                  <Banknote className="h-6 w-6 opacity-40 group-hover:opacity-100 group-hover:text-primary transition-colors" />
                </label>
                
                <label className="flex items-center gap-4 p-4 brutal-border cursor-pointer hover:bg-primary/5 transition-colors group opacity-50">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="card" 
                    disabled
                    className="w-5 h-5 accent-primary" 
                  />
                  <div className="flex-1">
                    <p className="font-display font-bold uppercase text-sm">Credit / Debit Card</p>
                    <p className="font-mono text-xs opacity-60 mt-1">Currently unavailable.</p>
                  </div>
                  <CreditCard className="h-6 w-6 opacity-40 group-hover:opacity-100 group-hover:text-primary transition-colors" />
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="brutal-card p-6 md:p-8 sticky top-28 bg-[var(--bg)]">
              <h3 className="font-display font-black text-2xl uppercase tracking-tighter mb-6 border-b-3 border-[var(--border)] pb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6 border-b-2 border-dashed border-[var(--border)] pb-6 max-h-60 overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 bg-white brutal-border p-1 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-display font-bold text-xs uppercase leading-tight truncate">{item.name}</p>
                        <p className="font-mono text-[10px] opacity-60 mt-1">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-display font-bold text-sm shrink-0">₱{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 font-medium opacity-90 mb-6">
                <div className="flex justify-between items-center">
                  <span className="uppercase text-sm">Subtotal ({totalItems} items)</span>
                  <span className="font-mono">₱{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="uppercase text-sm">Shipping</span>
                  <span className="font-mono">₱0 (Free Promo)</span>
                </div>
              </div>

              <div className="flex justify-between items-end border-t-3 border-[var(--border)] pt-6 mb-8">
                <span className="font-display font-bold uppercase text-xl">Total</span>
                <span className="font-display font-black text-3xl text-primary">₱{subtotal.toLocaleString()}</span>
              </div>

              <Button type="submit" disabled={loading} className="brutal-btn w-full h-14 text-lg mb-4 flex items-center justify-center gap-2 rounded-none disabled:opacity-50">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-5 w-5" />
                    Place Order
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

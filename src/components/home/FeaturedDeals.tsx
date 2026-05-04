'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PRODUCTS, type Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { useState, useCallback } from 'react';

export function FeaturedDeals() {
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<number | null>(null);

  const handleAddToCart = useCallback((product: Product) => {
    addItem(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  }, [addItem]);

  return (
    <section className="bg-primary text-white border-y-3 border-[var(--border)] py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-end justify-between border-b-3 border-[var(--border)] pb-4 mb-8">
          <div>
            <h2 className="font-display font-black text-5xl uppercase tracking-tighter">Featured Deals</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.filter(p => p.isDeal).slice(0, 3).map((product) => (
            <div key={product.id} className="brutal-card bg-[var(--bg)] text-[var(--text)] flex flex-col h-full group relative">
              <Link href={`/product/${product.id}`} className="relative p-6 border-b-3 border-[var(--border)] flex-grow block">
                <div className="absolute top-4 left-4 brutal-border bg-primary text-white px-3 py-1 font-bold uppercase text-xs z-10 brutal-shadow">
                  Sale!
                </div>
                <Image src={product.image} alt={product.name} width={600} height={400} className="w-full h-48 object-contain mix-blend-darken dark:mix-blend-normal hover:scale-105 transition-transform" />
              </Link>
              <div className="p-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-primary tracking-widest">{product.category}</span>
                    <span className="text-[10px] font-bold uppercase opacity-40 tracking-wider">• {product.brand}</span>
                  </div>
                  <Link href={`/product/${product.id}`} className="after:absolute after:inset-0 after:z-0">
                    <h3 className="font-display font-bold text-xl uppercase leading-tight mt-1 group-hover:text-primary transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-sm mt-2 opacity-80 font-mono">{product.specs}</p>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div className="font-display font-black text-2xl">₱{product.price.toLocaleString()}</div>
                  <Button
                    size="icon"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                    className={`brutal-btn rounded-none h-12 w-12 border-3 transition-all relative z-10 ${
                      addedId === product.id ? 'bg-green-600 hover:bg-green-600' : ''
                    }`}
                  >
                    {addedId === product.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <ShoppingCart className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

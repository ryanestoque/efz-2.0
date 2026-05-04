'use client';

import { use, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS, type Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check, Plus, Minus, ChevronRight, ArrowLeft, Tag, AlertTriangle, PackageX, PackageCheck } from 'lucide-react';
import { notFound } from 'next/navigation';

function ProductContent({ id }: { id: string }) {
  const product = PRODUCTS.find(p => p.id === Number(id));
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState<number | string>(1);
  const [added, setAdded] = useState(false);
  const [addedRelatedId, setAddedRelatedId] = useState<number | null>(null);

  if (!product) {
    notFound();
  }

  const stockCount = useMemo(() => {
    if (product.id % 3 === 0) return 0;
    if (product.id % 5 === 0) return 2;
    return 15;
  }, [product.id]);

  const isOutOfStock = stockCount === 0;
  const isLowStock = stockCount > 0 && stockCount <= 5;

  // Related products: same category, excluding the current one
  const relatedProducts = useMemo(() => {
    return PRODUCTS
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  // Also suggest products from same brand (different category)
  const brandProducts = useMemo(() => {
    return PRODUCTS
      .filter(p => p.brand === product.brand && p.id !== product.id && p.category !== product.category)
      .slice(0, 4);
  }, [product]);

  const handleAddToCart = useCallback(() => {
    if (isOutOfStock) return;
    const q = typeof quantity === 'number' && quantity > 0 ? Math.min(quantity, stockCount) : 1;
    for (let i = 0; i < q; i++) {
      addItem(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    if (quantity !== q) setQuantity(q);
  }, [addItem, product, quantity, isOutOfStock, stockCount]);

  const handleAddRelated = useCallback((p: Product) => {
    addItem(p);
    setAddedRelatedId(p.id);
    setTimeout(() => setAddedRelatedId(null), 1200);
  }, [addItem]);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-8 pb-4">
        <nav className="flex items-center gap-2 font-mono text-sm opacity-70">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-primary transition-colors">{product.category}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-primary font-bold truncate max-w-[200px]">{product.name}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Image */}
          <div className="relative">
            <div className="absolute -inset-3 bg-primary brutal-border translate-x-3 translate-y-3 -z-10"></div>
            <div className="brutal-border bg-white dark:bg-zinc-900 overflow-hidden relative aspect-square flex items-center justify-center p-8">
              <Image
                src={product.image}
                alt={product.name}
                width={800}
                height={800}
                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-screen scale-90 hover:scale-100 transition-transform duration-500"
              />
              {product.isDeal && (
                <div className="absolute top-4 left-4 brutal-border bg-primary text-white px-4 py-2 font-display font-black uppercase text-sm brutal-shadow flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Deal
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Link
                  href={`/shop?brand=${encodeURIComponent(product.brand)}`}
                  className="text-xs font-black uppercase tracking-widest text-primary hover:underline"
                >
                  {product.brand}
                </Link>
                <span className="text-xs opacity-40">•</span>
                <Link
                  href={`/shop?category=${encodeURIComponent(product.category)}`}
                  className="text-xs font-bold uppercase tracking-wider opacity-60 hover:text-primary hover:opacity-100 transition-colors"
                >
                  {product.category}
                </Link>
              </div>
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-5xl uppercase tracking-tight leading-[0.95]">
                {product.name}
              </h1>
            </div>

            <p className="font-mono text-base opacity-80 leading-relaxed border-l-4 border-primary pl-4">
              {product.specs}
            </p>

            {/* Price */}
            <div className="border-y-3 border-[var(--border)] py-6 space-y-4">
              <div>
                <div className="font-display font-black text-5xl">
                  ₱{product.price.toLocaleString()}
                </div>
                <p className="font-mono text-xs opacity-50 uppercase mt-2">Cash Price / Straight</p>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 font-display font-bold uppercase text-sm">
                {isOutOfStock ? (
                  <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-3 py-1.5 brutal-border border-red-500">
                    <PackageX className="h-4 w-4" />
                    <span>Out of Stock</span>
                  </div>
                ) : isLowStock ? (
                  <div className="flex items-center gap-2 text-orange-500 bg-orange-500/10 px-3 py-1.5 brutal-border border-orange-500">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Low Stock: Only {stockCount} left</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-500 bg-green-500/10 px-3 py-1.5 brutal-border border-green-500">
                    <PackageCheck className="h-4 w-4" />
                    <span>In Stock ({stockCount})</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex flex-row items-stretch sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center brutal-border h-12 sm:h-14 w-fit select-none bg-[var(--bg)] flex-shrink-0">
                <button
                  disabled={isOutOfStock}
                  onClick={() => setQuantity(q => Math.max(1, (typeof q === 'number' ? q : 1) - 1))}
                  className="h-full px-3 sm:px-4 hover:bg-[var(--text)] hover:text-[var(--bg)] disabled:opacity-50 disabled:hover:bg-[var(--bg)] disabled:hover:text-[var(--text)] disabled:cursor-not-allowed transition-colors flex items-center justify-center border-r-2 border-[var(--border)]"
                >
                  <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <input
                  disabled={isOutOfStock}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={isOutOfStock ? 0 : quantity}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '') {
                      setQuantity('');
                    } else {
                      const num = parseInt(val, 10);
                      if (!isNaN(num)) {
                        setQuantity(Math.min(stockCount, num));
                      }
                    }
                  }}
                  onBlur={() => {
                    if (quantity === '' || (typeof quantity === 'number' && quantity < 1)) {
                      setQuantity(1);
                    }
                  }}
                  className="w-12 sm:w-16 h-full text-center font-display font-bold text-lg sm:text-xl bg-transparent outline-none m-0 p-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Quantity"
                />
                <button
                  disabled={isOutOfStock || (typeof quantity === 'number' && quantity >= stockCount)}
                  onClick={() => setQuantity(q => Math.min(stockCount, (typeof q === 'number' ? q : 1) + 1))}
                  className="h-full px-3 sm:px-4 hover:bg-[var(--text)] hover:text-[var(--bg)] disabled:opacity-50 disabled:hover:bg-[var(--bg)] disabled:hover:text-[var(--text)] disabled:cursor-not-allowed transition-colors flex items-center justify-center border-l-2 border-[var(--border)]"
                >
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>

              <Button
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className={`brutal-btn rounded-none h-12 sm:h-14 flex-1 text-sm sm:text-lg font-display font-bold uppercase flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-4 transition-all min-w-0 ${added ? 'bg-green-600 hover:bg-green-600 text-white' : ''} ${isOutOfStock ? 'opacity-50 cursor-not-allowed bg-[var(--border)] hover:bg-[var(--border)] text-[var(--text)]' : ''}`}
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <span className="truncate">Added!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <span className="truncate">Add to Cart</span>
                  </>
                )}
              </Button>
            </div>

            {/* Meta */}
            <div className="space-y-2 pt-4 border-t-2 border-dashed border-[var(--border)]">
              <p className="font-mono text-xs">
                <span className="font-bold uppercase opacity-60">SKU:</span>{' '}
                <span className="opacity-80">ITM-{String(product.id).padStart(5, '0')}</span>
              </p>
              <p className="font-mono text-xs">
                <span className="font-bold uppercase opacity-60">Categories:</span>{' '}
                <Link href={`/shop?brand=${encodeURIComponent(product.brand)}`} className="text-primary hover:underline">{product.brand}</Link>
                {', '}
                <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="text-primary hover:underline">{product.category}</Link>
              </p>
            </div>

            {/* Back to shop */}
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 font-display font-bold uppercase text-sm hover:text-primary transition-colors mt-4 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Shop
            </Link>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16 border-t-3 border-[var(--border)] mt-12">
          <h2 className="font-display font-black text-3xl uppercase tracking-tighter mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <div key={p.id} className="brutal-card flex flex-col h-full group relative">
                <Link href={`/product/${p.id}`} className="relative p-4 border-b-3 border-[var(--border)] flex-grow">
                  {p.isDeal && (
                    <div className="absolute top-3 left-3 brutal-border bg-primary text-white px-2 py-0.5 font-bold uppercase text-[10px] z-10 brutal-shadow">Deal</div>
                  )}
                  <Image src={p.image} alt={p.name} width={400} height={400} className="w-full h-36 object-contain mix-blend-darken dark:mix-blend-normal hover:scale-105 transition-transform" />
                </Link>
                <div className="p-4 flex flex-col justify-between space-y-3 flex-grow">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase text-primary tracking-widest">{p.category}</span>
                      <span className="text-[10px] font-bold uppercase opacity-40">• {p.brand}</span>
                    </div>
                    <Link href={`/product/${p.id}`} className="after:absolute after:inset-0 after:z-0">
                      <h3 className="font-display font-bold text-sm uppercase leading-tight mt-1 group-hover:text-primary transition-colors">{p.name}</h3>
                    </Link>
                    <p className="text-xs mt-1 opacity-70 font-mono">{p.specs}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="font-display font-black text-lg">₱{p.price.toLocaleString()}</div>
                    <Button
                      size="icon"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddRelated(p);
                      }}
                      className={`brutal-btn rounded-none h-10 w-10 border-3 transition-all relative z-10 ${addedRelatedId === p.id ? 'bg-green-600 hover:bg-green-600' : ''
                        }`}
                    >
                      {addedRelatedId === p.id ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* More from brand */}
      {brandProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16 border-t-3 border-[var(--border)]">
          <h2 className="font-display font-black text-3xl uppercase tracking-tighter mb-8">
            More from {product.brand}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandProducts.map((p) => (
              <div key={p.id} className="brutal-card flex flex-col h-full group relative">
                <Link href={`/product/${p.id}`} className="relative p-4 border-b-3 border-[var(--border)] flex-grow">
                  {p.isDeal && (
                    <div className="absolute top-3 left-3 brutal-border bg-primary text-white px-2 py-0.5 font-bold uppercase text-[10px] z-10 brutal-shadow">Deal</div>
                  )}
                  <Image src={p.image} alt={p.name} width={400} height={400} className="w-full h-36 object-contain mix-blend-darken dark:mix-blend-normal hover:scale-105 transition-transform" />
                </Link>
                <div className="p-4 flex flex-col justify-between space-y-3 flex-grow">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase text-primary tracking-widest">{p.category}</span>
                      <span className="text-[10px] font-bold uppercase opacity-40">• {p.brand}</span>
                    </div>
                    <Link href={`/product/${p.id}`} className="after:absolute after:inset-0 after:z-0">
                      <h3 className="font-display font-bold text-sm uppercase leading-tight mt-1 group-hover:text-primary transition-colors">{p.name}</h3>
                    </Link>
                    <p className="text-xs mt-1 opacity-70 font-mono">{p.specs}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="font-display font-black text-lg">₱{p.price.toLocaleString()}</div>
                    <Button
                      size="icon"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddRelated(p);
                      }}
                      className={`brutal-btn rounded-none h-10 w-10 border-3 transition-all relative z-10 ${addedRelatedId === p.id ? 'bg-green-600 hover:bg-green-600' : ''
                        }`}
                    >
                      {addedRelatedId === p.id ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params);
  return <ProductContent id={id} />;
}

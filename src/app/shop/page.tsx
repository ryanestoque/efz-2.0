'use client';

import { Filter, ChevronRight, ChevronLeft, ShoppingCart, X, Check, Search } from 'lucide-react';
import Link from 'next/link';
import { PRODUCTS, ALL_CATEGORIES, BRANDS, type Product } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useMemo, useCallback, Suspense, useRef, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

const ITEMS_PER_PAGE = 12;

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addItem } = useCart();

  // Read initial filters from URL
  const urlCategory = searchParams.get('category');
  const urlBrand = searchParams.get('brand');
  const urlSearch = searchParams.get('search');

  // Local filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    urlCategory ? [urlCategory.toUpperCase()] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    urlBrand ? [urlBrand.toUpperCase()] : []
  );
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [priceApplied, setPriceApplied] = useState(false);
  const [appliedMin, setAppliedMin] = useState(0);
  const [appliedMax, setAppliedMax] = useState(Infinity);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState(urlSearch || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [addedId, setAddedId] = useState<number | null>(null);
  const shopTopRef = useRef<HTMLElement>(null);

  // Sync filter state whenever URL search params change (e.g. nav clicks)
  useEffect(() => {
    const cat = searchParams.get('category');
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');

    setSelectedCategories(cat ? [cat.toUpperCase()] : []);
    setSelectedBrands(brand ? [brand.toUpperCase()] : []);
    setSearchQuery(search || '');
    setCurrentPage(1);
  }, [searchParams]);

  // Scroll to top of shop section whenever page changes
  useEffect(() => {
    if (currentPage > 1 || shopTopRef.current) {
      shopTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);


  // Toggle a category filter
  const toggleCategory = useCallback((cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  }, []);

  // Toggle a brand filter
  const toggleBrand = useCallback((brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  }, []);

  // Apply price filter
  const applyPrice = useCallback(() => {
    setAppliedMin(minPrice ? Number(minPrice) : 0);
    setAppliedMax(maxPrice ? Number(maxPrice) : Infinity);
    setPriceApplied(true);
    setCurrentPage(1);
  }, [minPrice, maxPrice]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinPrice('');
    setMaxPrice('');
    setPriceApplied(false);
    setAppliedMin(0);
    setAppliedMax(Infinity);
    setSearchQuery('');
    setSortBy('featured');
    setCurrentPage(1);
    router.replace('/shop');
  }, [router]);

  // Handle add to cart with animation
  const handleAddToCart = useCallback((product: Product) => {
    addItem(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  }, [addItem]);

  // Search handler
  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  }, []);

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.specs.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    // Price filter
    if (priceApplied) {
      result = result.filter(p => p.price >= appliedMin && p.price <= appliedMax);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result = [...result].sort((a, b) => b.id - a.id);
        break;
      default:
        // featured — deals first, then by id
        result = [...result].sort((a, b) => (b.isDeal ? 1 : 0) - (a.isDeal ? 1 : 0) || a.id - b.id);
    }

    return result;
  }, [searchQuery, selectedCategories, selectedBrands, priceApplied, appliedMin, appliedMax, sortBy]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const hasActiveFilters = selectedCategories.length > 0 || selectedBrands.length > 0 || priceApplied || searchQuery.trim();

  return (
    <section ref={shopTopRef} className="max-w-7xl mx-auto px-4 lg:px-8 py-16" id="shop">
      <div className="flex flex-col sm:flex-row items-baseline justify-between mb-6 border-b-3 border-[var(--border)] pb-4 gap-4">
        <h2 className="font-display font-black text-5xl uppercase tracking-tighter">All Products</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 font-bold uppercase text-sm text-primary hover:text-primary-hover transition-colors"
          >
            <X className="h-4 w-4" />
            Clear All Filters
          </button>
        )}
      </div>

      {/* Active filter tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          {searchQuery.trim() && (
              <span className="inline-flex items-center gap-1 px-3 py-1 brutal-border bg-primary text-white text-xs font-bold uppercase">
                Search: &quot;{searchQuery}&quot;
                <button onClick={() => { setSearchQuery(''); setCurrentPage(1); }}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedCategories.map(cat => (
              <span key={cat} className="inline-flex items-center gap-1 px-3 py-1 brutal-border bg-primary text-white text-xs font-bold uppercase">
                {cat}
                <button onClick={() => toggleCategory(cat)}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            {selectedBrands.map(brand => (
              <span key={brand} className="inline-flex items-center gap-1 px-3 py-1 brutal-border bg-[var(--text)] text-[var(--bg)] text-xs font-bold uppercase">
                {brand}
                <button onClick={() => toggleBrand(brand)}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            {priceApplied && (
              <span className="inline-flex items-center gap-1 px-3 py-1 brutal-border bg-[var(--bg)] text-xs font-bold uppercase">
                ₱{appliedMin.toLocaleString()} — ₱{appliedMax === Infinity ? '∞' : appliedMax.toLocaleString()}
                <button onClick={() => { setPriceApplied(false); setMinPrice(''); setMaxPrice(''); setCurrentPage(1); }}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        )}

      <div className="flex flex-col lg:flex-row gap-8">

        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="brutal-border bg-[var(--bg)] p-4 lg:p-6 space-y-6 lg:space-y-8 sticky top-28 max-h-[450px] lg:max-h-[calc(100vh-120px)] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b-3 border-[var(--border)]">
              <h3 className="font-display font-bold text-xl uppercase tracking-tight">Filters</h3>
              <Filter className="h-5 w-5" />
            </div>

            {/* Search within shop */}
            <form onSubmit={handleSearch} className="space-y-2">
              <h4 className="font-bold uppercase tracking-wide text-sm">Search</h4>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="brutal-input rounded-none h-10 w-full bg-[var(--bg)] border-3 border-[var(--border)] focus-visible:ring-0 focus-visible:border-primary pr-10"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </form>

            {/* Price Filter */}
            <div className="space-y-4">
              <h4 className="font-bold uppercase tracking-wide text-sm">Price</h4>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  min={0}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="brutal-input rounded-none h-10 w-full bg-[var(--bg)] border-3 border-[var(--border)] focus-visible:ring-0 focus-visible:border-primary"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  min={0}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="brutal-input rounded-none h-10 w-full bg-[var(--bg)] border-3 border-[var(--border)] focus-visible:ring-0 focus-visible:border-primary"
                />
              </div>
              <Button variant="outline" onClick={applyPrice} className="brutal-btn-ghost w-full rounded-none">Apply</Button>
            </div>

            {/* Brand Filter */}
            <div className="space-y-4">
              <h4 className="font-bold uppercase tracking-wide text-sm border-b-2 border-[var(--border)] pb-2 mb-4">Brand</h4>
              <div className="space-y-3">
                {BRANDS.map((brand) => {
                  const isSelected = selectedBrands.includes(brand);
                  return (
                    <label
                      key={brand}
                      onClick={() => toggleBrand(brand)}
                      className="flex items-center space-x-3 cursor-pointer group"
                    >
                      <div className={`w-5 h-5 brutal-border flex items-center justify-center transition-colors ${isSelected ? 'bg-[var(--text)] border-[var(--text)]' : 'border-[var(--border)] group-hover:border-primary group-hover:bg-primary/10'}`}>
                        {isSelected && <Check className="h-3 w-3 text-[var(--bg)]" />}
                      </div>
                      <span className={`font-medium transition-colors text-sm ${isSelected ? 'text-[var(--text)] font-bold' : 'group-hover:text-primary'}`}>{brand}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-4">
              <h4 className="font-bold uppercase tracking-wide text-sm border-b-2 border-[var(--border)] pb-2 mb-4">Categories</h4>
              <div className="space-y-3">
                {ALL_CATEGORIES.map((type) => {
                  const isSelected = selectedCategories.includes(type);
                  return (
                    <label
                      key={type}
                      onClick={() => toggleCategory(type)}
                      className="flex items-center space-x-3 cursor-pointer group"
                    >
                      <div className={`w-5 h-5 brutal-border flex items-center justify-center transition-colors ${isSelected ? 'bg-[var(--text)] border-[var(--text)]' : 'border-[var(--border)] group-hover:border-primary group-hover:bg-primary/10'}`}>
                        {isSelected && <Check className="h-3 w-3 text-[var(--bg)]" />}
                      </div>
                      <span className={`font-medium transition-colors text-sm ${isSelected ? 'text-[var(--text)] font-bold' : 'group-hover:text-primary'}`}>{type}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <span className="font-mono text-sm opacity-70">
              {filteredProducts.length === 0
                ? 'No results'
                : `Showing ${((currentPage - 1) * ITEMS_PER_PAGE) + 1}–${Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of ${filteredProducts.length} result${filteredProducts.length !== 1 ? 's' : ''}`
              }
            </span>
            <div className="flex space-x-4 items-center">
              <span className="font-bold uppercase text-sm">Sort by:</span>
              <Select value={sortBy} onValueChange={(val) => { setSortBy(val); setCurrentPage(1); }}>
                <SelectTrigger className="w-[180px] brutal-input rounded-none h-10 bg-[var(--bg)] border-3 border-[var(--border)] focus:ring-0 focus:border-primary">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="brutal-border bg-[var(--bg)] brutal-shadow rounded-none">
                  <SelectItem value="featured" className="font-bold uppercase text-xs focus:bg-primary focus:text-white rounded-none cursor-pointer">Featured</SelectItem>
                  <SelectItem value="price-asc" className="font-bold uppercase text-xs focus:bg-primary focus:text-white rounded-none cursor-pointer">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc" className="font-bold uppercase text-xs focus:bg-primary focus:text-white rounded-none cursor-pointer">Price: High to Low</SelectItem>
                  <SelectItem value="newest" className="font-bold uppercase text-xs focus:bg-primary focus:text-white rounded-none cursor-pointer">Newest Arrivals</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {paginatedProducts.length === 0 ? (
            <div className="brutal-border bg-[var(--bg)] p-16 text-center">
              <p className="font-display font-bold text-2xl uppercase mb-2">No Products Found</p>
              <p className="font-mono text-sm opacity-70 mb-6">Try adjusting your filters or search query</p>
              <Button onClick={clearFilters} className="brutal-btn rounded-none px-8 py-4">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <div key={product.id} className="brutal-card flex flex-col h-full group relative">
                  <Link href={`/product/${product.id}`} className="relative p-6 border-b-3 border-[var(--border)] overflow-hidden flex-grow bg-white dark:bg-zinc-900 block">
                    {product.isDeal && (
                      <div className="absolute top-4 left-4 brutal-border bg-primary text-white px-3 py-1 font-bold uppercase text-xs z-10 brutal-shadow">
                        Deal
                      </div>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-contain group-hover:scale-110 transition-transform duration-500 will-change-transform mix-blend-multiply dark:mix-blend-screen"
                    />
                  </Link>
                  <div className="p-5 flex flex-col justify-between space-y-4 bg-[var(--bg)]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">{product.category}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-50">• {product.brand}</span>
                      </div>
                      <Link href={`/product/${product.id}`} className="after:absolute after:inset-0 after:z-0">
                        <h3 className="font-display font-bold text-lg uppercase leading-tight mt-1 group-hover:text-primary transition-colors line-clamp-2" title={product.name}>
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs mt-2 opacity-70 font-mono truncate">{product.specs}</p>
                    </div>
                    <div className="flex flex-col space-y-3 pt-2">
                      <div className="font-display font-black text-xl">₱{product.price.toLocaleString()}</div>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                        className={`w-full brutal-btn py-6 flex items-center justify-center space-x-2 rounded-none transition-all relative z-10 ${addedId === product.id ? 'bg-green-600 hover:bg-green-600' : ''
                          }`}
                      >
                        {addedId === product.id ? (
                          <>
                            <Check className="h-4 w-4" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <span>Add To Cart</span>
                            <ShoppingCart className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center space-x-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 brutal-border bg-[var(--bg)] flex items-center justify-center hover:bg-[var(--text)] hover:text-[var(--bg)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 brutal-border font-display font-bold text-lg transition-all ${page === currentPage
                      ? 'bg-[var(--text)] text-[var(--bg)] brutal-shadow hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none'
                      : 'bg-[var(--bg)] hover:bg-[var(--text)] hover:text-[var(--bg)]'
                    }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 brutal-border bg-[var(--bg)] flex items-center justify-center hover:bg-[var(--text)] hover:text-[var(--bg)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="font-display font-bold text-2xl uppercase animate-pulse">Loading shop...</div>
      </section>
    }>
      <ShopContent />
    </Suspense>
  );
}

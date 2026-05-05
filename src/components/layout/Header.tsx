'use client';

import { ALL_CATEGORIES, BRANDS, PRODUCTS } from '@/lib/data';
import { ShoppingCart, User, Search, Menu, Moon, Sun, X, LogOut, Package, Settings } from 'lucide-react';
import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

function SearchBar({ onSearchSubmit, isMobile = false }: { onSearchSubmit?: () => void, isMobile?: boolean }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsFocused(false);
      onSearchSubmit?.();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q) ||
      p.specs.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [searchQuery]);

  return (
    <div ref={dropdownRef} className={`relative ${isMobile ? 'mb-6 mt-4 w-full' : 'hidden lg:block group'}`}>
      <form onSubmit={handleSearch} className="relative w-full">
        <input
          type="text"
          placeholder="Search parts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className={`brutal-input pr-10 ${isMobile ? 'w-full' : 'w-64'}`}
        />
        <Button type="submit" variant="ghost" size="icon" className="absolute right-3 top-1/2 -translate-y-1/2 h-auto w-auto p-0 hover:bg-transparent">
          <Search className="h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors" />
        </Button>
      </form>
      
      {/* Dropdown */}
      {isFocused && searchQuery.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--bg)] brutal-border brutal-shadow z-50 max-h-[400px] overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="flex flex-col">
              {searchResults.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={() => {
                    setSearchQuery('');
                    setIsFocused(false);
                    onSearchSubmit?.();
                  }}
                  className="flex items-center gap-3 p-3 border-b-2 border-[var(--border)] last:border-b-0 hover:bg-primary hover:text-white transition-all group/item"
                >
                  <div className="w-12 h-12 flex-shrink-0 bg-white p-1 brutal-border border-2">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-sm leading-tight line-clamp-2">{product.name}</p>
                    <p className="font-mono text-xs mt-1 opacity-70 group-hover/item:opacity-100 transition-opacity">₱{product.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center">
              <p className="font-mono text-sm opacity-70">Sorry, no products found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── USER MENU ─────────────────────────────────────────────
function UserMenu() {
  const [open, setOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const menuItemCls = 'flex items-center gap-3 px-4 py-3 font-display font-bold uppercase text-sm tracking-wide border-b-3 last:border-b-0 border-[var(--border)] hover:bg-primary hover:text-white transition-colors w-full text-left';

  return (
    <div ref={ref} className="relative hidden min-[850px]:block">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpen(o => !o)}
        className={`brutal-border border-2 rounded-none bg-[var(--bg)] hover:bg-primary hover:text-white transition-colors h-10 w-10 ${open ? 'bg-primary text-white' : ''}`}
        aria-label="User account"
      >
        {isLoggedIn
          ? <span className="font-display font-black text-sm">{user?.name?.[0]?.toUpperCase()}</span>
          : <User className="h-5 w-5" />}
      </Button>

      {open && (
        <div className="absolute right-0 top-full mt-3 w-56 bg-[var(--bg)] brutal-border brutal-shadow z-50 overflow-hidden">
          {isLoggedIn ? (
            <>
              <div className="px-4 py-3 border-b-3 border-[var(--border)] bg-[var(--text)] text-[var(--bg)]">
                <p className="font-display font-black uppercase leading-tight truncate">{user?.name}</p>
                <p className="font-mono text-xs opacity-60 truncate">{user?.email}</p>
              </div>
              <Link href="/profile" onClick={() => setOpen(false)} className={menuItemCls}><User className="h-4 w-4" />My Profile</Link>
              <Link href="/profile?tab=orders" onClick={() => setOpen(false)} className={menuItemCls}><Package className="h-4 w-4" />My Orders</Link>
              <Link href="/profile?tab=settings" onClick={() => setOpen(false)} className={menuItemCls}><Settings className="h-4 w-4" />Settings</Link>
              <button onClick={() => { logout(); setOpen(false); router.push('/'); }} className={`${menuItemCls} text-destructive hover:bg-destructive hover:text-white`}><LogOut className="h-4 w-4" />Sign Out</button>
            </>
          ) : (
            <div className="p-4 space-y-3">
              <p className="font-display font-black text-xs uppercase tracking-widest opacity-50 mb-3">My Account</p>
              <Button asChild className="brutal-btn w-full px-4 py-3 h-auto text-sm rounded-none">
                <Link href="/profile" onClick={() => setOpen(false)}>Sign In</Link>
              </Button>
              <Button asChild variant="outline" className="brutal-btn-ghost w-full px-4 py-3 h-auto text-sm rounded-none">
                <Link href="/profile?tab=register" onClick={() => setOpen(false)}>Create Account</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [isMobileBrandsOpen, setIsMobileBrandsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { totalItems } = useCart();
  const { isLoggedIn, user: authUser, logout } = useAuth();

  const currentCategory = searchParams.get('category');
  const currentBrand = searchParams.get('brand');

  useEffect(() => {
    const savedTheme = localStorage.getItem('efz-theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('efz-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('efz-theme', 'light');
    }
  }, [isDark]);

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const handleCategoryClick = (category: string) => {
    router.push(`/shop?category=${encodeURIComponent(category)}`);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleBrandClick = (brand: string) => {
    router.push(`/shop?brand=${encodeURIComponent(brand)}`);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)] brutal-border-b">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-display font-black text-xl tracking-tighter uppercase inline-block transition-transform">
              EFZ Computers
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden min-[850px]:flex space-x-8 items-center">
            {['Home', 'Brands', 'Categories', 'Gallery', 'Contact'].map((item) => {
              if (item === 'Categories' || item === 'Brands') {
                const isCategories = item === 'Categories';
                const itemsList = isCategories ? ALL_CATEGORIES : BRANDS;
                
                const isActiveFilter = (item === 'Categories' && currentCategory) || (item === 'Brands' && currentBrand);
                return (
                  <div
                    key={item}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className={`font-display font-bold uppercase text-sm tracking-wide border-b-4 transition-colors py-2 inline-block cursor-pointer ${
                        activeDropdown === item || isActiveFilter ? 'border-primary text-primary' : 'border-transparent hover:border-primary'
                      }`}
                    >
                      {item}
                    </a>
                    <div className={`absolute top-full left-[-16px] pt-4 w-64 transition-all duration-200 z-50 max-h-[70vh] overflow-y-auto ${
                      activeDropdown === item ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                    }`}>
                      <div className="flex flex-col border-y-3 border-l-3 border-[var(--border)] bg-[var(--bg)] brutal-shadow">
                        {itemsList.map((listItem, idx) => {
                          const isItemActive = (isCategories && currentCategory === listItem) || (!isCategories && currentBrand === listItem);
                          return (
                            <Button
                              variant="ghost"
                              key={idx}
                              onClick={() => isCategories ? handleCategoryClick(listItem) : handleBrandClick(listItem)}
                              className={`w-full justify-start h-auto rounded-none text-left font-display font-bold uppercase text-sm tracking-wide p-3 border-b-2 border-x-0 border-t-0 border-[var(--border)] last:border-b-0 transition-colors cursor-pointer ${
                                isItemActive ? 'bg-primary text-white hover:bg-primary hover:text-white' : 'hover:bg-primary hover:text-white'
                              }`}
                            >
                              {listItem}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              const path = item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`;
              return (
                <Link 
                  key={item} 
                  href={path}
                  className={`font-display font-bold uppercase text-sm tracking-wide border-b-4 transition-colors py-2 ${
                    isActive(path) 
                    ? 'border-primary text-primary' 
                    : 'border-transparent hover:border-primary'
                  }`}
                >
                  {item}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <SearchBar />

            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="hidden min-[850px]:flex brutal-border border-2 rounded-none bg-[var(--bg)] hover:bg-primary hover:text-white transition-colors h-10 w-10"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <UserMenu />

            <Button 
              asChild
              className="h-10 px-3 brutal-btn rounded-none bg-primary text-white hover:bg-primary hover:opacity-90 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <Link href="/cart" className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <span className="font-bold font-display text-xs">{totalItems}</span>
              </Link>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="outline"
              size="icon"
              className="min-[850px]:hidden flex brutal-border border-2 rounded-none bg-[var(--bg)] hover:bg-primary hover:text-white transition-colors h-10 w-10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="min-[850px]:hidden brutal-border-t brutal-border-b bg-[var(--bg)] absolute w-full z-40">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <SearchBar isMobile onSearchSubmit={() => setIsMobileMenuOpen(false)} />
            {['Home', 'Brands', 'Categories', 'Gallery', 'Contact'].map((item) => {
              if (item === 'Categories' || item === 'Brands') {
                const isCategories = item === 'Categories';
                const isOpen = isCategories ? isMobileCategoriesOpen : isMobileBrandsOpen;
                const toggleOpen = () => isCategories ? setIsMobileCategoriesOpen(!isMobileCategoriesOpen) : setIsMobileBrandsOpen(!isMobileBrandsOpen);
                const itemsList = isCategories ? ALL_CATEGORIES : BRANDS;

                const isActiveFilter = (item === 'Categories' && currentCategory) || (item === 'Brands' && currentBrand);

                return (
                  <div key={item}>
                    <Button 
                      variant="ghost"
                      onClick={toggleOpen}
                      className={`w-full h-auto rounded-none text-left font-display font-bold uppercase text-lg p-2 border-l-4 border-y-0 border-r-0 transition-colors flex justify-between items-center cursor-pointer hover:bg-transparent ${
                        isActiveFilter ? 'border-primary text-primary bg-[var(--text)] bg-opacity-5 hover:text-primary' : 'border-transparent hover:border-primary hover:bg-[var(--text)] hover:bg-opacity-5'
                      }`}
                    >
                      {item}
                      <span className="text-xl leading-none">{isOpen ? '−' : '+'}</span>
                    </Button>
                    {isOpen && (
                      <div className="pl-6 pr-2 py-3 flex flex-col space-y-2 border-l-4 border-transparent max-h-[40vh] overflow-y-auto">
                        {itemsList.map((listItem, idx) => {
                          const isItemActive = (isCategories && currentCategory === listItem) || (!isCategories && currentBrand === listItem);
                          return (
                            <Button 
                              variant="ghost"
                              key={idx} 
                              onClick={() => isCategories ? handleCategoryClick(listItem) : handleBrandClick(listItem)}
                              className={`w-full justify-start h-auto rounded-none text-left font-display font-bold uppercase text-sm tracking-wide p-2 border-b-2 border-x-0 border-t-0 border-[var(--border)] last:border-b-0 transition-colors cursor-pointer ${
                                isItemActive ? 'bg-primary text-white hover:bg-primary hover:text-white' : 'hover:bg-primary hover:text-white'
                              }`}
                            >
                              {listItem}
                            </Button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const path = item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase()}`;
              return (
                <Link 
                  key={item} 
                  href={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block font-display font-bold uppercase text-lg p-2 border-l-4 transition-colors ${
                    isActive(path) 
                    ? 'border-primary bg-[var(--text)] bg-opacity-5 text-primary' 
                    : 'border-transparent hover:border-primary hover:bg-[var(--text)] hover:bg-opacity-5'
                  }`}
                >
                  {item}
                </Link>
              );
            })}
            
            <div className="flex items-center space-x-4 pt-6 mt-6 border-t-3 border-[var(--border)]">
              <Button
                variant="outline"
                onClick={() => setIsDark(!isDark)}
                className="flex-1 flex h-auto rounded-none items-center justify-center p-3 brutal-border border-2 bg-[var(--bg)] hover:bg-primary hover:text-white transition-colors space-x-2"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="font-bold uppercase text-sm">{isDark ? 'Light' : 'Dark'}</span>
              </Button>
              {isLoggedIn ? (
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 px-1">
                    <div className="w-8 h-8 bg-primary brutal-border flex items-center justify-center text-white font-display font-black text-sm shrink-0">{authUser?.name?.[0]?.toUpperCase()}</div>
                    <div className="min-w-0">
                      <p className="font-display font-black text-sm uppercase leading-none truncate">{authUser?.name}</p>
                      <p className="font-mono text-xs opacity-50 truncate">{authUser?.email}</p>
                    </div>
                  </div>
                  <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 px-2 py-2 brutal-border font-display font-bold text-xs uppercase tracking-wide hover:bg-primary hover:text-white transition-colors"><User className="h-3 w-3" />Profile</Link>
                  <Link href="/profile?tab=orders" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 px-2 py-2 brutal-border font-display font-bold text-xs uppercase tracking-wide hover:bg-primary hover:text-white transition-colors"><Package className="h-3 w-3" />Orders</Link>
                  <button onClick={() => { logout(); setIsMobileMenuOpen(false); router.push('/'); }} className="w-full flex items-center gap-2 px-2 py-2 brutal-border font-display font-bold text-xs uppercase tracking-wide text-destructive hover:bg-destructive hover:text-white transition-colors"><LogOut className="h-3 w-3" />Sign Out</button>
                </div>
              ) : (
                <div className="flex-1 flex flex-col gap-2">
                  <Button asChild className="brutal-btn w-full flex items-center justify-center gap-2 p-3 h-auto text-xs rounded-none">
                    <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}><User className="h-4 w-4" />Sign In</Link>
                  </Button>
                  <Button asChild variant="outline" className="brutal-btn-ghost w-full flex items-center justify-center gap-2 p-3 h-auto text-xs rounded-none">
                    <Link href="/profile?tab=register" onClick={() => setIsMobileMenuOpen(false)}>Create Account</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

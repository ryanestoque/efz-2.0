'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { User, Package, Settings, LogOut, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowRight, MapPin, Phone, Mail, CalendarDays } from 'lucide-react';

// ─── ORDER STATUS ─────────────────────────────────────────
const STATUS_STYLE: Record<string, { bg: string; text: string }> = {
  Processing: { bg: 'bg-[#FF9F0A]', text: 'text-[#0A0A0A]' },
  Shipped:    { bg: 'bg-[#007AFF]', text: 'text-white' },
  Delivered:  { bg: 'bg-[#34C759]', text: 'text-white' },
  Cancelled:  { bg: 'bg-[#FF3B30]', text: 'text-white' },
};

// ─── AUTH FORMS ───────────────────────────────────────────
function AuthForms({ initial }: { initial: 'login' | 'register' }) {
  const { login, register } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<'login' | 'register'>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [lf, setLf] = useState({ email: '', password: '' });
  const [rf, setRf] = useState({ name: '', email: '', password: '', confirm: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setLoading(true);
    const res = await login(lf.email, lf.password);
    setLoading(false);
    if (!res.success) { setError(res.error!); return; }
    router.refresh();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); 
    if (rf.password !== rf.confirm) { setError('Passwords do not match.'); return; }
    setLoading(true);
    const res = await register(rf.name, rf.email, rf.password);
    setLoading(false);
    if (!res.success) { setError(res.error!); return; }
    router.refresh();
  };

  const inputCls = 'brutal-input w-full';
  const labelCls = 'font-display font-bold text-xs uppercase tracking-widest opacity-60';

  return (
    <div className="max-w-md mx-auto w-full">
      {/* Tab switcher */}
      <div className="flex brutal-border brutal-shadow mb-8 overflow-hidden">
        {(['login', 'register'] as const).map(t => (
          <button
            key={t}
            onClick={() => { setTab(t); setError(''); }}
            className={`flex-1 py-4 font-display font-black uppercase text-sm tracking-widest transition-all border-r-3 last:border-r-0 border-[var(--border)] ${
              tab === t
                ? 'bg-[var(--text)] text-[var(--bg)]'
                : 'bg-[var(--bg)] hover:bg-primary hover:text-white'
            }`}
          >
            {t === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        ))}
      </div>

      {error && (
        <div className="flex items-center gap-3 border-3 border-destructive bg-destructive/10 p-4 mb-6">
          <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
          <p className="font-display font-bold uppercase text-sm text-destructive">{error}</p>
        </div>
      )}

      {tab === 'login' ? (
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className={labelCls}>Email</label>
            <input type="email" required value={lf.email} onChange={e => setLf(p => ({ ...p, email: e.target.value }))} placeholder="juan@example.com" className={inputCls} />
          </div>
          <div className="space-y-2">
            <label className={labelCls}>Password</label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} required value={lf.password} onChange={e => setLf(p => ({ ...p, password: e.target.value }))} placeholder="••••••••" className={`${inputCls} pr-12`} />
              <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="brutal-btn w-full py-4 rounded-none flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Signing in…</> : <><ArrowRight className="h-4 w-4" />Sign In</>}
          </button>
          <p className="text-center font-mono text-sm opacity-60">No account? <button type="button" onClick={() => setTab('register')} className="text-primary font-bold hover:underline">Create one</button></p>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-2">
            <label className={labelCls}>Full Name</label>
            <input type="text" required value={rf.name} onChange={e => setRf(p => ({ ...p, name: e.target.value }))} placeholder="Juan dela Cruz" className={inputCls} />
          </div>
          <div className="space-y-2">
            <label className={labelCls}>Email</label>
            <input type="email" required value={rf.email} onChange={e => setRf(p => ({ ...p, email: e.target.value }))} placeholder="juan@example.com" className={inputCls} />
          </div>
          <div className="space-y-2">
            <label className={labelCls}>Password</label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} required value={rf.password} onChange={e => setRf(p => ({ ...p, password: e.target.value }))} placeholder="Min. 6 characters" className={`${inputCls} pr-12`} />
              <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label className={labelCls}>Confirm Password</label>
            <input type={showPw ? 'text' : 'password'} required value={rf.confirm} onChange={e => setRf(p => ({ ...p, confirm: e.target.value }))} placeholder="Re-enter password" className={inputCls} />
          </div>
          <button type="submit" disabled={loading} className="brutal-btn w-full py-4 rounded-none flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Creating account…</> : <><ArrowRight className="h-4 w-4" />Create Account</>}
          </button>
          <p className="text-center font-mono text-sm opacity-60">Already have an account? <button type="button" onClick={() => setTab('login')} className="text-primary font-bold hover:underline">Sign in</button></p>
        </form>
      )}
    </div>
  );
}

// ─── PROFILE TAB ──────────────────────────────────────────
function ProfileTab() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '', address: user?.address || '' });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-lg">
      {/* Static info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="brutal-border p-4 flex items-center gap-3">
          <Mail className="h-4 w-4 text-primary shrink-0" />
          <div>
            <p className="font-display font-black text-xs uppercase tracking-widest opacity-50">Email</p>
            <p className="font-mono text-sm break-all">{user?.email}</p>
          </div>
        </div>
        <div className="brutal-border p-4 flex items-center gap-3">
          <CalendarDays className="h-4 w-4 text-primary shrink-0" />
          <div>
            <p className="font-display font-black text-xs uppercase tracking-widest opacity-50">Member Since</p>
            <p className="font-mono text-sm">{user?.joinedDate}</p>
          </div>
        </div>
      </div>

      {/* Editable fields */}
      <div className="space-y-5">
        {[
          { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your name', icon: <User className="h-4 w-4" /> },
          { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '09XX XXX XXXX', icon: <Phone className="h-4 w-4" /> },
          { label: 'Delivery Address', key: 'address', type: 'text', placeholder: 'Street, Barangay, City', icon: <MapPin className="h-4 w-4" /> },
        ].map(({ label, key, type, placeholder, icon }) => (
          <div key={key} className="space-y-2">
            <label className="font-display font-bold text-xs uppercase tracking-widest opacity-60 flex items-center gap-2">{icon}{label}</label>
            <input
              type={type}
              value={form[key as keyof typeof form]}
              onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
              placeholder={placeholder}
              className="brutal-input w-full"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button type="submit" className="brutal-btn px-8 py-3 rounded-none">Save Changes</button>
        {saved && (
          <div className="flex items-center gap-2 text-[#34C759]">
            <CheckCircle2 className="h-4 w-4" />
            <span className="font-display font-bold uppercase text-xs">Saved!</span>
          </div>
        )}
      </div>
    </form>
  );
}

// ─── ORDERS TAB ───────────────────────────────────────────
function OrdersTab() {
  const { orders } = useAuth();
  return (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <div className="brutal-border p-16 text-center">
          <Package className="h-16 w-16 mx-auto opacity-20 mb-4" />
          <p className="font-display font-bold text-xl uppercase">No orders yet</p>
          <p className="font-mono text-sm opacity-60 mt-1">Start shopping to see your orders here</p>
        </div>
      ) : orders.map(order => {
        const s = STATUS_STYLE[order.status];
        return (
          <div key={order.id} className="brutal-border brutal-shadow bg-[var(--bg)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
            <div className={`${s.bg} ${s.text} h-2 border-b-3 border-[var(--border)]`} />
            <div className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <p className="font-display font-black text-lg uppercase tracking-tight">{order.id}</p>
                  <p className="font-mono text-xs opacity-60">{order.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`${s.bg} ${s.text} px-3 py-1 brutal-border font-display font-black uppercase text-xs tracking-widest`}>
                    {order.status}
                  </span>
                  <span className="font-display font-black text-xl">₱{order.total.toLocaleString()}</span>
                </div>
              </div>
              <div className="space-y-2 border-t-3 border-[var(--border)] pt-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center font-mono text-sm">
                    <span className="opacity-80">{item.name} <span className="opacity-50">×{item.qty}</span></span>
                    <span className="font-bold">₱{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── SETTINGS TAB ─────────────────────────────────────────
function SettingsTab() {
  const { logout } = useAuth();
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="space-y-6 max-w-lg">
      <div className="brutal-border p-6 space-y-4">
        <h3 className="font-display font-black text-lg uppercase tracking-tight border-b-3 border-[var(--border)] pb-3">Notifications</h3>
        {[
          { label: 'Order Updates', desc: 'Get notified when your order status changes', id: 'notif-orders', default: true },
          { label: 'Promotions & Deals', desc: 'Be the first to know about exclusive deals', id: 'notif-promos', default: false },
          { label: 'New Arrivals', desc: 'Updates on latest products in stock', id: 'notif-arrivals', default: false },
        ].map(item => (
          <label key={item.id} htmlFor={item.id} className="flex items-start justify-between gap-4 cursor-pointer group">
            <div>
              <p className="font-display font-bold uppercase text-sm">{item.label}</p>
              <p className="font-mono text-xs opacity-60 mt-0.5">{item.desc}</p>
            </div>
            <div className="relative shrink-0 mt-0.5">
              <input type="checkbox" id={item.id} defaultChecked={item.default} className="sr-only peer" />
              <div className="w-11 h-6 brutal-border bg-[var(--bg)] peer-checked:bg-primary transition-colors" />
              <div className="absolute top-1 left-1 w-4 h-4 bg-[var(--text)] peer-checked:bg-white transition-all brutal-border peer-checked:translate-x-5" />
            </div>
          </label>
        ))}
      </div>

      <div className="brutal-border p-6 space-y-4 border-destructive">
        <h3 className="font-display font-black text-lg uppercase tracking-tight text-destructive border-b-3 border-destructive pb-3">Danger Zone</h3>
        {!showConfirm ? (
          <button onClick={() => setShowConfirm(true)} className="brutal-btn-ghost border-destructive text-destructive shadow-[4px_4px_0px_0px_#ef4444] px-6 py-3 rounded-none font-display font-black uppercase text-sm">
            Sign Out
          </button>
        ) : (
          <div className="space-y-3">
            <p className="font-mono text-sm opacity-70">Are you sure you want to sign out?</p>
            <div className="flex gap-3">
              <button onClick={handleLogout} className="brutal-btn bg-destructive border-destructive px-6 py-3 rounded-none text-sm">Yes, Sign Out</button>
              <button onClick={() => setShowConfirm(false)} className="brutal-btn-ghost px-6 py-3 rounded-none text-sm">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── INNER PAGE (uses useSearchParams) ───────────────────
function ProfileInner() {
  const { user, isLoggedIn } = useAuth();
  const searchParams = useSearchParams();
  const rawTab = searchParams.get('tab') ?? '';

  // tabs for logged-in
  type LoggedTab = 'info' | 'orders' | 'settings';
  const TABS: { key: LoggedTab; label: string; icon: React.ReactNode }[] = [
    { key: 'info',     label: 'My Info',   icon: <User className="h-4 w-4" /> },
    { key: 'orders',   label: 'My Orders', icon: <Package className="h-4 w-4" /> },
    { key: 'settings', label: 'Settings',  icon: <Settings className="h-4 w-4" /> },
  ];

  const [activeTab, setActiveTab] = useState<LoggedTab>(
    rawTab === 'orders' ? 'orders' : rawTab === 'settings' ? 'settings' : 'info'
  );

  // auth tab default
  const authDefault: 'login' | 'register' = rawTab === 'register' ? 'register' : 'login';

  return (
    <div className="min-h-screen bg-[var(--bg)] pb-20">
      {/* Background decorations */}
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Hero */}
        <div className="pt-16 pb-12 border-b-8 border-[var(--border)] mb-12">
          <div className="inline-block transform -rotate-1">
            <h1 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none">
              {isLoggedIn && user ? (
                <>Hi, <span className="text-primary">{user.name}</span>!</>
              ) : (
                <>Account<span className="text-primary">.</span></>
              )}
            </h1>
          </div>
        </div>

        {!isLoggedIn ? (
          /* ── NOT LOGGED IN ── */
          <div className="grid lg:grid-cols-[1fr_480px] gap-12 items-start">
            <div className="space-y-6">
              <div className="brutal-border brutal-shadow p-8 bg-[var(--bg)]">
                <div className="bg-[var(--text)] text-[var(--bg)] px-6 py-4 border-b-3 border-[var(--border)] -mx-8 -mt-8 mb-8">
                  <h2 className="font-display font-black text-2xl uppercase tracking-tighter">Sign In or Register</h2>
                  <p className="font-mono text-xs opacity-70 mt-1 uppercase">Manage orders, track shipments, and more.</p>
                </div>
                <AuthForms initial={authDefault} />
              </div>
            </div>
            <div className="space-y-4">
              {[
                { icon: <Package className="h-6 w-6" />, title: 'Track Orders', desc: 'View your order history and real-time shipping status.' },
                { icon: <User className="h-6 w-6" />, title: 'Manage Profile', desc: 'Update your personal info and delivery address.' },
                { icon: <Settings className="h-6 w-6" />, title: 'Preferences', desc: 'Control notification settings and account options.' },
              ].map((card, i) => (
                <div key={i} className="brutal-border p-5 bg-[var(--bg)] flex items-start gap-4 brutal-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                  <div className="w-12 h-12 bg-primary text-white brutal-border flex items-center justify-center shrink-0">{card.icon}</div>
                  <div>
                    <p className="font-display font-black uppercase tracking-tight">{card.title}</p>
                    <p className="font-mono text-xs opacity-60 mt-1">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ── LOGGED IN ── */
          <div className="grid lg:grid-cols-[220px_1fr] gap-8 items-start">
            {/* Sidebar */}
            <div className="space-y-3">
              {/* Avatar card */}
              <div className="brutal-border brutal-shadow bg-[var(--text)] text-[var(--bg)] p-6 flex flex-col items-center text-center gap-3">
                <div className="w-20 h-20 brutal-border border-[var(--bg)] bg-primary text-white flex items-center justify-center">
                  <span className="font-display font-black text-4xl">{user?.name?.[0]?.toUpperCase()}</span>
                </div>
                <div>
                  <p className="font-display font-black text-lg uppercase leading-tight">{user?.name}</p>
                  <p className="font-mono text-xs opacity-60 truncate max-w-[160px]">{user?.email}</p>
                </div>
              </div>
              {/* Nav tabs */}
              <nav className="brutal-border overflow-hidden">
                {TABS.map(({ key, label, icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`w-full flex items-center gap-3 px-5 py-4 font-display font-black uppercase text-sm tracking-wide border-b-3 last:border-b-0 border-[var(--border)] transition-all ${
                      activeTab === key
                        ? 'bg-primary text-white'
                        : 'bg-[var(--bg)] hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    {icon}
                    {label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="brutal-border brutal-shadow bg-[var(--bg)]">
              <div className="bg-[var(--text)] text-[var(--bg)] px-8 py-5 border-b-3 border-[var(--border)]">
                <h2 className="font-display font-black text-2xl uppercase tracking-tighter">
                  {TABS.find(t => t.key === activeTab)?.label}
                </h2>
              </div>
              <div className="p-8">
                {activeTab === 'info' && <ProfileTab />}
                {activeTab === 'orders' && <OrdersTab />}
                {activeTab === 'settings' && <SettingsTab />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── DEFAULT EXPORT WITH SUSPENSE ─────────────────────────
export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-display font-black text-2xl uppercase animate-pulse">Loading…</p>
      </div>
    }>
      <ProfileInner />
    </Suspense>
  );
}

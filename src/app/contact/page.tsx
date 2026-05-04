'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate a network request
    await new Promise((res) => setTimeout(res, 1500));
    setStatus('success');
    setFormState({ name: '', email: '', subject: '', message: '' });
  };

  const SOCIALS = [
    {
      name: 'Facebook',
      handle: 'efZDavaoComputerSales',
      href: 'https://www.facebook.com/efZDavaoComputerSales',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      color: 'bg-[#1877F2]',
      description: 'Follow for daily deals & updates',
    },
    {
      name: 'Instagram',
      handle: '@efzcomputers',
      href: 'https://www.instagram.com/efzcomputers',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      color: 'bg-gradient-to-br from-[#E1306C] to-[#833AB4]',
      description: 'Behind-the-scenes & builds',
    },
    {
      name: 'TikTok',
      handle: '@efzcomputers',
      href: 'https://www.tiktok.com/@efzcomputers',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.88a8.16 8.16 0 0 0 4.77 1.52V7.01a4.85 4.85 0 0 1-1-.32z" />
        </svg>
      ),
      color: 'bg-[#010101]',
      description: 'Tech tips & store tours',
    },
  ];

  const INFO_CARDS = [
    {
      icon: <MapPin className="h-7 w-7" />,
      label: 'Find Us',
      value: 'EFZ Bldg. Iñigo Street, Bo. Obero, Brgy 18-B Poblacion, Davao City, Philippines 8000',
      accent: 'bg-primary',
    },
    {
      icon: <Phone className="h-7 w-7" />,
      label: 'Call Us',
      value: '0943 611 0527',
      href: 'tel:+639436110527',
      accent: 'bg-[#34C759]',
    },
    {
      icon: <Mail className="h-7 w-7" />,
      label: 'Email Us',
      value: 'efzdavaocomputersales@gmail.com',
      href: 'mailto:efzdavaocomputersales@gmail.com',
      accent: 'bg-[#FF9F0A]',
    },
    {
      icon: <Clock className="h-7 w-7" />,
      label: 'Store Hours',
      value: 'Mon – Sat: 9:00 AM – 7:00 PM\nSunday: 10:00 AM – 5:00 PM',
      accent: 'bg-[#FF3B30]',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] pb-20 overflow-hidden">
      {/* BG Decorations */}
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">

        {/* ─── HERO ──────────────────────────────────────────── */}
        <div className="pt-16 pb-12 border-b-8 border-[var(--border)] mb-16 flex flex-col gap-6">
          <div className="inline-block transform -rotate-1">
            <h1 className="font-display font-black text-6xl md:text-9xl uppercase tracking-tighter leading-none">
              Contact<span className="text-primary">.</span>
            </h1>
          </div>
          <p className="font-mono text-lg md:text-xl opacity-70 max-w-2xl uppercase tracking-wide leading-relaxed">
            Got questions? Need a build recommendation? Hit us up — we&apos;re always down to talk tech.
          </p>
        </div>

        {/* ─── INFO CARDS ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {INFO_CARDS.map((card, i) => (
            <div
              key={i}
              className="brutal-border brutal-shadow bg-[var(--bg)] group hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all"
              style={{ '--hover-shadow': '7px 7px 0 0 var(--border)' } as React.CSSProperties}
            >
              {/* Accent bar */}
              <div className={`${card.accent} h-3 border-b-3 border-[var(--border)]`} />
              <div className="p-6 flex flex-col gap-3">
                <div className="text-[var(--text)] opacity-80 group-hover:text-primary transition-colors">
                  {card.icon}
                </div>
                <p className="font-display font-black text-xs uppercase tracking-widest opacity-50">
                  {card.label}
                </p>
                {card.href ? (
                  <a
                    href={card.href}
                    className="font-mono text-sm leading-relaxed hover:text-primary transition-colors font-bold break-all"
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="font-mono text-sm leading-relaxed whitespace-pre-line">
                    {card.value}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ─── FORM + SOCIALS GRID ────────────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">

          {/* Contact Form */}
          <div className="brutal-border brutal-shadow bg-[var(--bg)]">
            <div className="bg-[var(--text)] text-[var(--bg)] px-8 py-6 border-b-3 border-[var(--border)]">
              <h2 className="font-display font-black text-3xl uppercase tracking-tighter">
                Send a Message
              </h2>
              <p className="font-mono text-sm opacity-70 mt-1 uppercase">
                We&apos;ll get back to you ASAP.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="font-display font-bold text-xs uppercase tracking-widest opacity-60">
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Juan dela Cruz"
                    className="brutal-input w-full"
                    disabled={status === 'sending' || status === 'success'}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="font-display font-bold text-xs uppercase tracking-widest opacity-60">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="juan@example.com"
                    className="brutal-input w-full"
                    disabled={status === 'sending' || status === 'success'}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-subject" className="font-display font-bold text-xs uppercase tracking-widest opacity-60">
                  Subject *
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  required
                  value={formState.subject}
                  onChange={handleChange}
                  className="brutal-input w-full appearance-none cursor-pointer"
                  disabled={status === 'sending' || status === 'success'}
                >
                  <option value="" disabled>Select a topic…</option>
                  <option value="Product Inquiry">Product Inquiry</option>
                  <option value="PC Build Consultation">PC Build Consultation</option>
                  <option value="Order / Delivery">Order / Delivery</option>
                  <option value="Warranty & Returns">Warranty &amp; Returns</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="font-display font-bold text-xs uppercase tracking-widest opacity-60">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  value={formState.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell us what you need…"
                  className="brutal-input w-full resize-none"
                  disabled={status === 'sending' || status === 'success'}
                />
              </div>

              {/* Status messages */}
              {status === 'success' && (
                <div className="flex items-center gap-3 border-3 border-[#34C759] bg-[#34C759]/10 p-4">
                  <CheckCircle2 className="h-5 w-5 text-[#34C759] flex-shrink-0" />
                  <p className="font-display font-bold uppercase text-sm text-[#34C759]">
                    Message sent! We&apos;ll be in touch soon.
                  </p>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-3 border-3 border-destructive bg-destructive/10 p-4">
                  <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                  <p className="font-display font-bold uppercase text-sm text-destructive">
                    Something went wrong. Please try again.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className="brutal-btn px-8 py-4 flex items-center justify-center gap-3 rounded-none w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-[var(--brutal-shadow)]"
              >
                {status === 'sending' ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending…
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" /> Sent!
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Socials Column */}
          <div className="flex flex-col gap-6">
            {/* Socials label */}
            <div className="brutal-border-b pb-4">
              <h2 className="font-display font-black text-2xl uppercase tracking-tighter">
                Find Us Online
              </h2>
              <p className="font-mono text-xs opacity-60 mt-1 uppercase tracking-wide">
                Follow for deals, builds &amp; updates
              </p>
            </div>

            {/* Social Cards */}
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-border brutal-shadow bg-[var(--bg)] group hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all flex items-stretch overflow-hidden"
              >
                {/* Icon slab */}
                <div className={`${social.color} text-white flex items-center justify-center px-5 border-r-3 border-[var(--border)] flex-shrink-0 group-hover:brightness-110 transition-all`}>
                  {social.icon}
                </div>
                <div className="p-5 flex flex-col justify-center gap-1 flex-1">
                  <p className="font-display font-black text-lg uppercase tracking-tighter leading-none">
                    {social.name}
                  </p>
                  <p className="font-mono text-xs font-bold opacity-60">{social.handle}</p>
                  <p className="font-mono text-xs opacity-50 mt-1">{social.description}</p>
                </div>
                <div className="flex items-center pr-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                  <svg className="h-5 w-5 rotate-[-45deg]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}

            {/* Map / Address CTA */}
            <a
              href="https://maps.google.com/?q=EFZ+Computers+Davao+City"
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-border brutal-shadow bg-[var(--text)] text-[var(--bg)] p-6 flex flex-col gap-2 group hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all mt-2"
            >
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="font-display font-black text-sm uppercase tracking-widest opacity-60">Location</span>
              </div>
              <p className="font-display font-bold text-xl uppercase tracking-tighter leading-tight">
                EFZ Bldg. Iñigo Street
              </p>
              <p className="font-mono text-sm opacity-70">
                Bo. Obero, Brgy 18-B Poblacion<br />
                Davao City, Philippines 8000
              </p>
              <span className="font-display font-bold text-xs uppercase tracking-widest text-primary mt-2 group-hover:underline">
                Open in Google Maps →
              </span>
            </a>
          </div>
        </div>

        {/* ─── BOTTOM CTA BANNER ─────────────────────────────── */}
        <div className="mt-20 brutal-border brutal-shadow bg-primary text-white p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-mono text-sm uppercase tracking-widest opacity-70 mb-2">Need it fast?</p>
            <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter leading-none">
              Call us directly.
            </h2>
          </div>
          <a
            href="tel:+639436110527"
            className="brutal-btn bg-white text-primary border-white px-10 py-5 text-lg hover:bg-white hover:text-primary-hover shrink-0 inline-flex items-center gap-3"
          >
            <Phone className="h-5 w-5" />
            0943 611 0527
          </a>
        </div>

      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t-3 border-[var(--border)] bg-[var(--text)] text-[var(--bg)] pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <a href="#" className="font-display font-black text-3xl tracking-tighter uppercase inline-block">
              EFZ Computers
            </a>
            <p className="font-mono text-sm opacity-70 max-w-xs">
              All the best tech products in Davao. Brand New laptops, computer desktop, and MAC products. Shop easy at efZ!
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-xl uppercase mb-6 tracking-wide">Shop</h4>
            <ul className="space-y-3 font-medium opacity-80">
              <li><a href="/shop?category=graphics cards" className="hover:text-primary transition-colors hover:pl-2 inline-block">GPUs</a></li>
              <li><a href="/shop?category=processors" className="hover:text-primary transition-colors hover:pl-2 inline-block">Processors</a></li>
              <li><a href="/shop?category=motherboards" className="hover:text-primary transition-colors hover:pl-2 inline-block">Motherboards</a></li>
              <li><a href="#" className="hover:text-primary transition-colors hover:pl-2 inline-block">Pre-Built PCs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-xl uppercase mb-6 tracking-wide">Support</h4>
            <ul className="space-y-3 font-medium opacity-80">
              <li><a href="/contact" className="hover:text-primary transition-colors hover:pl-2 inline-block">Contact Us</a></li>
              <li><a href="/gallery" className="hover:text-primary transition-colors hover:pl-2 inline-block">Gallery</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-xl uppercase mb-6 tracking-wide">Contact</h4>
            <ul className="space-y-3 font-mono text-sm opacity-80">
              <li><a href="tel:+639436110527" className="hover:text-primary transition-colors">0943 611 0527</a></li>
              <li><a href="mailto:efzdavaocomputersales@gmail.com" className="hover:text-primary transition-colors break-all">efzdavaocomputersales@gmail.com</a></li>
              <li className="pt-4">
                <a href="https://maps.google.com/?q=EFZ+Computers+Davao+City" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  EFZ Bldg. Iñigo Street, <br />Bo. Obrero, Brgy 18-B Poblacion, <br />Davao City, Philippines, 8000
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[var(--bg)]/20 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="font-mono text-xs opacity-60 uppercase">
            &copy; {new Date().getFullYear()} EFZ Computers. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="https://www.facebook.com/efzdavaocomputersale" target="_blank" rel="noopener noreferrer" className="font-bold text-sm uppercase opacity-80 hover:opacity-100 hover:text-primary transition-colors">Facebook</a>
            <a href="https://www.instagram.com/efzdavaocomputersales/" target="_blank" rel="noopener noreferrer" className="font-bold text-sm uppercase opacity-80 hover:opacity-100 hover:text-primary transition-colors">Instagram</a>
            <a href="https://www.tiktok.com/@efzdavaocomputersales" target="_blank" rel="noopener noreferrer" className="font-bold text-sm uppercase opacity-80 hover:opacity-100 hover:text-primary transition-colors">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Button } from '@/components/ui/button';

export function Newsletter() {
  return (
    <section className="border-t-3 border-[var(--border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-32">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="font-display font-black text-6xl tracking-tighter uppercase">Stay Upgraded.</h2>
          <p className="text-lg opacity-80 font-medium">Want to get the latest drops, restock alerts, and exclusive brutal deals?</p>
          <div className="flex justify-center">
            <a 
              href="https://www.facebook.com/efzdavaocomputersale" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button className="brutal-btn px-8 py-6 w-full sm:w-auto rounded-none font-display font-black text-lg uppercase">
                FOLLOW US ON FACEBOOK
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Button } from '@/components/ui/button';

export function Newsletter() {
  return (
    <section className="border-t-3 border-[var(--border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-32">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="font-display font-black text-6xl tracking-tighter uppercase">Stay Upgraded.</h2>
          <p className="text-lg opacity-80 font-medium">Want to get the latest drops, restock alerts, and exclusive brutal deals?</p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <input type="email" placeholder="ENTER EMAIL ADDRESS" className="brutal-input flex-1 max-w-sm font-display uppercase tracking-widest text-sm" /> */}
            <Button type="submit" className="brutal-btn px-8 py-6 w-full sm:w-auto rounded-none">
              FOLLOW US ON FACEBOOK
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

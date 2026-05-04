import { Star, ThumbsUp } from 'lucide-react';
import { REVIEWS } from '@/lib/data';

export function Reviews() {
  return (
    <section className="bg-[#1877F2] text-white border-y-3 border-[var(--border)] py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 border-b-3 border-[var(--border)] md:border-white pb-6">
           <h2 className="font-display font-black text-5xl uppercase tracking-tighter">SATISFIED CUSTOMERS</h2>
           <div className="bg-white text-[#1877F2] font-bold px-4 py-2 brutal-border border-white brutal-shadow flex items-center space-x-2 whitespace-nowrap">
             <ThumbsUp className="h-5 w-5" /> <span>4.9/5 from FB</span>
           </div>
         </div>
         <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map(r => (
              <div key={r.id} className="brutal-card bg-[var(--bg)] text-[var(--text)] p-6 flex flex-col justify-between">
                 <div className="flex text-yellow-400 mb-4">
                   {[...Array(5)].map((_,i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                 </div>
                 <p className="font-medium text-lg mb-6 italic">&quot;{r.text}&quot;</p>
                 <div className="flex justify-between items-end border-t-3 border-[var(--border)] pt-4 mt-auto">
                    <div>
                      <p className="font-bold uppercase">{r.name}</p>
                      <p className="text-xs opacity-60 font-mono">{r.date}</p>
                    </div>
                    <div className="w-8 h-8 bg-[#1877F2] border-2 border-transparent rounded-full flex items-center justify-center text-white">
                      {/* <Facebook className="h-5 w-5 fill-current border-none" /> */}
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </section>
  );
}

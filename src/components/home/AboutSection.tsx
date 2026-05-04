import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { TEAM } from '@/lib/data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AboutSection() {
  return (
    <>
      {/* OUR STORY */}
      <section className="border-t-3 border-[var(--border)] py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="brutal-card p-0 overflow-hidden brutal-border">
            <Image src="/eric_and_farah.webp" alt="EFZ Workshop" width={1000} height={600} className="w-full h-80 object-cover grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
          <div className="space-y-6">
            <h2 className="font-display font-black text-5xl uppercase tracking-tighter">OUR STORY</h2>
            <p className="text-lg font-medium opacity-80 border-l-4 border-primary pl-4">
              It all started with Eric Zamora’s pure love for gaming and computers.
            </p>
            <p className="opacity-70">
              We don&apos;t just sell parts. We curate performance. At EFZ Computers, we believe that your machine should be a reflection of your ambition. No bloatware, no compromise, just raw, unadulterated computing power.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="brutal-btn rounded-none px-6 py-6 mt-4">Read Full Story</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto brutal-border rounded-none p-6 sm:p-10 bg-[var(--bg)] text-[var(--text)] brutal-shadow">
                <DialogHeader>
                  <DialogTitle className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tighter mb-4 pb-4 border-b-3 border-[var(--border)]">OUR STORY</DialogTitle>
                </DialogHeader>
                <div className="space-y-5 text-base opacity-90 leading-relaxed">
                  <p className="border-l-4 border-primary pl-4 mb-6 font-bold text-xl">
                    It all started with Eric Zamora’s pure love for gaming and computers.
                  </p>
                  <p>
                    At the age of 5, he really loved to play all kinds of gaming consoles. Grade school is when he got his first PC and from then on he decided to pursue Computer Science upon entering college. He loved going to computer stores and observe technicians on how they build PC&apos;S and install softwares. He had a change of mind and wants to be an engineer but the love of computers and gaming will always remain.
                  </p>
                  <p>
                    Around that time, he met his lifetime partner in College, Farah.
                  </p>
                  <p>
                    They started Station E internet Café beside his house with the help of his ₱50,000 savings and his first investors, his dad Enrico and sister Carla who believed in him.
                  </p>
                  <p>
                    That started Eric and Farah to become tech entrepreneurs since 2007. They have 2 branches of Station E. When they graduated, they started Net Central with partners which now have 10 branches that he is a part of. First Branch was in Tagum then all over Mindanao. They changed the gaming industry because of the cool interiors, updated games and high speed internet.
                  </p>
                  <p>
                    Around 2016, they also franchised The Net. Com in Bacolod with over three branches. However, due to the Pandemic, it was hard to manage it due to it being far away and they ended the contract and franchise for 3 branches in December 2023.
                  </p>
                  <p>
                    In 2019, Eric Zamora is also a PART-OWNER and HEAD TECHNICIAN of NetXpress Internet Café which continues to thrive, exemplifying how he transformed his passion for computers into a succesful business.
                  </p>
                  <p>
                    Pandemic happened and in August 2020, they opened their first small computer store in Obrero and named it EFZ- ERIC farah Zamora to make ends meet because their internet cafes was closed so they badly needed a back up plan.
                  </p>
                  <p>
                    Mr. efZ is very innovative and industrious and risked all his savings for this new endeavor with the help of his wife Farah.
                  </p>
                  <p>
                    Eric is a graduate of Electronics and Communications Engineering in Ateneo De Davao University.
                  </p>
                  <p>
                    Farah is a Registered Nurse turned entrepreneur. A salon owner and with plenty of small business projects experience, she is good in Marketing, Sales and known for her genuine, sincere and people person personality.
                  </p>
                  <p>
                    She handles the Social Media with bright and engaging ideas and dreams of having a positive community for the Davao tech enthusiasts.
                  </p>
                  <p>
                    Together, they will build EFZ Davao computer Sales that People will love, that they can turn to their tech needs with affordable and quality products that is innovative and can be your source for updates and latest tech needs.
                  </p>
                  <p>
                    What are you waiting for? Choose your home-grown Davaoenos as your one stop tech store in town! Pinoy nanaman ang isupport natin. We promise we will try to give you the best with Mr. efZ’s expertise on all brand new Tech!
                  </p>
                  <p className="font-black text-xl italic text-primary">
                    See you at eFZ store!
                  </p>
                </div>
              </DialogContent>
            </Dialog>
            </div>
          </div>
        </div>
      </section>

      {/* MEET THE TEAM */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display font-black text-5xl uppercase tracking-tighter border-b-3 border-[var(--border)] pb-6 inline-block">Meet the Team</h2>
        </div>
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 custom-scrollbar">
          {TEAM.map((member, i) => (
            <div key={i} className="min-w-[280px] sm:min-w-[320px] lg:min-w-0 lg:flex-1 flex-shrink-0 snap-center group brutal-border bg-[var(--bg)] overflow-hidden brutal-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex flex-col">
              <div className="h-80 border-b-3 border-[var(--border)] overflow-hidden bg-[var(--bg)] flex items-center justify-center relative">
                {member.image ? (
                   <Image src={member.image} alt={member.name} width={400} height={400} className="w-full h-full object-cover object-[center_25%] grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" />
                ) : (
                   <div className="flex flex-col items-center justify-center space-y-4 opacity-50 group-hover:opacity-100 transition-opacity">
                     <div className="grid grid-cols-2 gap-2">
                       <div className="w-12 h-12 brutal-border bg-primary rounded-full"></div>
                       <div className="w-12 h-12 brutal-border bg-[var(--text)] rounded-full"></div>
                       <div className="w-12 h-12 brutal-border bg-[var(--text)] rounded-full"></div>
                       <div className="w-12 h-12 brutal-border bg-primary rounded-full"></div>
                     </div>
                     <span className="font-display font-bold text-xl uppercase tracking-widest text-[var(--text)]">Group Photo</span>
                   </div>
                )}
              </div>
              <div className="p-4 text-center bg-[var(--text)] text-[var(--bg)] group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex-grow flex flex-col justify-center">
                 <h3 className="font-display font-bold text-2xl uppercase">{member.name}</h3>
                 <p className="font-mono text-sm opacity-90 mt-1">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

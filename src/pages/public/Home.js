import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import SectionReveal from '../../components/ui/SectionReveal';
import Hero from '../../components/sections/Hero';
import Features from '../../components/sections/Features';

/* ─────────────────────────────
   OFFROAD TRIPS (GALLERY)
───────────────────────────────*/
const tripImages = [
  'https://images.pexels.com/photos/19806867/pexels-photo-19806867.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/34759938/pexels-photo-34759938.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/35071363/pexels-photo-35071363.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/9550419/pexels-photo-9550419.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/9846190/pexels-photo-9846190.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/20707192/pexels-photo-20707192.jpeg?auto=compress&cs=tinysrgb&w=600',
];

const OffRoadTripsSection = () => (
  <section className="py-24 bg-cream/50">
    <div className="container mx-auto px-6">
      <SectionReveal>
        <div className="text-center mb-16">
          <span className="text-primary font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">Adventure</span>
          <h2 className="text-4xl md:text-5xl font-black text-secondary uppercase tracking-tighter mb-4 font-oswald">
            Offroad Trips for All<br />
            <span className="italic">Adventure Enthusiasts</span>
          </h2>
          <p className="text-secondary/60 max-w-2xl mx-auto font-medium">
            From gentle village roads to technical rock sections — our trips are crafted to match every skill level. Every Chennai Thar owner deserves a proper trail.
          </p>
        </div>
      </SectionReveal>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {tripImages.map((src, i) => (
          <SectionReveal key={i} delay={i * 0.08}>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden group shadow-xl">
              <img
                src={src}
                alt={`Trip ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────
   UPCOMING EVENTS
───────────────────────────────*/
const UpcomingEventsSection = () => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-6">
      <SectionReveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-primary font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">Calendar</span>
            <h2 className="text-4xl md:text-5xl font-black text-secondary uppercase tracking-tighter font-oswald">
              Join our <span className="italic text-primary">Adventure</span>
            </h2>
          </div>
          <Link to="/events" className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest hover:gap-4 transition-all pb-2">
            View All Events <ArrowRight size={16} />
          </Link>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <div className="relative rounded-[2rem] overflow-hidden group min-h-[500px] shadow-2xl">
          <img
            src="https://images.pexels.com/photos/34759938/pexels-photo-34759938.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Rock Crawling Trail"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-12 lg:p-16">
            <span className="text-primary font-black text-[10px] tracking-[0.4em] uppercase mb-4">Upcoming Community Event</span>
            <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6 font-oswald">
              Rock Crawling <br /> Championship 2026
            </h3>
            <div className="flex flex-wrap items-center gap-8 text-white/80 text-xs font-black uppercase tracking-widest mb-10">
              <span className="flex items-center gap-2 border-r border-white/20 pr-8"><Calendar size={14} className="text-primary" /> April 20, 2026</span>
              <span className="flex items-center gap-2"><MapPin size={14} className="text-primary" /> Madurantakam Off-Road Park</span>
            </div>
            <Link to="/membership">
              <button className="bg-primary hover:bg-primary-dark text-white font-black uppercase tracking-widest px-12 py-5 rounded-full text-xs transition-all hover:scale-105 shadow-2xl shadow-primary/40">
                Register Now
              </button>
            </Link>
          </div>
        </div>
      </SectionReveal>
    </div>
  </section>
);

/* ─────────────────────────────
   CTA
───────────────────────────────*/
const CTASection = () => (
  <section className="py-32 bg-cream/30">
    <div className="container mx-auto px-6">
      <SectionReveal className="relative rounded-[3rem] overflow-hidden p-12 md:p-24 text-center group shadow-2xl">
        <img
          src="https://images.pexels.com/photos/20707192/pexels-photo-20707192.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Thar adventure"
          className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/90 z-[1]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight uppercase tracking-tighter font-oswald">
            Are you ready to<br />join the league?
          </h2>
          <p className="text-white/80 text-lg mb-12 font-medium">
            Click below to start your journey with Thar Chennai. Experience the thrill of the unexplored.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/membership">
              <button className="bg-white text-primary hover:bg-cream shadow-2xl font-black uppercase tracking-widest px-10 py-5 rounded-full text-sm transition-all hover:scale-105">
                Become a Member
              </button>
            </Link>
            <Link to="/contact">
              <button className="border-2 border-white/30 hover:bg-white/10 text-white font-black uppercase tracking-widest px-10 py-5 rounded-full text-sm transition-all hover:scale-105">
                Contact Support
              </button>
            </Link>
          </div>
        </div>
      </SectionReveal>
    </div>
  </section>
);

const Home = () => {
  return (
    <div className="bg-cream overflow-hidden">
      <Hero />
      <OffRoadTripsSection />
      <Features />
      <UpcomingEventsSection />
      <CTASection />
    </div>
  );
};

export default Home;

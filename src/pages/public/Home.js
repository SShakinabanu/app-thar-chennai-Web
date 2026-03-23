import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, MapPin, ArrowRight, Star } from 'lucide-react';
import SectionReveal from '../../components/ui/SectionReveal';
import Hero from '../../components/sections/Hero';
import Features from '../../components/sections/Features';

/* ─────────────────────────────
   ACTIVITIES
───────────────────────────────*/
const activities = [
  {
    img: 'https://static.wixstatic.com/media/5164b1_7691b890b941480d929ed11f6bb0da9b~mv2.jpg/v1/fill/w_330,h_410,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5164b1_7691b890b941480d929ed11f6bb0da9b~mv2.jpg',
    title: 'Workshop',
    desc: 'These workshop sessions cover vehicle maintenance, recovery techniques, safety practices, and practical demonstrations on modifications and accessories. The workshops create a learning platform where enthusiasts can share experiences, gain skills, and prepare their Thars for every adventure.'
  },
  {
    img: 'https://static.wixstatic.com/media/5164b1_bd491a8ab7ee41d0a4b39650134ee0a9~mv2.jpg/v1/crop/x_24,y_0,w_1233,h_1158/fill/w_426,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/98fee54a-bdcb-4607-9562-26db7fc7b766.jpg',
    title: 'Meet & Greet',
    desc: 'It’s a casual gathering where new friendships are built, experiences are shared, and upcoming drives and events are discussed. The focus is on camaraderie, community events, and celebrating the spirit of Thar ownership and club anniversary.The recent Meet & Greet was held on 20th December 2025.'
  },
  {
    img: 'https://static.wixstatic.com/media/5164b1_67e99ed866f640a79160fbe98fd55886~mv2.jpg/v1/crop/x_439,y_0,w_402,h_499/fill/w_330,h_410,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/da70662c-1f11-4268-b69e-65961884b61f_JPG.jpg',
    title: 'Community & Social Responsibility',
    desc: 'Thar Chennai is committed to giving back through road safety awareness, eco-friendly off-road practices, charity drives and community support initiatives. From trail clean-ups and tree plantations to aiding local communities during disasters, fire patrolling, the club ensures that adventure goes hand in hand with responsibility'
  }
];

const ActivitiesSection = () => (
  <section className="py-24 bg-dark">
    <div className="container mx-auto px-6">
      <SectionReveal>
        <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-16 uppercase tracking-tighter">
          Activities
        </h2>
      </SectionReveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem', maxWidth: '1000px', margin: '0 auto' }}>
        {activities.map((a, i) => (
          <SectionReveal key={i} delay={i * 0.15}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>

              {/* Fixed size image — same for all 3 */}
              <div style={{ width: '100%', height: '200px', overflow: 'hidden', borderRadius: '12px', marginBottom: '20px' }}>
                <img
                  src={a.img}
                  alt={a.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
              </div>

              {/* Title — single line, no wrap */}
              <h3 style={{
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '0.95rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginBottom: '16px'
              }}>
                {a.title}
              </h3>

              {/* Description — justified like image 2 */}
              <p style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.85rem',
                lineHeight: '1.7',
                textAlign: 'justify'
              }}>
                {a.desc}
              </p>

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
  <section className="py-24 bg-secondary/20">
    <div className="container mx-auto px-6">
      <SectionReveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Upcoming Events
          </h2>
          <Link to="/events" className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all">
            View All <ArrowRight size={16} />
          </Link>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <div className="relative rounded-2xl overflow-hidden group max-h-[360px]">
          <img
            src="/pexels-imadclicks-34759938.jpg"
            alt="Rock Crawling Trail"
            className="w-full h-[360px] object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <span className="text-primary font-black text-xs tracking-[0.3em] uppercase mb-2">Thar Chennai Presents</span>
            <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-3">
              Rock Crawling Trail
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm mb-4">
              <span className="flex items-center gap-1"><Calendar size={13} /> April 20</span>
              <span className="flex items-center gap-1"><MapPin size={13} /> Madurantakam Off-Road Park</span>
            </div>
            <ul className="text-white/60 text-sm space-y-1 mb-5">
              <li>✔ Adventure Trails &nbsp;&nbsp; ✔ Scheduled Checkpoints &nbsp;&nbsp; ✔ Run/RC Events</li>
            </ul>
            <Link to="/membership">
              <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold uppercase tracking-widest px-7 py-2.5 rounded-full text-sm transition-all hover:scale-105">
                Join Us
              </button>
            </Link>
          </div>
        </div>
      </SectionReveal>
    </div>
  </section>
);

/* ─────────────────────────────
   OFFROAD TRIPS
───────────────────────────────*/
const tripImages = [
  '/pexels-qaarif-9846190.jpg',
  '/pexels-imadclicks-35071363.jpg',
  '/pexels-rubaitulazad-20707192.jpg',
  '/pexels-billingphotography-9550419.jpg',
  '/pexels-as-hi___ii-898063476-19806867.jpg',
  '/pexels-imadclicks-34759938.jpg',
];

const OffRoadTripsSection = () => (
  <section className="py-24 bg-dark">
    <div className="container mx-auto px-6">
      <SectionReveal>
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Offroad Trips for All<br />
            <span className="text-white/20">Adventure Enthusiasts</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            From gentle village roads to technical rock sections — our trips are crafted to match every skill level. Every Chennai Thar owner deserves a proper trail.
          </p>
        </div>
      </SectionReveal>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {tripImages.map((src, i) => (
          <SectionReveal key={i} delay={i * 0.08}>
            <div className="rounded-2xl overflow-hidden group" style={{ height: '220px' }}>
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
   ADVENTURERS SHARE STORIES — SLIDER
───────────────────────────────*/
const testimonials = [
  {
    name: 'Ramesh Kumar',
    location: 'Velachery, Chennai',
    text: 'Joining Thar Chennai was the best decision I made after buying my Thar. The trails, the people, the brotherhood — nothing compares. My first rock crawling session completely changed how I see off-roading.',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    stars: 5,
  },
  {
    name: 'Priya Shankar',
    location: 'Anna Nagar, Chennai',
    text: "I was nervous being one of the few women riders in the group, but Thar Chennai made me feel completely at home. The community is so supportive. Can't wait for the next expedition!",
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    stars: 5,
  },
  {
    name: 'Vikram Raj',
    location: 'OMR, Chennai',
    text: 'The Run Calendar is packed with events. Every month there\'s something new — monsoon trails, camping nights, rock crawl challenges. This club keeps you hooked all year long.',
    img: 'https://randomuser.me/api/portraits/men/65.jpg',
    stars: 5,
  },
  {
    name: 'Arun Nair',
    location: 'Tambaram, Chennai',
    text: 'Expert guidance from seniors, proper convoy rules, and safety briefings — this is a professional club. Learned more in 3 trail runs than I did in 10 years of solo driving.',
    img: 'https://randomuser.me/api/portraits/men/21.jpg',
    stars: 5,
  },
];

const StoriesSlider = () => {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;
  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <section className="py-24 bg-secondary/20 overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionReveal>
          <h2 className="text-4xl md:text-5xl font-black text-white text-center uppercase tracking-tighter mb-16">
            Adventurers Share<br />
            <span className="text-white/20">Their Stories</span>
          </h2>
        </SectionReveal>

        <div className="relative max-w-3xl mx-auto">
          {/* Fixed-height wrapper so box never shrinks */}
          <div style={{ minHeight: '320px' }} className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4 }}
                className="bg-black/40 border border-white/10 rounded-3xl p-10 md:p-14 text-center absolute inset-0 flex flex-col items-center justify-center"
              >
                <div className="flex justify-center mb-4 gap-1">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={18} fill="#c41e3a" className="text-primary" />
                  ))}
                </div>
                <p className="text-white/80 text-lg leading-relaxed mb-8 italic">"{t.text}"</p>
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-16 h-16 rounded-full object-cover mx-auto mb-4 border-2 border-primary"
                />
                <p className="text-white font-black text-base uppercase tracking-wide">{t.name}</p>
                <p className="text-white/40 text-xs uppercase tracking-widest mt-1">{t.location}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-primary hover:text-primary transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: total }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-primary w-6' : 'bg-white/20 w-2'}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-primary hover:text-primary transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────
   LATEST ADVENTURE POSTS
───────────────────────────────*/
const posts = [
  {
    img: '/pexels-qaarif-9846190.jpg',
    date: 'March 10, 2025',
    title: 'Monsoon Trail Run — Yelagiri Hills',
    excerpt: 'Our biggest trail convoy yet — 42 Thars, one epic weekend through rain-soaked terrain in Yelagiri.',
  },
  {
    img: '/pexels-imadclicks-35071363.jpg',
    date: 'February 22, 2025',
    title: 'Night Drive to Madurantakam',
    excerpt: "A late-night surprise run with 20+ members, bonfire, and the most starlit sky we've ever seen together.",
  },
  {
    img: '/pexels-billingphotography-9550419.jpg',
    date: 'January 15, 2025',
    title: 'Rock Crawl Championship 2025',
    excerpt: "Chennai's first intra-club rock crawl competition — 3 categories, 18 participants, and one ultimate champion.",
  },
];

const LatestPostsSection = () => (
  <section className="py-24 bg-dark">
    <div className="container mx-auto px-6">
      <SectionReveal>
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter text-center mb-16">
          Latest Adventure Posts
        </h2>
      </SectionReveal>
      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((p, i) => (
          <SectionReveal key={i} delay={i * 0.15}>
            <div className="group rounded-2xl overflow-hidden bg-secondary/20 border border-white/5 hover:border-primary/20 transition-all duration-500 flex flex-col">
              <div className="overflow-hidden" style={{ height: '220px' }}>
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-7 flex-1">
                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">{p.date}</p>
                <h3 className="text-xl font-black text-white mb-3 uppercase leading-tight">{p.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{p.excerpt}</p>
                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 text-primary text-sm font-bold mt-5 hover:gap-4 transition-all"
                >
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────
   SHARE YOUR EXPERIENCE
───────────────────────────────*/
const ShareExperienceSection = () => {
  const [name, setName] = useState('');
  const [story, setStory] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && story) setSubmitted(true);
  };

  return (
    <section className="py-24 bg-secondary/10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <SectionReveal>
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Community</span>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">
              Share Your<br />
              <span className="text-white/20">Thar Experience</span>
            </h2>
            <p className="text-white/50 mb-10 leading-relaxed">
              Been on an epic trail? Share your story with the Thar Chennai family. The best submissions get featured on our website and social media!
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary/10 border border-primary/30 rounded-2xl p-10"
              >
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-2xl font-black text-white mb-2">Story Submitted!</h3>
                <p className="text-white/60">Thanks! Our team will review and feature it soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <div>
                  <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-2">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-primary transition-all placeholder-white/20"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-2">Your Story</label>
                  <textarea
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    placeholder="Tell us about your best Thar moment..."
                    rows={5}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-primary transition-all placeholder-white/20 resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-black uppercase tracking-widest py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Submit My Story
                </button>
              </form>
            )}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

/* ─────────────────────────────
   CTA
───────────────────────────────*/
const CTASection = () => (
  <section className="py-32">
    <div className="container mx-auto px-6">
      <SectionReveal className="relative rounded-[40px] overflow-hidden p-12 md:p-24 text-center group">
        <img
          src="/pexels-rubaitulazad-20707192.jpg"
          alt="Thar adventure"
          className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-black/90 z-[1]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight uppercase tracking-tighter">
            Are you ready to<br />join the league?
          </h2>
          <p className="text-white/80 text-lg mb-12 font-medium">
            Click below to start your journey with Thar Chennai. Experience the thrill of the unexplored.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/membership">
              <button className="bg-white text-primary hover:bg-white/90 shadow-2xl font-black uppercase tracking-widest px-10 py-4 rounded-xl text-lg transition-all hover:scale-105">
                Become a Member
              </button>
            </Link>
            <Link to="/contact">
              <button className="border border-white/20 hover:bg-white/10 text-white font-black uppercase tracking-widest px-10 py-4 rounded-xl text-lg transition-all hover:scale-105">
                Contact Support
              </button>
            </Link>
          </div>
        </div>
      </SectionReveal>
    </div>
  </section>
);

/* ─────────────────────────────
   HOME PAGE ASSEMBLY
───────────────────────────────*/
const Home = () => (
  <div className="bg-dark overflow-hidden">
    <Hero />
    <Features />
    <ActivitiesSection />
    <UpcomingEventsSection />
    <OffRoadTripsSection />
    <StoriesSlider />
    <LatestPostsSection />
    <ShareExperienceSection />
    <CTASection />
  </div>
);

export default Home;

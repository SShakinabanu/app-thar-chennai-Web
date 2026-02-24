import React from 'react';
import SectionReveal from '../ui/SectionReveal';
import { Shield, Map, Zap, Users } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, index }) => (
    <SectionReveal delay={index * 0.1} className="group p-10 rounded-3xl bg-secondary/30 border border-white/5 hover:border-primary/30 transition-all duration-500">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
            <Icon size={32} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-white/50 leading-relaxed">{description}</p>
    </SectionReveal>
);

const Features = () => {
    const features = [
        {
            icon: Shield,
            title: "Expert Guidance",
            description: "Learn off-roading from certified enthusiasts with over a decade of experience in tough terrains."
        },
        {
            icon: Map,
            title: "Remote Trails",
            description: "Access exclusive, scouted trails that you won't find on any map. Real adventure starts here."
        },
        {
            icon: Users,
            title: "Elite Community",
            description: "Network with high-profile Thar owners. It's not just a club, it's a brotherhood on wheels."
        },
        {
            icon: Zap,
            title: "Priority Service",
            description: "Get exclusive discounts and priority service at partner workshops and accessory stores."
        }
    ];

    return (
        <section className="py-32 bg-dark relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
                    <div className="space-y-32">
                        <SectionReveal direction="right">
                            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-6 block">Our DNA</span>
                            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8">
                                EXTREME DRIVES. <br />
                                <span className="text-white/20">PREMIUM LIFESTYLE.</span>
                            </h2>
                            <p className="text-xl text-white/50 leading-relaxed max-w-xl">
                                Established in 2021, Thar Club Chennai has become the benchmark for luxury off-roading communities in India. We combine the ruggedness of the Thar with premium hospitalities.
                            </p>
                        </SectionReveal>

                        <div className="grid grid-cols-2 gap-6 mt-12">
                            <SectionReveal delay={0.2} className="aspect-square rounded-3xl overflow-hidden border border-white/10 group">
                                <img src="/pexels-qaarif-9846190.jpg" alt="Thar on rocks" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </SectionReveal>
                            <SectionReveal delay={0.4} className="aspect-square rounded-3xl overflow-hidden border border-white/10 mt-12 group">
                                <img src="/pexels-imadclicks-35071363.jpg" alt="Thar in desert" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </SectionReveal>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8 h-fit">
                        {features.map((feature, i) => (
                            <FeatureCard key={i} {...feature} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;

import React from 'react';
import SectionReveal from '../ui/SectionReveal';

const Features = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <SectionReveal>
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block">Our Commitment</span>
                            <h2 className="text-4xl md:text-6xl font-black text-secondary leading-[1.1] mb-8 tracking-tighter uppercase font-oswald">
                                MORE THAN JUST <br />
                                <span className="italic">OFF-ROADING</span>
                            </h2>
                            <div className="space-y-6 text-secondary/70 text-lg leading-relaxed font-medium">
                                <p>
                                    At Thar Chennai, we believe in adventure with a purpose. Beyond the trails, we are committed to building a community that values safety, vehicle knowledge, and social responsibility.
                                </p>
                                <p>
                                    From technical workshops on vehicle recovery to social initiatives and relief efforts, our club stands for excellence and camaraderie in every aspect of the off-roading lifestyle.
                                </p>
                            </div>
                        </SectionReveal>
                    </div>
                    <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                                <img src="https://static.wixstatic.com/media/5164b1_7691b890b941480d929ed11f6bb0da9b~mv2.jpg/v1/fill/w_330,h_410,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5164b1_7691b890b941480d929ed11f6bb0da9b~mv2.jpg" alt="Workshop" className="w-full h-full object-cover" />
                            </div>
                            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                                <img src="https://static.wixstatic.com/media/5164b1_bd491a8ab7ee41d0a4b39650134ee0a9~mv2.jpg/v1/crop/x_24,y_0,w_1233,h_1158/fill/w_426,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/98fee54a-bdcb-4607-9562-26db7fc7b766.jpg" alt="Meetup" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="space-y-4 pt-12">
                            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                                <img src="https://static.wixstatic.com/media/5164b1_67e99ed866f640a79160fbe98fd55886~mv2.jpg/v1/crop/x_439,y_0,w_402,h_499/fill/w_330,h_410,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/da70662c-1f11-4268-b69e-65961884b61f_JPG.jpg" alt="Social Responsibility" className="w-full h-full object-cover" />
                            </div>
                            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                                <img src="https://images.pexels.com/photos/19806867/pexels-photo-19806867.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Trail" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
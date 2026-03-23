import React from 'react';
import SectionReveal from '../../components/ui/SectionReveal';

const CAR_IMAGE = 'https://images.pexels.com/photos/34759938/pexels-photo-34759938.jpeg?auto=compress&cs=tinysrgb&w=800';

const workshopItems = [
    'Safety & responsibility on trails',
    'Protecting ecosystems',
    'Off-road culture & etiquette',
    'Vehicle recoveries & emergency readiness',
];

const About = () => {
    return (
        <>
            <style>{`
                .about-page {
                    background: #fff;
                    padding-top: 80px;
                    min-height: 100vh;
                }

                /* ── Hero Banner ── */
                .about-hero {
                    background: #7a7a4e;
                    padding: 52px 24px;
                    text-align: center;
                }
                .about-hero h1 {
                    color: #fff;
                    font-family: 'Oswald', sans-serif;
                    font-size: clamp(1.6rem, 3.5vw, 2.2rem);
                    font-weight: 900;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    margin: 0 0 14px;
                }
                .about-hero p {
                    color: rgba(255,255,255,0.9);
                    font-size: clamp(0.88rem, 1.8vw, 1rem);
                    max-width: 520px;
                    margin: 0 auto;
                    line-height: 1.8;
                }

                /* ── Journey Layout ── */
                .about-body {
                    max-width: 1120px;
                    margin: 0 auto;
                    padding: 64px 40px;
                    display: grid;
                    grid-template-columns: 1fr 360px;
                    gap: 64px;
                    align-items: start;
                }

                /* ── Left Text ── */
                .journey-left h2 {
                    font-family: 'Oswald', sans-serif;
                    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
                    font-weight: 900;
                    color: #1a1a1a;
                    text-transform: uppercase;
                    letter-spacing: -0.01em;
                    line-height: 1;
                    margin: 0 0 24px;
                }
                .journey-left p {
                    color: rgba(26,26,26,0.66);
                    font-size: 0.94rem;
                    line-height: 1.78;
                    margin: 0 0 12px;
                }
                .journey-left p.tagline {
                    font-weight: 900;
                    color: #1a1a1a;
                    text-transform: uppercase;
                    letter-spacing: 0.06em;
                    font-size: 0.85rem;
                    margin-top: 18px;
                }
                .workshop-intro {
                    margin-bottom: 6px !important;
                }
                .workshop-list {
                    list-style: none;
                    padding: 0;
                    margin: 0 0 12px;
                }
                .workshop-list li {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: rgba(26,26,26,0.66);
                    font-size: 0.94rem;
                    line-height: 1.6;
                    margin-bottom: 6px;
                }
                .dot {
                    width: 7px;
                    height: 7px;
                    min-width: 7px;
                    border-radius: 50%;
                    background: #c0002a;
                }

                /* ── Right Image ── */
                .journey-right {
                    position: sticky;
                    top: 100px;
                }
                .journey-right img {
                    width: 100%;
                    height: 600px;
                    object-fit: cover;
                    border-radius: 10px;
                    display: block;
                    box-shadow: 0 16px 48px rgba(0,0,0,0.14);
                }

                /* ── Mobile ── */
                @media (max-width: 820px) {
                    .about-body {
                        grid-template-columns: 1fr;
                        padding: 40px 20px;
                        gap: 32px;
                    }
                    .journey-right {
                        position: static;
                        order: -1;
                    }
                    .journey-right img {
                        height: 280px;
                    }
                    .about-hero {
                        padding: 40px 20px;
                    }
                }
            `}</style>

            <div className="about-page">

                {/* Hero Banner */}
                <section className="about-hero">
                    <h1>THAR CHENNAI 4X4</h1>
                    <p>
                        Thar Chennai 4x4 Club with its motto of "Off-roading redefined, Adventure unmatched" is a
                        passionate community of Mahindra Thar enthusiasts united by a love for adventure,
                        off-roading, and camaraderie.
                    </p>
                </section>

                {/* Our Journey */}
                <div className="about-body">

                    {/* Left */}
                    <div className="journey-left">
                        <SectionReveal>
                            <h2>OUR JOURNEY</h2>
                            <p>
                                Thar Chennai didn't begin with a committee or a clubhouse. It began with
                                few people… and the arrival of the New Thar. What started as an informal
                                group of auto enthusiasts is now a formal, registered club — a tribe built on
                                passion, camaraderie, and pure off-road spirit.
                            </p>
                            <p>
                                We don't just off-road; we do it responsibly. We have a dedicated squad
                                team that does thorough trail reconnaissance well in advance — to ensure
                                safety from all perspectives.
                            </p>
                            <p>
                                Beyond adventure, we stand for our community. When Chennai faced heavy rains,
                                our members supported relief efforts.
                            </p>
                            <p>
                                And we're working on plans to give back to the rural zones where our off-road
                                trails run — supporting the very lands that fuel our journeys.
                            </p>
                            <p className="workshop-intro">We run regular workshops to teach:</p>
                            <ul className="workshop-list">
                                {workshopItems.map((item) => (
                                    <li key={item}><span className="dot" />{item}</li>
                                ))}
                            </ul>
                            <p>
                                At Thar Chennai, we encourage everyone to embrace the spirit of
                                adventure — to explore, camp under the stars, and travel far beyond their
                                comfort zones in our annual expeditions.
                            </p>
                            <p>
                                We believe in experiencing diverse cultures firsthand, learning from them,
                                and building connections that go beyond borders.
                            </p>
                            <p>
                                Our club is non-commercial — driven purely by passion and community.
                                Together, we want to grow this sport, make off-roading more popular and
                                accessible and create a space where enthusiasts learn, share, and thrive as
                                one family.
                            </p>
                            <p>Thar Chennai is more than a club. It's a movement.</p>
                            <p className="tagline">OFF-ROADING REDEFINED, ADVENTURE UNMATCHED</p>
                        </SectionReveal>
                    </div>

                    {/* Right Image */}
                    <div className="journey-right">
                        <SectionReveal direction="left">
                            <img src={CAR_IMAGE} alt="Thar Chennai Off-Road" />
                        </SectionReveal>
                    </div>

                </div>

            </div>
        </>
    );
};

export default About;
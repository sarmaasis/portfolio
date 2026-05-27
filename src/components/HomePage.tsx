import { type FC, type MouseEvent } from 'react';
import { SEO } from './SEO';

interface HomePageProps {
    region?: 'us' | 'eu' | 'global';
    handleEmailPopup: (e: MouseEvent) => void;
}

export const HomePage: FC<HomePageProps> = ({ region = 'global', handleEmailPopup }) => {
    return (
        <>
            <SEO region={region} />

            <section className="hero">
                <h2 className="hero-title">Backend Infrastructure Built for Your Next Round</h2>
                <p className="hero-subtitle">
                    I build sub-100ms APIs, optimize database architecture, and cut cloud costs for fast-growing HealthTech and PropTech startups—using Go, Node.js, and Cloudflare edge infrastructure.
                </p>
                <a
                    href="https://calendly.com/sarmaasis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                >
                    Book a Free Architecture Audit
                </a>
            </section>

            <section className="services">
                <h2>What I Do</h2>
                <div className="card-grid">
                    <article className="card">
                        <h3>Architecture & Scaling</h3>
                        <p>Migrating monolithic MVPs to high-performance microservices. Designed for Series A load—not weekend hobby traffic. Systems that won't become technical debt six months post-launch.</p>
                    </article>
                    <article className="card">
                        <h3>Cloud Cost Optimization</h3>
                        <p>Moving heavy AWS workloads to edge-first Cloudflare infrastructure. I've replaced AWS Elasticsearch with Typesense on Cloudflare Workers—cutting both search latency and server bills.</p>
                    </article>
                    <article className="card">
                        <h3>B2B Workflow Automation</h3>
                        <p>Secure internal tools and micro-SaaS backends for compliance-sensitive industries. HIPAA-ready, audit-friendly, and built to integrate cleanly with your existing stack.</p>
                    </article>
                </div>
            </section>

            <section className="companies">
                <h2>Case Studies</h2>
                <div className="card-grid">
                    <article className="card">
                        <h3><a href="https://aa.health" target="_blank" rel="noopener noreferrer">aa.health</a></h3>
                        <p>Built the HIPAA-compliant backend infrastructure from scratch. Secure patient management, production-grade privacy controls, and audit-ready data flows for a regulated healthcare environment.</p>
                    </article>
                    <article className="card">
                        <h3><a href="https://app.hudpro.com" target="_blank" rel="noopener noreferrer">Hudpro.com</a></h3>
                        <p>Designed the database architecture powering nationwide real estate inventory. High-concurrency queries across millions of property records—no latency spikes under production load.</p>
                    </article>
                    <article className="card">
                        <h3><a href="https://www.whydonate.com" target="_blank" rel="noopener noreferrer">Whydonate.com</a></h3>
                        <p>Scaled the API layer to handle 2M+ requests per day. Infrastructure runs on Python, PostgreSQL, and Cloudflare—stable under sustained donor campaign traffic spikes.</p>
                    </article>
                    <article className="card highlight-card">
                        <h3><a href="#" onClick={handleEmailPopup} data-popup-title="Let's work together">Your Company</a><span className="cursor"></span></h3>
                        <p>If your API is slow, your cloud bill is climbing, or your MVP architecture won't survive your next growth phase—let's talk.</p>
                    </article>
                </div>
            </section>

            <section className="availability">
                <div className="status-indicator">
                    <span className="dot pulse"></span>
                    <p>Available for new contracts</p>
                </div>
                <ul className="list-group">
                    <li className="list-item">
                        <strong>Architecture & Scaling</strong>
                        <span>Remote • Contract</span>
                    </li>
                    <li className="list-item">
                        <strong>Cloud Cost Optimization</strong>
                        <span>Remote • Consulting</span>
                    </li>
                    <li className="list-item">
                        <strong>B2B Workflow Automation</strong>
                        <span>Remote • Contract</span>
                    </li>
                </ul>
            </section>

            <section className="testimonials">
                <h2>Client Feedback</h2>
                <div className="card-grid">
                    <article className="testimonial-card">
                        <div className="rating">⭐⭐⭐⭐⭐</div>
                        <p>"Ashish delivered exceptional work on a highly technical Cloudflare/Workers project. He produced a very detailed and well-structured architecture document..."</p>
                        <span className="client-project">Cloudflare Edge Architecture</span>
                    </article>
                    <article className="testimonial-card">
                        <div className="rating">⭐⭐⭐⭐⭐</div>
                        <p>"Ashish is a fantastic dev. Very hardworking and was always able to come up with solutions for my project. I would highly recommend him to anyone else."</p>
                        <span className="client-project">Cloudflare Worker + Supabase Integration</span>
                    </article>
                    <article className="testimonial-card">
                        <div className="rating">⭐⭐⭐⭐⭐</div>
                        <p>"I'd love to work with Ashish again. He really writes clean, great code."</p>
                        <span className="client-project">ASN1/DER Parsing on Cloudflare Edge</span>
                    </article>
                    <article className="testimonial-card">
                        <div className="rating">⭐⭐⭐⭐⭐</div>
                        <p>"Was great working with him. He made everything work and went above and beyond."</p>
                        <span className="client-project">Custom Webhook with Reverse Proxy</span>
                    </article>
                </div>
            </section>
        </>
    );
};

export default HomePage;

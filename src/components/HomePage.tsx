import React from 'react';
import { SEO } from './SEO';

interface HomePageProps {
    region?: 'us' | 'eu' | 'global';
    handleEmailPopup: (e: React.MouseEvent) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ region = 'global', handleEmailPopup }) => {
    return (
        <>
            <SEO region={region} />

            <section className="hero">
                <h2 className="hero-title">Senior Backend & Full Stack Engineer</h2>
                <p className="hero-subtitle">
                    Python, Node.js, Go, AWS, Cloudflare. Building scalable infrastructure that doesn't break when your user base grows.
                </p>
            </section>

            <section className="companies">
                <h2>Experience & Client Projects</h2>
                <div className="card-grid">
                    <article className="card">
                        <h3><a href="https://aa.health" target="_blank" rel="noopener noreferrer">Aa.health</a></h3>
                        <p>Founding Senior Full Stack Engineer - Built the core backend infrastructure from scratch, ensuring high availability and scalability for healthcare data.</p>
                    </article>
                    <article className="card">
                        <h3><a href="https://www.whydonate.com" target="_blank" rel="noopener noreferrer">Whydonate.com</a></h3>
                        <p>Senior Software Engineer - Handling 2M+ API requests/day, scaled infrastructure using Python, PostgreSQL, and Cloudflare.</p>
                    </article>
                    <article className="card">
                        <h3><a href="https://www.wakamiapp.com/" target="_blank" rel="noopener noreferrer">Wakamiapp.com</a></h3>
                        <p>Founding Full Stack Engineer - Architected and developed the multi-tenant backend and API layers from the ground up to support high-concurrency user flows.</p>
                    </article>
                    <article className="card">
                        <h3><a href="https://cipherandrow.com" target="_blank" rel="noopener noreferrer">Cipherandrow.com</a></h3>
                        <p>Founding Full Stack Engineer - Designed the initial system architecture and implemented the core backend services, focusing on performance and robust infrastructure.</p>
                    </article>
                    <article className="card">
                        <h3><a href="https://app.hudpro.com" target="_blank" rel="noopener noreferrer">Hudpro.com</a></h3>
                        <p>Founding Full Stack Engineer - Spearheaded the development of the platform's backend infrastructure and architecture from scratch, driving it from concept to production.</p>
                    </article>
                    <article className="card highlight-card">
                        <h3><a href="#" onClick={handleEmailPopup} data-popup-title="Let's work together">Your Company</a><span className="cursor"></span></h3>
                        <p>Looking for a Full Stack Engineer who ships? I blend empathy, design craft, and technical understanding to deliver scalable, high-concurrency solutions.</p>
                    </article>
                </div>
            </section>

            <section className="services">
                <h2>Services & Expertise</h2>
                <ul className="list-group">
                    <li className="list-item">
                        <strong>Backend Infrastructure</strong>
                        <span>Python, Node.js, Go</span>
                    </li>
                    <li className="list-item">
                        <strong>Cloud & Edge Computing</strong>
                        <span>AWS, GCP, Cloudflare Workers & KV</span>
                    </li>
                    <li className="list-item">
                        <strong>High-Concurrency Scaling</strong>
                        <span>Redis, Message Queues (RabbitMQ)</span>
                    </li>
                    <li className="list-item">
                        <strong>Databases & RDBMS</strong>
                        <span>PostgreSQL, MySQL, NoSQL</span>
                    </li>
                    <li className="list-item">
                        <strong>AI Integration Pipeline</strong>
                        <span>RAG, OpenAI, Vector Databases</span>
                    </li>
                </ul>
            </section>

            <section className="availability">
                <div className="status-indicator">
                    <span className="dot pulse"></span>
                    <p>Available for new opportunities</p>
                </div>
                <ul className="list-group">
                    <li className="list-item">
                        <strong>Full-stack Development</strong>
                        <span>Remote • Contract/Freelance</span>
                    </li>
                    <li className="list-item">
                        <strong>System Architecture & Scaling</strong>
                        <span>Remote • Consulting</span>
                    </li>
                </ul>
            </section>

            <section className="testimonials">
                <h2>Client Love (Upwork)</h2>
                <div className="card-grid">
                    <article className="testimonial-card">
                        <div className="rating">⭐⭐⭐⭐⭐</div>
                        <p>"Was great working with him. He made everything work and went above and beyond."</p>
                        <span className="client-project">Custom Webhook with reverse proxy setup</span>
                    </article>
                    <article className="testimonial-card">
                        <div className="rating">⭐⭐⭐⭐⭐</div>
                        <p>"Ashish is a fantastic dev. Very hardworking and was always able to come up with solutions for my project. I would highly recommend him to anyone else."</p>
                        <span className="client-project">Cloudflare Worker + Supabase Integration</span>
                    </article>
                    <article className="testimonial-card">
                        <div className="rating">⭐⭐⭐⭐⭐</div>
                        <p>"I'd love to work with Ashish again. He really writes clean, great code."</p>
                        <span className="client-project">Expert Needed for ASN1/DER Parsing on Cloudflare Edge</span>
                    </article>
                    <article className="testimonial-card">
                        <div className="rating">⭐⭐⭐⭐⭐</div>
                        <p>"Ashish delivered exceptional work on a highly technical Cloudflare/Workers project. He produced a very detailed and well-structured architecture document..."</p>
                        <span className="client-project">Cloudflare-related architecture</span>
                    </article>
                </div>
            </section>
        </>
    );
};

export default HomePage;

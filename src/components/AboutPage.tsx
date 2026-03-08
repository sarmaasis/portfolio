import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ashishsharma.xyz/about';
    const title = 'About Ashish Sharma - Senior Full Stack Engineer';
    const description = 'Learn more about Ashish Sharma, a senior backend and full-stack engineer with deep expertise in scalable infrastructure and edge computing.';

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={currentUrl} />
            </Helmet>

            <section className="hero" style={{ paddingBottom: '2rem' }}>
                <Link to="/" className="back-link" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--accent)' }}>&larr; Back to Portfolio</Link>
                <h2 className="hero-title">About Me</h2>
                <p className="hero-subtitle">
                    Engineer, Architect, and Problem Solver. I build systems designed to scale without breaking a sweat.
                </p>
            </section>

            <section className="about-content" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
                <div className="card highlight-card" style={{ marginBottom: '3rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Key Highlights</h3>
                    <ul className="list-group" style={{ background: 'transparent', border: 'none' }}>
                        <li style={{ padding: '0.5rem 0', color: 'var(--text-muted)' }}><strong>Top Rated Plus</strong> on Upwork with a 100% Job Success Score.</li>
                        <li style={{ padding: '0.5rem 0', color: 'var(--text-muted)' }}>Architected systems handling over <strong>2 Million+ API requests daily</strong>.</li>
                        <li style={{ padding: '0.5rem 0', color: 'var(--text-muted)' }}>Specialized in high-concurrency <strong>Edge Computing (Cloudflare)</strong> &amp; AWS.</li>
                        <li style={{ padding: '0.5rem 0', color: 'var(--text-muted)' }}>Founding engineer for multiple successfully launched platforms.</li>
                    </ul>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>My Development Journey</h3>
                    <div className="card" style={{ marginBottom: '1rem' }}>
                        <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>The Architect Phase (Recent)</h4>
                        <p style={{ color: 'var(--text-muted)' }}>Focused heavily on building and scaling backends from scratch for startups and healthcare networks (aa.health, HUDpro, Wakamiapp). Mastered high-availability patterns and Cloudflare edge deployments to squeeze out every millisecond of latency.</p>
                    </div>
                    <div className="card" style={{ marginBottom: '1rem' }}>
                        <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>The Full-Stack Evolution</h4>
                        <p style={{ color: 'var(--text-muted)' }}>Evolved from standard frontend engineering into deep backend systems. Mastered Python, Go, and Node.js. Tackled message queues, PostgreSQL performance tuning, and complex microservice orchestration.</p>
                    </div>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>My Philosophy &amp; Approach</h3>
                    <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                        <article className="card">
                            <h4>Simplicity &gt; Complexity</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>I avoid over-engineering. A robust system is one that can be easily understood and maintained by the next developer.</p>
                        </article>
                        <article className="card">
                            <h4>Results &gt; Hours</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Business outcomes matter most. I care about shipping features that move the needle, not just writing code in a vacuum.</p>
                        </article>
                        <article className="card">
                            <h4>Deadlines are Sacred</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Transparency is key. If I commit to an architecture delivery or sprint deadline, I make sure it happens.</p>
                        </article>
                        <article className="card">
                            <h4>Long-Term Partnership</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>I don't just write code and vanish. I aim to be a long-term strategic technical partner for your business.</p>
                        </article>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutPage;

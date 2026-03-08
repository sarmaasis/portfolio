import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export const PricingPage: React.FC = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ashishsharma.xyz/pricing';
    const title = 'Pricing & Engagement Models - Ashish Sharma';
    const description = 'Transparent pricing and engagement models for backend engineering, consulting, and full-stack development.';

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={currentUrl} />
            </Helmet>

            <section className="hero" style={{ paddingBottom: '2rem' }}>
                <Link to="/" className="back-link" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--accent)' }}>&larr; Back to Portfolio</Link>
                <h2 className="hero-title">Pricing &amp; Engagements</h2>
                <p className="hero-subtitle">
                    Transparent pricing tailored to the complexity of your infrastructure and the scope of work.
                </p>
            </section>

            <section className="pricing-grid-section" style={{ paddingBottom: '4rem' }}>
                <div className="card-grid">
                    <article className="card">
                        <h3>Hourly Engagement</h3>
                        <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Best for ongoing consulting, code audits, or dynamic pipelines.</p>
                        <ul className="list-group" style={{ gap: '0.5rem', border: 'none', background: 'transparent' }}>
                            <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: 'var(--success)' }}>✓</span> Payment for actual hours worked</li>
                            <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: 'var(--success)' }}>✓</span> Weekly reports and invoices</li>
                            <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: 'var(--success)' }}>✓</span> Maximum flexibility for shifting scope</li>
                        </ul>
                    </article>

                    <article className="card highlight-card">
                        <h3>Fixed Price Project</h3>
                        <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Ideal for well-defined scope (e.g., MVP builds, specific API integrations).</p>
                        <ul className="list-group" style={{ gap: '0.5rem', border: 'none', background: 'transparent' }}>
                            <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: 'var(--success)' }}>✓</span> 50% advance before kickoff</li>
                            <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: 'var(--success)' }}>✓</span> 50% upon successful delivery</li>
                            <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: 'var(--success)' }}>✓</span> Guaranteed outcomes and timelines</li>
                        </ul>
                    </article>

                    <article className="card">
                        <h3>Stage-by-Stage / Retainer</h3>
                        <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Best for large, phased architectures and long-term scaling.</p>
                        <ul className="list-group" style={{ gap: '0.5rem', border: 'none', background: 'transparent' }}>
                            <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: 'var(--success)' }}>✓</span> Milestone-based payments</li>
                            <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: 'var(--success)' }}>✓</span> Transparent progress control</li>
                            <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: 'var(--success)' }}>✓</span> Reduces risk for complex systems</li>
                        </ul>
                    </article>
                </div>
            </section>

            <section className="tax-section" style={{ paddingBottom: '4rem' }}>
                <div className="card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Global Tax &amp; Invoicing Compliance</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        I provide complete, official tax documentation and invoices for all payments, making it seamless for your accounting team to process B2B expenses. Fully compliant with US/EU/UK freelance contracting regulations.
                    </p>
                </div>
            </section>
        </>
    );
};

export default PricingPage;

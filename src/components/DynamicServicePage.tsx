import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export const DynamicServicePage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    // Fallback if slug isn't present for some reason
    if (!slug) {
        return (
            <div style={{ padding: '6rem 0', textAlign: 'center' }}>
                <h2>Service Not Found</h2>
                <Link to="/services" style={{ color: 'var(--accent)' }}>Return to Services</Link>
            </div>
        );
    }

    // Helper to format slug to Title Case parsing dashes
    const formatTitleCase = (text: string) => {
        return text.split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    // Parse the slug. Example: python-backend-developer-new-york
    const searchTerms = formatTitleCase(slug);

    // We try to extract location if it exists at the end (e.g., matching common cities/states)
    // For a simple programmatic approach, we'll treat the whole slug as the specialized role
    const title = `${searchTerms} - Ashish Sharma | Expert Engineering`;
    const description = `Looking for a top-tier ${searchTerms}? I build scalable, high-concurrency infrastructure tailored for your business needs using Python, Node.js, and Cloudflare.`;
    const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://ashishsharma.xyz/services/${slug}`;

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={`${slug.replace(/-/g, ', ')}, Backend Engineer, Freelance, Consultant, Cloudflare`} />
                <link rel="canonical" href={currentUrl} />
            </Helmet>

            <section className="hero" style={{ paddingBottom: '2rem' }}>
                <Link to="/services" className="back-link" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--accent)' }}>&larr; Back to Services</Link>
                <h2 className="hero-title">{searchTerms}</h2>
                <p className="hero-subtitle">
                    Expert {searchTerms.toLowerCase()} consulting and implementation. Scaling your system's architecture to handle millions of requests without breaking a sweat.
                </p>
            </section>

            <section className="services-grid-section" style={{ paddingBottom: '4rem' }}>
                <div className="card highlight-card" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Ready to scale your architecture?</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        I specialize as a {searchTerms.toLowerCase()} delivering custom backend solutions, edge computing integrations, and robust APIs.
                    </p>
                    <Link to="/pricing" className="nav-link" style={{ display: 'inline-block', border: '1px solid var(--card-border)', padding: '0.75rem 1.5rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)' }}>
                        View Pricing &amp; Engagements
                    </Link>
                </div>

                <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                    <article className="card">
                        <h3>Proven Track Record</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Top Rated Plus on Upwork with a 100% Job Success Score. Delivered mission-critical systems handling 2M+ API requests daily.</p>
                    </article>
                    <article className="card">
                        <h3>End-to-End Delivery</h3>
                        <p style={{ color: 'var(--text-muted)' }}>From initial system design and database architecture to final API deployment on global edge networks.</p>
                    </article>
                </div>
            </section>
        </>
    );
};

export default DynamicServicePage;

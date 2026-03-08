import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export const ReviewsPage: React.FC = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ashishsharma.xyz/reviews';
    const title = 'Client Reviews & Recommendations - Ashish Sharma';
    const description = 'Read reviews and recommendations from clients who have worked with Ashish Sharma on backend, infrastructure, and full-stack engineering projects.';

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={currentUrl} />
            </Helmet>

            <section className="hero" style={{ paddingBottom: '2rem' }}>
                <Link to="/" className="back-link" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--accent)' }}>&larr; Back to Portfolio</Link>
                <h2 className="hero-title">Client Reviews &amp; Recommendations</h2>
                <p className="hero-subtitle">
                    Feedback from founders and engineering leaders I've had the pleasure of working with on Upwork and independent contracts.
                </p>
            </section>

            <section className="testimonials">
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
                        <p>"Ashish delivered exceptional work on a highly technical Cloudflare/Workers project. He produced a very detailed and well-structured architecture document clearly explaining the options and trade-offs before proceeding with the implementation. His communication was excellent throughout. He grasped the complex requirements quickly and delivered a robust solution that perfectly met our needs. Highly recommended for any advanced Cloudflare-related architecture and development work."</p>
                        <span className="client-project">Cloudflare-related architecture</span>
                    </article>
                    <article className="testimonial-card">
                        <div className="rating">⭐⭐⭐⭐⭐</div>
                        <p>"Excellent work on setting up our Typesense container on Cloudflare. Fast, communicative, and deeply understood the edge infrastructure constraints."</p>
                        <span className="client-project">Typesense Cloudflare Deployment</span>
                    </article>
                    <article className="testimonial-card">
                        <div className="rating">⭐⭐⭐⭐⭐</div>
                        <p>"Ashish helped us scale our donation API endpoints and introduced essential currency filtering. Very professional and highly skilled with Python and Postgres."</p>
                        <span className="client-project">Donation APIs & Analytics</span>
                    </article>
                </div>
            </section>
        </>
    );
};

export default ReviewsPage;

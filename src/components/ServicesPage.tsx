import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export const ServicesPage: React.FC = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ashishsharma.xyz/services';
    const title = 'Capabilities & Services - Ashish Sharma';
    const description = 'Explore the specific technical services I offer, including backend architecture, Cloudflare edge computing, and AI integrations.';

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={currentUrl} />
            </Helmet>

            <section className="hero" style={{ paddingBottom: '2rem' }}>
                <Link to="/" className="back-link" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--accent)' }}>&larr; Back to Portfolio</Link>
                <h2 className="hero-title">My Services</h2>
                <p className="hero-subtitle">
                    Comprehensive full-stack engineering and backend infrastructure services tailored for high-growth startups and enterprise scaling.
                </p>
            </section>

            <section className="services-grid-section">
                <div className="card-grid">
                    <article className="card">
                        <h3>Backend Infrastructure</h3>
                        <p>Designing and building robust, scalable backend systems from scratch using Python, Node.js, and Go. Focus on high availability and fault tolerance.</p>
                    </article>
                    <article className="card">
                        <h3>Cloud &amp; Edge Computing</h3>
                        <p>Deep expertise in AWS and Cloudflare ecosystems. Architecting global edge applications utilizing Cloudflare Workers, KV, and R2 for ultra-low latency.</p>
                    </article>
                    <article className="card">
                        <h3>High-Concurrency Scaling</h3>
                        <p>Optimizing existing infrastructure to handle millions of requests. I utilize Redis, message queues (RabbitMQ), and load balancing to prevent bottlenecks.</p>
                    </article>
                    <article className="card">
                        <h3>AI Integration</h3>
                        <p>Building production-ready AI pipelines, including RAG architectures, LLM fine-tuning, OpenAI integrations, and vector database deployments (Typesense, Pinecone).</p>
                    </article>
                    <article className="card">
                        <h3>Full-Stack Development</h3>
                        <p>End-to-end application development using React and TypeScript on the frontend, ensuring seamless API integration and pixel-perfect UI execution.</p>
                    </article>
                    <article className="card">
                        <h3>System Architecture &amp; Refactoring</h3>
                        <p>Auditing legacy codebases, designing complex system migrations, and transforming monolithic systems into microservices or serverless architectures.</p>
                    </article>
                </div>
            </section>

            <section className="industries-section" style={{ paddingTop: '4rem' }}>
                <h2>Industries I Serve</h2>
                <ul className="list-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', flexDirection: 'unset' }}>
                    <li className="list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <strong>FinTech &amp; Finance</strong>
                        <span>High-volume transaction systems</span>
                    </li>
                    <li className="list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <strong>Healthcare (HealthTech)</strong>
                        <span>Secure, compliant data architecture</span>
                    </li>
                    <li className="list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <strong>SaaS &amp; AIaaS</strong>
                        <span>Multi-tenant scalability</span>
                    </li>
                    <li className="list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <strong>Real Estate Tech</strong>
                        <span>Complex integrations &amp; data pipelines</span>
                    </li>
                    <li className="list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <strong>E-Commerce</strong>
                        <span>High-concurrency traffic handling</span>
                    </li>
                    <li className="list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <strong>Social Impact / Non-Profit</strong>
                        <span>Donation platforms &amp; scale</span>
                    </li>
                </ul>
            </section>
        </>
    );
};

export default ServicesPage;

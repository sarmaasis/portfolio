import { Fragment, type ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { CAL_URL, COPYRIGHT_YEAR, UPWORK_URL } from '../data/site';

const navItems = [
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/blog', label: 'Writing' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  return (
    <header className="top">
      <Link className="name" to="/">Ashish Sharma</Link>
      <nav aria-label="Primary">
        <ul>
          {navItems.map((item) => (
            <li key={item.to}><NavLink to={item.to}>{item.label}</NavLink></li>
          ))}
        </ul>
      </nav>
      <div className="top-actions">
        <ThemeToggle />
        <a
          className="rv-btn rv-btn--primary rv-btn--sm book"
          href={CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics-event="mvp_call_click"
          data-analytics-placement="header"
        >
          Book a call
        </a>
      </div>
    </header>
  );
}

export function SiteFooter({ onCookieSettings }: { onCookieSettings: () => void }) {
  return (
    <footer className="foot">
      <p>© {COPYRIGHT_YEAR} Ashish Sharma</p>
      <ul>
        <li><a href="https://github.com/sarmaasis" rel="me noopener noreferrer" target="_blank">GitHub</a></li>
        <li><a href="https://www.linkedin.com/in/sarmaasis" rel="me noopener noreferrer" target="_blank">LinkedIn</a></li>
        <li><a href="https://x.com/sarmaasis" rel="me noopener noreferrer" target="_blank">X</a></li>
        <li><a href={UPWORK_URL} rel="me noopener noreferrer" target="_blank">Upwork</a></li>
        <li><Link to="/services/architecture-audit">Architecture audit</Link></li>
        <li><Link to="/hire-cloudflare-workers-developer">Hire Cloudflare Workers</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/reviews">Reviews</Link></li>
        <li><Link to="/developers">Developers</Link></li>
        <li><Link to="/privacy">Privacy</Link></li>
        <li><button type="button" className="linkbtn" onClick={onCookieSettings}>Cookie settings</button></li>
      </ul>
    </footer>
  );
}

/* A section set as a document row: a narrow label column, then the content. */
export function Row({ id, label, note, children }: { id: string; label: string; note?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="row" aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`}>{label}{note ? <small>{note}</small> : null}</h2>
      <div>{children}</div>
    </section>
  );
}

export function PageIntro({ title, lede, children }: { title: string; lede?: ReactNode; children?: ReactNode }) {
  return (
    <section className="intro">
      {children}
      <h1 className="h-page">{title}</h1>
      {lede ? <p className="lede">{lede}</p> : null}
    </section>
  );
}

export interface Crumb { name: string; path: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="crumb" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={item.path}>
            {index === items.length - 1 ? <span aria-current="page">{item.name}</span> : <Link className="ln" to={item.path}>{item.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PlusIcon() {
  return (
    <svg className="ic ic-20" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4v12M4 10h12" /></svg>
  );
}

export function FaqList({ items, openFirst = false }: { items: { question: string; answer: string }[]; openFirst?: boolean }) {
  return (
    <div className="faq">
      {items.map((item, index) => (
        <details key={item.question} open={openFirst && index === 0}>
          <summary><h3 className="h-item" style={{ fontSize: 'inherit' }}>{item.question}</h3><PlusIcon /></summary>
          <div><p><RichText text={item.answer} /></p></div>
        </details>
      ))}
    </div>
  );
}

export function ClosingCta({ title, lede, compact = false, placement }: { title: string; lede: string; compact?: boolean; placement: string }) {
  return (
    <section className={compact ? 'closing closing--compact' : 'closing'} aria-labelledby={`close-${placement}`}>
      <div className="stack" style={{ ['--gap' as string]: compact ? '24px' : '28px' }}>
        <h2 id={`close-${placement}`} className={compact ? 'h-chapter' : 'statement'} style={compact ? undefined : { maxWidth: '20ch' }}>{title}</h2>
        <p className="lede">{lede}</p>
        <div className="btns">
          <a
            className="rv-btn rv-btn--primary"
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-event="mvp_call_click"
            data-analytics-placement={placement}
          >
            Book a 20-minute call
          </a>
          <Link className="rv-btn rv-btn--ghost" to="/contact">Or write a brief</Link>
        </div>
      </div>
    </section>
  );
}

export function QuoteGrid({ quotes }: { quotes: { quote: string; project: string }[] }) {
  return (
    <div className="quotes">
      {quotes.map((item) => (
        <figure key={item.project}>
          <blockquote>“{item.quote}”</blockquote>
          <figcaption>{item.project}</figcaption>
        </figure>
      ))}
    </div>
  );
}

/* Minimal inline markup for article copy: [label](/path), `code` and **bold**.
   Internal paths render as router links so crawlers and readers follow them. */
const INLINE = /(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g;

export function RichText({ text }: { text: string }) {
  const parts = text.split(INLINE);
  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null;
        const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (link) {
          const [, label, href] = link;
          return href.startsWith('/')
            ? <Link key={index} to={href}>{label}</Link>
            : <a key={index} href={href} target="_blank" rel="noopener noreferrer">{label}</a>;
        }
        if (part.startsWith('`') && part.endsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
        if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
  );
}

import { useState, type CSSProperties, type FormEvent } from 'react';
import { SEO } from './SEO';
import { PageIntro, Row } from './layout';
import { CAL_URL, EMAIL, UPWORK_URL, marketSignals } from '../data/site';
import { trackEvent } from '../utils/analytics';

const kinds = [
  { label: '14-day MVP', goal: 'What should the product do?', hint: 'The core workflow, who uses it, and what has to work on launch day.' },
  { label: 'Audit or review', goal: 'What feels slow, fragile or expensive?', hint: 'The bottleneck, the cloud bill, or the decision you want a second opinion on.' },
  { label: 'Ongoing work', goal: 'What does the team need help with?', hint: 'The backend area, the team size, and roughly how many hours a week.' },
];

export default function ContactPage() {
  const [kind, setKind] = useState(0);
  const [sent, setSent] = useState(false);

  // No backend: the brief is composed into an email in the visitor's own mail app.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: string) => String(data.get(name) ?? '').trim();
    const body = [
      `Type: ${kinds[kind].label}`,
      `Name: ${field('name')}`,
      `Email: ${field('email')}`,
      '',
      `${kinds[kind].goal}`,
      field('goal'),
      '',
      `Target launch: ${field('date') || 'not set'}`,
      `Current stack: ${field('stack') || 'not set'}`,
    ].join('\n');
    const subject = `${kinds[kind].label} brief${field('name') ? ` from ${field('name')}` : ''}`;
    trackEvent('contact_brief_submit', { kind: kinds[kind].label });
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <>
      <SEO
        title="Contact — Start an MVP or Backend Project — Ashish Sharma"
        description="Send a short brief for a 14-day MVP build, an architecture audit or ongoing backend work. Or book a 20-minute call. Remote, working with US, EU and UK teams."
        path="/contact"
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]}
        structuredData={{ '@type': 'ContactPage', name: 'Contact Ashish Sharma', url: 'https://sarmaasis.com/contact' }}
      />

      <PageIntro
        title="Tell me what you're building."
        lede="The product goal, the problem, and the date it needs to be live. I'll say plainly if it isn't a fit."
      />

      <Row id="brief" label="Project brief" note="Takes about two minutes">
        <form className="form" onSubmit={handleSubmit}>
          <div className="rv-field">
            <span className="rv-label" id="kind-label">What do you need?</span>
            <div className="rv-seg" role="radiogroup" aria-labelledby="kind-label" style={{ '--n': kinds.length, '--i': kind } as CSSProperties}>
              <span className="rv-seg-plate" aria-hidden="true"><i /></span>
              {kinds.map((item, index) => (
                <button key={item.label} type="button" role="radio" className="rv-seg-item" aria-checked={index === kind} onClick={() => setKind(index)}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="form-2">
            <div className="rv-field">
              <label className="rv-label" htmlFor="c-name">Your name</label>
              <div className="rv-input"><input id="c-name" name="name" autoComplete="name" required /></div>
            </div>
            <div className="rv-field">
              <label className="rv-label" htmlFor="c-email">Email</label>
              <div className="rv-input"><input id="c-email" name="email" type="email" autoComplete="email" required /></div>
            </div>
          </div>
          <div className="rv-field">
            <label className="rv-label" htmlFor="c-goal">{kinds[kind].goal}</label>
            <div className="rv-input rv-input--area"><textarea id="c-goal" name="goal" rows={5} placeholder={kinds[kind].hint} required /></div>
          </div>
          <div className="form-2">
            <div className="rv-field">
              <label className="rv-label" htmlFor="c-date">Target launch date <span className="opt">Optional</span></label>
              <div className="rv-input"><input id="c-date" name="date" type="date" /></div>
            </div>
            <div className="rv-field">
              <label className="rv-label" htmlFor="c-stack">Current stack <span className="opt">Optional</span></label>
              <div className="rv-input"><input id="c-stack" name="stack" placeholder="e.g. Next.js, AWS Lambda, Postgres" /></div>
            </div>
          </div>
          <div className="btns" style={{ marginTop: 4 }}>
            <button type="submit" className="rv-btn rv-btn--primary">Send brief</button>
            <span className="meta">Opens your email app with this filled in.</span>
          </div>
          {sent ? (
            <p className="rv-badge b-ok" role="status" style={{ alignSelf: 'flex-start' }}>
              <svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 5.2 4.2 7.4 8 3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Brief ready in your email app
            </p>
          ) : null}
        </form>
      </Row>

      <Row id="other" label="Other ways">
        <dl className="terms">
          <dt>Talk</dt>
          <dd><a className="ln" href={CAL_URL} target="_blank" rel="noopener noreferrer" data-analytics-event="mvp_call_click" data-analytics-placement="contact">Book a 20-minute call</a> on cal.com</dd>
          <dt>Email</dt>
          <dd><a className="ln" href={`mailto:${EMAIL}`}>{EMAIL}</a></dd>
          <dt>Upwork</dt>
          <dd><a className="ln" href={UPWORK_URL} target="_blank" rel="noopener noreferrer">Hire through Upwork</a> if your team prefers it</dd>
        </dl>
      </Row>

      <Row id="working" label="Working together">
        <ul className="stack" style={{ ['--gap' as string]: '10px', paddingBottom: 32 }}>
          {marketSignals.map((signal) => <li key={signal}>{signal}</li>)}
        </ul>
      </Row>
    </>
  );
}

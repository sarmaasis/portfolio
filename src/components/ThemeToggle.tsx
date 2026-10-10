import { useEffect, useState } from 'react';
import { applyTheme, currentTheme, readStoredTheme, type Theme } from '../utils/theme';

/* A Rivet switch (on = dark). The thumb position comes from the theme class
   the no-flash head script sets, so it is right on first paint; aria-checked
   catches up after hydration. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(currentTheme());
    if (readStoredTheme() !== null) return undefined;

    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const followSystem = (event: MediaQueryListEvent) => {
      if (readStoredTheme() !== null) return;
      const next: Theme = event.matches ? 'dark' : 'light';
      applyTheme(next, true);
      setTheme(next);
    };
    query.addEventListener('change', followSystem);
    return () => query.removeEventListener('change', followSystem);
  }, []);

  const toggle = () => {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next, true);
    setTheme(next);
    try {
      window.localStorage.setItem('theme', next);
    } catch {
      // Private mode: the choice lasts for this page view only.
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === 'dark'}
      aria-label="Dark theme"
      title="Switch theme"
      className="theme-switch"
      onClick={toggle}
    >
      <span className="rv-switch" aria-hidden="true">
        <i>
          <svg className="sun" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="2.6" />
            <path d="M8 2v1.2M8 12.8V14M2 8h1.2M12.8 8H14M3.8 3.8l.8.8M11.4 11.4l.8.8M3.8 12.2l.8-.8M11.4 4.6l.8-.8" />
          </svg>
          <svg className="moon" viewBox="0 0 16 16">
            <path d="M12.6 9.6A4.8 4.8 0 0 1 6.4 3.4a4.8 4.8 0 1 0 6.2 6.2Z" />
          </svg>
        </i>
      </span>
    </button>
  );
}

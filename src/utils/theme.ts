export type Theme = 'light' | 'dark';

const THEME_COLORS: Record<Theme, string> = { light: '#fcfaf7', dark: '#000000' };
const MOTION_MS = 260;

let motionTimer: number | undefined;

export function readStoredTheme(): Theme | null {
  try {
    const saved = window.localStorage.getItem('theme');
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    return null;
  }
}

export function currentTheme(): Theme {
  return document.documentElement.classList.contains('t-dark') ? 'dark' : 'light';
}

/* `animate` turns on Rivet's switch-thumb timing (260ms) for one change:
   the switch thumb travels on the settle curve and page colours fade with it.
   Skipped under prefers-reduced-motion, where the theme changes instantly. */
export function applyTheme(theme: Theme, animate = false) {
  const root = document.documentElement;

  if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('theme-motion');
    window.clearTimeout(motionTimer);
    motionTimer = window.setTimeout(() => root.classList.remove('theme-motion'), MOTION_MS + 60);
  }

  root.classList.remove('t-light', 't-dark');
  root.classList.add(`t-${theme}`);
  root.dataset.theme = theme;
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
}

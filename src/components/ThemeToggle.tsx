interface ThemeToggleProps {
  onToggle: () => void;
  theme: string;
}

function ThemeToggle({ onToggle, theme }: ThemeToggleProps) {
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
      onClick={onToggle}
    >
      <span aria-hidden="true">{theme === 'light' ? 'Dark' : 'Light'}</span>
    </button>
  );
}

export default ThemeToggle;

interface ThemeToggleProps {
  onToggle: () => void;
  theme: 'light' | 'dark';
}

function ThemeToggle({ onToggle, theme }: ThemeToggleProps) {
  const nextTheme = theme === 'light' ? 'dark' : 'light';
  const iconClass = theme === 'light' ? 'theme-icon sun-icon' : 'theme-icon moon-icon';

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
      onClick={onToggle}
    >
      <span className={iconClass} aria-hidden="true" />
    </button>
  );
}

export default ThemeToggle;

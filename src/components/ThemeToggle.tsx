interface ThemeToggleProps {
  onToggle: () => void;
  theme: string;
}

function ThemeToggle({ onToggle, theme }: ThemeToggleProps) {
  const nextTheme = theme === 'light' ? 'dark' : 'light';
  const visibleLabel = theme === 'light' ? 'D' : 'L';

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
      onClick={onToggle}
    >
      <span aria-hidden="true">{visibleLabel}</span>
    </button>
  );
}

export default ThemeToggle;

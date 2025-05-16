import lightIcon from '../assets/light_icon.png';

function ThemeToggle({onToggle, theme}: {onToggle: () => void, theme: string}) {
  return (
    <button onClick={onToggle} className="theme-toggle">
      {theme === 'light' ? <img src={lightIcon} alt="Light mode" style={{ width: 20, height: 20 }} /> : '☀️'}
    </button>
  );
}
export default ThemeToggle;
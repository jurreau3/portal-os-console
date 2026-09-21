export function ThemeToggle() {
  const toggle = () => {
    document.body.classList.toggle('light');
  };

  return (
    <button className="theme-toggle" type="button" onClick={toggle}>
      Toggle theme
    </button>
  );
}

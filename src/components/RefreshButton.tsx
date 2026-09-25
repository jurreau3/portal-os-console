type RefreshButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export function RefreshButton({ onClick, disabled = false }: RefreshButtonProps) {
  return (
    <button
      type="button"
      className="refresh-button"
      onClick={onClick}
      disabled={disabled}
      aria-label="Refresh panel"
    >
      {disabled ? 'Loading…' : 'Refresh'}
    </button>
  );
}

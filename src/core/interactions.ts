export interface PortalInteractionHandler {
  onHover?: (state: string) => void;
  onClick?: (state: string) => void;
  onEvent?: (event: string) => void;
}

// IMPORTANT:
// EventTarget is too generic.
// We must narrow to HTMLElement so TS knows removeEventListener exists.

export function bindInteractions(
  target: HTMLElement,
  handlers: PortalInteractionHandler = {}
) {
  const onHover = () => handlers.onHover?.("hover");
  const onClick = () => handlers.onClick?.("click");

  target.addEventListener("pointerover", onHover);
  target.addEventListener("pointerdown", onClick);

  return () => {
    target.removeEventListener("pointerover", onHover);
    target.removeEventListener("pointerdown", onClick);
  };
}

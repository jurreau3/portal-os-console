import type { ReactNode } from 'react';

type PanelCardProps = {
  title: string;
  eyebrow?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function PanelCard({ title, eyebrow, actions, children }: PanelCardProps) {
  const headingId = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-heading`;

  return (
    <section className="panel-card" aria-labelledby={headingId}>
      <div className="panel-heading">
        <div>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2 id={headingId}>{title}</h2>
        </div>
        {actions && <div className="panel-actions">{actions}</div>}
      </div>
      <div className="panel-content">{children}</div>
    </section>
  );
}

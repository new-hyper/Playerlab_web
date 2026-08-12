import type { ReactNode } from "react";

type Props = {
  crumb: string;
  title: ReactNode;
  lead: string;
};

export default function PageHead({ crumb, title, lead }: Props) {
  return (
    <header className="phead">
      <div className="wrap phead__in">
        <div className="crumb">{crumb}</div>
        <h1>{title}</h1>
        <p>{lead}</p>
      </div>
    </header>
  );
}

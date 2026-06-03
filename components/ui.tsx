import clsx from "clsx";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={clsx("glass rounded-[24px] p-5", className)}>{children}</section>;
}

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  const style = {
    primary: "bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-glow",
    secondary: "glass text-[var(--text)]",
    ghost: "bg-brand-500/10 text-brand-600 dark:text-brand-100"
  }[variant];

  return (
    <button
      {...props}
      className={clsx("rounded-2xl px-4 py-2.5 font-semibold transition hover:-translate-y-0.5 active:translate-y-0", style, className)}
    >
      {children}
    </button>
  );
}

export function StatCard({
  icon,
  title,
  value,
  note,
  color = "from-brand-600 to-brand-500"
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  note: string;
  color?: string;
}) {
  return (
    <Card className="flex min-h-[126px] items-center gap-4">
      <div className={clsx("grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br text-3xl text-white shadow-glow", color)}>{icon}</div>
      <div>
        <p className="text-sm text-[var(--muted)]">{title}</p>
        <strong className="mt-1 block text-3xl">{value}</strong>
        <span className="text-sm text-emerald-600">{note}</span>
      </div>
    </Card>
  );
}

export function Progress({ value }: { value: number }) {
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-brand-500/15">
      <div className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-500" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

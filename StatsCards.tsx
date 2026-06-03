import clsx from "clsx";
import type { HTMLAttributes } from "react";
export function Card({ children, className, ...props }: HTMLAttributes<HTMLElement>) { return <section {...props} className={clsx("glass rounded-[24px] p-5", className)}>{children}</section>; }
export function Button({ children, variant="primary", className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary"|"secondary"|"ghost"|"danger" }) {
 const styles={primary:"bg-gradient-to-r from-[#6138e8] to-[#8b5cff] text-white shadow-glow",secondary:"glass",ghost:"bg-[#6138e8]/10 text-[#6138e8] dark:text-white",danger:"bg-gradient-to-r from-rose-500 to-red-600 text-white"}[variant];
 return <button {...props} className={clsx("rounded-2xl px-4 py-2.5 font-bold transition hover:-translate-y-0.5 active:translate-y-0",styles,className)}>{children}</button>;
}
export function Progress({ value, color="purple" }: { value: number; color?: "purple"|"green"|"orange"|"red" }) {
 const colors={purple:"from-[#6138e8] to-[#8b5cff]",green:"from-emerald-500 to-emerald-700",orange:"from-orange-400 to-orange-600",red:"from-rose-500 to-red-600"};
 return <div className="h-2.5 overflow-hidden rounded-full bg-[#6138e8]/12"><div className={`h-full rounded-full bg-gradient-to-r ${colors[color]}`} style={{width:`${Math.max(0,Math.min(100,value))}%`}} /></div>;
}

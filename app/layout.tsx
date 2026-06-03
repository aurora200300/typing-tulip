import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "PreetiFont Nepali Typing Practice", description: "Advanced PreetiFont typing website" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}

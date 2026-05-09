import type { Metadata } from "next";
import { Sofia_Sans } from "next/font/google";
import "./globals.css";

const sofiaSans = Sofia_Sans({
  variable: "--font-sofia",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "A&P Media — Volle Agenda Methode",
  description:
    "Het volledig beheerde groeisysteem voor online fitness coaches in Nederland. 10 intakegesprekken in 60 dagen — of ik werk gratis door.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${sofiaSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

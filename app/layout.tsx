import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Doktor Karangan AI",
  description: "Diagnosis, Rawat dan Perbaik Karangan Anda",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ms">
      <body>{children}</body>
    </html>
  );
}

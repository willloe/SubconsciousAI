import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SWOT Prompt Explorer",
  description: "Take-home assignment starter"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

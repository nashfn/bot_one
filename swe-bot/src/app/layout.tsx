import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SWE Bot — AI Assistant for All Software Tasks",
  description:
    "Open-claw AI assistant that handles all software engineering tasks, locally or on remote hosts. Join the early alpha.",
  openGraph: {
    title: "SWE Bot — AI Assistant for All Software Tasks",
    description:
      "Open-claw AI assistant that handles all software engineering tasks, locally or on remote hosts.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="noise-overlay antialiased">{children}</body>
    </html>
  );
}

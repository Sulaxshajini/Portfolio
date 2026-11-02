import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque/wdth.css";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import AppShell from "@/components/providers/AppShell";
import { profile } from "@/data/profile";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${profile.name} | IT Support & Infrastructure`, template: `%s | ${profile.name}` },
  description: profile.shortDescription,
  openGraph: {
    title: `${profile.name} | Portfolio`,
    description: profile.shortDescription,
    type: "website",
  },
  authors: [{ name: profile.name }],
};

export const viewport: Viewport = {
  themeColor: "#0a0614",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

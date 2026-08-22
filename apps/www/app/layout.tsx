import "./globals.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://asteria-ui.com"),
  title: {
    template: "%s — Asteria UI",
    default: "Asteria UI — Open-source components for React & Tailwind",
  },
  description:
    "An open-source component library for React and Tailwind CSS, with a matching Figma design system.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider theme={{ defaultTheme: "dark", enabled: true }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}

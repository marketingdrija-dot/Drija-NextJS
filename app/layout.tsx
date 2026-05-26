import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { siteConfig } from "@/lib/site";
import "./globals.css";
import "@/styles/components.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${montserrat.className} flex min-h-screen flex-col antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

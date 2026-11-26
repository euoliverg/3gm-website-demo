import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { mediaPath } from "./media-path";

const heading = localFont({ src: "../public/fonts/archivo.woff2", variable: "--heading", weight: "100 900", display: "swap" });
const body = localFont({ src: "../public/fonts/manrope.woff2", variable: "--body", weight: "200 800", display: "swap" });
const title = "3GM General Contracting Inc. | Commercial Fit-Outs in Ontario";
const description = "Commercial fit-outs, renovations, general contracting and project management in Vaughan, Toronto and across Ontario.";

const siteUrl = process.env.GITHUB_PAGES_URL || process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: { icon: mediaPath("/media/favicon.png") },
  openGraph: { title, description, type: "website", locale: "en_CA", images: [{ url: new URL(mediaPath("/media/spa-liberty-village-03.webp"), siteUrl), width: 1536, height: 1536, alt: "Completed Liberty Village spa interior" }] },
};

export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en-US" className={heading.variable + " " + body.variable}><body>{children}</body></html>;
}






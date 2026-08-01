import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { FaviconSwitcher } from "@/components/favicon-switcher";
import { PageLoader } from "@/components/page-loader";
import { DeferredTraceCursor } from "@/components/deferred-trace-cursor";
import { OrganizationSchema } from "@/components/structured-data";
import { SITE, SITE_ORIGIN, SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Site-wide metadata. Every page inherits this and overrides only what differs,
 * so a new route cannot ship without a canonical, an OG card, or a description.
 *
 * `metadataBase` is what makes the relative image and canonical paths below
 * resolve to absolute URLs. Without it Next emits relative og:image values,
 * which most social crawlers refuse to fetch.
 */
export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    default: `${SITE.name} — financial infrastructure for regulated businesses`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName, url: SITE_ORIGIN }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  keywords: [
    "payment gateway",
    "payment infrastructure",
    "settlement and reconciliation",
    "merchant onboarding",
    "KYC KYB automation",
    "fraud detection ML",
    "MAS TRM compliance",
    "PCI-DSS Level 1",
    "regulated fintech engineering",
    "enterprise AI governance",
  ],
  category: "technology",
  // No `alternates.canonical` here on purpose. Metadata is inherited, so a
  // canonical set at the root is copied onto every route and tells search
  // engines the whole site duplicates the home page. Each page sets its own
  // via pageMetadata(); the home page sets it in app/page.tsx.
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: "/",
    title: `${SITE.name} — financial infrastructure for regulated businesses`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — financial infrastructure for regulated businesses`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-light.ico", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.ico", media: "(prefers-color-scheme: dark)" },
    ],
    apple: [{ url: "/app-icon.svg", type: "image/svg+xml" }],
  },
  formatDetection: { telephone: false, address: false, email: false },
};

/**
 * Split from `metadata` because Next requires it: `themeColor` and
 * `colorScheme` belong to the viewport export. The two theme colours let the
 * browser chrome follow the site's own light and dark skins.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e2e8f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1115" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <OrganizationSchema />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PageLoader />
          <DeferredTraceCursor />
          <FaviconSwitcher />
          <SiteHeader />
          <main className="flex flex-1 flex-col">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SkinProvider, skinNoFlashScript } from "@/components/skin-provider";
import { SkinSwitcher } from "@/components/skin-switcher";
import { FaviconSwitcher } from "@/components/favicon-switcher";
import { PageLoader } from "@/components/page-loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Unlink Technologies",
    template: "%s | Unlink Technologies",
  },
  description: "Unlink Technologies — building modern software.",
  icons: {
    icon: [
      { url: "/favicon-light.ico", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.ico", media: "(prefers-color-scheme: dark)" },
    ],
  },
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
      <head>
        {/* Applies the saved skin during HTML parsing, so a reload in
            glassmorphism never flashes the neumorphic design first. */}
        <script dangerouslySetInnerHTML={{ __html: skinNoFlashScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SkinProvider>
            <PageLoader />
            <FaviconSwitcher />
            <SiteHeader />
            <main className="flex flex-1 flex-col">{children}</main>
            <SiteFooter />
            <SkinSwitcher />
          </SkinProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

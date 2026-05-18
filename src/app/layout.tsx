import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Preloader from "@/components/Preloader";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#101010" },
    { media: "(prefers-color-scheme: light)", color: "#F5F5F0" },
  ],
};

export const metadata: Metadata = {
  title: "bappy360 — UI/UX & Visual Designer",
  description:
    "Premium UI/UX and Visual Design portfolio by Sahkil Hossen (Bappy). Structured digital experiences, startup-oriented interfaces, and conversion-oriented layouts.",
  keywords: [
    "UI/UX Designer",
    "Visual Designer",
    "Portfolio",
    "bappy360",
    "Product Design",
    "SaaS Design",
    "Brand Identity",
    "Graphic Designer",
    "Figma",
    "Web Design",
  ],
  authors: [{ name: "Sahkil Hossen", url: "https://bappy360.com" }],
  creator: "Sahkil Hossen",
  publisher: "bappy360",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "bappy360 — UI/UX & Visual Designer",
    description:
      "Premium UI/UX and Visual Design portfolio. Structured digital experiences for startups and SaaS.",
    type: "website",
    locale: "en_US",
    siteName: "bappy360",
  },
  twitter: {
    card: "summary_large_image",
    title: "bappy360 — UI/UX & Visual Designer",
    description:
      "Premium UI/UX and Visual Design portfolio. Structured digital experiences for startups and SaaS.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&family=Public+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {/*
          Smart chunk error recovery:
          - On ChunkLoadError: dismiss preloader + try ONE silent reload (not infinite)
          - If already reloaded once, just dismiss preloader and show whatever loaded
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var reloaded = sessionStorage.getItem('_plr');
                window.addEventListener('error', function(e) {
                  if (e.message && (e.message.indexOf('ChunkLoadError') !== -1 || e.message.indexOf('Loading chunk') !== -1)) {
                    var p = document.getElementById('preloader-overlay');
                    if (p) p.style.cssText = 'position:fixed;inset:0;z-index:-1;opacity:0;visibility:hidden;pointer-events:none;display:none;';
                    if (!reloaded) {
                      sessionStorage.setItem('_plr', '1');
                      location.reload();
                    }
                  }
                });
                /* Clear reload flag on successful load */
                window.addEventListener('load', function() {
                  sessionStorage.removeItem('_plr');
                });
              })();
            `,
          }}
        />
        <Preloader />
        {children}
        <Toaster />
      </body>
    </html>
  );
}

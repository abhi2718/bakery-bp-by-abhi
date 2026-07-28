import type { Metadata, Viewport } from "next";
import { Caveat, Manrope, Playfair_Display } from "next/font/google";
import { site } from "@/config/site.config";
import { themeBootScript, themeCss } from "@/lib/theme-css";
import { CartProvider } from "@/lib/cart-context";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import CartDrawer from "@/components/cart/CartDrawer";
import Toast from "@/components/ui/Toast";
import StructuredData from "@/components/layout/StructuredData";

/* Load order matters: responsive.css must come last so its overrides win. */
import "@/styles/base.css";
import "@/styles/header.css";
import "@/styles/sections.css";
import "@/styles/shop.css";
import "@/styles/drawer.css";
import "@/styles/chrome.css";
import "@/styles/responsive.css";

/* Self-hosted by next/font — no render-blocking request to Google. Swap the
   families here to rebrand the type; the CSS reads the variables. */
const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});
const script = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: site.seo.title,
  description: site.seo.description,
  icons: { icon: site.brand.logo || "/favicon.ico", apple: site.brand.logo || undefined },
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    images: [site.seo.ogImage],
    type: "website",
  },
  twitter: { card: "summary" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: site.theme.default === "dark" ? site.theme.dark.bg : site.theme.light.bg,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  /* themeBootScript stamps data-theme on <html> before hydration, so the
     server markup can't match — suppress the diff on this element only. */
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${script.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* palette from config → CSS custom properties */}
        <style dangerouslySetInnerHTML={{ __html: themeCss() }} />
        {/* restores a saved theme before first paint */}
        <script dangerouslySetInnerHTML={{ __html: themeBootScript() }} />
      </head>
      <body>
        <CartProvider>
          <Header />
          <span id="top" />
          <main>{children}</main>
          <Footer />
          <FloatingActions />
          <CartDrawer />
          <Toast />
        </CartProvider>
        <StructuredData />
      </body>
    </html>
  );
}

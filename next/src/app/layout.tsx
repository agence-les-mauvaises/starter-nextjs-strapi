import type { Metadata, Viewport } from "next";
import { Locale, i18n } from '@/config/i18n.config'

import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import { CartProvider } from "@/context/cart-context";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { generateMetadataObject } from "@/lib/shared/metadata";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#06b6d4" },
    { media: "(prefers-color-scheme: dark)", color: "#06b6d4" },
  ],
};

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Default Global SEO for pages without theme
export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const metadata = generateMetadataObject();
  return metadata;
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { locale: string; slug: string };
}) {
  return (
    <html lang={params.locale}>
            <ViewTransitions>
                <CartProvider>
                    <body
                        className={cn(
                            inter.className,
                            "bg-charcoal antialiased min-h-screen h-0 w-full"
                        )}
                    >
                        {children}
                    </body>
                </CartProvider>
            </ViewTransitions>
        </html>
  )
}

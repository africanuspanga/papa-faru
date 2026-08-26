import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import WhatsAppButton from "@/components/WhatsAppButton";
import { WHATSAPP_NUMBER } from "@/lib/format";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Papa Faru Bureau de Change | Foreign Exchange in Dar es Salaam",
  description:
    "Check today's foreign exchange rates and visit Papa Faru Bureau de Change at Mayfair Plaza, Mwai Kibaki Rd, Dar es Salaam.",
  metadataBase: new URL("https://www.papafaruforex.co.tz"),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "Papa Faru Bureau de Change",
  description: "Your trusted exchange partner in Dar es Salaam, where trust meets value.",
  telephone: "+255766993985",
  areaServed: "Dar es Salaam, Tanzania",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mayfair Plaza, Mwai Kibaki Rd",
    addressLocality: "Dar es Salaam",
    addressCountry: "TZ",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton phone={WHATSAPP_NUMBER} />
        <MobileBottomNav
          items={[
            { href: "/", label: "Home", icon: "home" },
            { href: "/rates", label: "Rates", icon: "rates" },
            { href: "/about", label: "About", icon: "info" },
            { href: "/contact", label: "Contact", icon: "contact" },
          ]}
        />
      </body>
    </html>
  );
}

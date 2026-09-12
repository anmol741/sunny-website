import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ContactModalProvider } from "@/components/ContactModalContext";
import ContactModal from "@/components/ContactModal";
import FloatingContactButton from "@/components/FloatingContactButton";
import PageTransition from "@/components/PageTransition";

const geistSans = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-headline",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sunny Chadha | REALTOR® — Lower Mainland & Fraser Valley",
  description:
    "Sunny Chadha is a REALTOR® with Century 21 Coastal Realty Ltd., serving commercial and residential buyers and sellers across the Lower Mainland and Fraser Valley, BC.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-navy">
        <ContactModalProvider>
          <Navbar />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <ContactModal />
          <FloatingContactButton />
        </ContactModalProvider>
      </body>
    </html>
  );
}

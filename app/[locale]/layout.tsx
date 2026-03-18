import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "../globals.css";
import Navbar from "../(_features)/Layout/Navbar/Navbar";
import MobileNavbar from "../(_features)/Layout/Navbar/Mobilenavbar";
import Footer from "../(_features)/Layout/Footer/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ReactQueryProvider from "@/src/providers/ReactQueryProvider";
import { Toaster } from "react-hot-toast";


const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Souq Shamel",
  description: "Souq Shamel",
  icons: {
    icon: "/Logo.svg",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className={`${cairo.variable} antialiased`} style={{ fontFamily: "var(--font-cairo)" }}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ReactQueryProvider>
            <Toaster position="top-center" reverseOrder={false} />
            <Navbar />
            {children}
            <Footer />
            <MobileNavbar />
          </ReactQueryProvider>
        </NextIntlClientProvider>

      </body>
    </html>
  );
}

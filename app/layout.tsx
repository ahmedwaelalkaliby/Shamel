import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "./(_features)/Layout/Navbar/Navbar";
import MobileNavbar from "./(_features)/Layout/Navbar/Mobilenavbar";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
});


export const metadata: Metadata = {
  title: "سوق شامل",
  description: "سوق شامل",
  icons: {
    icon: "/Logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cairo.variable} antialiased`}
      >
        <Navbar />
        {children}
        <MobileNavbar />
      </body>
    </html>
  );
}

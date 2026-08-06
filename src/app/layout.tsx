import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Hause Interiors — We design spaces that feel like home",
  description: "Interior design services that work for the way you live. Residential, commercial, modular kitchens, and turnkey interior solutions based in Delhi NCR and serving pan-India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} dark scroll-smooth`}
    >
      <body className="bg-[#0c0d0e] text-[#f3efea] antialiased selection:bg-[#171717] selection:text-[#f3efea] font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}


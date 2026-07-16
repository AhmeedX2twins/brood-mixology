import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brood - Mixologie Créative Tunisienne",
  description: "High-end creative mixology in Tunisia. Frais. Glacé. Brood.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${montserrat.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-white relative">
        {/* Seamless Premium Fixed Background */}
        <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-[#023047] via-[#0077B6] to-[#00B4D8]" />
        {children}
      </body>
    </html>
  );
}

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
  metadataBase: new URL("https://brood.tn"),
  title: "Brood | La Mixologie Créative & Bar à Jus Frais en Tunisie",
  description: "Découvrez Brood, l'univers de la mixologie créative. Cocktails rafraîchissants, jus frais et service de bar sur-mesure pour vos mariages et événements privés à Soliman et partout en Tunisie.",
  keywords: ["Mixologie Tunisie", "Bar à jus Soliman", "Cocktails sans alcool", "Traiteur boisson événementiel", "Brood Soliman Plage", "Jus frais Tunisie", "Bar de mariage", "Boissons healthy"],
  authors: [{ name: "Brood" }],
  openGraph: {
    title: "Brood | La Mixologie Créative Tunisienne",
    description: "Froid. Frais. Brood. L'expérience ultime de mixologie pour vos événements.",
    url: "https://brood.tn",
    siteName: "Brood Tunisie",
    images: [
      {
        url: "/assets/post-card.webp",
        width: 1200,
        height: 630,
        alt: "Les fondateurs de Brood - Service pour événements en Tunisie",
      },
    ],
    locale: "fr_TN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FoodEstablishment",
              "name": "Brood",
              "image": "https://brood.tn/assets/post-card.webp",
              "@id": "",
              "url": "https://brood.tn",
              "telephone": "",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Plage de Soliman (Soliman Chatt)",
                "addressLocality": "Soliman",
                "addressCountry": "TN"
              },
              "servesCuisine": "Juice Bar, Mixology, Mocktails, Smoothies",
              "priceRange": "$$",
              "sameAs": [
                "https://www.instagram.com/brood.tn",
                "https://www.facebook.com/brood.tn"
              ]
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col text-white relative">
        {/* Seamless Premium Fixed Background */}
        <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-[#023047] via-[#0077B6] to-[#00B4D8]" />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IIG — Infrastructure and Integration Group",
  description:
    "Infrastructure & Integration Group provides expert Cloverleaf, HL7, and FHIR integration services for specialty clinical laboratories.",
  metadataBase: new URL("https://iig-corp.com"),
  openGraph: {
    title: "IIG — Healthcare IT Integration",
    description: "Expert Cloverleaf, HL7, and FHIR integration for specialty labs.",
    url: "https://iig-corp.com",
    siteName: "Infrastructure & Integration Group",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-white text-navy">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "GROOMOSPHERE - Professional Barber Services On-Demand",
  description: "Connect with professional barbers for on-demand haircuts at your location. Book quality barber services with GROOMOSPHERE.",
  keywords: "barber, haircut, grooming, on-demand, professional, Nigeria",
  authors: [{ name: "GROOMOSPHERE Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#003366" />
      </head>
      <body
        className={`${poppins.variable} ${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

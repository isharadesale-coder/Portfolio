import type { Metadata } from "next";
import {
  Anton,
  Archivo,
  DM_Sans,
  Geist,
  Inter,
  Pinyon_Script,
  Playfair_Display,
  Poppins,
  Rubik,
} from "next/font/google";
import "./globals.css";

// Primary landing-page typeface (Neue-Montreal-style grotesk, like the reference)
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Per-project brand fonts (FocusMate)
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  display: "swap",
});

// Per-project brand fonts (GridGlow)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

// Per-project brand fonts (MOHA)
const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pinyon",
  display: "swap",
});

// Per-project brand font (Bundle of Apps — Dodo & Luma use Rubik)
const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ishika Desale — Designer & Creative Developer",
  description:
    "Portfolio of Ishika Desale — sleek, motion-led brand, product and web experiences.",
  openGraph: {
    title: "Ishika Desale — Designer & Creative Developer",
    description:
      "Portfolio of Ishika Desale — sleek, motion-led brand, product and web experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${anton.variable} ${archivo.variable} ${inter.variable} ${playfair.variable} ${dmSans.variable} ${poppins.variable} ${pinyon.variable} ${rubik.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}

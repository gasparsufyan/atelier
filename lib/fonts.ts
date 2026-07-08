// Server-only module: next/font/google must be evaluated in the module graph
// of a Server Component (here, imported by the root layout and page).
import {
  Inter,
  Space_Grotesk,
  Fraunces,
  Playfair_Display,
  IBM_Plex_Mono,
  Geist,
} from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

/** Space-separated `.variable` class names to apply on <html>. */
export const fontClassNames = [inter, geist, spaceGrotesk, fraunces, playfair, plexMono]
  .map((f) => f.variable)
  .join(" ");

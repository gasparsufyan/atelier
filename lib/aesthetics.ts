// Single source of truth for the aesthetic + font catalog.
// Pure data (no next/font import) so it is safe to import from client components.

export type ThemeMode = "light" | "dark";

export type FontId =
  | "inter"
  | "geist"
  | "space-grotesk"
  | "fraunces"
  | "playfair"
  | "plex-mono";

export type Tokens = {
  bg: string;
  surface: string;
  elevated: string;
  text: string;
  muted: string;
  accent: string;
  accentText: string;
  border: string;
  radius: string;
  borderWidth: string;
  shadow: string;
  headingSpacing: string;
};

export type Aesthetic = {
  id: string;
  name: string;
  tagline: string;
  defaultFontId: FontId;
  tokens: Record<ThemeMode, Tokens>;
};

export type Font = {
  id: FontId;
  name: string;
  /** CSS `var(--…)` reference exposed by next/font in the root layout. */
  cssVar: string;
  role: string;
};

export const FONTS: Font[] = [
  { id: "inter", name: "Inter", cssVar: "var(--font-inter)", role: "Sans" },
  { id: "geist", name: "Geist", cssVar: "var(--font-geist-sans)", role: "Sans" },
  { id: "space-grotesk", name: "Space Grotesk", cssVar: "var(--font-space-grotesk)", role: "Display" },
  { id: "fraunces", name: "Fraunces", cssVar: "var(--font-fraunces)", role: "Serif" },
  { id: "playfair", name: "Playfair Display", cssVar: "var(--font-playfair)", role: "Serif" },
  { id: "plex-mono", name: "IBM Plex Mono", cssVar: "var(--font-plex-mono)", role: "Mono" },
];

export const AESTHETICS: Aesthetic[] = [
  {
    id: "swiss",
    name: "Swiss",
    tagline: "Grid-driven, restrained, precise",
    defaultFontId: "inter",
    tokens: {
      light: {
        bg: "#ffffff", surface: "#ffffff", elevated: "#f6f6f6",
        text: "#0a0a0a", muted: "#737373", accent: "#e5372a", accentText: "#ffffff",
        border: "#e4e4e7", radius: "3px", borderWidth: "1px",
        shadow: "0 1px 2px rgba(0,0,0,0.05)", headingSpacing: "-0.025em",
      },
      dark: {
        bg: "#09090b", surface: "#101012", elevated: "#17171a",
        text: "#fafafa", muted: "#a1a1aa", accent: "#ff4d3d", accentText: "#0a0a0a",
        border: "#26262b", radius: "3px", borderWidth: "1px",
        shadow: "0 1px 2px rgba(0,0,0,0.5)", headingSpacing: "-0.025em",
      },
    },
  },
  {
    id: "editorial",
    name: "Editorial",
    tagline: "Serif-led, magazine hierarchy",
    defaultFontId: "fraunces",
    tokens: {
      light: {
        bg: "#f7f3ec", surface: "#fffdf8", elevated: "#fffefb",
        text: "#201b16", muted: "#6f6558", accent: "#7c2d12", accentText: "#fdf6ee",
        border: "#e6dccb", radius: "5px", borderWidth: "1px",
        shadow: "0 8px 30px rgba(60,40,20,0.08)", headingSpacing: "-0.01em",
      },
      dark: {
        bg: "#16130e", surface: "#1e1a13", elevated: "#241f17",
        text: "#f4ecdd", muted: "#a99d88", accent: "#d99a5b", accentText: "#16130e",
        border: "#342d21", radius: "5px", borderWidth: "1px",
        shadow: "0 10px 34px rgba(0,0,0,0.5)", headingSpacing: "-0.01em",
      },
    },
  },
  {
    id: "brutalist",
    name: "Brutalist",
    tagline: "Raw, high-contrast, hard edges",
    defaultFontId: "plex-mono",
    tokens: {
      light: {
        bg: "#eceae4", surface: "#ffffff", elevated: "#ffffff",
        text: "#000000", muted: "#3f3f3f", accent: "#2323ff", accentText: "#ffffff",
        border: "#000000", radius: "0px", borderWidth: "2px",
        shadow: "5px 5px 0 #000000", headingSpacing: "-0.02em",
      },
      dark: {
        bg: "#0c0c0c", surface: "#151515", elevated: "#151515",
        text: "#ffffff", muted: "#b5b5b5", accent: "#e2ff3d", accentText: "#000000",
        border: "#ffffff", radius: "0px", borderWidth: "2px",
        shadow: "5px 5px 0 #ffffff", headingSpacing: "-0.02em",
      },
    },
  },
  {
    id: "soft",
    name: "Soft Depth",
    tagline: "Glassy layers, gentle shadow",
    defaultFontId: "geist",
    tokens: {
      light: {
        bg: "#eaeefb", surface: "#ffffff", elevated: "#ffffff",
        text: "#1c2138", muted: "#6a7096", accent: "#6366f1", accentText: "#ffffff",
        border: "#e0e5f4", radius: "22px", borderWidth: "1px",
        shadow: "0 20px 50px -12px rgba(65,75,160,0.28)", headingSpacing: "-0.02em",
      },
      dark: {
        bg: "#0c0e1c", surface: "#16192e", elevated: "#1d2138",
        text: "#eceffb", muted: "#9096bd", accent: "#818cf8", accentText: "#0c0e1c",
        border: "#282d48", radius: "22px", borderWidth: "1px",
        shadow: "0 24px 60px -12px rgba(0,0,0,0.7)", headingSpacing: "-0.02em",
      },
    },
  },
  {
    id: "organic",
    name: "Warm Organic",
    tagline: "Earthy, tactile, humanist",
    defaultFontId: "playfair",
    tokens: {
      light: {
        bg: "#f5efe5", surface: "#fffbf4", elevated: "#fffdf9",
        text: "#2b241d", muted: "#7c6f5d", accent: "#c4633a", accentText: "#fff8f2",
        border: "#e7dcc9", radius: "16px", borderWidth: "1px",
        shadow: "0 12px 34px -10px rgba(120,80,40,0.22)", headingSpacing: "-0.012em",
      },
      dark: {
        bg: "#1a140e", surface: "#221b13", elevated: "#292117",
        text: "#f0e6d6", muted: "#ab9c85", accent: "#db8552", accentText: "#1a140e",
        border: "#382d20", radius: "16px", borderWidth: "1px",
        shadow: "0 16px 40px -10px rgba(0,0,0,0.6)", headingSpacing: "-0.012em",
      },
    },
  },
  {
    id: "bold",
    name: "Bold Expressive",
    tagline: "Vivid, dramatic, maximal",
    defaultFontId: "space-grotesk",
    tokens: {
      light: {
        bg: "#fdf6ef", surface: "#ffffff", elevated: "#ffffff",
        text: "#140f0c", muted: "#6b5d52", accent: "#ff2d6f", accentText: "#ffffff",
        border: "#efe4d7", radius: "12px", borderWidth: "1.5px",
        shadow: "0 16px 40px -12px rgba(255,45,111,0.3)", headingSpacing: "-0.035em",
      },
      dark: {
        bg: "#0a0812", surface: "#14111f", elevated: "#1b1730",
        text: "#fbf5ff", muted: "#a99fc4", accent: "#ff3d7f", accentText: "#ffffff",
        border: "#292340", radius: "12px", borderWidth: "1.5px",
        shadow: "0 20px 50px -12px rgba(255,45,127,0.35)", headingSpacing: "-0.035em",
      },
    },
  },
];

export const DEFAULT_THEME: ThemeMode = "dark";
export const DEFAULT_AESTHETIC_ID = AESTHETICS[1].id; // Editorial

export function getAesthetic(id: string): Aesthetic {
  return AESTHETICS.find((a) => a.id === id) ?? AESTHETICS[0];
}

export function getFont(id: FontId): Font {
  return FONTS.find((f) => f.id === id) ?? FONTS[0];
}

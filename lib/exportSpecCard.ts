import type { ThemeMode, Tokens } from "@/lib/aesthetics";

export type SpecCardInput = {
  name: string;
  tagline: string;
  theme: ThemeMode;
  fontName: string;
  fontRole: string;
  tokens: Tokens;
};

const pad = (s: string) => s.padEnd(12, " ");

/**
 * Builds a plain-text "spec card" summarising the current selection and
 * downloads it as a .txt file for hand-off to the studio.
 */
export function exportSpecCard(input: SpecCardInput): void {
  const { name, tagline, theme, fontName, fontRole, tokens } = input;

  const lines = [
    "ATELIER · DESIGN DISCOVERY",
    "==========================",
    "",
    pad("Aesthetic") + name,
    pad("Direction") + tagline,
    pad("Theme") + (theme === "dark" ? "Dark" : "Light"),
    pad("Typeface") + `${fontName} (${fontRole})`,
    "",
    "PALETTE",
    "-------",
    pad("Background") + tokens.bg,
    pad("Surface") + tokens.surface,
    pad("Elevated") + tokens.elevated,
    pad("Text") + tokens.text,
    pad("Muted") + tokens.muted,
    pad("Accent") + tokens.accent,
    pad("On accent") + tokens.accentText,
    pad("Border") + tokens.border,
    "",
    "STYLE",
    "-----",
    pad("Radius") + tokens.radius,
    pad("Border") + tokens.borderWidth,
    "",
    "Exported from Atelier · Design Discovery",
    "",
  ];

  const blob = new Blob([lines.join("\n")], {
    type: "text/plain;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `atelier-${name.toLowerCase().replace(/\s+/g, "-")}-${theme}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

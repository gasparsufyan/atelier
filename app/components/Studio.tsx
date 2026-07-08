"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AESTHETICS,
  DEFAULT_AESTHETIC_ID,
  DEFAULT_THEME,
  FONTS,
  getAesthetic,
  getFont,
  type FontId,
  type ThemeMode,
} from "@/lib/aesthetics";
import { exportSpecCard } from "@/lib/exportSpecCard";
import Controls from "./Controls";
import Logo from "./Logo";
import PreviewPage from "./PreviewPage";

const STORAGE_KEY = "atelier:selection";

type Selection = {
  theme: ThemeMode;
  aestheticId: string;
  fontId: FontId;
};

function partialFromStorage(): Partial<Selection> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<Selection>) : {};
  } catch {
    return {};
  }
}

function partialFromParams(search: string): Partial<Selection> {
  const out: Partial<Selection> = {};
  try {
    const p = new URLSearchParams(search);
    const t = p.get("theme");
    if (t === "light" || t === "dark") out.theme = t;
    const a = p.get("aesthetic");
    if (a && AESTHETICS.some((x) => x.id === a)) out.aestheticId = a;
    const f = p.get("font");
    if (f && FONTS.some((x) => x.id === f)) out.fontId = f as FontId;
  } catch {
    /* ignore malformed query */
  }
  return out;
}

/** Merges stored + URL selection (URL wins) and validates every field. */
function readSelection(): Selection {
  const stored = typeof localStorage !== "undefined" ? partialFromStorage() : {};
  const fromUrl =
    typeof window !== "undefined" ? partialFromParams(window.location.search) : {};
  const merged = { ...stored, ...fromUrl };

  const aestheticId =
    merged.aestheticId && AESTHETICS.some((a) => a.id === merged.aestheticId)
      ? merged.aestheticId
      : DEFAULT_AESTHETIC_ID;
  const fontId =
    merged.fontId && FONTS.some((f) => f.id === merged.fontId)
      ? merged.fontId
      : getAesthetic(aestheticId).defaultFontId;

  return {
    theme: merged.theme === "light" || merged.theme === "dark" ? merged.theme : DEFAULT_THEME,
    aestheticId,
    fontId,
  };
}

function buildShareUrl(s: Selection): string {
  const base = window.location.origin + window.location.pathname;
  const p = new URLSearchParams({
    theme: s.theme,
    aesthetic: s.aestheticId,
    font: s.fontId,
  });
  return `${base}?${p.toString()}`;
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for non-secure contexts without the async clipboard API.
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

export default function Studio() {
  // Rendered client-only (see ClientStudio), so reading localStorage in the
  // initializer is safe and free of hydration mismatch.
  const [selection, setSelection] = useState<Selection>(readSelection);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  const { theme, aestheticId, fontId } = selection;

  // Persist on change. An incoming shared link is adopted here on first mount.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
    } catch {
      /* storage may be unavailable */
    }
  }, [selection]);

  // Once a shared link has been read into state, strip the query string so
  // later edits (saved to localStorage) aren't overridden by a stale URL.
  useEffect(() => {
    try {
      if (window.location.search) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    } catch {
      /* history API unavailable */
    }
  }, []);

  // Auto-dismiss the "Copied!" toast.
  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(id);
  }, [copied]);

  const aesthetic = useMemo(() => getAesthetic(aestheticId), [aestheticId]);
  const tokens = aesthetic.tokens[theme];
  const font = useMemo(() => getFont(fontId), [fontId]);

  const setTheme = (next: ThemeMode) =>
    setSelection((s) => ({ ...s, theme: next }));
  const setFontId = (next: FontId) =>
    setSelection((s) => ({ ...s, fontId: next }));

  // Switching aesthetic snaps the typeface to that aesthetic's default.
  const handleAesthetic = (id: string) =>
    setSelection((s) => ({
      ...s,
      aestheticId: id,
      fontId: getAesthetic(id).defaultFontId,
    }));

  const previewStyle = {
    "--pv-bg": tokens.bg,
    "--pv-surface": tokens.surface,
    "--pv-elevated": tokens.elevated,
    "--pv-text": tokens.text,
    "--pv-muted": tokens.muted,
    "--pv-accent": tokens.accent,
    "--pv-accent-text": tokens.accentText,
    "--pv-border": tokens.border,
    "--pv-radius": tokens.radius,
    "--pv-border-width": tokens.borderWidth,
    "--pv-shadow": tokens.shadow,
    "--pv-heading-spacing": tokens.headingSpacing,
    "--font-preview": font.cssVar,
  } as React.CSSProperties;

  const handleExport = () => {
    setExporting(true);
    try {
      exportSpecCard({
        name: aesthetic.name,
        tagline: aesthetic.tagline,
        theme,
        fontName: font.name,
        fontRole: font.role,
        tokens,
      });
    } finally {
      setExporting(false);
    }
  };

  const handleShare = async () => {
    const ok = await copyToClipboard(buildShareUrl(selection));
    if (ok) setCopied(true);
  };

  const controls = (
    <Controls
      theme={theme}
      aestheticId={aestheticId}
      fontId={fontId}
      onTheme={setTheme}
      onAesthetic={handleAesthetic}
      onFont={setFontId}
      onExport={handleExport}
      onShare={handleShare}
      exporting={exporting}
      copied={copied}
    />
  );

  return (
    <div className="flex h-dvh flex-col overflow-hidden lg:flex-row">
      {/* Desktop sidebar */}
      <aside className="glass hidden w-[340px] shrink-0 flex-col overflow-y-auto border-r px-6 py-7 lg:flex">
        <Brand />
        <div className="mt-8">{controls}</div>
      </aside>

      {/* Canvas */}
      <main className="app-canvas app-grid relative flex min-h-0 flex-1 flex-col">
        {/* Compact top bar (mobile + tablet) */}
        <div className="glass flex items-center justify-between px-4 py-3 lg:hidden">
          <Brand compact />
        </div>

        <div className="flex min-h-0 flex-1 items-stretch justify-center p-4 sm:p-8">
          <div className="window-frame flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl">
            {/* Fake browser chrome */}
            <div className="flex shrink-0 items-center gap-3 border-b border-[var(--app-border)] bg-[var(--app-panel-solid)] px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-white/25" />
                <span className="h-3 w-3 rounded-full bg-white/[0.18]" />
                <span className="h-3 w-3 rounded-full bg-white/[0.12]" />
              </div>
              <div className="mx-auto flex max-w-xs flex-1 items-center justify-center rounded-md bg-white/5 px-3 py-1 text-xs text-[var(--app-muted)]">
                atelier.studio
              </div>
            </div>
            {/* Live preview */}
            <div
              className="preview pv-scroll min-h-0 flex-1 overflow-y-auto"
              style={previewStyle}
            >
              <PreviewPage />
            </div>
          </div>
        </div>

        {/* Control launcher (mobile + tablet) */}
        <div className="glass flex items-center justify-between gap-3 px-4 py-3 lg:hidden">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{aesthetic.name}</p>
            <p className="truncate text-xs text-[var(--app-muted)]">
              {theme === "dark" ? "Dark" : "Light"} · {font.name}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setControlsOpen(true)}
            className="btn-accent shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold"
          >
            Customize
          </button>
        </div>
      </main>

      {/* Bottom sheet (mobile + tablet) */}
      {controlsOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close controls"
            onClick={() => setControlsOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />
          <div className="sheet absolute inset-x-0 bottom-0 max-h-[86dvh] overflow-y-auto rounded-t-3xl px-5 pb-8 pt-3">
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-white/20" />
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold">Customize</span>
              <button
                type="button"
                onClick={() => setControlsOpen(false)}
                className="text-sm text-[var(--app-muted)]"
              >
                Done
              </button>
            </div>
            {controls}
          </div>
        </div>
      )}
    </div>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <Logo className="h-8 w-8" />
      <div>
        <p className="text-sm font-semibold leading-tight">Atelier</p>
        {!compact && (
          <p className="text-xs leading-tight text-[var(--app-muted)]">
            Design discovery
          </p>
        )}
      </div>
    </div>
  );
}

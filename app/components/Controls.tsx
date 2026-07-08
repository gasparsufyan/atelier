import { AESTHETICS, FONTS, type FontId, type ThemeMode } from "@/lib/aesthetics";

type Props = {
  theme: ThemeMode;
  aestheticId: string;
  fontId: FontId;
  onTheme: (t: ThemeMode) => void;
  onAesthetic: (id: string) => void;
  onFont: (id: FontId) => void;
  onExport: () => void;
  onShare: () => void;
  exporting: boolean;
  copied: boolean;
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--app-faint)]">
      {children}
    </p>
  );
}

export default function Controls({
  theme,
  aestheticId,
  fontId,
  onTheme,
  onAesthetic,
  onFont,
  onExport,
  onShare,
  exporting,
  copied,
}: Props) {
  return (
    <div className="flex flex-col gap-7">
      {/* Theme */}
      <section>
        <SectionLabel>Theme</SectionLabel>
        <div className="grid grid-cols-2 gap-2">
          {(["light", "dark"] as ThemeMode[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onTheme(t)}
              data-active={theme === t}
              className="opt flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium capitalize"
            >
              <span aria-hidden>{t === "light" ? "☀" : "☾"}</span>
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* Aesthetic */}
      <section>
        <SectionLabel>Aesthetic</SectionLabel>
        <div className="flex flex-col gap-2">
          {AESTHETICS.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => onAesthetic(a.id)}
              data-active={aestheticId === a.id}
              className="opt rounded-xl px-3.5 py-3 text-left"
            >
              <span className="block text-sm font-semibold text-[var(--app-text)]">
                {a.name}
              </span>
              <span className="mt-0.5 block text-xs text-[var(--app-muted)]">
                {a.tagline}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Typeface */}
      <section>
        <SectionLabel>Typeface</SectionLabel>
        <div className="grid grid-cols-2 gap-2">
          {FONTS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => onFont(f.id)}
              data-active={fontId === f.id}
              className="opt rounded-xl px-3 py-2.5 text-left"
            >
              <span
                className="block truncate text-sm font-semibold text-[var(--app-text)]"
                style={{ fontFamily: f.cssVar }}
              >
                {f.name}
              </span>
              <span className="mt-0.5 block text-[11px] uppercase tracking-wider text-[var(--app-muted)]">
                {f.role}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Hand-off */}
      <section>
        <SectionLabel>Hand-off</SectionLabel>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={onShare}
            className="btn-accent flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold"
          >
            {copied ? "Copied! ✓" : "Copy share link"}
          </button>
          <button
            type="button"
            onClick={onExport}
            disabled={exporting}
            className="btn-outline flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold"
          >
            {exporting ? "Preparing…" : "Export spec card (.txt)"}
          </button>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-[var(--app-faint)]">
          Copy a link that reopens this exact combination, or download a text
          summary, both to share back with the studio.
        </p>
      </section>
    </div>
  );
}

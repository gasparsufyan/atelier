const FEATURES = [
  {
    index: "01",
    title: "Identity",
    body: "A coherent system of colour, type and space that carries across every surface.",
  },
  {
    index: "02",
    title: "Rhythm",
    body: "Considered hierarchy and generous spacing that guide the eye without effort.",
  },
  {
    index: "03",
    title: "Depth",
    body: "Layered surfaces and shadow that give the interface a tangible, premium feel.",
  },
];

/**
 * A believable sample page styled entirely from `--pv-*` tokens and
 * `--font-preview`, so it fully re-skins when the client changes their
 * selection. Structure never changes; only the design language does.
 */
export default function PreviewPage() {
  return (
    <div className="preview min-h-full px-6 py-6 sm:px-10 sm:py-10">
      {/* Nav */}
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="pv-accent text-xl leading-none">◆</span>
          <span className="pv-heading text-lg font-bold">Atelier Studio</span>
        </div>
        <div className="pv-muted hidden items-center gap-7 text-sm sm:flex">
          <span>Product</span>
          <span>Studio</span>
          <span>Journal</span>
          <span>Pricing</span>
        </div>
        <button className="pv-btn pv-btn-primary px-4 py-2 text-sm">Get started</button>
      </nav>

      {/* Hero */}
      <header className="mt-14 sm:mt-20">
        <span className="pv-chip pv-muted inline-block px-3 py-1 text-[11px] uppercase tracking-[0.2em]">
          Discovery
        </span>
        <h1 className="pv-heading mt-5 text-5xl font-bold sm:text-7xl">
          Design that
          <br />
          speaks first.
        </h1>
        <p className="pv-muted mt-6 max-w-md text-base leading-relaxed sm:text-lg">
          A living preview of your future brand. Change the aesthetic, theme and
          typeface to feel each direction before you commit to one.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button className="pv-btn pv-btn-primary px-6 py-3 text-sm sm:text-base">
            Explore directions
          </button>
          <button className="pv-btn pv-btn-secondary px-6 py-3 text-sm sm:text-base">
            View gallery
          </button>
        </div>
      </header>

      {/* Feature cards */}
      <section className="mt-16 grid gap-4 sm:grid-cols-3">
        {FEATURES.map((f) => (
          <article key={f.index} className="pv-card p-6">
            <span className="pv-accent text-sm font-semibold">{f.index}</span>
            <h3 className="pv-heading mt-4 text-xl font-bold">{f.title}</h3>
            <p className="pv-muted mt-2 text-sm leading-relaxed">{f.body}</p>
          </article>
        ))}
      </section>

      {/* Type specimen */}
      <section className="pv-elevated mt-5 p-6 sm:p-8">
        <div className="flex items-baseline justify-between">
          <span className="pv-muted text-[11px] uppercase tracking-[0.2em]">
            Typography
          </span>
          <span className="pv-accent text-sm font-semibold">Aa</span>
        </div>
        <p className="pv-heading mt-4 text-6xl font-bold sm:text-8xl">Ag 123</p>
        <div className="pv-rule my-6 h-px w-full opacity-60" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="pv-heading text-2xl font-bold">The quick brown fox</p>
            <p className="pv-muted mt-1 text-xs uppercase tracking-widest">Heading</p>
          </div>
          <div>
            <p className="text-base leading-relaxed">
              Jumps over the lazy dog. Typography sets the tone before a single
              word is read.
            </p>
            <p className="pv-muted mt-1 text-xs uppercase tracking-widest">Body</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pv-muted mt-8 flex items-center justify-between text-xs">
        <span>© Atelier Studio</span>
        <span>Preview · Atelier</span>
      </footer>
    </div>
  );
}

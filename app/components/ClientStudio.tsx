"use client";

import dynamic from "next/dynamic";

// Rendered client-only: the selection lives in localStorage, so there is no
// meaningful server render (and this avoids a flash of the default theme).
const Studio = dynamic(() => import("./Studio"), {
  ssr: false,
  loading: () => (
    <div className="app-canvas app-grid grid h-dvh place-items-center">
      <span className="text-sm text-[var(--app-muted)]">Loading Atelier…</span>
    </div>
  ),
});

export default function ClientStudio() {
  return <Studio />;
}

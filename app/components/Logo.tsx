// Atelier's mark: three elliptical orbital rings (no nucleus) at 60 degree
// offsets, monochrome with a slight per-orbit opacity falloff for layered
// depth. Near-white for the dark app chrome.
export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="Atelier"
      fill="none"
      stroke="#e5e5e5"
      strokeWidth="1.6"
    >
      <ellipse cx="16" cy="16" rx="13" ry="5" />
      <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(60 16 16)" opacity="0.8" />
      <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(120 16 16)" opacity="0.6" />
    </svg>
  );
}

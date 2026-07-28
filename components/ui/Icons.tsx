/* ============================================================
   Every inline SVG on the site, in one place. They inherit
   colour and are sized by CSS, so they need no props.
   ============================================================ */

type P = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const CartIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M6 6h15l-1.6 8.4a2 2 0 0 1-2 1.6H9.2a2 2 0 0 1-2-1.7L5.6 3.6A1 1 0 0 0 4.6 3H3" />
    <circle cx="9.5" cy="20" r="1.4" />
    <circle cx="17.5" cy="20" r="1.4" />
  </svg>
);

export const CheckIcon = (p: P) => (
  <svg {...stroke} strokeWidth={3} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const PlusIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const CloseIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const MoonIcon = (p: P) => (
  <svg {...stroke} className={"moon " + (p.className ?? "")}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const SunIcon = (p: P) => (
  <svg {...stroke} className={"sun " + (p.className ?? "")}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2v2.4M12 19.6V22M2 12h2.4M19.6 12H22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7" />
  </svg>
);

export const InstagramIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const WhatsAppIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.13c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.02.24-3.43-.72-2.9-1.14-4.75-4.1-4.9-4.29-.14-.19-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.38-.42.5-.14.14-.28.29-.12.57.16.29.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.17-.19.7-.81.89-1.09.19-.29.38-.24.64-.14.26.1 1.65.78 1.93.92.28.14.47.21.53.33.07.12.07.68-.17 1.36z" />
  </svg>
);

export const PhoneIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.9.34 1.77.63 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.47a2 2 0 0 1 2.11-.45c.84.29 1.71.5 2.61.63A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const PinIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const LeafIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M12 21c4.4 0 8-3.3 8-7.4C20 8.3 12 2.5 12 2.5S4 8.3 4 13.6C4 17.7 7.6 21 12 21z" />
    <path d="M12 17.5a3.7 3.7 0 0 0 3.6-3.6" />
  </svg>
);

export const TruckIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
    <circle cx="7" cy="18" r="1.7" />
    <circle cx="17.5" cy="18" r="1.7" />
  </svg>
);

export const BagIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M6 6h15l-1.6 8.4a2 2 0 0 1-2 1.6H9.2a2 2 0 0 1-2-1.7L5.6 3.6A1 1 0 0 0 4.6 3H3" />
  </svg>
);

export const OvenIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M6 20h12M4 20v-3.5a8 8 0 0 1 16 0V20M12 8.5V5M9.5 5.2a2.5 2.5 0 1 1 3.4-3.1" />
  </svg>
);

export const SwipeIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ---------------------------------------------------------------
   Tile artwork for products with no photo yet. Two per category so
   neighbouring cards in the same category never look identical.
   Add a key here if you add a category in config/products.ts —
   anything unmatched falls back to `default`.
   --------------------------------------------------------------- */
export const TILE_ART: Record<string, string[]> = {
  wedding: [
    '<path d="M14 30h36v18a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4z"/><path d="M19 16h26v14H19z"/><path d="M24 6h16v10H24z"/><path d="M32 6V2"/>',
    '<path d="M12 34h40v14a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4z"/><path d="M18 20h28v14H18z"/><path d="M32 20c-5-6-9-8-9-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 4-4 6-9 12z"/>',
  ],
  birthday: [
    '<path d="M10 32h44v16a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4z"/><path d="M10 38c4 0 4 4 8 4s4-4 8-4 4 4 8 4 4-4 8-4 4 4 8 4 4-4 4-4"/><path d="M22 32V20M32 32V16M42 32V20"/><path d="M22 20a3 3 0 1 1 3-4M32 16a3 3 0 1 1 3-4M42 20a3 3 0 1 1 3-4"/>',
    '<path d="M14 30h36v18a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4z"/><path d="M14 36c4 0 5 4 9 4s5-4 9-4 5 4 9 4 5-4 9-4"/><path d="M32 30V18"/><path d="M32 18a4 4 0 1 1 4-5"/>',
  ],
  party: [
    '<path d="M18 26h28l-3.4 24a4 4 0 0 1-4 3.4H25.4a4 4 0 0 1-4-3.4z"/><path d="M18 26a7 7 0 0 1 1.6-11 8 8 0 0 1 14.6-4.3A7 7 0 0 1 45 15a7 7 0 0 1 1 11"/><path d="M32 34v12"/>',
    '<path d="M32 54c-9-7-18-14-18-24a11 11 0 0 1 18-8 11 11 0 0 1 18 8c0 10-9 17-18 24z"/>',
  ],
  pastry: [
    '<circle cx="32" cy="32" r="24"/><circle cx="24" cy="26" r="2.6" fill="currentColor" stroke="none"/><circle cx="39" cy="24" r="2.6" fill="currentColor" stroke="none"/><circle cx="35" cy="40" r="2.6" fill="currentColor" stroke="none"/><circle cx="22" cy="39" r="2.2" fill="currentColor" stroke="none"/>',
    '<path d="M12 26h40v22a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4z"/><path d="M12 26c0-7 9-12 20-12s20 5 20 12"/><path d="M22 38h20"/>',
  ],
  lowsugar: [
    '<path d="M32 56c12 0 21-9 21-20C53 21 32 6 32 6S11 21 11 36c0 11 9 20 21 20z"/><path d="M32 46a10 10 0 0 0 10-10"/>',
    '<path d="M50 16C50 32 40 44 26 48"/><path d="M50 16c-20 0-32 8-32 20 0 6 4 11 8 12"/><path d="M18 52c0-8 3-14 8-18"/>',
  ],
  default: [
    '<path d="M14 30h36v18a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4z"/><path d="M19 16h26v14H19z"/>',
    '<circle cx="32" cy="32" r="24"/><path d="M22 38h20"/>',
  ],
};

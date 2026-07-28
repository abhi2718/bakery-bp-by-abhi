/* ==========================================================================
   The shape of everything in config/. If a field is missing or misspelled,
   `npm run typecheck` says so before the site is handed to a client.
   ========================================================================== */

/* ---------------------------------- shop ---------------------------------- */

export type Unit = {
  /** Shown in the size dropdown and written into the WhatsApp message. */
  label: string;
  /** A plain number — no commas, no currency symbol. */
  price: number;
};

export type Product = {
  /** Unique, no spaces. The basket stores this, so never reuse an old id. */
  id: string;
  name: string;
  /** One or more category ids from `categories` in config/products.ts. */
  cat: string[];
  /**
   * Small badge over the photo. '' for none.
   * A 'hot:' prefix makes it solid brand colour, e.g. 'hot:Bestseller'.
   */
  tag?: string;
  /**
   * Photo for the card. '' falls back to a designed brand tile, so photos
   * can be added one product at a time. Local files live in /public.
   */
  img?: string;
  desc: string;
  /** Sizes, cheapest first. */
  units: Unit[];
  /** Can this be made in the "lighter" variant? See `ordering.variant`. */
  lowSugar?: boolean;
};

export type Category = {
  id: string;
  label: string;
};

/* --------------------------------- basket --------------------------------- */

export type CartLine = {
  id: string;
  unit: string;
  lowSugar: boolean;
  qty: number;
};

export type OrderDetails = {
  name: string;
  phone: string;
  occasion: string;
  date: string;
  slot: string;
  mode: "Delivery" | "Pickup";
  address: string;
  msg: string;
  notes: string;
};

/* --------------------------------- theme ---------------------------------- */

export type Palette = {
  /** Gradient stops, dark → light. White button text sits on p1–p2. */
  p1: string;
  p2: string;
  p3: string;
  /** Decorative accent (also the dark-mode text accent). */
  salmon: string;
  bg: string;
  bg2: string;
  surface: string;
  surface2: string;
  text: string;
  muted: string;
  mutedDim: string;
  /** Accent used for text and icons — needs 4.5:1 on `bg`. */
  accent: string;
  field: string;
  /** rgb triplet of `text`, used for hairlines and washes: "39, 15, 11". */
  textRgb: string;
  /** rgb triplet of `bg`, used for the same on dark. */
  bgRgb: string;
  /** Display-text gradient, dark → light. */
  spotText: [string, string, string];
};

/* ------------------------------- site config ------------------------------ */

export type NavItem = { label: string; href: string };

export type SiteConfig = {
  brand: {
    /** Shown big in the header, e.g. "The BakeNest". */
    name: string;
    /** Small line under it, e.g. "by Sonam". '' hides it. */
    suffix: string;
    /** Fallback shown if the logo file is missing, e.g. "BN". */
    monogram: string;
    /** Square file in /public. '' uses the monogram. */
    logo: string;
    /** Prefix for order references, e.g. "BN" → BN-260728-4193. */
    orderPrefix: string;
    /** The person orders go to — used in copy, e.g. "Sonam". */
    owner: string;
  };

  seo: {
    title: string;
    description: string;
    /** Public URL once live, e.g. "https://thebakenest.in". */
    url: string;
    ogImage: string;
  };

  contact: {
    /** Country code + number, digits only. No +, no spaces, no dashes. */
    whatsapp: string;
    /** The same number, formatted for humans. */
    whatsappDisplay: string;
    /** The first line of a plain "I have a question" WhatsApp message. */
    whatsappGreeting: string;
    instagram: string;
    instagramHandle: string;
    /** Neighbourhood / sector — used in copy and in the map schema. */
    area: string;
    city: string;
    region: string;
    country: string;
    /** Line under the map pin. Keep the full street address off the site. */
    addressNote: string;
    /** e.g. "FSSAI Reg. No. 12345678901234". '' hides the line. */
    fssai: string;
  };

  currency: {
    symbol: string;
    /** Number formatting locale, e.g. "en-IN" for 1,20,000. */
    locale: string;
  };

  ordering: {
    leadDays: number;
    weddingLeadDays: number;
    /** Which category triggers the longer lead time. */
    longLeadCategory: string;
    maxQty: number;
    occasions: string[];
    timeSlots: string[];
    /** Shown under the totals, e.g. how delivery is charged. */
    deliveryNote: string;
    /** Shown under the notes box, e.g. the eggless default. */
    dietNote: string;
    /** The "make it lighter" option on each card. */
    variant: {
      enabled: boolean;
      /** Checkbox label on the product card. */
      label: string;
      /** Badge in the basket and the WhatsApp message. */
      shortLabel: string;
      /** Tooltip on the leaf mark. */
      markLabel: string;
    };
  };

  theme: {
    /** 'light' | 'dark' — what a first-time visitor sees. */
    default: "light" | "dark";
    /** false hides the toggle and locks the site to `default`. */
    toggle: boolean;
    light: Palette;
    dark: Palette;
  };

  nav: NavItem[];

  /** Text between | | renders as the italic gradient accent. */
  hero: {
    eyebrow: string;
    title: string;
    lede: string;
    primaryCta: string;
    secondaryCta: string;
    notes: string[];
    image: string;
    floatPill: string;
    badge: { title: string; sub: string };
    stats: { k: string; l: string; grad?: boolean }[];
  };

  marquee: string[];

  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    bullets: string[];
    quote: string;
    quoteWho: string;
    ctaLabel: string;
  };

  shop: {
    eyebrow: string;
    title: string;
    blurb: string;
    /** Line under the filters. {n} = shown, {total} = all products. */
    countNote: string;
  };

  lowSugar: {
    enabled: boolean;
    eyebrow: string;
    title: string;
    paragraphs: string[];
    ctaLabel: string;
    disclaimer: string;
    panelEyebrow: string;
    panelTitle: string;
    rows: { d: string; t: string }[];
    panelNote: string;
  };

  how: {
    eyebrow: string;
    title: string;
    blurb: string;
    steps: { title: string; body: string }[];
    footnote: string;
  };

  gallery: {
    enabled: boolean;
    eyebrow: string;
    title: string;
    blurb: string;
    items: { src: string; caption: string }[];
    ctaLabel: string;
  };

  hours: {
    eyebrow: string;
    title: string;
    blurb: string;
    rows: { d: string; t: string }[];
    ctaLabel: string;
  };

  contactPanel: {
    eyebrow: string;
    title: string;
    blurb: string;
    ctaLabel: string;
  };

  faq: { q: string; a: string }[];

  cta: {
    eyebrow: string;
    title: string;
    script: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };

  footer: {
    blurb: string;
    columns: {
      title: string;
      /** A plain paragraph, or a link. */
      items: { label: string; href?: string; text?: boolean }[];
    }[];
    /** Your name / agency. '' removes the credit line. */
    credit: string;
    creditUrl: string;
  };
};

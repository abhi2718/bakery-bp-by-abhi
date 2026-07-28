import type { SiteConfig } from "@/types";

/* ==========================================================================
   SITE CONFIG — this file plus config/products.ts is the whole shop.

   To sell this site to another bakery:
     1. Change `brand`, `seo`, `contact`.
     2. Drop their square logo in /public/logo.png.
     3. Pick their colours in `theme` (only p1/p2/p3/salmon usually need it).
     4. Rewrite the copy blocks below in the owner's own words.
     5. Replace config/products.ts with their menu and photos.
   Nothing under components/ needs touching for a new client.

   Text wrapped in |pipes| renders as the italic gradient accent, so
   "Pick your |occasion|." puts the flourish on "occasion".
   ========================================================================== */

export const site: SiteConfig = {
  brand: {
    name: "The BakeNest",
    suffix: "by Sonam",
    monogram: "BN",
    logo: "/logo.png",
    orderPrefix: "BN",
    owner: "Sonam",
  },

  seo: {
    title: "The BakeNest by Sonam — Wedding, Birthday & Party Cakes in Noida",
    description:
      "Home bakery in Sector 137, Noida. Fresh, made-to-order wedding, birthday and party cakes, pastries and low-sugar bakes. Build your order online and send it straight to WhatsApp.",
    url: "https://example.com",
    ogImage: "/logo.png",
  },

  contact: {
    // Country code + number, digits only. Every button, link and the order
    // message read from this one value.
    whatsapp: "919616485114",
    whatsappDisplay: "+91 96164 85114",
    whatsappGreeting: "Hi Sonam, I have a question about The BakeNest.",
    instagram: "https://www.instagram.com/the_bakenest/",
    instagramHandle: "@the_bakenest",
    area: "Sector 137",
    city: "Noida",
    region: "Uttar Pradesh",
    country: "IN",
    addressNote: "Pickup by appointment · delivery nearby",
    // Home bakers in India usually need a registration number. Add it here
    // or leave '' to drop the line from the footer.
    fssai: "",
  },

  currency: { symbol: "₹", locale: "en-IN" },

  ordering: {
    leadDays: 2,
    weddingLeadDays: 7,
    longLeadCategory: "wedding",
    maxQty: 50,
    occasions: [
      "Wedding",
      "Engagement / Roka",
      "Sangeet / Mehendi",
      "Birthday",
      "Kids birthday",
      "Anniversary",
      "Baby shower",
      "House party",
      "Office / farewell",
      "Festival",
      "Just because",
    ],
    timeSlots: [
      "Morning (9 AM – 12 PM)",
      "Afternoon (12 – 4 PM)",
      "Evening (4 – 8 PM)",
      "Late evening (after 8 PM)",
    ],
    deliveryNote:
      "A starting estimate. Sonam confirms the final price on WhatsApp — detailed icing, fondant and photo prints cost more.",
    dietNote:
      "Everything is eggless by default. Tell us here if you need anything different.",
    variant: {
      enabled: true,
      label: "Make it low-sugar",
      shortLabel: "Low sugar",
      markLabel: "Can be made low-sugar",
    },
  },

  /* ---------------------------------------------------------------------
     THEME. The gradient deliberately stops short of the lightest tone:
     white button text needs 4.5:1, and a pale salmon only gives 2.2:1.
     If you change these for a new client, check `accent` against `bg`
     and `p1`/`p2` against white before shipping.
     --------------------------------------------------------------------- */
  theme: {
    default: "dark",
    toggle: true,
    light: {
      p1: "#3d1810",
      p2: "#8c4023",
      p3: "#ad5c33",
      salmon: "#e59d75",
      bg: "#fdf2ee",
      bg2: "#f7e6df",
      surface: "#fffbf9",
      surface2: "#faece6",
      text: "#270f0b", // 16.5:1 on bg
      muted: "#6b4a3f", // 7.1:1
      mutedDim: "#7f5e51", // 5.0:1 even on surface2
      accent: "#a04a26", // 5.5:1 on bg
      field: "#fffbf9",
      textRgb: "39, 15, 11",
      bgRgb: "253, 242, 238",
      spotText: ["#5c2415", "#a04a26", "#b8683c"],
    },
    dark: {
      // p1 is lifted here, or a #3d1810 button edge vanishes into the page.
      p1: "#6b3020",
      p2: "#8c4023",
      p3: "#ad5c33",
      salmon: "#e59d75",
      bg: "#1a0b08",
      bg2: "#21100c",
      surface: "#271410",
      surface2: "#33201a",
      text: "#fdf2ee",
      muted: "#c2a99e",
      mutedDim: "#b09488", // 5.5:1 even on surface2
      accent: "#e59d75", // 8.6:1 on the dark bg
      field: "#1f0f0b",
      textRgb: "253, 242, 238",
      bgRgb: "26, 11, 8",
      spotText: ["#d08a5f", "#e59d75", "#f0bb98"],
    },
  },

  nav: [
    { label: "Our story", href: "#about" },
    { label: "Order cakes", href: "#shop" },
    { label: "Low sugar", href: "#lowsugar" },
    { label: "How it works", href: "#how" },
    { label: "FAQs", href: "#faq" },
  ],

  hero: {
    eyebrow: "Home bakery · Sector 137, Noida",
    title: "Baked at home.\nSweetened |gently|.",
    // Keep health wording to the owner's own words. Do not upgrade
    // "low sugar" to sugar-free, diabetic-friendly or keto anywhere.
    lede:
      "Wedding, birthday and party cakes from The BakeNest by Sonam — baked to order in a home kitchen, with a low-sugar version of almost everything.",
    primaryCta: "Start your order",
    secondaryCta: "See the cakes",
    notes: ["Made to order", "Confirmed on WhatsApp", "Low-sugar options"],
    image:
      "https://images.unsplash.com/photo-1602351447937-745cb720612f?auto=format&fit=crop&w=1100&q=70",
    floatPill: "Small batch · Home kitchen",
    badge: {
      title: "Every cake is made after you order",
      sub: "Nothing sits in a display case — it's baked for your date.",
    },
    // These are claims, not measured numbers. Confirm each with the owner.
    stats: [
      { k: "100%", l: "Home-Baked", grad: true },
      { k: "Fresh", l: "Made To Order" },
      { k: "Low", l: "Sugar Options" },
      { k: "48h", l: "Notice Please" },
    ],
  },

  marquee: [
    "Wedding Cakes",
    "Birthday Cakes",
    "Party & Anniversary",
    "Pastries",
    "Brownies",
    "Low-Sugar Bakes",
    "Custom Themes",
  ],

  about: {
    eyebrow: "Our story",
    title: "A small kitchen that takes |cake| seriously.",
    paragraphs: [
      "The BakeNest started the way most good bakeries do — one home oven, one recipe worth repeating, and friends who kept asking for another. It's still a home kitchen, and that's the point. Everything is mixed, baked and finished in small batches, for one order at a time.",
      "The part people come back for is the sweetness. Most shop cakes are built to survive a display counter, which means a lot of sugar. Here you can ask for it lighter — with natural sweeteners instead of refined sugar — and still get a cake that tastes like a celebration, not a compromise.",
    ],
    bullets: [
      "Baked to order — never made in advance",
      "Low-sugar version of almost everything on the list",
      "Every order confirmed personally on WhatsApp",
      "Real ingredients — good butter, real cocoa, fresh cream",
    ],
    // The bakery's own promise, not a customer testimonial. Only put real
    // reviews here, and only with permission.
    quote: "Tell me the occasion and how sweet you like it. I'll bake the rest.",
    quoteWho: "— Sonam, The BakeNest",
    ctaLabel: "Browse the cakes",
  },

  shop: {
    eyebrow: "Order online",
    title: "Pick your |occasion|.",
    blurb:
      "Add what you'd like to the basket, tell us the date and address, and the whole order lands in Sonam's WhatsApp — she confirms the final price there.",
    countNote: "Showing {n} of {total} — every price is a starting price",
  },

  lowSugar: {
    enabled: true,
    eyebrow: "The quiet difference",
    title: "Cake, with the sugar |turned down|.",
    paragraphs: [
      "Most bakery cake is sweeter than it needs to be. Ours can be made with natural sweeteners instead of refined sugar — so the chocolate tastes like chocolate and the fruit tastes like fruit.",
      "It isn't a separate menu. Look for the leaf on any cake in the shop above and tick “Make it low-sugar” before you add it to your basket.",
    ],
    ctaLabel: "See what can be made low-sugar",
    disclaimer:
      "Lower in sugar, not sugar-free. If you're managing a medical condition, please check with your doctor first.",
    panelEyebrow: "Good to know",
    panelTitle: "Before you choose",
    rows: [
      { d: "Sweetener used", t: "Natural, not refined sugar" },
      { d: "Available on", t: "Most cakes & brownies" },
      { d: "Texture", t: "Slightly softer crumb" },
      { d: "Best eaten", t: "Within 2 days" },
      { d: "Extra cost", t: "Confirmed on chat" },
    ],
    panelNote:
      "These rows are drafted for you — confirm each one before the site goes live.",
  },

  how: {
    eyebrow: "How it works",
    title: "Basket, form, |WhatsApp|.",
    blurb:
      "No accounts, no card details, no app. The site just writes the message for you so nothing gets missed.",
    steps: [
      {
        title: "Fill your basket",
        body:
          "Pick the occasion, choose a size, and tick low-sugar if you'd like it that way. Add as many things as you need.",
      },
      {
        title: "Tell us the details",
        body:
          "Your name and number, the occasion, the date you need it, the delivery address and the message to pipe on top.",
      },
      {
        title: "Send it on WhatsApp",
        body:
          "One tap opens WhatsApp with the whole order already written out. Sonam confirms the final price, the advance and the time.",
      },
    ],
    footnote:
      "Please allow at least 2 days for regular cakes and about a week for wedding and custom cakes. Delivery across Noida and the sectors nearby — the charge is confirmed on chat.",
  },

  gallery: {
    enabled: true,
    eyebrow: "From the oven",
    title: "Every bake is on |Instagram|.",
    blurb:
      "Photos of the real cakes go up on @the_bakenest as they're finished. Have a scroll before you order.",
    // >>> Swap these for photos of the bakery's own work before launch.
    items: [
      {
        src:
          "https://images.unsplash.com/photo-1506459225024-1428097a7e18?auto=format&fit=crop&w=800&q=70",
        caption: "Wedding tiers",
      },
      {
        src:
          "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=70",
        caption: "Birthday bakes",
      },
      {
        src:
          "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=800&q=70",
        caption: "Macarons",
      },
      {
        src:
          "https://images.unsplash.com/photo-1607920591413-4ec007e70023?auto=format&fit=crop&w=800&q=70",
        caption: "Brownies",
      },
      {
        src:
          "https://images.unsplash.com/photo-1626803775151-61d756612f97?auto=format&fit=crop&w=800&q=70",
        caption: "Low-sugar bakes",
      },
      {
        src:
          "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=70",
        caption: "Teacakes & slices",
      },
    ],
    ctaLabel: "Follow @the_bakenest",
  },

  hours: {
    eyebrow: "Order hours",
    title: "When we're at the oven",
    blurb:
      "Messages are answered through the day. Pickups are arranged in advance.",
    rows: [
      { d: "Monday – Friday", t: "9:00 AM – 8:00 PM" },
      { d: "Saturday", t: "9:00 AM – 9:00 PM" },
      { d: "Sunday", t: "10:00 AM – 6:00 PM" },
      { d: "Wedding season", t: "Book early — slots fill up" },
    ],
    ctaLabel: "Start an order",
  },

  contactPanel: {
    eyebrow: "Get in touch",
    title: "Questions before you order?",
    blurb: "Instagram DM and WhatsApp both reach Sonam directly.",
    ctaLabel: "Message on Instagram",
  },

  faq: [
    {
      q: "Do I pay on the website?",
      a: "No — and there's nowhere to enter card details, by design. The site only writes your order out and sends it to Sonam on WhatsApp. She confirms the final price there, and a small advance over UPI books your date.",
    },
    {
      q: "How far in advance should I order?",
      a: "At least 2 days for a regular cake, and about a week for wedding, tiered and custom cakes. Around festivals and through wedding season, slots go early — message as soon as you know your date.",
    },
    {
      q: "What does “low sugar” actually mean?",
      a: "It means the cake is made with natural sweeteners instead of refined sugar, so it's noticeably less sweet than a standard bakery cake. It is not sugar-free, and it isn't a medical product — if you're managing diabetes or any other condition, please check with your doctor first.",
    },
    {
      q: "Are the cakes eggless?",
      a: "Yes — eggless is the default, and it's what most orders are. Please put any other allergies (nuts, gluten, dairy) in the notes box at checkout, and we'll tell you honestly what can and can't be worked around in a home kitchen.",
    },
    {
      q: "Are the prices on the site final?",
      a: "They're the starting price for that size. Detailed icing, fondant work, photo prints and tiered builds cost more, so Sonam confirms the exact total on WhatsApp before anything is baked.",
    },
    {
      q: "Do you deliver?",
      a: "Pickup from the kitchen in Sector 137 is by appointment. Delivery across Noida and the nearby sectors can be arranged for a small charge — choose delivery at checkout and add your address, and we'll confirm the charge on chat.",
    },
    {
      q: "Can you copy a design I've seen online?",
      a: "Send the picture on WhatsApp after you place the order. Some designs need equipment a home kitchen doesn't have, so we'll tell you upfront what's possible and suggest the closest version we can do properly.",
    },
  ],

  cta: {
    eyebrow: "Got a date in mind?",
    title: "Let's bake something for it.",
    script: "Wedding, birthday, or just a Tuesday",
    body:
      "Fill your basket, add the date and address, and send it across. We'll take it from there.",
    primaryCta: "Start your order",
    secondaryCta: "Or DM on Instagram",
  },

  footer: {
    blurb:
      "A home bakery making fresh, made-to-order wedding, birthday and party cakes — with low-sugar options.",
    columns: [
      {
        title: "Order",
        items: [
          { label: "Wedding cakes", href: "#shop" },
          { label: "Birthday cakes", href: "#shop" },
          { label: "Party & anniversary", href: "#shop" },
          { label: "Pastries & bites", href: "#shop" },
          { label: "Low-sugar bakes", href: "#lowsugar" },
        ],
      },
      {
        title: "Pickup",
        items: [
          { label: "Home bakery, Sector 137\nNoida, Uttar Pradesh", text: true },
          { label: "DM @the_bakenest", href: "https://www.instagram.com/the_bakenest/" },
        ],
      },
      {
        title: "Contact",
        items: [
          { label: "+91 96164 85114", href: "wa" },
          { label: "How ordering works", href: "#how" },
          { label: "FAQs", href: "#faq" },
        ],
      },
    ],
    credit: "Abhishek Singh",
    creditUrl: "",
  },
};

export default site;

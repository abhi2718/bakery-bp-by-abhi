# Bakery Boilerplate

A one-page ordering site for a small bakery, built with Next.js. The visitor
fills a basket, adds their details, and the site composes one long WhatsApp
message — items, sizes, occasion, date, address, message-on-cake, allergies —
and opens it addressed to the shop. **There is no server and no payment
gateway.** The owner confirms the price and advance on chat.

The demo content is a home bakery called *The BakeNest by Sonam*. Everything
about it lives in two files, so the same codebase can be resold to another
shop in an afternoon.

---

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the build
npm run typecheck
```

Node 18.18+ is required.

---

## Rebranding it for a new shop

Everything below happens in `config/`. **No file under `components/` needs to
change for a new client.**

### 1. `config/site.config.ts`

| Block | What it controls |
| --- | --- |
| `brand` | Name, the small line under it, monogram, logo path, order-reference prefix, the owner's first name (used throughout the copy) |
| `seo` | Page title, description, live URL, OG image |
| `contact` | WhatsApp number, Instagram, area/city, FSSAI number |
| `currency` | Symbol and the number format (`en-IN` gives ₹1,20,000) |
| `ordering` | Lead times, occasion list, time slots, delivery/diet notes, the "make it lighter" option |
| `theme` | Both palettes, the default mode, and whether the toggle is shown |
| `nav` … `footer` | Every word of copy on the page |

Headings are written with the flourish marked by pipes:

```ts
title: "Pick your |occasion|."   // "occasion" renders italic, in the gradient
```

`\n` in a heading becomes a line break.

### 2. `config/products.ts`

Categories and the menu. Each product needs an `id` (never reuse an old one —
the saved basket keys off it), a name, categories, a description, sizes with
plain-number prices, and optionally a photo and a `lowSugar` flag.

A product with `img: ''` shows a designed brand tile instead of a photo, so
real pictures can be added one at a time.

### 3. The logo

Drop a square PNG at `public/logo.png` (or change `brand.logo`). It becomes the
header mark, the favicon and the footer mark. If the file is missing, the
`brand.monogram` letters show instead — nothing breaks.

### 4. Colours

Only `p1`, `p2`, `p3` and `salmon` usually need changing. Before shipping,
check two things:

- white button text against `p1`/`p2` — needs 4.5:1
- `accent` against `bg` — needs 4.5:1

The gradient deliberately stops short of the palest tone for exactly this
reason; a pale accent that looks lovely as decoration fails as button text.

---

## Photos

**The demo images are Unsplash stock and must be replaced before launch.** A
customer ordering "that exact cake" from a photo of somebody else's work is the
fastest route to a bad first order.

- Products — put files in `public/photos/` and set
  `img: '/photos/chocolate-truffle.jpg'`. Landscape, roughly 4:3, ~900px wide.
- Gallery — `gallery.items` in the config. Square crops, ~700px.
- Hero — `hero.image`. Portrait-ish.

Local paths need no other change. Photos served from a CDN need that hostname
added to `images.remotePatterns` in `next.config.mjs`.

---

## How it's put together

```
app/
  layout.tsx          fonts, palette injection, header/footer/drawer shell
  page.tsx            the section order — delete a line to drop a section
components/
  layout/             Header, ThemeToggle, Footer, FloatingActions, StructuredData
  sections/           Hero, Marquee, About, Shop, LowSugar, HowItWorks,
                      Gallery, HoursContact, Faq, CtaBand
  shop/               ProductCard, ProductArt (photo or designed tile)
  cart/               CartDrawer → CartLines | OrderForm | OrderSent
  ui/                 Icons, Reveal, SectionHead, BrandMark, Toast
lib/
  cart-context.tsx    basket state, localStorage, drawer + toast
  whatsapp.ts         prices, totals, and the order message
  theme-css.ts        config palette → CSS custom properties
  format.ts           money, dates, order references
  accent.tsx          the |pipe| heading flourish
styles/               base → header → sections → shop → drawer → chrome →
                      responsive (load order matters; responsive is last)
config/               the two files above
types/                the shape of the config, checked by `npm run typecheck`
```

The basket is kept in `localStorage`, so a refresh — or a trip to WhatsApp and
back — doesn't lose it. Lines whose product or size no longer exists in the
menu are dropped on load, so editing prices never leaves a stale basket.

---

## Before any site goes live

1. **Prices and menu** — go through `config/products.ts` with the owner. Every
   price on the demo is a placeholder.
2. **WhatsApp number** — `contact.whatsapp`, digits only, with country code.
   Send yourself a test order.
3. **Lead times** — `ordering.leadDays` and `weddingLeadDays`. They also set
   the earliest date the picker will accept.
4. **Delivery area and charge** — the site says the charge is confirmed on
   chat. If the shop has fixed rates, say so in `ordering.deliveryNote`.
5. **Photos** — replace all of them.
6. **FSSAI** — Indian home bakers usually need a registration number.
   `contact.fssai` prints it in the footer; `''` removes the line.
7. **Health wording** — if the shop makes a "less sugar" claim, keep it to
   the owner's own words. Never write sugar-free, diabetic-friendly or keto.
8. **Testimonials** — the quote block is the bakery's own promise. Only put a
   real customer's words there, with permission.

## Deploying

Any Next.js host works. `vercel` or `npm run build && npm start` behind a
reverse proxy both need nothing beyond what's in this repo — there is no
database, no API key and no environment variable.

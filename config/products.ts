import type { Category, Product } from "@/types";

/* ==========================================================================
   THE MENU — the one block a new bakery must go through properly.

   The cards, the filters, the basket and the WhatsApp message all read from
   this file, so editing it is the only thing needed to change the shop.

     id       unique, no spaces. The basket stores it — never reuse an old id.
     name     shown on the card and written into the order message
     cat      one or more ids from CATEGORIES below
     tag      badge over the photo. '' for none. 'hot:' = solid brand colour
     img      landscape photo, roughly 4:3, about 800px wide.
              '' falls back to a designed brand tile, so photos can go in
              one product at a time.
     desc     one or two lines
     units    sizes, cheapest first. price is a NUMBER — no commas, no ₹
     lowSugar true if it can be made in the lighter version

   >>> DEMO PHOTOS: the images below are Unsplash stock, here to show the
   layout. Replace every one with the bakery's own work before launch —
   a customer ordering "that exact cake" from someone else's photo is the
   fastest way to a bad first order. Local files go in /public/photos and
   the path becomes '/photos/chocolate-truffle.jpg'.
   ========================================================================== */

const U = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`;

export const CATEGORIES: Category[] = [
  { id: "all", label: "Everything" },
  { id: "wedding", label: "Wedding" },
  { id: "birthday", label: "Birthday" },
  { id: "party", label: "Party & Anniversary" },
  { id: "pastry", label: "Pastries & Bites" },
  { id: "lowsugar", label: "Low Sugar" },
];

export const PRODUCTS: Product[] = [
  /* ---------------- WEDDING ---------------- */
  {
    id: "wed-two-tier",
    name: "Two-Tier Vanilla & Rose",
    cat: ["wedding"],
    tag: "hot:Most booked",
    img: U("photo-1535141192574-5d4897c12636"),
    desc: "Soft vanilla sponge, rose buttercream, fresh flowers on top. The one most couples pick.",
    units: [
      { label: "2 kg (two tier)", price: 3500 },
      { label: "3 kg (two tier)", price: 4900 },
    ],
    lowSugar: true,
  },
  {
    id: "wed-three-tier",
    name: "Three-Tier Wedding Classic",
    cat: ["wedding"],
    tag: "",
    img: U("photo-1535254973040-607b474cb50d"),
    desc: "A proper centrepiece — three tiers, smooth finish, your choice of flavour in each layer.",
    units: [
      { label: "4 kg (three tier)", price: 6500 },
      { label: "6 kg (three tier)", price: 9200 },
    ],
    lowSugar: false,
  },
  {
    id: "wed-engagement",
    name: "Engagement Ring Cake",
    cat: ["wedding"],
    tag: "",
    img: U("photo-1562440499-64c9a111f713"),
    desc: "A single-tier cake for the roka or ring ceremony, finished with the two names.",
    units: [
      { label: "1 kg", price: 1400 },
      { label: "1.5 kg", price: 1950 },
      { label: "2 kg", price: 2500 },
    ],
    lowSugar: true,
  },
  {
    id: "wed-hamper",
    name: "Sangeet Dessert Hamper",
    cat: ["wedding", "party"],
    tag: "",
    img: U("photo-1548848221-0c2e497ed557"),
    desc: "A spread for the dessert table — cupcakes, brownies, jar cakes and cookies in one box.",
    units: [
      { label: "Small (serves 15)", price: 2400 },
      { label: "Large (serves 30)", price: 4500 },
    ],
    lowSugar: true,
  },

  /* ---------------- BIRTHDAY ---------------- */
  {
    id: "bd-choco-truffle",
    name: "Chocolate Truffle",
    cat: ["birthday", "party"],
    tag: "hot:Bestseller",
    img: U("photo-1578985545062-69928b1d9587"),
    desc: "Dark chocolate sponge, thick ganache, chocolate shards. The safest yes at any birthday.",
    units: [
      { label: "0.5 kg", price: 650 },
      { label: "1 kg", price: 1200 },
      { label: "1.5 kg", price: 1750 },
      { label: "2 kg", price: 2300 },
    ],
    lowSugar: true,
  },
  {
    id: "bd-black-forest",
    name: "Black Forest",
    cat: ["birthday", "party"],
    tag: "",
    img: U("photo-1606890737304-57a1ca8a5b62"),
    desc: "Cocoa sponge, fresh cream, cherries and a heavy hand with the chocolate curls.",
    units: [
      { label: "0.5 kg", price: 600 },
      { label: "1 kg", price: 1100 },
      { label: "1.5 kg", price: 1600 },
      { label: "2 kg", price: 2100 },
    ],
    lowSugar: true,
  },
  {
    id: "bd-red-velvet",
    name: "Red Velvet Cream Cheese",
    cat: ["birthday", "party"],
    tag: "",
    img: U("photo-1614707267537-b85aaf00c4b7"),
    desc: "Proper red velvet with a tangy cream cheese frosting — not too sweet to begin with.",
    units: [
      { label: "0.5 kg", price: 750 },
      { label: "1 kg", price: 1400 },
      { label: "1.5 kg", price: 2000 },
    ],
    lowSugar: true,
  },
  {
    id: "bd-photo-print",
    name: "Photo Print Cake",
    cat: ["birthday"],
    tag: "",
    img: U("photo-1552689486-f6773047d19f"),
    desc: "Send a picture on WhatsApp and it goes on top in edible print. Any base flavour.",
    units: [
      { label: "1 kg", price: 1100 },
      { label: "1.5 kg", price: 1600 },
      { label: "2 kg", price: 2100 },
    ],
    lowSugar: false,
  },
  {
    id: "bd-cartoon",
    name: "Kids Cartoon Theme Cake",
    cat: ["birthday"],
    tag: "",
    img: U("photo-1464349095431-e9a21285b5f3"),
    desc: "Fondant characters and bright colours. Tell us the theme and we'll send a sketch first.",
    units: [
      { label: "1 kg", price: 1500 },
      { label: "1.5 kg", price: 2100 },
      { label: "2 kg", price: 2700 },
    ],
    lowSugar: false,
  },
  {
    id: "bd-butterscotch",
    name: "Butterscotch Crunch",
    cat: ["birthday", "party"],
    tag: "",
    img: U("photo-1571115177098-24ec42ed204d"),
    desc: "Caramel sponge, praline crunch through the middle, butterscotch cream outside.",
    units: [
      { label: "0.5 kg", price: 650 },
      { label: "1 kg", price: 1200 },
      { label: "1.5 kg", price: 1750 },
    ],
    lowSugar: true,
  },

  /* ---------------- PARTY & ANNIVERSARY ---------------- */
  {
    id: "pt-fruit-gateau",
    name: "Fresh Fruit Gateau",
    cat: ["party"],
    tag: "",
    img: U("photo-1565958011703-44f9829ba187"),
    desc: "Light vanilla sponge, whipped cream and whatever fruit is actually good that week.",
    units: [
      { label: "0.5 kg", price: 700 },
      { label: "1 kg", price: 1300 },
      { label: "1.5 kg", price: 1850 },
    ],
    lowSugar: true,
  },
  {
    id: "pt-pineapple",
    name: "Pineapple Cream",
    cat: ["party", "birthday"],
    tag: "",
    img: U("photo-1519915028121-7d3463d20b13"),
    desc: "The classic. Fresh cream, pineapple between the layers, nothing complicated about it.",
    units: [
      { label: "0.5 kg", price: 550 },
      { label: "1 kg", price: 1000 },
      { label: "1.5 kg", price: 1450 },
    ],
    lowSugar: true,
  },
  {
    id: "pt-anniversary",
    name: "Anniversary Heart Cake",
    cat: ["party"],
    tag: "",
    img: U("photo-1621303837174-89787a7d4729"),
    desc: "Heart-shaped, piped border, your two names and the year on top.",
    units: [
      { label: "1 kg", price: 1250 },
      { label: "1.5 kg", price: 1800 },
    ],
    lowSugar: true,
  },
  {
    id: "pt-office",
    name: "Office Party Slab Cake",
    cat: ["party"],
    tag: "",
    img: U("photo-1586985289906-406988974504"),
    desc: "A wide slab that cuts into clean squares — made for farewells and team celebrations.",
    units: [
      { label: "2 kg (serves 20)", price: 2200 },
      { label: "3 kg (serves 30)", price: 3100 },
    ],
    lowSugar: true,
  },

  /* ---------------- PASTRIES & BITES ---------------- */
  {
    id: "ps-cupcakes",
    name: "Cupcake Box",
    cat: ["pastry", "birthday"],
    tag: "",
    img: U("photo-1486427944299-d1955d23e34d"),
    desc: "Mix up to three flavours in one box. The easiest thing to send to an office or a classroom.",
    units: [
      { label: "Box of 6", price: 480 },
      { label: "Box of 12", price: 900 },
    ],
    lowSugar: true,
  },
  {
    id: "ps-brownies",
    name: "Fudgy Brownies",
    cat: ["pastry"],
    tag: "hot:Sells out",
    img: U("photo-1606313564200-e75d5e30476c"),
    desc: "Dense, properly fudgy squares. Plain or with walnuts — say which in the notes.",
    units: [
      { label: "Box of 6", price: 400 },
      { label: "Box of 9", price: 560 },
      { label: "Box of 12", price: 720 },
    ],
    lowSugar: true,
  },
  {
    id: "ps-jar-cakes",
    name: "Jar Cakes",
    cat: ["pastry", "party"],
    tag: "",
    img: U("photo-1488477181946-6428a0291777"),
    desc: "Layered cake in a jar with a spoon. Travels well and needs no cutting or plates.",
    units: [
      { label: "Set of 4", price: 520 },
      { label: "Set of 8", price: 980 },
    ],
    lowSugar: true,
  },
  {
    id: "ps-cookies",
    name: "Cookie Jar",
    cat: ["pastry"],
    tag: "",
    img: U("photo-1558961363-fa8fdf82db35"),
    desc: "Choc chip, oatmeal or butter cookies, baked to order and packed in a glass jar.",
    units: [
      { label: "Small jar (12)", price: 350 },
      { label: "Large jar (24)", price: 640 },
    ],
    lowSugar: true,
  },

  /* ---------------- LOW SUGAR ---------------- */
  {
    id: "ls-date-walnut",
    name: "Date & Walnut Loaf",
    cat: ["lowsugar", "pastry"],
    tag: "hot:No refined sugar",
    img: U("photo-1509440159596-0249088772ff"),
    desc: "Sweetened only by the dates. Dense, nutty, and the one people buy again for the week.",
    units: [
      { label: "Half loaf", price: 420 },
      { label: "Full loaf", price: 750 },
    ],
    lowSugar: true,
  },
  {
    id: "ls-choco",
    name: "Low-Sugar Chocolate Cake",
    cat: ["lowsugar", "birthday"],
    tag: "",
    img: U("photo-1517427294546-5aa121f68e8a"),
    desc: "The truffle cake rebuilt with natural sweeteners. Deeper cocoa, far less sweetness.",
    units: [
      { label: "0.5 kg", price: 800 },
      { label: "1 kg", price: 1500 },
    ],
    lowSugar: true,
  },
  {
    id: "ls-oats-cinnamon",
    name: "Oats & Cinnamon Rolls",
    cat: ["lowsugar", "pastry"],
    tag: "",
    img: U("photo-1509365465985-25d11c17e812"),
    desc: "Oats, cinnamon and a little jaggery. Good with chai, and they keep for a few days.",
    units: [
      { label: "Box of 4", price: 380 },
      { label: "Box of 8", price: 680 },
    ],
    lowSugar: true,
  },
];

export default PRODUCTS;

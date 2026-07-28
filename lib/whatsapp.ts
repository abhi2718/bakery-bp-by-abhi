import { site } from "@/config/site.config";
import { PRODUCTS } from "@/config/products";
import type { CartLine, OrderDetails } from "@/types";
import { money, prettyDate } from "./format";

export function productById(id: string) {
  return PRODUCTS.find((p) => p.id === id) ?? null;
}

export function unitPrice(line: CartLine): number {
  const p = productById(line.id);
  if (!p) return 0;
  return p.units.find((u) => u.label === line.unit)?.price ?? 0;
}

export function lineTotal(line: CartLine): number {
  return unitPrice(line) * line.qty;
}

export function cartTotal(cart: CartLine[]): number {
  return cart.reduce((n, l) => n + lineTotal(l), 0);
}

export function cartCount(cart: CartLine[]): number {
  return cart.reduce((n, l) => n + l.qty, 0);
}

/** Does the basket hold anything from the long-lead category? */
export function needsLongLead(cart: CartLine[]): boolean {
  const cat = site.ordering.longLeadCategory;
  return cart.some((l) => productById(l.id)?.cat.includes(cat));
}

export function waLink(text?: string): string {
  return (
    "https://wa.me/" +
    site.contact.whatsapp +
    (text ? "?text=" + encodeURIComponent(text) : "")
  );
}

/**
 * The order message. *Stars* are WhatsApp's bold markers, _underscores_ its
 * italics. Keep the lines short — long lines wrap badly on a phone.
 */
export function buildOrderMessage(
  orderId: string,
  v: OrderDetails,
  cart: CartLine[]
): string {
  const L: string[] = [];
  const variant = site.ordering.variant;

  L.push(`*NEW ORDER — ${site.brand.name}*`);
  L.push(`Order ref: *${orderId}*`);
  L.push("");

  L.push("*— ITEMS —*");
  cart.forEach((l, i) => {
    const p = productById(l.id);
    if (!p) return;
    L.push(`${i + 1}. *${p.name}*`);
    L.push(`    Size: ${l.unit}   Qty: ${l.qty}`);
    if (l.lowSugar) L.push(`    ${variant.shortLabel} version`);
    L.push(`    ${money(unitPrice(l))} each  =  ${money(lineTotal(l))}`);
  });
  L.push("");
  L.push(`*Estimated total: ${money(cartTotal(cart))}*`);
  L.push("_(starting prices — please confirm the final amount)_");
  L.push("");

  L.push("*— THE OCCASION —*");
  L.push(`Occasion: *${v.occasion}*`);
  L.push(`Needed on: *${prettyDate(v.date)}*`);
  L.push(`Time: ${v.slot || "To be confirmed"}`);
  if (v.msg.trim()) L.push(`On the cake: "${v.msg.trim()}"`);
  L.push("");

  L.push("*— WHO IT'S FOR —*");
  L.push(`Name: ${v.name.trim()}`);
  L.push(`Phone: ${v.phone.trim()}`);
  L.push(v.mode === "Pickup" ? "Pickup from the kitchen" : "Delivery");
  if (v.mode !== "Pickup") {
    L.push("Address:");
    v.address
      .trim()
      .split("\n")
      .forEach((ln) => {
        if (ln.trim()) L.push("  " + ln.trim());
      });
  }
  L.push("");

  if (v.notes.trim()) {
    L.push("*— NOTES / ALLERGIES —*");
    v.notes
      .trim()
      .split("\n")
      .forEach((ln) => {
        if (ln.trim()) L.push(ln.trim());
      });
    L.push("");
  }

  // possessive rather than "the {name} website" — reads right whether or not
  // the brand name already starts with "The"
  L.push(`_Sent from ${site.brand.name}'s website_`);
  return L.join("\n");
}

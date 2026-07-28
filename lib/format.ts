import { site } from "@/config/site.config";

export function money(n: number): string {
  return site.currency.symbol + Number(n).toLocaleString(site.currency.locale);
}

export function pad(n: number): string {
  return n < 10 ? "0" + n : String(n);
}

export function isoDate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function addDays(d: Date, n: number): Date {
  const x = new Date(d.getTime());
  x.setDate(x.getDate() + n);
  return x;
}

export function prettyDate(iso: string): string {
  const p = iso.split("-");
  if (p.length !== 3) return iso;
  const d = new Date(+p[0], +p[1] - 1, +p[2]);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(site.currency.locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** BN-260728-4193 — enough for the owner to find an order in her chat list. */
export function makeOrderId(): string {
  const d = new Date();
  const stamp =
    String(d.getFullYear()).slice(2) + pad(d.getMonth() + 1) + pad(d.getDate());
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  return `${site.brand.orderPrefix}-${stamp}-${rand}`;
}

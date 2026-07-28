"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site.config";
import type { Product } from "@/types";
import { money } from "@/lib/format";
import { useCart } from "@/lib/cart-context";
import { ProductArt } from "@/components/shop/ProductArt";
import { CheckIcon, LeafIcon, PlusIcon } from "@/components/ui/Icons";

export default function ProductCard({ p, index }: { p: Product; index: number }) {
  const { add, showToast } = useCart();
  const [unit, setUnit] = useState(p.units[0].label);
  const [light, setLight] = useState(false);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const price = p.units.find((u) => u.label === unit)?.price ?? p.units[0].price;
  const variant = site.ordering.variant;
  const canBeLight = variant.enabled && !!p.lowSugar;
  const hot = p.tag?.startsWith("hot:");
  const tagText = hot ? p.tag!.slice(4) : p.tag;

  function onAdd() {
    add(p.id, unit, canBeLight && light);
    showToast(`${p.name} added${canBeLight && light ? ` (${variant.shortLabel.toLowerCase()})` : ""}`);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1400);
  }

  return (
    <article className="prod" style={{ animationDelay: `${Math.min(index * 45, 360)}ms` }}>
      <div className="shot">
        <ProductArt p={p} />
        {tagText ? <span className={`tagline${hot ? " hot" : ""}`}>{tagText}</span> : null}
        {canBeLight ? (
          <span className="ls-mark" title={variant.markLabel} aria-label={variant.markLabel}>
            <LeafIcon />
          </span>
        ) : null}
      </div>

      <div className="body">
        <h3>{p.name}</h3>
        <p className="desc">{p.desc}</p>

        <div className="opt-row">
          <select
            className="sel"
            aria-label={`Size for ${p.name}`}
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            {p.units.map((u) => (
              <option key={u.label} value={u.label}>
                {u.label}
              </option>
            ))}
          </select>
          <span className="price">{money(price)}</span>
        </div>

        {/* products that can't be made lighter keep an empty row of the same
            height, so the dropdown and button line up across the row */}
        {canBeLight ? (
          <label className="ls-toggle">
            <input
              type="checkbox"
              checked={light}
              onChange={(e) => setLight(e.target.checked)}
            />
            {variant.label}
          </label>
        ) : (
          <span className="ls-spacer" aria-hidden="true" />
        )}

        <button
          className={`btn btn-primary add${added ? " added" : ""}`}
          type="button"
          onClick={onAdd}
        >
          {added ? <CheckIcon /> : <PlusIcon />}
          {added ? "Added" : "Add to basket"}
        </button>
      </div>
    </article>
  );
}

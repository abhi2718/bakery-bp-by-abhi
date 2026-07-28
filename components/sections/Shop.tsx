"use client";

import { useMemo, useState } from "react";
import { site } from "@/config/site.config";
import { CATEGORIES, PRODUCTS } from "@/config/products";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import ProductCard from "@/components/shop/ProductCard";
import { SwipeIcon } from "@/components/ui/Icons";

const inCat = (cats: string[], cat: string) => cat === "all" || cats.includes(cat);

export default function Shop() {
  const [active, setActive] = useState("all");

  const list = useMemo(
    () => PRODUCTS.filter((p) => inCat(p.cat, active)),
    [active]
  );

  return (
    <section className="section shop-sec" id="shop">
      <div className="wrap">
        <Reveal>
          <SectionHead
            eyebrow={site.shop.eyebrow}
            title={site.shop.title}
            blurb={site.shop.blurb}
            center
          />
        </Reveal>

        <Reveal className="filters" role="group" aria-label="Filter by category">
          {CATEGORIES.map((c) => (
            <button
              className="chip"
              type="button"
              key={c.id}
              aria-pressed={c.id === active}
              onClick={() => setActive(c.id)}
            >
              {c.label}{" "}
              <span className="qty">
                {PRODUCTS.filter((p) => inCat(p.cat, c.id)).length}
              </span>
            </button>
          ))}
        </Reveal>

        <p className="shop-count">
          {list.length
            ? site.shop.countNote
                .replace("{n}", String(list.length))
                .replace("{total}", String(PRODUCTS.length))
            : ""}
        </p>

        <div className="grid">
          {list.length ? (
            list.map((p, i) => <ProductCard p={p} index={i} key={p.id} />)
          ) : (
            <div className="empty-shop">
              Nothing in this category yet — try another one.
            </div>
          )}
        </div>

        <p className="swipe-hint">
          <SwipeIcon /> Swipe the filters for more
        </p>
      </div>
    </section>
  );
}

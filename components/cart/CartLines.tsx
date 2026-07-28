"use client";

import type { RefObject } from "react";
import { site } from "@/config/site.config";
import { money } from "@/lib/format";
import { productById, unitPrice } from "@/lib/whatsapp";
import { useCart } from "@/lib/cart-context";
import { ProductThumb } from "@/components/shop/ProductArt";
import { CartIcon, LeafIcon } from "@/components/ui/Icons";

export default function CartLines({
  bodyRef,
}: {
  bodyRef: RefObject<HTMLDivElement | null>;
}) {
  const { cart, count, total, setQty, clear, setView, closeDrawer } = useCart();

  if (!cart.length) {
    return (
      <>
        <div className="drawer-body" ref={bodyRef}>
          <div className="cart-empty">
            <div className="ic">
              <CartIcon />
            </div>
            <h3>Nothing here yet</h3>
            <p>
              Pick a category in the shop and add something — you can change the
              size and quantity later.
            </p>
          </div>
        </div>
        <div className="drawer-foot">
          <button className="btn btn-ghost block" type="button" onClick={closeDrawer}>
            Browse the cakes
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="drawer-body" ref={bodyRef}>
        {cart.map((l, i) => {
          const p = productById(l.id);
          if (!p) return null;
          return (
            <div className="line" key={`${l.id}-${l.unit}-${l.lowSugar}`}>
              <ProductThumb p={p} />
              <div>
                <div className="nm">{p.name}</div>
                <div className="meta">
                  {l.unit} · {money(unitPrice(l))} each
                </div>
                {l.lowSugar ? (
                  <div className="ls">
                    <LeafIcon /> {site.ordering.variant.shortLabel}
                  </div>
                ) : null}
                <div className="line-bot">
                  <span className="stepper">
                    <button
                      type="button"
                      aria-label={`Fewer ${p.name}`}
                      onClick={() => setQty(i, l.qty - 1)}
                    >
                      &minus;
                    </button>
                    <span className="q">{l.qty}</span>
                    <button
                      type="button"
                      aria-label={`More ${p.name}`}
                      onClick={() => setQty(i, l.qty + 1)}
                    >
                      +
                    </button>
                  </span>
                  <span className="amt">{money(unitPrice(l) * l.qty)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="drawer-foot">
        <div className="totals">
          <div className="r">
            <span>
              {count} item{count === 1 ? "" : "s"}
            </span>
            <span>{money(total)}</span>
          </div>
          <div className="r">
            <span>Delivery</span>
            <span>Confirmed on chat</span>
          </div>
          <div className="r big">
            <span>Estimated total</span>
            <b>{money(total)}</b>
          </div>
          <p className="note">{site.ordering.deliveryNote}</p>
        </div>

        <button className="btn btn-primary block" type="button" onClick={() => setView("form")}>
          Add your details
        </button>
        <button
          className="btn btn-ghost btn-sm block"
          type="button"
          onClick={() => clear()}
        >
          Empty the basket
        </button>
      </div>
    </>
  );
}

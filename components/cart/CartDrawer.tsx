"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site.config";
import type { OrderDetails } from "@/types";
import { money } from "@/lib/format";
import { useCart } from "@/lib/cart-context";
import CartLines from "@/components/cart/CartLines";
import OrderForm from "@/components/cart/OrderForm";
import OrderSent from "@/components/cart/OrderSent";
import { CloseIcon } from "@/components/ui/Icons";

const emptyDetails: OrderDetails = {
  name: "",
  phone: "",
  occasion: "",
  date: "",
  slot: site.ordering.timeSlots[0] ?? "",
  mode: "Delivery",
  address: "",
  msg: "",
  notes: "",
};

/**
 * One drawer, three views: the basket, the order form, and the confirmation.
 * The typed details live here so flipping back to the basket doesn't lose them.
 */
export default function CartDrawer() {
  const { drawerOpen, closeDrawer, view, count, total } = useCart();
  const [details, setDetails] = useState<OrderDetails>(emptyDetails);
  const bodyRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  // move focus into the drawer once it has slid in
  useEffect(() => {
    if (!drawerOpen) return;
    const t = setTimeout(() => {
      panelRef.current
        ?.querySelector<HTMLElement>("input,select,textarea,button")
        ?.focus();
    }, 380);
    return () => clearTimeout(t);
  }, [drawerOpen]);

  // every view change starts at the top
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [view]);

  const title = view === "sent" ? "Order sent" : view === "form" ? "Your details" : "Your basket";

  return (
    <>
      <div className={`scrim${drawerOpen ? " on" : ""}`} onClick={closeDrawer} />

      <aside
        ref={panelRef}
        className={`drawer${drawerOpen ? " on" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawerTitle"
        aria-hidden={!drawerOpen}
        /* keeps the closed drawer's buttons out of the tab order */
        inert={!drawerOpen}
      >
        <div className="drawer-head">
          <div>
            <h3 id="drawerTitle">{title}</h3>
            <span className="sub">
              {count
                ? `${count} item${count === 1 ? "" : "s"} · ${money(total)}`
                : "Nothing added yet"}
            </span>
          </div>
          <button
            className="icon-btn"
            type="button"
            aria-label="Close basket"
            onClick={closeDrawer}
          >
            <CloseIcon />
          </button>
        </div>

        {view === "cart" ? <CartLines bodyRef={bodyRef} /> : null}
        {view === "form" ? (
          <OrderForm bodyRef={bodyRef} details={details} setDetails={setDetails} />
        ) : null}
        {view === "sent" ? <OrderSent bodyRef={bodyRef} /> : null}
      </aside>
    </>
  );
}

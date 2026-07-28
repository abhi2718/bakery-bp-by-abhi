"use client";

import type { RefObject } from "react";
import { site } from "@/config/site.config";
import { waLink } from "@/lib/whatsapp";
import { useCart } from "@/lib/cart-context";
import { CheckIcon } from "@/components/ui/Icons";

export default function OrderSent({
  bodyRef,
}: {
  bodyRef: RefObject<HTMLDivElement | null>;
}) {
  const { lastOrder, closeDrawer, setView } = useCart();

  return (
    <>
      <div className="drawer-body" ref={bodyRef}>
        <div className="sent">
          <div className="ic">
            <CheckIcon />
          </div>
          <h3>WhatsApp is open</h3>
          <p>
            Press send in WhatsApp and your order reaches {site.brand.owner}. She&rsquo;ll
            reply with the final price, the advance and the delivery time.
          </p>
          <p className="oid">{lastOrder?.id}</p>
          <p className="small">
            Your basket has been emptied. If WhatsApp didn&rsquo;t open, use the button
            below — the order is still saved here.
          </p>
        </div>
      </div>

      <div className="drawer-foot">
        <a
          className="btn btn-wa block"
          href={waLink(lastOrder?.message)}
          target="_blank"
          rel="noopener"
        >
          Open WhatsApp again
        </a>
        <button
          className="btn btn-ghost btn-sm block"
          type="button"
          onClick={() => {
            setView("cart");
            closeDrawer();
          }}
        >
          Done
        </button>
      </div>
    </>
  );
}

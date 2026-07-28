"use client";

import { site } from "@/config/site.config";
import { waLink } from "@/lib/whatsapp";
import { useCart } from "@/lib/cart-context";
import { CartIcon, WhatsAppIcon } from "@/components/ui/Icons";

/**
 * The floating WhatsApp pill (desktop) and the sticky action bar that
 * replaces it on phones — CSS decides which one is visible.
 */
export default function FloatingActions() {
  const { count, openDrawer } = useCart();

  return (
    <>
      <a
        className="fab"
        href={waLink(site.contact.whatsappGreeting)}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon />
        <span>WhatsApp</span>
      </a>

      <div className="mobile-bar">
        <a className="btn btn-ghost" href="#shop">
          Browse cakes
        </a>
        <button className="btn btn-primary" type="button" onClick={openDrawer}>
          <CartIcon />
          View basket <span className="pill">{count}</span>
        </button>
      </div>
    </>
  );
}

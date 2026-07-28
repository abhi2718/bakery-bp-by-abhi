"use client";

import { useCart } from "@/lib/cart-context";
import { CheckIcon } from "@/components/ui/Icons";

export default function Toast() {
  const { toast } = useCart();

  return (
    <div className={`toast${toast ? " on" : ""}`} role="status" aria-live="polite">
      <CheckIcon />
      <span>{toast}</span>
    </div>
  );
}

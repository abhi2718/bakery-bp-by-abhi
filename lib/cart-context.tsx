"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { site } from "@/config/site.config";
import type { CartLine } from "@/types";
import {
  cartCount,
  cartTotal,
  productById,
  unitPrice,
} from "@/lib/whatsapp";

/* The basket lives in localStorage so a refresh (or a trip to WhatsApp and
   back) doesn't lose it. Bump the key if the line shape ever changes. */
const STORE_KEY = "cart-v1";

export type DrawerView = "cart" | "form" | "sent";

type CartContextValue = {
  cart: CartLine[];
  count: number;
  total: number;
  add: (id: string, unit: string, lowSugar: boolean) => void;
  setQty: (index: number, qty: number) => void;
  clear: (silent?: boolean) => void;

  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  view: DrawerView;
  setView: (v: DrawerView) => void;

  /** Kept after the basket is emptied so "open WhatsApp again" still works. */
  lastOrder: { id: string; message: string } | null;
  setLastOrder: (o: { id: string; message: string }) => void;

  toast: string;
  showToast: (msg: string) => void;
  hideToast: () => void;

  /** Bumps whenever an item is added, so the badge can animate. */
  bump: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [view, setView] = useState<DrawerView>("cart");
  const [lastOrder, setLastOrder] = useState<{ id: string; message: string } | null>(
    null
  );
  const [toast, setToast] = useState("");
  const [bump, setBump] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  /* ---- load once on the client, dropping anything the menu no longer has ---- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setCart(
            parsed
              .filter((l: CartLine) => {
                const p = productById(l?.id);
                return (
                  p && p.units.some((u) => u.label === l.unit) && l.qty > 0
                );
              })
              .map((l: CartLine) => ({
                id: l.id,
                unit: l.unit,
                lowSugar: !!l.lowSugar,
                qty: Math.min(site.ordering.maxQty, Math.max(1, l.qty | 0)),
              }))
          );
        }
      }
    } catch {
      /* a corrupt basket is not worth a broken page */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return; // don't overwrite the stored basket with the empty first render
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(cart));
    } catch {
      /* private mode / quota — the basket just won't survive a refresh */
    }
  }, [cart, hydrated]);

  /* ---- toast ---- */
  const hideToast = useCallback(() => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast("");
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2200);
  }, []);

  /* ---- basket ---- */
  const add = useCallback(
    (id: string, unit: string, lowSugar: boolean) => {
      setCart((prev) => {
        const i = prev.findIndex(
          (l) => l.id === id && l.unit === unit && l.lowSugar === lowSugar
        );
        if (i > -1) {
          const next = prev.slice();
          next[i] = {
            ...next[i],
            qty: Math.min(site.ordering.maxQty, next[i].qty + 1),
          };
          return next;
        }
        return [...prev, { id, unit, lowSugar, qty: 1 }];
      });
      setBump((b) => b + 1);
    },
    []
  );

  const setQty = useCallback((index: number, qty: number) => {
    setCart((prev) => {
      if (!prev[index]) return prev;
      if (qty < 1) return prev.filter((_, i) => i !== index);
      const next = prev.slice();
      next[index] = { ...next[index], qty: Math.min(site.ordering.maxQty, qty) };
      return next;
    });
  }, []);

  const clear = useCallback(
    (silent?: boolean) => {
      setCart([]);
      if (!silent) showToast("Basket emptied");
    },
    [showToast]
  );

  /* ---- drawer ---- */
  const openDrawer = useCallback(() => {
    hideToast(); // otherwise it sits over the drawer's buttons
    returnFocus.current = document.activeElement as HTMLElement | null;
    setDrawerOpen(true);
  }, [hideToast]);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setView((v) => (v === "sent" ? "cart" : v));
    returnFocus.current?.focus?.();
  }, []);

  // page behind the drawer must not scroll
  useEffect(() => {
    document.body.classList.toggle("locked", drawerOpen);
    return () => document.body.classList.remove("locked");
  }, [drawerOpen]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpen, closeDrawer]);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      count: cartCount(cart),
      total: cartTotal(cart),
      add,
      setQty,
      clear,
      drawerOpen,
      openDrawer,
      closeDrawer,
      view,
      setView,
      lastOrder,
      setLastOrder,
      toast,
      showToast,
      hideToast,
      bump,
    }),
    [
      cart,
      add,
      setQty,
      clear,
      drawerOpen,
      openDrawer,
      closeDrawer,
      view,
      lastOrder,
      toast,
      showToast,
      hideToast,
      bump,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export { unitPrice };

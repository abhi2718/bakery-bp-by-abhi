"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site.config";
import { useCart } from "@/lib/cart-context";
import BrandMark from "@/components/ui/BrandMark";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { CartIcon } from "@/components/ui/Icons";

export default function Header() {
  const { count, openDrawer, bump } = useCart();
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bumping, setBumping] = useState(false);

  // hairline + shadow appear once the page has moved
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the mobile menu on Escape or once the viewport is wide again
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1040) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // badge pops each time something is added
  useEffect(() => {
    if (!bump) return;
    setBumping(true);
    const t = setTimeout(() => setBumping(false), 460);
    return () => clearTimeout(t);
  }, [bump]);

  return (
    <header className={`nav${stuck ? " stuck" : ""}`} id="nav">
      <div className="wrap">
        <div className="nav-in">
          <BrandMark />

          <nav className="links" aria-label="Main">
            {site.nav.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <a className="btn btn-primary" href="#shop">
              Order now
            </a>

            <button
              className={`icon-btn cart-btn${count ? " has" : ""}${bumping ? " bump" : ""}`}
              type="button"
              aria-label={`Open basket, ${count} item${count === 1 ? "" : "s"}`}
              onClick={openDrawer}
            >
              <CartIcon />
              <span className="count">{count}</span>
            </button>

            <ThemeToggle />

            <button
              className="icon-btn burger"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobileMenu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="bars" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        id="mobileMenu"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setMenuOpen(false);
        }}
      >
        <div className="wrap">
          <ul>
            {site.nav.map((n, i) => (
              <li key={n.href}>
                <a href={n.href}>
                  {n.label} <span className="n">{String(i + 1).padStart(2, "0")}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="m-actions">
            <a
              className="btn btn-ghost"
              href={site.contact.instagram}
              target="_blank"
              rel="noopener"
            >
              Instagram
            </a>
            <a className="btn btn-primary" href="#shop">
              Order now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

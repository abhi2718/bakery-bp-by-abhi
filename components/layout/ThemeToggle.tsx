"use client";

import { useCallback, useEffect, useState } from "react";
import { site } from "@/config/site.config";
import { MoonIcon, SunIcon } from "@/components/ui/Icons";

/**
 * The choice is remembered in localStorage and applied before paint by the
 * inline script in app/layout.tsx, so there's no flash of the wrong colours.
 * Set theme.toggle to false in config to lock the site to one palette.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(site.theme.default);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  const toggle = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode — the choice just won't be remembered */
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute(
      "content",
      next === "dark" ? site.theme.dark.bg : site.theme.light.bg
    );
  }, [theme]);

  if (!site.theme.toggle) return null;

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button className="icon-btn" type="button" aria-label={label} title={label} onClick={toggle}>
      <MoonIcon />
      <SunIcon />
    </button>
  );
}

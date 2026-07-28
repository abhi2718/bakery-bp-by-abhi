import { site } from "@/config/site.config";
import type { Palette } from "@/types";

/* Turns the palettes in config into the CSS custom properties every
   stylesheet reads. Nothing else in the app hard-codes a brand colour. */

function block(p: Palette): string {
  return `
    --p1:${p.p1};
    --p2:${p.p2};
    --p3:${p.p3};
    --salmon:${p.salmon};
    --spot:linear-gradient(102deg,${p.p1},${p.p2} 55%,${p.p3});
    --spot-text:linear-gradient(102deg,${p.spotText[0]},${p.spotText[1]} 52%,${p.spotText[2]});
    --bg:${p.bg};
    --bg-2:${p.bg2};
    --surface:${p.surface};
    --surface-2:${p.surface2};
    --text:${p.text};
    --muted:${p.muted};
    --muted-dim:${p.mutedDim};
    --accent:${p.accent};
    --field:${p.field};
    --text-rgb:${p.textRgb};
    --bg-rgb:${p.bgRgb};
    --line:rgba(${p.textRgb},.13);
    --line-strong:rgba(${p.textRgb},.22);
    --nav-bg:rgba(${p.bgRgb},.86);
    --glass:rgba(${p.bgRgb},.84);
    --ghost-bg:rgba(${p.textRgb},.035);
  `;
}

/** Anything that differs beyond a straight colour swap. */
const LIGHT_EXTRAS = `
    --veil:linear-gradient(180deg,rgba(255,255,255,.02) 30%,rgba(var(--text-rgb),.5));
    --glow-1:rgba(var(--text-rgb),.13);
    --glow-2:rgba(229,157,117,.24);
    --shadow-media:0 34px 70px -42px rgba(var(--text-rgb),.6);
    --shadow-card:0 26px 60px -34px rgba(var(--text-rgb),.35);
    --shadow-pop:0 40px 90px -40px rgba(var(--text-rgb),.55);
    --grain-blend:multiply;
    --grain-opacity:.5;
`;

const DARK_EXTRAS = `
    --nav-bg:rgba(var(--bg-rgb),.78);
    --glass:rgba(var(--bg-rgb),.7);
    --ghost-bg:rgba(255,255,255,.035);
    --line:rgba(var(--text-rgb),.10);
    --line-strong:rgba(var(--text-rgb),.19);
    --veil:linear-gradient(180deg,rgba(var(--bg-rgb),.06) 25%,rgba(var(--bg-rgb),.78));
    --glow-1:rgba(140,64,35,.24);
    --glow-2:rgba(229,157,117,.16);
    --shadow-media:0 40px 80px -42px rgba(0,0,0,.85);
    --shadow-card:0 26px 60px -34px rgba(0,0,0,.55);
    --shadow-pop:0 40px 90px -40px rgba(0,0,0,.9);
    --grain-blend:screen;
    --grain-opacity:.22;
`;

export function themeCss(): string {
  return `
:root{${block(site.theme.light)}${LIGHT_EXTRAS}}
:root[data-theme="dark"]{${block(site.theme.dark)}${DARK_EXTRAS}}
`.replace(/\s+/g, " ");
}

/**
 * Runs before first paint so a remembered theme never flashes the wrong
 * colours. Kept as a string because it has to be inline in <head>.
 */
export function themeBootScript(): string {
  return `(function(){var t=${JSON.stringify(site.theme.default)};try{var s=localStorage.getItem('theme');if(s==='light'||s==='dark')t=s;}catch(e){}document.documentElement.setAttribute('data-theme',t);})();`;
}

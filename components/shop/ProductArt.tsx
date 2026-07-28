import Image from "next/image";
import { PRODUCTS } from "@/config/products";
import type { Product } from "@/types";
import { TILE_ART } from "@/components/ui/Icons";

/* Each product gets its position within its own category, so consecutive
   cards cycle through the tile icons and tones instead of all landing on
   the same one. */
const VARIANT: Record<string, number> = (() => {
  const seen: Record<string, number> = {};
  const map: Record<string, number> = {};
  PRODUCTS.forEach((p) => {
    const c = p.cat[0];
    seen[c] = seen[c] === undefined ? 0 : seen[c] + 1;
    map[p.id] = seen[c];
  });
  return map;
})();

function tilePath(p: Product): string {
  const set = TILE_ART[p.cat[0]] ?? TILE_ART.default;
  return set[(VARIANT[p.id] ?? 0) % set.length];
}

/** The designed stand-in used until a product has a real photo. */
function Tile({ p, thin = false }: { p: Product; thin?: boolean }) {
  return (
    <span className="tile" data-v={(VARIANT[p.id] ?? 0) % 3} aria-hidden="true">
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth={thin ? 3 : 2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        dangerouslySetInnerHTML={{ __html: tilePath(p) }}
      />
    </span>
  );
}

/** Card artwork: the photo if the product has one, the tile if not. */
export function ProductArt({ p }: { p: Product }) {
  if (!p.img) return <Tile p={p} />;
  return (
    <Image
      src={p.img}
      alt={p.name}
      fill
      sizes="(max-width: 560px) 100vw, (max-width: 980px) 50vw, 33vw"
      style={{ objectFit: "cover" }}
    />
  );
}

/** The same thing at basket-thumbnail size. */
export function ProductThumb({ p }: { p: Product }) {
  if (!p.img) {
    return (
      <span className="thumb tile-sm">
        <Tile p={p} thin />
      </span>
    );
  }
  return (
    <span className="thumb">
      <Image src={p.img} alt="" width={74} height={74} />
    </span>
  );
}

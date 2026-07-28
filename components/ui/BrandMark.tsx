"use client"; // only for the logo's onError fallback

import { site } from "@/config/site.config";

/**
 * Logo + name, used in the header and the footer.
 * If brand.logo is '' (or the file is missing) the monogram shows instead.
 */
export default function BrandMark({ href = "#top" }: { href?: string }) {
  const { name, suffix, monogram, logo } = site.brand;
  return (
    <a href={href} className="brand" aria-label={`${name}, back to top`}>
      <span className="mark">
        {logo ? (
          /* eslint-disable-next-line @next/next/no-img-element -- tiny, above the
             fold, and needs the onerror fallback that next/image doesn't give. */
          <img src={logo} alt="" onError={(e) => e.currentTarget.remove()} />
        ) : null}
        <b>{monogram}</b>
      </span>
      <span className="name">
        {name}
        {suffix ? <small>{suffix}</small> : null}
      </span>
    </a>
  );
}

import { site } from "@/config/site.config";
import { CATEGORIES } from "@/config/products";

/**
 * Business details for Google. Everything here is read from config, so it
 * stays right when the site is rebranded — just confirm `seo.url` and the
 * phone number are the live ones before launch.
 */
export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: `${site.brand.name}${site.brand.suffix ? " " + site.brand.suffix : ""}`,
    description: site.seo.description,
    url: site.seo.url,
    servesCuisine: "Bakery",
    telephone: "+" + site.contact.whatsapp,
    sameAs: [site.contact.instagram].filter(Boolean),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.area,
      addressLocality: site.contact.city,
      addressRegion: site.contact.region,
      addressCountry: site.contact.country,
    },
    areaServed: { "@type": "City", name: site.contact.city },
    makesOffer: CATEGORIES.filter((c) => c.id !== "all").map((c) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: c.label },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

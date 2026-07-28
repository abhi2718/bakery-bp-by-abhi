import Image from "next/image";
import { site } from "@/config/site.config";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import { InstagramIcon } from "@/components/ui/Icons";

/** Square crops, about 700px, look best. Every tile links to Instagram. */
export default function Gallery() {
  const g = site.gallery;
  if (!g.enabled || !g.items.length) return null;

  return (
    <section className="section tight" id="gallery">
      <div className="wrap">
        <Reveal>
          <SectionHead eyebrow={g.eyebrow} title={g.title} blurb={g.blurb} center />
        </Reveal>

        <Reveal className="gal">
          {g.items.map((item) => (
            <a
              className="gshot"
              key={item.src}
              href={site.contact.instagram}
              target="_blank"
              rel="noopener"
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                sizes="(max-width: 760px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <span className="cap">{item.caption}</span>
            </a>
          ))}
        </Reveal>

        <Reveal style={{ textAlign: "center", marginTop: 34 }}>
          <a
            className="btn btn-ig"
            href={site.contact.instagram}
            target="_blank"
            rel="noopener"
          >
            <InstagramIcon />
            {g.ctaLabel}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

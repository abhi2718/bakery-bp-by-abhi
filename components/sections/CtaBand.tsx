import { site } from "@/config/site.config";
import { accent } from "@/lib/accent";
import Reveal from "@/components/ui/Reveal";
import { CartIcon } from "@/components/ui/Icons";

export default function CtaBand() {
  const c = site.cta;

  return (
    <section className="section tight">
      <Reveal className="cta-band">
        <div className="wrap2">
          <span className="eyebrow">{c.eyebrow}</span>
          <h2 className="display" style={{ marginTop: 14 }}>
            {accent(c.title)}
          </h2>
          <p className="script">{c.script}</p>
          <p>{c.body}</p>
          <div className="hero-cta" style={{ justifyContent: "center" }}>
            <a className="btn btn-primary" href="#shop">
              <CartIcon />
              {c.primaryCta}
            </a>
            <a
              className="btn btn-ghost"
              href={site.contact.instagram}
              target="_blank"
              rel="noopener"
            >
              {c.secondaryCta}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

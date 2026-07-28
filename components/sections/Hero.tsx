import Image from "next/image";
import { site } from "@/config/site.config";
import { accent } from "@/lib/accent";
import Reveal from "@/components/ui/Reveal";
import { CartIcon, InstagramIcon, OvenIcon } from "@/components/ui/Icons";

export default function Hero() {
  const h = site.hero;

  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <Reveal className="hero-copy">
          <span className="eyebrow">{h.eyebrow}</span>
          <h1 className="display">{accent(h.title)}</h1>
          <p className="lede">{h.lede}</p>

          <div className="hero-cta">
            <a className="btn btn-primary" href="#shop">
              <CartIcon />
              {h.primaryCta}
            </a>
            <a
              className="btn btn-ghost"
              href={site.contact.instagram}
              target="_blank"
              rel="noopener"
            >
              <InstagramIcon />
              {h.secondaryCta}
            </a>
          </div>

          <p className="hero-note">
            {h.notes.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </p>
        </Reveal>

        <Reveal className="hero-media" aria-hidden="true">
          {h.image ? (
            <Image
              src={h.image}
              alt=""
              fill
              priority
              sizes="(max-width: 980px) 100vw, 46vw"
              style={{ objectFit: "cover" }}
            />
          ) : null}
          <div className="veil" />
          <div className="pill-float">{h.floatPill}</div>
          <div className="badge-float">
            <div className="g">
              <OvenIcon />
            </div>
            <div>
              <b>{h.badge.title}</b>
              <span className="sub">{h.badge.sub}</span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="wrap">
        <Reveal className="scoreboard">
          {h.stats.map((s) => (
            <div className="score" key={s.l}>
              <div className={`k${s.grad ? " grad" : ""}`}>{s.k}</div>
              <div className="l">{s.l}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

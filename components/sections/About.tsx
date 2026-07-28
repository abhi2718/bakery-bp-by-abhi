import { site } from "@/config/site.config";
import { accent } from "@/lib/accent";
import Reveal from "@/components/ui/Reveal";
import { CheckIcon } from "@/components/ui/Icons";

export default function About() {
  const a = site.about;

  return (
    <section className="section" id="about">
      <div className="wrap about-grid">
        <Reveal className="about-copy">
          <span className="eyebrow">{a.eyebrow}</span>
          <div className="sec-head flush">
            <h2 className="display">{accent(a.title)}</h2>
          </div>
          {a.paragraphs.map((p, i) => (
            <p className="prose" key={i}>
              {p}
            </p>
          ))}
          <ul className="about-list">
            {a.bullets.map((b) => (
              <li key={b}>
                <span className="tick">
                  <CheckIcon />
                </span>{" "}
                {b}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* The bakery's own promise — put real testimonials here only with permission. */}
        <Reveal as="aside" className="about-quote">
          <div className="mark2">&ldquo;</div>
          <p>{a.quote}</p>
          <div className="who">{a.quoteWho}</div>
          <div className="foot">
            <a className="btn btn-primary block" href="#shop">
              {a.ctaLabel}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
